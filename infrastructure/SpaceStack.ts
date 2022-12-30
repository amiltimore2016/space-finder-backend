import { Stack, StackProps, aws_lambda_nodejs } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GeneritcTable';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class SpaceStack extends Stack {
  private api = new RestApi(this, "spaceApi");
  private SpacesTable = new GenericTable(this, {
    tableName: "SpacesTable",
    primaryKey: "spaceId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
    updateLambdaPath: "Update",
      deleteLambdaPath: "Delete",
    secondaryIndexes: ["location"],
  });

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambdaWebpack = new LambdaFunction(this, "helloLambdaWebpack", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(join(__dirname, "..", "build", "nodeHelloLambda")),
      handler: "nodeHelloLambda.handler",
    });

    const nodeLambdaNodeJs = new aws_lambda_nodejs.NodejsFunction(
      this,
      "helloLambdaNodjes",
      {
        entry: join(__dirname, "..", "services", "node-lambda", "hello.ts"),
        handler: "handler",
        runtime: Runtime.NODEJS_18_X,
      }
    );

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions("s3:ListAllMyBuckets");
    s3ListPolicy.addResources("*");
    nodeLambdaNodeJs.addToRolePolicy(s3ListPolicy);

    // Hello Api Lambda integration:
    const HelloLambdaIntegration = new LambdaIntegration(nodeLambdaNodeJs);
    const HelloLambdaResource = this.api.root.addResource("hello");
    HelloLambdaResource.addMethod("GET", HelloLambdaIntegration);

    // Spaces API Integration
    const spaceResource = this.api.root.addResource("spaces");
    spaceResource.addMethod("POST", this.SpacesTable.createLambdaIntegration);
    spaceResource.addMethod("GET", this.SpacesTable.readLambdaIntegration);
    spaceResource.addMethod("PUT", this.SpacesTable.updateLambdaIntegration);
    spaceResource.addMethod("DELETE", this.SpacesTable.deleteLambdaIntegration);
  }
}