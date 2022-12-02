"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const path_1 = require("path");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const GeneritcTable_1 = require("./GeneritcTable");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class SpaceStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.api = new aws_apigateway_1.RestApi(this, 'spaceApi');
        // private spacesTAble = new GenericTable(
        //     'SpacesTable',
        //     'spaceId',
        //     this
        // )
        this.SpacesTable = new GeneritcTable_1.GenericTable(this, {
            tableName: 'SpacesTable',
            primaryKey: 'spaceId',
            createLambdaPath: 'Create'
        });
        const helloLambdaWebpack = new aws_lambda_1.Function(this, 'helloLambdaWebpack', {
            runtime: aws_lambda_1.Runtime.NODEJS_16_X,
            code: aws_lambda_1.Code.fromAsset((0, path_1.join)(__dirname, '..', 'build', 'nodeHelloLambda')),
            handler: 'nodeHelloLambda.handler'
        });
        const nodeLambdaNodeJs = new aws_cdk_lib_1.aws_lambda_nodejs.NodejsFunction(this, 'helloLambdaNodjes', {
            entry: ((0, path_1.join)(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
            handler: 'handler',
            runtime: aws_lambda_1.Runtime.NODEJS_16_X
        });
        const s3ListPolicy = new aws_iam_1.PolicyStatement();
        s3ListPolicy.addActions('s3:ListAllMyBuckets');
        s3ListPolicy.addResources('*');
        nodeLambdaNodeJs.addToRolePolicy(s3ListPolicy);
        // Hello Api Lambda integration:
        const HelloLambdaIntegration = new aws_apigateway_1.LambdaIntegration(nodeLambdaNodeJs);
        const HelloLambdaResource = this.api.root.addResource('hello');
        HelloLambdaResource.addMethod('GET', HelloLambdaIntegration);
        // Spaces API Integration
        const spaceResource = this.api.root.addResource('spaces');
        spaceResource.addMethod('POST', this.SpacesTable.createLambdaIntegration);
    }
}
exports.SpaceStack = SpaceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhY2VTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNwYWNlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQW1FO0FBRW5FLHVEQUFtRjtBQUNuRiwrQkFBNEI7QUFDNUIsK0RBQXdFO0FBQ3hFLG1EQUErQztBQUMvQyxpREFBc0Q7QUFFdEQsTUFBYSxVQUFXLFNBQVEsbUJBQUs7SUFjakMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFpQjtRQUN2RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQWJwQixRQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM1QywwQ0FBMEM7UUFDMUMscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsSUFBSTtRQUNJLGdCQUFXLEdBQUcsSUFBSSw0QkFBWSxDQUFDLElBQUksRUFBRTtZQUN6QyxTQUFTLEVBQUUsYUFBYTtZQUN4QixVQUFVLEVBQUUsU0FBUztZQUNyQixnQkFBZ0IsRUFBRSxRQUFRO1NBQzdCLENBQUUsQ0FBQTtRQUtDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxxQkFBYyxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUN0RSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sRUFBRSx5QkFBeUI7U0FDckMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLCtCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDckYsS0FBSyxFQUFFLENBQUMsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7U0FDL0IsQ0FBQyxDQUFBO1FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSx5QkFBZSxFQUFFLENBQUM7UUFDM0MsWUFBWSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQy9DLFlBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDOUIsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRS9DLGdDQUFnQztRQUNoQyxNQUFNLHNCQUFzQixHQUFHLElBQUksa0NBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRCxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFFN0QseUJBQXlCO1FBQ3pCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNKO0FBM0NELGdDQTJDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBhd3NfbGFtYmRhX25vZGVqcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQ29kZSwgRnVuY3Rpb24gYXMgTGFtYmRhRnVuY3Rpb24sIFJ1bnRpbWUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IExhbWJkYUludGVncmF0aW9uLCBSZXN0QXBpIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0IHsgR2VuZXJpY1RhYmxlIH0gZnJvbSAnLi9HZW5lcml0Y1RhYmxlJztcbmltcG9ydCB7IFBvbGljeVN0YXRlbWVudCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuXG5leHBvcnQgY2xhc3MgU3BhY2VTdGFjayBleHRlbmRzIFN0YWNre1xuXG4gICAgcHJpdmF0ZSBhcGkgPSBuZXcgUmVzdEFwaSh0aGlzLCAnc3BhY2VBcGknKTtcbiAgICAvLyBwcml2YXRlIHNwYWNlc1RBYmxlID0gbmV3IEdlbmVyaWNUYWJsZShcbiAgICAvLyAgICAgJ1NwYWNlc1RhYmxlJyxcbiAgICAvLyAgICAgJ3NwYWNlSWQnLFxuICAgIC8vICAgICB0aGlzXG4gICAgLy8gKVxuICAgIHByaXZhdGUgU3BhY2VzVGFibGUgPSBuZXcgR2VuZXJpY1RhYmxlKHRoaXMsIHtcbiAgICAgICAgdGFibGVOYW1lOiAnU3BhY2VzVGFibGUnLFxuICAgICAgICBwcmltYXJ5S2V5OiAnc3BhY2VJZCcsXG4gICAgICAgIGNyZWF0ZUxhbWJkYVBhdGg6ICdDcmVhdGUnXG4gICAgfSApXG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBoZWxsb0xhbWJkYVdlYnBhY2sgPSBuZXcgTGFtYmRhRnVuY3Rpb24odGhpcywgJ2hlbGxvTGFtYmRhV2VicGFjaycsIHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICAgICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChqb2luKF9fZGlybmFtZSwgJy4uJywgJ2J1aWxkJywgJ25vZGVIZWxsb0xhbWJkYScpKSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdub2RlSGVsbG9MYW1iZGEuaGFuZGxlcidcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBub2RlTGFtYmRhTm9kZUpzID0gbmV3IGF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdoZWxsb0xhbWJkYU5vZGplcycsIHtcbiAgICAgICAgICAgIGVudHJ5OiAoam9pbihfX2Rpcm5hbWUsICcuLicsICdzZXJ2aWNlcycsICdub2RlLWxhbWJkYScsICdoZWxsby50cycpKSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE2X1hcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBzM0xpc3RQb2xpY3kgPSBuZXcgUG9saWN5U3RhdGVtZW50KCk7XG4gICAgICAgIHMzTGlzdFBvbGljeS5hZGRBY3Rpb25zKCdzMzpMaXN0QWxsTXlCdWNrZXRzJyk7XG4gICAgICAgIHMzTGlzdFBvbGljeS5hZGRSZXNvdXJjZXMoJyonKVxuICAgICAgICBub2RlTGFtYmRhTm9kZUpzLmFkZFRvUm9sZVBvbGljeShzM0xpc3RQb2xpY3kpO1xuXG4gICAgICAgIC8vIEhlbGxvIEFwaSBMYW1iZGEgaW50ZWdyYXRpb246XG4gICAgICAgIGNvbnN0IEhlbGxvTGFtYmRhSW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24obm9kZUxhbWJkYU5vZGVKcyk7XG4gICAgICAgIGNvbnN0IEhlbGxvTGFtYmRhUmVzb3VyY2UgPSB0aGlzLmFwaS5yb290LmFkZFJlc291cmNlKCdoZWxsbycpO1xuICAgICAgICBIZWxsb0xhbWJkYVJlc291cmNlLmFkZE1ldGhvZCgnR0VUJywgSGVsbG9MYW1iZGFJbnRlZ3JhdGlvbik7XG5cbiAgICAgICAgLy8gU3BhY2VzIEFQSSBJbnRlZ3JhdGlvblxuICAgICAgICBjb25zdCBzcGFjZVJlc291cmNlID0gdGhpcy5hcGkucm9vdC5hZGRSZXNvdXJjZSgnc3BhY2VzJyk7XG4gICAgICAgIHNwYWNlUmVzb3VyY2UuYWRkTWV0aG9kKCdQT1NUJywgdGhpcy5TcGFjZXNUYWJsZS5jcmVhdGVMYW1iZGFJbnRlZ3JhdGlvbik7XG4gICAgfVxufSJdfQ==