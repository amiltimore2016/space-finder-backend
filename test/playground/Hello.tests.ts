import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from '../../services/SpacesTable/Create';

const event: APIGatewayProxyEvent = {
  body: {
    name: "someName",
    location: "someLocation",
  },
} as any;

const result = handler(event, {} as any).then((apiResult) => {
    console.log(typeof apiResult);
    console.log(apiResult);
    const items = apiResult.body
    console.log(123)
});