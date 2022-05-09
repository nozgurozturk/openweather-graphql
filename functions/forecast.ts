import { App } from '../src/application/app';
import { ConfigService } from '../src/config/config.service';
import { withLogger } from '../src/infrastructure/logger/logger.decorator';
import { ApolloLambdaServer } from '../src/infrastructure/server/graphql.lambda';
import { OpenWeatherMapService } from '../src/infrastructure/weather/openweathermap.service';

const baseHandler = () => {
	const config = ConfigService.fromEnv();

	const weatherService = new OpenWeatherMapService(config);

	const app = App.create(config, weatherService);

	const server = ApolloLambdaServer.create(app);

	return server.createHandler();
};

const handler = withLogger(baseHandler());
export { handler };
