import { Stack } from 'aws-cdk-lib';
export interface TableProps {
    tableName: string;
    primaryKey: string;
}
export declare class GenericTable {
    private stack;
    private table;
    private props;
    constructor(stack: Stack, props: TableProps);
    private initialize;
    private createTable;
}
