"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const s3Client = new aws_sdk_1.S3();
async function handler(event, context) {
    if (isAuthorized(event)) {
        return {
            statusCode: 200,
            body: JSON.stringify('you are authorized')
        };
    }
    else {
        return {
            statusCode: 401,
            body: JSON.stringify('you are not authorized')
        };
    }
}
exports.handler = handler;
function isAuthorized(event) {
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return groups.includes('admins');
    }
    else {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWxsby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBNkI7QUFHN0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFFLEVBQUUsQ0FBQztBQUUxQixLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQVUsRUFBRSxPQUFZO0lBRTNDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1NBQzdDLENBQUE7S0FDSjtTQUFNO1FBQ0gsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUM7U0FDakQsQ0FBQTtLQUNKO0FBQ0wsQ0FBQztBQVdRLDBCQUFPO0FBVGhCLFNBQVMsWUFBWSxDQUFDLEtBQTJCO0lBQzdDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pFLElBQUksTUFBTSxFQUFFO1FBQ1IsT0FBUSxNQUFpQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUMvQztTQUFNO1FBQ0gsT0FBTyxLQUFLLENBQUE7S0FDZjtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTMyB9IGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQgfSBmcm9tICdhd3MtbGFtYmRhJztcblxuY29uc3QgczNDbGllbnQgPSBuZXcgUzMoKTtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogYW55LCBjb250ZXh0OiBhbnkpIHtcblxuICAgIGlmIChpc0F1dGhvcml6ZWQoZXZlbnQpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgneW91IGFyZSBhdXRob3JpemVkJylcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiA0MDEsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgneW91IGFyZSBub3QgYXV0aG9yaXplZCcpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQXV0aG9yaXplZChldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQpIHtcbiAgICBjb25zdCBncm91cHMgPSBldmVudC5yZXF1ZXN0Q29udGV4dC5hdXRob3JpemVyPy5jbGFpbXNbJ2NvZ25pdG86Z3JvdXBzJ107XG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgICByZXR1cm4gKGdyb3VwcyBhcyBzdHJpbmcpLmluY2x1ZGVzKCdhZG1pbnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IHsgaGFuZGxlciB9XG4iXX0=