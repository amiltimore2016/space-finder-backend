"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const aws_amplify_1 = require("aws-amplify");
const aws_amplify_2 = require("aws-amplify");
const config_1 = require("./config");
const AWS = require("aws-sdk");
aws_amplify_2.Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config_1.config.REGION,
        userPoolId: config_1.config.USER_POOL_ID,
        userPoolWebClientId: config_1.config.APP_CLIENT_ID,
        identityPoolId: config_1.config.IDENTITY_POOL_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});
class AuthService {
    async login(userName, password) {
        const user = await aws_amplify_1.Auth.signIn(userName, password);
        return user;
    }
    async getAWSTemporaryCreds(user) {
        const cognitoIdentityPool = `cognito-idp.${config_1.config.REGION}.amazonaws.com/${config_1.config.USER_POOL_ID}`;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config_1.config.IDENTITY_POOL_ID,
            Logins: {
                [cognitoIdentityPool]: user.getSignInUserSession().getIdToken().getJwtToken()
            }
        }, {
            region: config_1.config.REGION
        });
        await this.refreshCredentials();
    }
    async refreshCredentials() {
        return new Promise((resolve, reject) => {
            AWS.config.credentials.refresh(err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBdXRoU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBbUM7QUFDbkMsNkNBQXNDO0FBQ3RDLHFDQUFrQztBQUVsQywrQkFBK0I7QUFHL0IscUJBQU8sQ0FBQyxTQUFTLENBQUM7SUFDZCxJQUFJLEVBQUU7UUFDRixlQUFlLEVBQUUsS0FBSztRQUN0QixNQUFNLEVBQUUsZUFBTSxDQUFDLE1BQU07UUFDckIsVUFBVSxFQUFFLGVBQU0sQ0FBQyxZQUFZO1FBQy9CLG1CQUFtQixFQUFFLGVBQU0sQ0FBQyxhQUFhO1FBQ3pDLGNBQWMsRUFBRSxlQUFNLENBQUMsZ0JBQWdCO1FBQ3ZDLHNCQUFzQixFQUFFLG9CQUFvQjtLQUMvQztDQUNKLENBQUMsQ0FBQTtBQUVGLE1BQWEsV0FBVztJQUViLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtRQUNqRCxNQUFNLElBQUksR0FBRyxNQUFNLGtCQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQWdCLENBQUM7UUFDbEUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFpQjtRQUMvQyxNQUFNLG1CQUFtQixHQUFHLGVBQWUsZUFBTSxDQUFDLE1BQU0sa0JBQWtCLGVBQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQztZQUN4RCxjQUFjLEVBQUUsZUFBTSxDQUFDLGdCQUFnQjtZQUN2QyxNQUFNLEVBQUU7Z0JBQ0osQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRTthQUNqRjtTQUNKLEVBQUU7WUFDQyxNQUFNLEVBQUUsZUFBTSxDQUFDLE1BQU07U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU8sS0FBSyxDQUFDLGtCQUFrQjtRQUM1QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBMkIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDZDtxQkFBTTtvQkFDSCxPQUFPLEVBQUUsQ0FBQTtpQkFDWjtZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUEvQkQsa0NBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aCB9IGZyb20gJ2F3cy1hbXBsaWZ5JztcbmltcG9ydCB7IEFtcGxpZnkgfSBmcm9tICdhd3MtYW1wbGlmeSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBDb2duaXRvVXNlciB9IGZyb20gJ0Bhd3MtYW1wbGlmeS9hdXRoJztcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnYXdzLXNkay9saWIvY3JlZGVudGlhbHMnO1xuXG5BbXBsaWZ5LmNvbmZpZ3VyZSh7XG4gICAgQXV0aDoge1xuICAgICAgICBtYW5kYXRvcnlTaWduSW46IGZhbHNlLFxuICAgICAgICByZWdpb246IGNvbmZpZy5SRUdJT04sXG4gICAgICAgIHVzZXJQb29sSWQ6IGNvbmZpZy5VU0VSX1BPT0xfSUQsXG4gICAgICAgIHVzZXJQb29sV2ViQ2xpZW50SWQ6IGNvbmZpZy5BUFBfQ0xJRU5UX0lELFxuICAgICAgICBpZGVudGl0eVBvb2xJZDogY29uZmlnLklERU5USVRZX1BPT0xfSUQsXG4gICAgICAgIGF1dGhlbnRpY2F0aW9uRmxvd1R5cGU6ICdVU0VSX1BBU1NXT1JEX0FVVEgnXG4gICAgfVxufSlcblxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBhc3luYyBsb2dpbih1c2VyTmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBBdXRoLnNpZ25Jbih1c2VyTmFtZSwgcGFzc3dvcmQpIGFzIENvZ25pdG9Vc2VyO1xuICAgICAgICByZXR1cm4gdXNlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0QVdTVGVtcG9yYXJ5Q3JlZHModXNlcjogQ29nbml0b1VzZXIpIHtcbiAgICAgICAgY29uc3QgY29nbml0b0lkZW50aXR5UG9vbCA9IGBjb2duaXRvLWlkcC4ke2NvbmZpZy5SRUdJT059LmFtYXpvbmF3cy5jb20vJHtjb25maWcuVVNFUl9QT09MX0lEfWA7XG4gICAgICAgIEFXUy5jb25maWcuY3JlZGVudGlhbHMgPSBuZXcgQVdTLkNvZ25pdG9JZGVudGl0eUNyZWRlbnRpYWxzKHtcbiAgICAgICAgICAgIElkZW50aXR5UG9vbElkOiBjb25maWcuSURFTlRJVFlfUE9PTF9JRCxcbiAgICAgICAgICAgIExvZ2luczoge1xuICAgICAgICAgICAgICAgIFtjb2duaXRvSWRlbnRpdHlQb29sXTogdXNlci5nZXRTaWduSW5Vc2VyU2Vzc2lvbigpIS5nZXRJZFRva2VuKCkuZ2V0Snd0VG9rZW4oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdpb246IGNvbmZpZy5SRUdJT05cbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaENyZWRlbnRpYWxzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyByZWZyZXNoQ3JlZGVudGlhbHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgKEFXUy5jb25maWcuY3JlZGVudGlhbHMgYXMgQ3JlZGVudGlhbHMpLnJlZnJlc2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn0iXX0=