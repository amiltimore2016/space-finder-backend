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
    const spaceId = event.queryStringParameters?.[PRIMARY_KEY];
    if (spaceId) {
        const deleteResult = await dbClient.delete({
            TableName: TABLE_NAME,
            Key: {
                [PRIMARY_KEY]: spaceId
            }
        }).promise();
        result.body = JSON.stringify(deleteResult);
    }
    return result;
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFrQztBQUlsQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQW9CLENBQUM7QUFDcEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFxQixDQUFDO0FBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUUvQyxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQTJCLEVBQUUsT0FBZ0I7SUFDaEUsTUFBTSxNQUFNLEdBQTBCO1FBQ2xDLFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLHFCQUFxQjtLQUM5QixDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFM0QsSUFBSSxPQUFPLEVBQUU7UUFDVCxNQUFNLFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDdkMsU0FBUyxFQUFFLFVBQVU7WUFDckIsR0FBRyxFQUFFO2dCQUNELENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTzthQUN6QjtTQUNKLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNiLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2pCLENBQUM7QUFFUSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCIH0gZnJvbSAnYXdzLXNkaydcbmltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQsIENvbnRleHQgfSBmcm9tICdhd3MtbGFtYmRhJ1xuXG5cbmNvbnN0IFRBQkxFX05BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIGFzIHN0cmluZztcbmNvbnN0IFBSSU1BUllfS0VZID0gcHJvY2Vzcy5lbnYuUFJJTUFSWV9LRVkgYXMgc3RyaW5nO1xuY29uc3QgZGJDbGllbnQgPSBuZXcgRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQsIGNvbnRleHQ6IENvbnRleHQpOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD57XG4gICAgY29uc3QgcmVzdWx0OiBBUElHYXRld2F5UHJveHlSZXN1bHQgPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogJ0hlbGxvIGZyb20gRHluYW1vREInXG4gICAgfVxuXG4gICAgY29uc3Qgc3BhY2VJZCA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycz8uW1BSSU1BUllfS0VZXTtcblxuICAgIGlmIChzcGFjZUlkKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZVJlc3VsdCA9IGF3YWl0IGRiQ2xpZW50LmRlbGV0ZSh7XG4gICAgICAgICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgICAgICAgICBLZXk6IHtcbiAgICAgICAgICAgICAgICBbUFJJTUFSWV9LRVldOiBzcGFjZUlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnByb21pc2UoKTtcbiAgICAgICAgcmVzdWx0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShkZWxldGVSZXN1bHQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IHsgaGFuZGxlciB9Il19