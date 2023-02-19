import { CfnOutput } from 'aws-cdk-lib';
import { RestApi, CognitoUserPoolsAuthorizer } from 'aws-cdk-lib/aws-apigateway';
import { UserPool, UserPoolClient, CfnUserPoolGroup } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class AuthorizeWrapper {
    private scope: Construct;
    private api: RestApi;

    private userPool: UserPool;
    private UserPoolClient: UserPoolClient;
    public authorizer: CognitoUserPoolsAuthorizer;

    constructor(scope: Construct, api: RestApi) {
        this.scope = scope;
        this.api = api;
        this.initialize();
    }

    private initialize() {
        this.createUserPool();
        this.addUserPoolClient();
        this.createAuthorizer();
        this.createAdminsGroup();
    }

    private createUserPool() {
        this.userPool = new UserPool(this.scope, 'SpaceuserPool', {
            userPoolName: 'SpaceUserPool',
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        });
        new CfnOutput(this.scope, 'UserPoolId', {
            value: this.userPool.userPoolId
        });
    }

    private addUserPoolClient() {
        this.UserPoolClient = this.userPool.addClient('SpaceUserPool-client', {
            userPoolClientName: 'SpaceUserPool-client',
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userSrp: true
            },
            generateSecret: false

        });
        new CfnOutput(this.scope, 'UserPoolClientId', {
            value: this.UserPoolClient.userPoolClientId
        });
    }

    private createAuthorizer() {
        this.authorizer = new CognitoUserPoolsAuthorizer(this.scope, 'SpaceUserAuthorizer', {
            cognitoUserPools: [this.userPool],
            authorizerName: 'SpaceUserAuthorizer',
            identitySource: 'method.request.header.Authorization'
        })
        this.authorizer._attachToApi(this.api);
    }

    private createAdminsGroup() {
        new CfnUserPoolGroup(this.scope, 'admins', {
            groupName: 'admins',
            userPoolId: this.userPool.userPoolId
        });
    }
}