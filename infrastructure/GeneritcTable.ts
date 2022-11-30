import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Stack } from 'aws-cdk-lib'

export interface TableProps {
    tableName: string,
    primaryKey: string,
}

export class GenericTable {

    private stack: Stack;
    private table: Table;
    private props: TableProps;

    public constructor(stack: Stack, props: TableProps) {
        this.props = props;
        this.stack = stack;
        this.initialize();
    }

    private initialize(){
        this.createTable();
    }

    private createTable(){
        this.table = new Table(this.stack, this.props.tableName, {
            partitionKey: {
                name: this.props.primaryKey,
                type: AttributeType.STRING
            },
            tableName: this.props.tableName
        });
    }

}