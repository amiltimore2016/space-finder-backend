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
        this.spacesTAble = new GeneritcTable_1.GenericTable('SpacesTable', 'spaceId', this);
        const helloLambda = new aws_lambda_1.Function(this, 'helloLambda', {
            runtime: aws_lambda_1.Runtime.NODEJS_16_X,
            code: aws_lambda_1.Code.fromAsset((0, path_1.join)(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
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
        // Hello Api Lambda integration:
        const HelloLambdaIntegration = new aws_apigateway_1.LambdaIntegration(helloLambda);
        const HelloLambdaResource = this.api.root.addResource('hello');
        HelloLambdaResource.addMethod('GET', HelloLambdaIntegration);
    }
}
exports.SpaceStack = SpaceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhY2VTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNwYWNlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQW1FO0FBRW5FLHVEQUFtRjtBQUNuRiwrQkFBNEI7QUFDNUIsK0RBQXdFO0FBQ3hFLG1EQUErQztBQUUvQyxNQUFhLFVBQVcsU0FBUSxtQkFBSztJQVNqQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWlCO1FBQ3ZELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBUnBCLFFBQUcsR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLGdCQUFXLEdBQUcsSUFBSSw0QkFBWSxDQUNsQyxhQUFhLEVBQ2IsU0FBUyxFQUNULElBQUksQ0FDUCxDQUFBO1FBS0csTUFBTSxXQUFXLEdBQUcsSUFBSSxxQkFBYyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDeEQsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEUsT0FBTyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFjLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3RFLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdkUsT0FBTyxFQUFFLHlCQUF5QjtTQUNyQyxDQUFDLENBQUE7UUFFRixNQUFNLGdCQUFnQixHQUFHLElBQUksK0JBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUNyRixLQUFLLEVBQUUsQ0FBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDckUsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztTQUMvQixDQUFDLENBQUE7UUFFRixnQ0FBZ0M7UUFDaEMsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLGtDQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQ0o7QUFuQ0QsZ0NBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIGF3c19sYW1iZGFfbm9kZWpzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBDb2RlLCBGdW5jdGlvbiBhcyBMYW1iZGFGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgTGFtYmRhSW50ZWdyYXRpb24sIFJlc3RBcGkgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBHZW5lcmljVGFibGUgfSBmcm9tICcuL0dlbmVyaXRjVGFibGUnO1xuXG5leHBvcnQgY2xhc3MgU3BhY2VTdGFjayBleHRlbmRzIFN0YWNre1xuXG4gICAgcHJpdmF0ZSBhcGkgPSBuZXcgUmVzdEFwaSh0aGlzLCAnc3BhY2VBcGknKTtcbiAgICBwcml2YXRlIHNwYWNlc1RBYmxlID0gbmV3IEdlbmVyaWNUYWJsZShcbiAgICAgICAgJ1NwYWNlc1RhYmxlJyxcbiAgICAgICAgJ3NwYWNlSWQnLFxuICAgICAgICB0aGlzLFxuICAgIClcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIGNvbnN0IGhlbGxvTGFtYmRhID0gbmV3IExhbWJkYUZ1bmN0aW9uKHRoaXMsICdoZWxsb0xhbWJkYScsIHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICAgICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChqb2luKF9fZGlybmFtZSwgJy4uJywgJ3NlcnZpY2VzJywgJ2hlbGxvJykpLFxuICAgICAgICAgICAgaGFuZGxlcjogJ2hlbGxvLm1haW4nXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgaGVsbG9MYW1iZGFXZWJwYWNrID0gbmV3IExhbWJkYUZ1bmN0aW9uKHRoaXMsICdoZWxsb0xhbWJkYVdlYnBhY2snLCB7XG4gICAgICAgICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoam9pbihfX2Rpcm5hbWUsICcuLicsICdidWlsZCcsICdub2RlSGVsbG9MYW1iZGEnKSksXG4gICAgICAgICAgICBoYW5kbGVyOiAnbm9kZUhlbGxvTGFtYmRhLmhhbmRsZXInXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3Qgbm9kZUxhbWJkYU5vZGVKcyA9IG5ldyBhd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbih0aGlzLCAnaGVsbG9MYW1iZGFOb2RqZXMnLCB7XG4gICAgICAgICAgICBlbnRyeTogKGpvaW4oX19kaXJuYW1lLCAnLi4nLCAnc2VydmljZXMnLCAnbm9kZS1sYW1iZGEnLCAnaGVsbG8udHMnKSksXG4gICAgICAgICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICAgICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNl9YXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gSGVsbG8gQXBpIExhbWJkYSBpbnRlZ3JhdGlvbjpcbiAgICAgICAgY29uc3QgSGVsbG9MYW1iZGFJbnRlZ3JhdGlvbiA9IG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihoZWxsb0xhbWJkYSk7XG4gICAgICAgIGNvbnN0IEhlbGxvTGFtYmRhUmVzb3VyY2UgPSB0aGlzLmFwaS5yb290LmFkZFJlc291cmNlKCdoZWxsbycpO1xuICAgICAgICBIZWxsb0xhbWJkYVJlc291cmNlLmFkZE1ldGhvZCgnR0VUJywgSGVsbG9MYW1iZGFJbnRlZ3JhdGlvbik7XG4gICAgfVxufSJdfQ==