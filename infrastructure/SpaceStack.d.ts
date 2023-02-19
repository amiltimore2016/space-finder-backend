import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class SpaceStack extends Stack {
    private api;
    private authorizer;
    private SpacesTable;
    constructor(scope: Construct, id: string, props: StackProps);
}
