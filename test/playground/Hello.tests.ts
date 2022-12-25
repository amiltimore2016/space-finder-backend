import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from '../../services/SpacesTable/Read';

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: 'e08a5b5a-de47-4ff8-adda-5c86d5ba47bb'
    }
} as any;

const result = handler(event, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(123)
});