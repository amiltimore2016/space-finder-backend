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
        this.api = new aws_apigateway_1.RestApi(this, "spaceApi");
        this.SpacesTable = new GeneritcTable_1.GenericTable(this, {
            tableName: "SpacesTable",
            primaryKey: "spaceId",
            createLambdaPath: "Create",
            readLambdaPath: "Read",
            updateLambdaPath: "Update",
            deleteLambdaPath: "Delete",
            secondaryIndexes: ["location"],
        });
        const helloLambdaWebpack = new aws_lambda_1.Function(this, "helloLambdaWebpack", {
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
            code: aws_lambda_1.Code.fromAsset((0, path_1.join)(__dirname, "..", "build", "nodeHelloLambda")),
            handler: "nodeHelloLambda.handler",
        });
        const nodeLambdaNodeJs = new aws_cdk_lib_1.aws_lambda_nodejs.NodejsFunction(this, "helloLambdaNodjes", {
            entry: (0, path_1.join)(__dirname, "..", "services", "node-lambda", "hello.ts"),
            handler: "handler",
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
        });
        const s3ListPolicy = new aws_iam_1.PolicyStatement();
        s3ListPolicy.addActions("s3:ListAllMyBuckets");
        s3ListPolicy.addResources("*");
        nodeLambdaNodeJs.addToRolePolicy(s3ListPolicy);
        // Hello Api Lambda integration:
        const HelloLambdaIntegration = new aws_apigateway_1.LambdaIntegration(nodeLambdaNodeJs);
        const HelloLambdaResource = this.api.root.addResource("hello");
        HelloLambdaResource.addMethod("GET", HelloLambdaIntegration);
        // Spaces API Integration
        const spaceResource = this.api.root.addResource("spaces");
        spaceResource.addMethod("POST", this.SpacesTable.createLambdaIntegration);
        spaceResource.addMethod("GET", this.SpacesTable.readLambdaIntegration);
        spaceResource.addMethod("PUT", this.SpacesTable.updateLambdaIntegration);
        spaceResource.addMethod("DELETE", this.SpacesTable.deleteLambdaIntegration);
    }
}
exports.SpaceStack = SpaceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhY2VTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNwYWNlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQW1FO0FBRW5FLHVEQUFtRjtBQUNuRiwrQkFBNEI7QUFDNUIsK0RBQXdFO0FBQ3hFLG1EQUErQztBQUMvQyxpREFBc0Q7QUFFdEQsTUFBYSxVQUFXLFNBQVEsbUJBQUs7SUFZbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFpQjtRQUN6RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQVpsQixRQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLElBQUksNEJBQVksQ0FBQyxJQUFJLEVBQUU7WUFDM0MsU0FBUyxFQUFFLGFBQWE7WUFDeEIsVUFBVSxFQUFFLFNBQVM7WUFDckIsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixjQUFjLEVBQUUsTUFBTTtZQUN0QixnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLGdCQUFnQixFQUFFLFFBQVE7WUFDMUIsZ0JBQWdCLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDL0IsQ0FBQyxDQUFDO1FBS0QsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFjLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3hFLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdkUsT0FBTyxFQUFFLHlCQUF5QjtTQUNuQyxDQUFDLENBQUM7UUFFSCxNQUFNLGdCQUFnQixHQUFHLElBQUksK0JBQWlCLENBQUMsY0FBYyxDQUMzRCxJQUFJLEVBQ0osbUJBQW1CLEVBQ25CO1lBQ0UsS0FBSyxFQUFFLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUM7WUFDbkUsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztTQUM3QixDQUNGLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQUMzQyxZQUFZLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDL0MsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFL0MsZ0NBQWdDO1FBQ2hDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxrQ0FBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUU3RCx5QkFBeUI7UUFDekIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMxRSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdkUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pFLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBQ0Y7QUFoREQsZ0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIGF3c19sYW1iZGFfbm9kZWpzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBDb2RlLCBGdW5jdGlvbiBhcyBMYW1iZGFGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgTGFtYmRhSW50ZWdyYXRpb24sIFJlc3RBcGkgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBHZW5lcmljVGFibGUgfSBmcm9tICcuL0dlbmVyaXRjVGFibGUnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbmV4cG9ydCBjbGFzcyBTcGFjZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBwcml2YXRlIGFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwic3BhY2VBcGlcIik7XG4gIHByaXZhdGUgU3BhY2VzVGFibGUgPSBuZXcgR2VuZXJpY1RhYmxlKHRoaXMsIHtcbiAgICB0YWJsZU5hbWU6IFwiU3BhY2VzVGFibGVcIixcbiAgICBwcmltYXJ5S2V5OiBcInNwYWNlSWRcIixcbiAgICBjcmVhdGVMYW1iZGFQYXRoOiBcIkNyZWF0ZVwiLFxuICAgIHJlYWRMYW1iZGFQYXRoOiBcIlJlYWRcIixcbiAgICB1cGRhdGVMYW1iZGFQYXRoOiBcIlVwZGF0ZVwiLFxuICAgIGRlbGV0ZUxhbWJkYVBhdGg6IFwiRGVsZXRlXCIsXG4gICAgc2Vjb25kYXJ5SW5kZXhlczogW1wibG9jYXRpb25cIl0sXG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBoZWxsb0xhbWJkYVdlYnBhY2sgPSBuZXcgTGFtYmRhRnVuY3Rpb24odGhpcywgXCJoZWxsb0xhbWJkYVdlYnBhY2tcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KGpvaW4oX19kaXJuYW1lLCBcIi4uXCIsIFwiYnVpbGRcIiwgXCJub2RlSGVsbG9MYW1iZGFcIikpLFxuICAgICAgaGFuZGxlcjogXCJub2RlSGVsbG9MYW1iZGEuaGFuZGxlclwiLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgbm9kZUxhbWJkYU5vZGVKcyA9IG5ldyBhd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICBcImhlbGxvTGFtYmRhTm9kamVzXCIsXG4gICAgICB7XG4gICAgICAgIGVudHJ5OiBqb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcInNlcnZpY2VzXCIsIFwibm9kZS1sYW1iZGFcIiwgXCJoZWxsby50c1wiKSxcbiAgICAgICAgaGFuZGxlcjogXCJoYW5kbGVyXCIsXG4gICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE4X1gsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IHMzTGlzdFBvbGljeSA9IG5ldyBQb2xpY3lTdGF0ZW1lbnQoKTtcbiAgICBzM0xpc3RQb2xpY3kuYWRkQWN0aW9ucyhcInMzOkxpc3RBbGxNeUJ1Y2tldHNcIik7XG4gICAgczNMaXN0UG9saWN5LmFkZFJlc291cmNlcyhcIipcIik7XG4gICAgbm9kZUxhbWJkYU5vZGVKcy5hZGRUb1JvbGVQb2xpY3koczNMaXN0UG9saWN5KTtcblxuICAgIC8vIEhlbGxvIEFwaSBMYW1iZGEgaW50ZWdyYXRpb246XG4gICAgY29uc3QgSGVsbG9MYW1iZGFJbnRlZ3JhdGlvbiA9IG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihub2RlTGFtYmRhTm9kZUpzKTtcbiAgICBjb25zdCBIZWxsb0xhbWJkYVJlc291cmNlID0gdGhpcy5hcGkucm9vdC5hZGRSZXNvdXJjZShcImhlbGxvXCIpO1xuICAgIEhlbGxvTGFtYmRhUmVzb3VyY2UuYWRkTWV0aG9kKFwiR0VUXCIsIEhlbGxvTGFtYmRhSW50ZWdyYXRpb24pO1xuXG4gICAgLy8gU3BhY2VzIEFQSSBJbnRlZ3JhdGlvblxuICAgIGNvbnN0IHNwYWNlUmVzb3VyY2UgPSB0aGlzLmFwaS5yb290LmFkZFJlc291cmNlKFwic3BhY2VzXCIpO1xuICAgIHNwYWNlUmVzb3VyY2UuYWRkTWV0aG9kKFwiUE9TVFwiLCB0aGlzLlNwYWNlc1RhYmxlLmNyZWF0ZUxhbWJkYUludGVncmF0aW9uKTtcbiAgICBzcGFjZVJlc291cmNlLmFkZE1ldGhvZChcIkdFVFwiLCB0aGlzLlNwYWNlc1RhYmxlLnJlYWRMYW1iZGFJbnRlZ3JhdGlvbik7XG4gICAgc3BhY2VSZXNvdXJjZS5hZGRNZXRob2QoXCJQVVRcIiwgdGhpcy5TcGFjZXNUYWJsZS51cGRhdGVMYW1iZGFJbnRlZ3JhdGlvbik7XG4gICAgc3BhY2VSZXNvdXJjZS5hZGRNZXRob2QoXCJERUxFVEVcIiwgdGhpcy5TcGFjZXNUYWJsZS5kZWxldGVMYW1iZGFJbnRlZ3JhdGlvbik7XG4gIH1cbn0iXX0=