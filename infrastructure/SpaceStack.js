"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const path_1 = require("path");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const GeneritcTable_1 = require("./GeneritcTable");
class SpaceStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.api = new aws_apigateway_1.RestApi(this, 'spaceApi');
        const tableName = new aws_cdk_lib_1.CfnParameter(this, 'TableName', {
            type: 'String',
            default: 'SpacesTable'
        });
        // Use CfnParameter to parse variables
        const spacesTable = new GeneritcTable_1.GenericTable(this, {
            tableName: tableName.valueAsString,
            primaryKey: 'spaceId'
        });
        const helloLambda = new aws_lambda_1.Function(this, 'helloLambda', {
            runtime: aws_lambda_1.Runtime.NODEJS_16_X,
            code: aws_lambda_1.Code.fromAsset((0, path_1.join)(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        });
        // Hello Api Lambda integration:
        const HelloLambdaIntegration = new aws_apigateway_1.LambdaIntegration(helloLambda);
        const HelloLambdaResource = this.api.root.addResource('hello');
        HelloLambdaResource.addMethod('GET', HelloLambdaIntegration);
    }
}
exports.SpaceStack = SpaceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhY2VTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNwYWNlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQThEO0FBRTlELHVEQUFtRjtBQUNuRiwrQkFBNEI7QUFDNUIsK0RBQXdFO0FBQ3hFLG1EQUErQztBQUUvQyxNQUFhLFVBQVcsU0FBUSxtQkFBSztJQUdqQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWlCO1FBQ3ZELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBSHBCLFFBQUcsR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSzVDLE1BQU0sU0FBUyxHQUFHLElBQUksMEJBQVksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ2xELElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLGFBQWE7U0FDekIsQ0FBQyxDQUFDO1FBR0gsc0NBQXNDO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLElBQUksNEJBQVksQ0FBQyxJQUFJLEVBQUU7WUFDdkMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxhQUFhO1lBQ2xDLFVBQVUsRUFBRSxTQUFTO1NBQ3hCLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLElBQUkscUJBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3hELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQTtRQUVFLGdDQUFnQztRQUNoQyxNQUFNLHNCQUFzQixHQUFHLElBQUksa0NBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDSjtBQTdCRCxnQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgQ2ZuUGFyYW1ldGVyIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBDb2RlLCBGdW5jdGlvbiBhcyBMYW1iZGFGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgTGFtYmRhSW50ZWdyYXRpb24sIFJlc3RBcGkgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBHZW5lcmljVGFibGUgfSBmcm9tICcuL0dlbmVyaXRjVGFibGUnO1xuXG5leHBvcnQgY2xhc3MgU3BhY2VTdGFjayBleHRlbmRzIFN0YWNre1xuICAgIHByaXZhdGUgYXBpID0gbmV3IFJlc3RBcGkodGhpcywgJ3NwYWNlQXBpJyk7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHRhYmxlTmFtZSA9IG5ldyBDZm5QYXJhbWV0ZXIodGhpcywgJ1RhYmxlTmFtZScsIHtcbiAgICAgICAgdHlwZTogJ1N0cmluZycsXG4gICAgICAgIGRlZmF1bHQ6ICdTcGFjZXNUYWJsZSdcbiAgICB9KTtcblxuICAgICBcbiAgICAvLyBVc2UgQ2ZuUGFyYW1ldGVyIHRvIHBhcnNlIHZhcmlhYmxlc1xuICAgIGNvbnN0IHNwYWNlc1RhYmxlID0gbmV3IEdlbmVyaWNUYWJsZSh0aGlzLCB7XG4gICAgICAgIHRhYmxlTmFtZTogdGFibGVOYW1lLnZhbHVlQXNTdHJpbmcsXG4gICAgICAgIHByaW1hcnlLZXk6ICdzcGFjZUlkJ1xuICAgIH0pO1xuXG4gICAgY29uc3QgaGVsbG9MYW1iZGEgPSBuZXcgTGFtYmRhRnVuY3Rpb24odGhpcywgJ2hlbGxvTGFtYmRhJywge1xuICAgICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChqb2luKF9fZGlybmFtZSwgJy4uJywgJ3NlcnZpY2VzJywgJ2hlbGxvJykpLFxuICAgICAgICBoYW5kbGVyOiAnaGVsbG8ubWFpbidcbiAgICB9KVxuXG4gICAgICAgIC8vIEhlbGxvIEFwaSBMYW1iZGEgaW50ZWdyYXRpb246XG4gICAgICAgIGNvbnN0IEhlbGxvTGFtYmRhSW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24oaGVsbG9MYW1iZGEpO1xuICAgICAgICBjb25zdCBIZWxsb0xhbWJkYVJlc291cmNlID0gdGhpcy5hcGkucm9vdC5hZGRSZXNvdXJjZSgnaGVsbG8nKTtcbiAgICAgICAgSGVsbG9MYW1iZGFSZXNvdXJjZS5hZGRNZXRob2QoJ0dFVCcsIEhlbGxvTGFtYmRhSW50ZWdyYXRpb24pO1xuICAgIH1cbn0iXX0=