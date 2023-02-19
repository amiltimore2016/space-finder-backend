"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const Utils_1 = require("../Shared/Utils");
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;
const dbClient = new aws_sdk_1.DynamoDB.DocumentClient();
async function handler(event, context) {
    const result = {
        statusCode: 200,
        body: 'Hello from DynamoDB'
    };
    try {
        const requestBody = (0, Utils_1.getEventBody)(event);
        const spaceId = event.queryStringParameters?.[PRIMARY_KEY];
        if (requestBody && spaceId) {
            const requestBodyKey = Object.keys(requestBody)[0];
            const requestBodyValue = requestBody[requestBodyKey];
            const udpateResult = await dbClient.update({
                TableName: TABLE_NAME,
                Key: {
                    [PRIMARY_KEY]: spaceId
                },
                UpdateExpression: 'set #zzzNew = :new',
                ExpressionAttributeValues: {
                    ':new': requestBodyValue
                },
                ExpressionAttributeNames: {
                    '#zzzNew': requestBodyKey
                },
                ReturnValues: 'UPDATED_NEW'
            }).promise();
            result.body = JSON.stringify(udpateResult);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            result.body = error.message;
        }
    }
    return result;
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVXBkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFrQztBQUVsQywyQ0FBK0M7QUFHL0MsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFvQixDQUFDO0FBQ3BELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBcUIsQ0FBQztBQUN0RCxNQUFNLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFL0MsS0FBSyxVQUFVLE9BQU8sQ0FBQyxLQUEyQixFQUFFLE9BQWdCO0lBQ2hFLE1BQU0sTUFBTSxHQUEwQjtRQUNsQyxVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxxQkFBcUI7S0FDOUIsQ0FBQTtJQUVELElBQUk7UUFDQSxNQUFNLFdBQVcsR0FBRyxJQUFBLG9CQUFZLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFM0QsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQ3hCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFckQsTUFBTSxZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUN2QyxTQUFTLEVBQUUsVUFBVTtnQkFDckIsR0FBRyxFQUFFO29CQUNELENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTztpQkFDekI7Z0JBQ0QsZ0JBQWdCLEVBQUUsb0JBQW9CO2dCQUN0Qyx5QkFBeUIsRUFBRTtvQkFDdkIsTUFBTSxFQUFFLGdCQUFnQjtpQkFDM0I7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3RCLFNBQVMsRUFBRSxjQUFjO2lCQUM1QjtnQkFDRCxZQUFZLEVBQUUsYUFBYTthQUM5QixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFYixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUM7S0FDQTtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUMvQjtLQUNKO0lBQ0wsT0FBTyxNQUFNLENBQUE7QUFDakIsQ0FBQztBQUVRLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tICdhd3Mtc2RrJ1xuaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCwgQ29udGV4dCB9IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQgeyBnZXRFdmVudEJvZHkgfSBmcm9tIFwiLi4vU2hhcmVkL1V0aWxzXCI7XG5cblxuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUUgYXMgc3RyaW5nO1xuY29uc3QgUFJJTUFSWV9LRVkgPSBwcm9jZXNzLmVudi5QUklNQVJZX0tFWSBhcyBzdHJpbmc7XG5jb25zdCBkYkNsaWVudCA9IG5ldyBEeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudCwgY29udGV4dDogQ29udGV4dCk6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PntcbiAgICBjb25zdCByZXN1bHQ6IEFQSUdhdGV3YXlQcm94eVJlc3VsdCA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiAnSGVsbG8gZnJvbSBEeW5hbW9EQidcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IGdldEV2ZW50Qm9keShldmVudCk7XG4gICAgICAgIGNvbnN0IHNwYWNlSWQgPSBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnM/LltQUklNQVJZX0tFWV07XG5cbiAgICAgICAgaWYgKHJlcXVlc3RCb2R5ICYmIHNwYWNlSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5S2V5ID0gT2JqZWN0LmtleXMocmVxdWVzdEJvZHkpWzBdO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdEJvZHlWYWx1ZSA9IHJlcXVlc3RCb2R5W3JlcXVlc3RCb2R5S2V5XTtcblxuICAgICAgICAgICAgY29uc3QgdWRwYXRlUmVzdWx0ID0gYXdhaXQgZGJDbGllbnQudXBkYXRlKHtcbiAgICAgICAgICAgICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgS2V5OiB7XG4gICAgICAgICAgICAgICAgICAgIFtQUklNQVJZX0tFWV06IHNwYWNlSWRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFVwZGF0ZUV4cHJlc3Npb246ICdzZXQgI3p6ek5ldyA9IDpuZXcnLFxuICAgICAgICAgICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgJzpuZXcnOiByZXF1ZXN0Qm9keVZhbHVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgJyN6enpOZXcnOiByZXF1ZXN0Qm9keUtleVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUmV0dXJuVmFsdWVzOiAnVVBEQVRFRF9ORVcnXG4gICAgICAgICAgICB9KS5wcm9taXNlKCk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkodWRwYXRlUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCB7IGhhbmRsZXIgfSJdfQ==