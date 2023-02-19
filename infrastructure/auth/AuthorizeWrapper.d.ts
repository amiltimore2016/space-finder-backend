import { RestApi, CognitoUserPoolsAuthorizer } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
export declare class AuthorizeWrapper {
    private scope;
    private api;
    private userPool;
    private UserPoolClient;
    authorizer: CognitoUserPoolsAuthorizer;
    constructor(scope: Construct, api: RestApi);
    private initialize;
    private createUserPool;
    private addUserPoolClient;
    private createAuthorizer;
    private createAdminsGroup;
}
