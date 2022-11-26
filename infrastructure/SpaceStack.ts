import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';

export class SpaceStack extends Stack{

    private api = new RestApi(this, 'spaceApi');


    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const helloLambda = new LambdaFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        })

        // Hello Api Lambda integration:
        const HelloLambdaIntegration = new LambdaIntegration(helloLambda);
        const HelloLambdaResource = this.api.root.addResource('hello');
        HelloLambdaResource.addMethod('GET', HelloLambdaIntegration);
    }
}