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
        this.SpacesTable = new GeneritcTable_1.GenericTable(this, {
            tableName: 'SpacesTable',
            primaryKey: 'spaceId',
            createLambdaPath: 'Create',
            readLambdaPath: 'Read'
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
        spaceResource.addMethod('GET', this.SpacesTable.readLambdaIntegration);
    }
}
exports.SpaceStack = SpaceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhY2VTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNwYWNlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQW1FO0FBRW5FLHVEQUFtRjtBQUNuRiwrQkFBNEI7QUFDNUIsK0RBQXdFO0FBQ3hFLG1EQUErQztBQUMvQyxpREFBc0Q7QUFFdEQsTUFBYSxVQUFXLFNBQVEsbUJBQUs7SUFVakMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFpQjtRQUN2RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQVRwQixRQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLElBQUksNEJBQVksQ0FBQyxJQUFJLEVBQUU7WUFDekMsU0FBUyxFQUFFLGFBQWE7WUFDeEIsVUFBVSxFQUFFLFNBQVM7WUFDckIsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixjQUFjLEVBQUUsTUFBTTtTQUN6QixDQUFFLENBQUE7UUFLQyxNQUFNLGtCQUFrQixHQUFHLElBQUkscUJBQWMsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDdEUsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN2RSxPQUFPLEVBQUUseUJBQXlCO1NBQ3JDLENBQUMsQ0FBQTtRQUVGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSwrQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ3JGLEtBQUssRUFBRSxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNyRSxPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1NBQy9CLENBQUMsQ0FBQTtRQUVGLE1BQU0sWUFBWSxHQUFHLElBQUkseUJBQWUsRUFBRSxDQUFDO1FBQzNDLFlBQVksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMvQyxZQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzlCLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUvQyxnQ0FBZ0M7UUFDaEMsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLGtDQUFpQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkUsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRTdELHlCQUF5QjtRQUN6QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0o7QUF4Q0QsZ0NBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIGF3c19sYW1iZGFfbm9kZWpzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBDb2RlLCBGdW5jdGlvbiBhcyBMYW1iZGFGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgTGFtYmRhSW50ZWdyYXRpb24sIFJlc3RBcGkgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBHZW5lcmljVGFibGUgfSBmcm9tICcuL0dlbmVyaXRjVGFibGUnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbmV4cG9ydCBjbGFzcyBTcGFjZVN0YWNrIGV4dGVuZHMgU3RhY2t7XG5cbiAgICBwcml2YXRlIGFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsICdzcGFjZUFwaScpO1xuICAgIHByaXZhdGUgU3BhY2VzVGFibGUgPSBuZXcgR2VuZXJpY1RhYmxlKHRoaXMsIHtcbiAgICAgICAgdGFibGVOYW1lOiAnU3BhY2VzVGFibGUnLFxuICAgICAgICBwcmltYXJ5S2V5OiAnc3BhY2VJZCcsXG4gICAgICAgIGNyZWF0ZUxhbWJkYVBhdGg6ICdDcmVhdGUnLFxuICAgICAgICByZWFkTGFtYmRhUGF0aDogJ1JlYWQnXG4gICAgfSApXG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBoZWxsb0xhbWJkYVdlYnBhY2sgPSBuZXcgTGFtYmRhRnVuY3Rpb24odGhpcywgJ2hlbGxvTGFtYmRhV2VicGFjaycsIHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICAgICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChqb2luKF9fZGlybmFtZSwgJy4uJywgJ2J1aWxkJywgJ25vZGVIZWxsb0xhbWJkYScpKSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdub2RlSGVsbG9MYW1iZGEuaGFuZGxlcidcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBub2RlTGFtYmRhTm9kZUpzID0gbmV3IGF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdoZWxsb0xhbWJkYU5vZGplcycsIHtcbiAgICAgICAgICAgIGVudHJ5OiAoam9pbihfX2Rpcm5hbWUsICcuLicsICdzZXJ2aWNlcycsICdub2RlLWxhbWJkYScsICdoZWxsby50cycpKSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE2X1hcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBzM0xpc3RQb2xpY3kgPSBuZXcgUG9saWN5U3RhdGVtZW50KCk7XG4gICAgICAgIHMzTGlzdFBvbGljeS5hZGRBY3Rpb25zKCdzMzpMaXN0QWxsTXlCdWNrZXRzJyk7XG4gICAgICAgIHMzTGlzdFBvbGljeS5hZGRSZXNvdXJjZXMoJyonKVxuICAgICAgICBub2RlTGFtYmRhTm9kZUpzLmFkZFRvUm9sZVBvbGljeShzM0xpc3RQb2xpY3kpO1xuXG4gICAgICAgIC8vIEhlbGxvIEFwaSBMYW1iZGEgaW50ZWdyYXRpb246XG4gICAgICAgIGNvbnN0IEhlbGxvTGFtYmRhSW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24obm9kZUxhbWJkYU5vZGVKcyk7XG4gICAgICAgIGNvbnN0IEhlbGxvTGFtYmRhUmVzb3VyY2UgPSB0aGlzLmFwaS5yb290LmFkZFJlc291cmNlKCdoZWxsbycpO1xuICAgICAgICBIZWxsb0xhbWJkYVJlc291cmNlLmFkZE1ldGhvZCgnR0VUJywgSGVsbG9MYW1iZGFJbnRlZ3JhdGlvbik7XG5cbiAgICAgICAgLy8gU3BhY2VzIEFQSSBJbnRlZ3JhdGlvblxuICAgICAgICBjb25zdCBzcGFjZVJlc291cmNlID0gdGhpcy5hcGkucm9vdC5hZGRSZXNvdXJjZSgnc3BhY2VzJyk7XG4gICAgICAgIHNwYWNlUmVzb3VyY2UuYWRkTWV0aG9kKCdQT1NUJywgdGhpcy5TcGFjZXNUYWJsZS5jcmVhdGVMYW1iZGFJbnRlZ3JhdGlvbik7XG4gICAgICAgIHNwYWNlUmVzb3VyY2UuYWRkTWV0aG9kKCdHRVQnLCB0aGlzLlNwYWNlc1RhYmxlLnJlYWRMYW1iZGFJbnRlZ3JhdGlvbik7XG4gICAgfVxufSJdfQ==