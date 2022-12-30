import { Stack } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
export interface TableProps {
    tableName: string;
    primaryKey: string;
    createLambdaPath?: string;
    readLambdaPath?: string;
    updateLambdaPath?: string;
    deleteLambdaPath?: string;
    secondaryIndexes?: string[];
}
export declare class GenericTable {
    private stack;
    private table;
    private props;
    private createLambda;
    private readLambda;
    private updateLambda;
    private deleteLambda;
    createLambdaIntegration: LambdaIntegration;
    readLambdaIntegration: LambdaIntegration;
    updateLambdaIntegration: LambdaIntegration;
    deleteLambdaIntegration: LambdaIntegration;
    constructor(stack: Stack, props: TableProps);
    private initialize;
    private createTable;
    private addSecondaryIndexes;
    private createLambdas;
    private grantTableRights;
    private createSingleLambda;
}
