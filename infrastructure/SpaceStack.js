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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhY2VTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNwYWNlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQW1FO0FBRW5FLHVEQUFtRjtBQUNuRiwrQkFBNEI7QUFDNUIsK0RBQXdFO0FBQ3hFLG1EQUErQztBQUMvQyxpREFBc0Q7QUFFdEQsTUFBYSxVQUFXLFNBQVEsbUJBQUs7SUFZbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFpQjtRQUN6RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQVpsQixRQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLElBQUksNEJBQVksQ0FBQyxJQUFJLEVBQUU7WUFDM0MsU0FBUyxFQUFFLGFBQWE7WUFDeEIsVUFBVSxFQUFFLFNBQVM7WUFDckIsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixjQUFjLEVBQUUsTUFBTTtZQUN0QixnQkFBZ0IsRUFBRSxRQUFRO1lBQ3hCLGdCQUFnQixFQUFFLFFBQVE7WUFDNUIsZ0JBQWdCLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDL0IsQ0FBQyxDQUFDO1FBS0QsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFjLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3hFLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdkUsT0FBTyxFQUFFLHlCQUF5QjtTQUNuQyxDQUFDLENBQUM7UUFFSCxNQUFNLGdCQUFnQixHQUFHLElBQUksK0JBQWlCLENBQUMsY0FBYyxDQUMzRCxJQUFJLEVBQ0osbUJBQW1CLEVBQ25CO1lBQ0UsS0FBSyxFQUFFLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUM7WUFDbkUsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztTQUM3QixDQUNGLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQUMzQyxZQUFZLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDL0MsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFL0MsZ0NBQWdDO1FBQ2hDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxrQ0FBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUU3RCx5QkFBeUI7UUFDekIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMxRSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdkUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pFLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBQ0Y7QUFoREQsZ0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIGF3c19sYW1iZGFfbm9kZWpzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBDb2RlLCBGdW5jdGlvbiBhcyBMYW1iZGFGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgTGFtYmRhSW50ZWdyYXRpb24sIFJlc3RBcGkgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBHZW5lcmljVGFibGUgfSBmcm9tICcuL0dlbmVyaXRjVGFibGUnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbmV4cG9ydCBjbGFzcyBTcGFjZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBwcml2YXRlIGFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwic3BhY2VBcGlcIik7XG4gIHByaXZhdGUgU3BhY2VzVGFibGUgPSBuZXcgR2VuZXJpY1RhYmxlKHRoaXMsIHtcbiAgICB0YWJsZU5hbWU6IFwiU3BhY2VzVGFibGVcIixcbiAgICBwcmltYXJ5S2V5OiBcInNwYWNlSWRcIixcbiAgICBjcmVhdGVMYW1iZGFQYXRoOiBcIkNyZWF0ZVwiLFxuICAgIHJlYWRMYW1iZGFQYXRoOiBcIlJlYWRcIixcbiAgICB1cGRhdGVMYW1iZGFQYXRoOiBcIlVwZGF0ZVwiLFxuICAgICAgZGVsZXRlTGFtYmRhUGF0aDogXCJEZWxldGVcIixcbiAgICBzZWNvbmRhcnlJbmRleGVzOiBbXCJsb2NhdGlvblwiXSxcbiAgfSk7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGhlbGxvTGFtYmRhV2VicGFjayA9IG5ldyBMYW1iZGFGdW5jdGlvbih0aGlzLCBcImhlbGxvTGFtYmRhV2VicGFja1wiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoam9pbihfX2Rpcm5hbWUsIFwiLi5cIiwgXCJidWlsZFwiLCBcIm5vZGVIZWxsb0xhbWJkYVwiKSksXG4gICAgICBoYW5kbGVyOiBcIm5vZGVIZWxsb0xhbWJkYS5oYW5kbGVyXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBub2RlTGFtYmRhTm9kZUpzID0gbmV3IGF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgIFwiaGVsbG9MYW1iZGFOb2RqZXNcIixcbiAgICAgIHtcbiAgICAgICAgZW50cnk6IGpvaW4oX19kaXJuYW1lLCBcIi4uXCIsIFwic2VydmljZXNcIiwgXCJub2RlLWxhbWJkYVwiLCBcImhlbGxvLnRzXCIpLFxuICAgICAgICBoYW5kbGVyOiBcImhhbmRsZXJcIixcbiAgICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgczNMaXN0UG9saWN5ID0gbmV3IFBvbGljeVN0YXRlbWVudCgpO1xuICAgIHMzTGlzdFBvbGljeS5hZGRBY3Rpb25zKFwiczM6TGlzdEFsbE15QnVja2V0c1wiKTtcbiAgICBzM0xpc3RQb2xpY3kuYWRkUmVzb3VyY2VzKFwiKlwiKTtcbiAgICBub2RlTGFtYmRhTm9kZUpzLmFkZFRvUm9sZVBvbGljeShzM0xpc3RQb2xpY3kpO1xuXG4gICAgLy8gSGVsbG8gQXBpIExhbWJkYSBpbnRlZ3JhdGlvbjpcbiAgICBjb25zdCBIZWxsb0xhbWJkYUludGVncmF0aW9uID0gbmV3IExhbWJkYUludGVncmF0aW9uKG5vZGVMYW1iZGFOb2RlSnMpO1xuICAgIGNvbnN0IEhlbGxvTGFtYmRhUmVzb3VyY2UgPSB0aGlzLmFwaS5yb290LmFkZFJlc291cmNlKFwiaGVsbG9cIik7XG4gICAgSGVsbG9MYW1iZGFSZXNvdXJjZS5hZGRNZXRob2QoXCJHRVRcIiwgSGVsbG9MYW1iZGFJbnRlZ3JhdGlvbik7XG5cbiAgICAvLyBTcGFjZXMgQVBJIEludGVncmF0aW9uXG4gICAgY29uc3Qgc3BhY2VSZXNvdXJjZSA9IHRoaXMuYXBpLnJvb3QuYWRkUmVzb3VyY2UoXCJzcGFjZXNcIik7XG4gICAgc3BhY2VSZXNvdXJjZS5hZGRNZXRob2QoXCJQT1NUXCIsIHRoaXMuU3BhY2VzVGFibGUuY3JlYXRlTGFtYmRhSW50ZWdyYXRpb24pO1xuICAgIHNwYWNlUmVzb3VyY2UuYWRkTWV0aG9kKFwiR0VUXCIsIHRoaXMuU3BhY2VzVGFibGUucmVhZExhbWJkYUludGVncmF0aW9uKTtcbiAgICBzcGFjZVJlc291cmNlLmFkZE1ldGhvZChcIlBVVFwiLCB0aGlzLlNwYWNlc1RhYmxlLnVwZGF0ZUxhbWJkYUludGVncmF0aW9uKTtcbiAgICBzcGFjZVJlc291cmNlLmFkZE1ldGhvZChcIkRFTEVURVwiLCB0aGlzLlNwYWNlc1RhYmxlLmRlbGV0ZUxhbWJkYUludGVncmF0aW9uKTtcbiAgfVxufSJdfQ==