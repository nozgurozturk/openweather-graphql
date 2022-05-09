import {
	APIGatewayProxyHandler,
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Context,
	Callback,
} from 'aws-lambda';
import { logger } from './logger';

export const withLogger =
	(handler: APIGatewayProxyHandler) =>
	(
		event: APIGatewayProxyEvent,
		context: Context,
		callback: Callback<APIGatewayProxyResult>,
	) => {
		const log = logger.child({
			event: event.body,
			context: context,
			headers: event.headers,
			functionName: context.functionName,
			awsRequestId: context.awsRequestId,
			traceId: process.env._X_AMZN_TRACE_ID,
		});
		log.info('Starting request');

		return handler(event, context, callback);
	};
