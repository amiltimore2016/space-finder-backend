import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from '../../services/SpacesTable/Delete';

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: '8f052ce4-95a3-42fd-b85c-bd80541fd02e'
  }
} as any;

const result = handler(event, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(123)
});