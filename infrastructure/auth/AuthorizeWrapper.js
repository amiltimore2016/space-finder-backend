"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeWrapper = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_cognito_1 = require("aws-cdk-lib/aws-cognito");
class AuthorizeWrapper {
    constructor(scope, api) {
        this.scope = scope;
        this.api = api;
        this.initialize();
    }
    initialize() {
        this.createUserPool();
        this.addUserPoolClient();
        this.createAuthorizer();
        this.createAdminsGroup();
    }
    createUserPool() {
        this.userPool = new aws_cognito_1.UserPool(this.scope, 'SpaceuserPool', {
            userPoolName: 'SpaceUserPool',
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        });
        new aws_cdk_lib_1.CfnOutput(this.scope, 'UserPoolId', {
            value: this.userPool.userPoolId
        });
    }
    addUserPoolClient() {
        this.UserPoolClient = this.userPool.addClient('SpaceUserPool-client', {
            userPoolClientName: 'SpaceUserPool-client',
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userSrp: true
            },
            generateSecret: false
        });
        new aws_cdk_lib_1.CfnOutput(this.scope, 'UserPoolClientId', {
            value: this.UserPoolClient.userPoolClientId
        });
    }
    createAuthorizer() {
        this.authorizer = new aws_apigateway_1.CognitoUserPoolsAuthorizer(this.scope, 'SpaceUserAuthorizer', {
            cognitoUserPools: [this.userPool],
            authorizerName: 'SpaceUserAuthorizer',
            identitySource: 'method.request.header.Authorization'
        });
        this.authorizer._attachToApi(this.api);
    }
    createAdminsGroup() {
        new aws_cognito_1.CfnUserPoolGroup(this.scope, 'admins', {
            groupName: 'admins',
            userPoolId: this.userPool.userPoolId
        });
    }
}
exports.AuthorizeWrapper = AuthorizeWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aG9yaXplV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkF1dGhvcml6ZVdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXdDO0FBQ3hDLCtEQUFpRjtBQUNqRix5REFBcUY7QUFHckYsTUFBYSxnQkFBZ0I7SUFRekIsWUFBWSxLQUFnQixFQUFFLEdBQVk7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLGNBQWM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHNCQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUU7WUFDdEQsWUFBWSxFQUFFLGVBQWU7WUFDN0IsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixhQUFhLEVBQUU7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLElBQUk7YUFDZDtTQUNKLENBQUMsQ0FBQztRQUNILElBQUksdUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRTtZQUNwQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO1NBQ2xDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRTtZQUNsRSxrQkFBa0IsRUFBRSxzQkFBc0I7WUFDMUMsU0FBUyxFQUFFO2dCQUNQLGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsY0FBYyxFQUFFLEtBQUs7U0FFeEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSx1QkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7WUFDMUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCO1NBQzlDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDJDQUEwQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUscUJBQXFCLEVBQUU7WUFDaEYsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2pDLGNBQWMsRUFBRSxxQkFBcUI7WUFDckMsY0FBYyxFQUFFLHFDQUFxQztTQUN4RCxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLGlCQUFpQjtRQUNyQixJQUFJLDhCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO1lBQ3ZDLFNBQVMsRUFBRSxRQUFRO1lBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7U0FDdkMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBbEVELDRDQWtFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFJlc3RBcGksIENvZ25pdG9Vc2VyUG9vbHNBdXRob3JpemVyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0IHsgVXNlclBvb2wsIFVzZXJQb29sQ2xpZW50LCBDZm5Vc2VyUG9vbEdyb3VwIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZ25pdG8nO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBBdXRob3JpemVXcmFwcGVyIHtcbiAgICBwcml2YXRlIHNjb3BlOiBDb25zdHJ1Y3Q7XG4gICAgcHJpdmF0ZSBhcGk6IFJlc3RBcGk7XG5cbiAgICBwcml2YXRlIHVzZXJQb29sOiBVc2VyUG9vbDtcbiAgICBwcml2YXRlIFVzZXJQb29sQ2xpZW50OiBVc2VyUG9vbENsaWVudDtcbiAgICBwdWJsaWMgYXV0aG9yaXplcjogQ29nbml0b1VzZXJQb29sc0F1dGhvcml6ZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBhcGk6IFJlc3RBcGkpIHtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVVzZXJQb29sKCk7XG4gICAgICAgIHRoaXMuYWRkVXNlclBvb2xDbGllbnQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVBdXRob3JpemVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQWRtaW5zR3JvdXAoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVVzZXJQb29sKCkge1xuICAgICAgICB0aGlzLnVzZXJQb29sID0gbmV3IFVzZXJQb29sKHRoaXMuc2NvcGUsICdTcGFjZXVzZXJQb29sJywge1xuICAgICAgICAgICAgdXNlclBvb2xOYW1lOiAnU3BhY2VVc2VyUG9vbCcsXG4gICAgICAgICAgICBzZWxmU2lnblVwRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25JbkFsaWFzZXM6IHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLnNjb3BlLCAnVXNlclBvb2xJZCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnVzZXJQb29sLnVzZXJQb29sSWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRVc2VyUG9vbENsaWVudCgpIHtcbiAgICAgICAgdGhpcy5Vc2VyUG9vbENsaWVudCA9IHRoaXMudXNlclBvb2wuYWRkQ2xpZW50KCdTcGFjZVVzZXJQb29sLWNsaWVudCcsIHtcbiAgICAgICAgICAgIHVzZXJQb29sQ2xpZW50TmFtZTogJ1NwYWNlVXNlclBvb2wtY2xpZW50JyxcbiAgICAgICAgICAgIGF1dGhGbG93czoge1xuICAgICAgICAgICAgICAgIGFkbWluVXNlclBhc3N3b3JkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGN1c3RvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1c2VyU3JwOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2VuZXJhdGVTZWNyZXQ6IGZhbHNlXG5cbiAgICAgICAgfSk7XG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcy5zY29wZSwgJ1VzZXJQb29sQ2xpZW50SWQnLCB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5Vc2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQXV0aG9yaXplcigpIHtcbiAgICAgICAgdGhpcy5hdXRob3JpemVyID0gbmV3IENvZ25pdG9Vc2VyUG9vbHNBdXRob3JpemVyKHRoaXMuc2NvcGUsICdTcGFjZVVzZXJBdXRob3JpemVyJywge1xuICAgICAgICAgICAgY29nbml0b1VzZXJQb29sczogW3RoaXMudXNlclBvb2xdLFxuICAgICAgICAgICAgYXV0aG9yaXplck5hbWU6ICdTcGFjZVVzZXJBdXRob3JpemVyJyxcbiAgICAgICAgICAgIGlkZW50aXR5U291cmNlOiAnbWV0aG9kLnJlcXVlc3QuaGVhZGVyLkF1dGhvcml6YXRpb24nXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXV0aG9yaXplci5fYXR0YWNoVG9BcGkodGhpcy5hcGkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQWRtaW5zR3JvdXAoKSB7XG4gICAgICAgIG5ldyBDZm5Vc2VyUG9vbEdyb3VwKHRoaXMuc2NvcGUsICdhZG1pbnMnLCB7XG4gICAgICAgICAgICBncm91cE5hbWU6ICdhZG1pbnMnLFxuICAgICAgICAgICAgdXNlclBvb2xJZDogdGhpcy51c2VyUG9vbC51c2VyUG9vbElkXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=