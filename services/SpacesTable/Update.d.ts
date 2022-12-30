import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
declare function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>;
export { handler };
