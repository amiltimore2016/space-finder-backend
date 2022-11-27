import { Stack, StackProps, aws_lambda_nodejs } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GeneritcTable';

export class SpaceStack extends Stack{

    private api = new RestApi(this, 'spaceApi');
    private spacesTAble = new GenericTable(
        'SpacesTable',
        'spaceId',
        this,
    )

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const helloLambda = new LambdaFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        })

        const helloLambdaWebpack = new LambdaFunction(this, 'helloLambdaWebpack', {
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname, '..', 'build', 'nodeHelloLambda')),
            handler: 'nodeHelloLambda.handler'
        })

        const nodeLambdaNodeJs = new aws_lambda_nodejs.NodejsFunction(this, 'helloLambdaNodjes', {
            entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
            handler: 'handler',
            runtime: Runtime.NODEJS_16_X
        })

        // Hello Api Lambda integration:
        const HelloLambdaIntegration = new LambdaIntegration(helloLambda);
        const HelloLambdaResource = this.api.root.addResource('hello');
        HelloLambdaResource.addMethod('GET', HelloLambdaIntegration);
    }
}