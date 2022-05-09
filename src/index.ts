import { App } from './application/app';
import { ConfigService } from './config/config.service';
import { ApolloExpressServer } from './infrastructure/server/graphql.express';
import { OpenWeatherMapService } from './infrastructure/weather/openweathermap.service';

async function main() {
	const config = ConfigService.fromEnv();

	const weatherService = new OpenWeatherMapService(config);

	const app = App.create(config, weatherService);

	const server = ApolloExpressServer.create(app);

	const serverInfo = await server.listen({ port: config.get('server').port });

	console.log('Server ready at %s', serverInfo.url);
}

main();
