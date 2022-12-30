"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;
const dbClient = new aws_sdk_1.DynamoDB.DocumentClient();
async function handler(event, context) {
    const result = {
        statusCode: 200,
        body: 'Hello from DynamoDB'
    };
    try {
        if (event.queryStringParameters) {
            if (PRIMARY_KEY in event.queryStringParameters) {
                result.body = await queryWithPrimaryPartition(event.queryStringParameters);
            }
            else {
                result.body = await queryWithSecondaryPartition(event.queryStringParameters);
            }
        }
        else {
            result.body = await scanTable();
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
async function scanTable() {
    const queryResponse = await dbClient.scan({
        TableName: TABLE_NAME,
    }).promise();
    return JSON.stringify(queryResponse.Items);
}
async function queryWithSecondaryPartition(queryParams) {
    const queryKey = Object.keys(queryParams)[0];
    const queryValue = queryParams[queryKey];
    const queryResponse = await dbClient.query({
        TableName: TABLE_NAME,
        IndexName: queryKey,
        KeyConditionExpression: "#zz = :zzzz",
        ExpressionAttributeNames: {
            "#zz": queryKey,
        },
        ExpressionAttributeValues: {
            ":zzzz": queryValue,
        },
    }).promise();
    return JSON.stringify(queryResponse.Items);
}
async function queryWithPrimaryPartition(queryParams) {
    const keyValue = queryParams[PRIMARY_KEY];
    const queryResponse = await dbClient.query({
        TableName: TABLE_NAME,
        KeyConditionExpression: "#zz = :zzzz",
        ExpressionAttributeNames: {
            "#zz": PRIMARY_KEY,
        },
        ExpressionAttributeValues: {
            ":zzzz": keyValue,
        },
    }).promise();
    return JSON.stringify(queryResponse.Items);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWtDO0FBSWxDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQzFDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO0FBQzVDLE1BQU0sUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUUvQyxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQTJCLEVBQUUsT0FBZ0I7SUFDaEUsTUFBTSxNQUFNLEdBQTBCO1FBQ2xDLFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLHFCQUFxQjtLQUM5QixDQUFBO0lBQ0QsSUFBSTtRQUNBLElBQUksS0FBSyxDQUFDLHFCQUFxQixFQUFFO1lBQzdCLElBQUksV0FBWSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtnQkFDL0MsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzVFO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSwyQkFBMkIsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5RTtTQUNKO2FBQU07WUFDSCxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sU0FBUyxFQUFFLENBQUM7U0FDbkM7S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtTQUMxQjtLQUNKO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDakIsQ0FBQztBQTZDUSwwQkFBTztBQTNDaEIsS0FBSyxVQUFVLFNBQVM7SUFDcEIsTUFBTSxhQUFhLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3RDLFNBQVMsRUFBRSxVQUFXO0tBQ3pCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUVELEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxXQUFzRDtJQUMvRixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxNQUFNLGFBQWEsR0FBRyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDdkMsU0FBUyxFQUFFLFVBQVc7UUFDdEIsU0FBUyxFQUFFLFFBQVE7UUFDbkIsc0JBQXNCLEVBQUUsYUFBYTtRQUNyQyx3QkFBd0IsRUFBRTtZQUN4QixLQUFLLEVBQUUsUUFBUTtTQUNoQjtRQUNELHlCQUF5QixFQUFFO1lBQ3pCLE9BQU8sRUFBRSxVQUFVO1NBQ3BCO0tBQ0YsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBR0QsS0FBSyxVQUFVLHlCQUF5QixDQUN0QyxXQUFzRDtJQUV0RCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBWSxDQUFDLENBQUM7SUFDM0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLFNBQVMsRUFBRSxVQUFXO1FBQ3RCLHNCQUFzQixFQUFFLGFBQWE7UUFDckMsd0JBQXdCLEVBQUU7WUFDeEIsS0FBSyxFQUFFLFdBQVk7U0FDcEI7UUFDRCx5QkFBeUIsRUFBRTtZQUN6QixPQUFPLEVBQUUsUUFBUTtTQUNsQjtLQUNGLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCIH0gZnJvbSAnYXdzLXNkaydcbmltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlFdmVudFF1ZXJ5U3RyaW5nUGFyYW1ldGVycywgQVBJR2F0ZXdheVByb3h5UmVzdWx0LCBDb250ZXh0IH0gZnJvbSAnYXdzLWxhbWJkYSdcblxuXG5jb25zdCBUQUJMRV9OQU1FID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRTtcbmNvbnN0IFBSSU1BUllfS0VZID0gcHJvY2Vzcy5lbnYuUFJJTUFSWV9LRVk7XG5jb25zdCBkYkNsaWVudCA9IG5ldyBEeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudCwgY29udGV4dDogQ29udGV4dCk6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PntcbiAgICBjb25zdCByZXN1bHQ6IEFQSUdhdGV3YXlQcm94eVJlc3VsdCA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiAnSGVsbG8gZnJvbSBEeW5hbW9EQidcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycykge1xuICAgICAgICAgICAgaWYgKFBSSU1BUllfS0VZISBpbiBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSBhd2FpdCBxdWVyeVdpdGhQcmltYXJ5UGFydGl0aW9uKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IGF3YWl0IHF1ZXJ5V2l0aFNlY29uZGFyeVBhcnRpdGlvbihldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSBhd2FpdCBzY2FuVGFibGUoKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJlc3VsdC5ib2R5ID0gZXJyb3IubWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2NhblRhYmxlKCkge1xuICAgIGNvbnN0IHF1ZXJ5UmVzcG9uc2UgPSBhd2FpdCBkYkNsaWVudC5zY2FuKHtcbiAgICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FISxcbiAgICB9KS5wcm9taXNlKClcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocXVlcnlSZXNwb25zZS5JdGVtcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHF1ZXJ5V2l0aFNlY29uZGFyeVBhcnRpdGlvbihxdWVyeVBhcmFtczogQVBJR2F0ZXdheVByb3h5RXZlbnRRdWVyeVN0cmluZ1BhcmFtZXRlcnMpIHtcbiAgY29uc3QgcXVlcnlLZXkgPSBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcylbMF07XG4gIGNvbnN0IHF1ZXJ5VmFsdWUgPSBxdWVyeVBhcmFtc1txdWVyeUtleV07XG4gIGNvbnN0IHF1ZXJ5UmVzcG9uc2UgPSBhd2FpdCBkYkNsaWVudC5xdWVyeSh7XG4gICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUhLFxuICAgICAgSW5kZXhOYW1lOiBxdWVyeUtleSxcbiAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IFwiI3p6ID0gOnp6enpcIixcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgICAgICBcIiN6elwiOiBxdWVyeUtleSxcbiAgICAgIH0sXG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgIFwiOnp6enpcIjogcXVlcnlWYWx1ZSxcbiAgICAgIH0sXG4gICAgfSkucHJvbWlzZSgpO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocXVlcnlSZXNwb25zZS5JdGVtcyk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gcXVlcnlXaXRoUHJpbWFyeVBhcnRpdGlvbihcbiAgcXVlcnlQYXJhbXM6IEFQSUdhdGV3YXlQcm94eUV2ZW50UXVlcnlTdHJpbmdQYXJhbWV0ZXJzXG4pIHtcbiAgY29uc3Qga2V5VmFsdWUgPSBxdWVyeVBhcmFtc1tQUklNQVJZX0tFWSFdO1xuICBjb25zdCBxdWVyeVJlc3BvbnNlID0gYXdhaXQgZGJDbGllbnQucXVlcnkoe1xuICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FISxcbiAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IFwiI3p6ID0gOnp6enpcIixcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgICAgICBcIiN6elwiOiBQUklNQVJZX0tFWSEsXG4gICAgICB9LFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICBcIjp6enp6XCI6IGtleVZhbHVlLFxuICAgICAgfSxcbiAgICB9KS5wcm9taXNlKCk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHF1ZXJ5UmVzcG9uc2UuSXRlbXMpO1xufVxuXG5cbmV4cG9ydCB7IGhhbmRsZXIgfSJdfQ==