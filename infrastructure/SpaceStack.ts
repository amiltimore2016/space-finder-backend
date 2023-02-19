import { Stack, StackProps, aws_lambda_nodejs } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { AuthorizationType, LambdaIntegration, MethodOptions, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GeneritcTable';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { AuthorizeWrapper } from './auth/AuthorizeWrapper';

export class SpaceStack extends Stack {
  private api = new RestApi(this, "spaceApi");
  private authorizer: AuthorizeWrapper;

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

    this.authorizer = new AuthorizeWrapper(this, this.api)

    const nodeLambdaNodeJs = new aws_lambda_nodejs.NodejsFunction(
      this,
      "helloLambdaNodejs",
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

    const optionsWithAuthorizer: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: this.authorizer.authorizer.authorizerId
      }
    }

    // Hello Api Lambda integration:
    const HelloLambdaIntegration = new LambdaIntegration(nodeLambdaNodeJs);
    const HelloLambdaResource = this.api.root.addResource("hello");
    HelloLambdaResource.addMethod("GET", HelloLambdaIntegration, optionsWithAuthorizer);

    // Spaces API Integration
    const spaceResource = this.api.root.addResource("spaces");
    spaceResource.addMethod("POST", this.SpacesTable.createLambdaIntegration);
    spaceResource.addMethod("GET", this.SpacesTable.readLambdaIntegration);
    spaceResource.addMethod("PUT", this.SpacesTable.updateLambdaIntegration);
    spaceResource.addMethod("DELETE", this.SpacesTable.deleteLambdaIntegration);
  }
}