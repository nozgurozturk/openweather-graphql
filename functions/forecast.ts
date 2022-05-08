import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event, context) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			message: 'OpenWeatherMap API Gateway with TypeScript and AWS Lambda',
			input: event,
		}),
	};
	return response;
};
