import { CognitoUser } from '@aws-amplify/auth';
export declare class AuthService {
    login(userName: string, password: string): Promise<CognitoUser>;
}
