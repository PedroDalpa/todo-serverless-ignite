import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from "uuid";
import { document } from "../utils/dynamodbClient";

interface ICreateTodo {
  title: string;
  dead_line: string;
  user_id: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { dead_line, title } = JSON.parse(event.body) as ICreateTodo;

  const { user_id } = event.pathParameters;
  console.log(user_id);

  await document
    .put({
      TableName: "users_todos",
      Item: {
        id: uuid(),
        dead_line,
        title,
        done: false,
        user_id,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
