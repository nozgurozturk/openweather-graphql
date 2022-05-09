import { Config } from '@jest/types';
import { App } from '../../src/application/app';
import { ConfigService } from '../../src/config/config.service';
import { ApolloExpressServer } from '../../src/infrastructure/server/graphql.express';
import { OpenWeatherMapService } from '../../src/infrastructure/weather/openweathermap.service';

async function globalSetup(
	globalConfig: Config.GlobalConfig,
	projectConfig: Config.ProjectConfig,
) {
	const config = ConfigService.fromEnv();

	const weatherService = new OpenWeatherMapService(config);

	const app = App.create(config, weatherService);

	const server = ApolloExpressServer.create(app);

	const serverInfo = await server.listen({ port: config.get('server').port });

	global.__TEST_SERVER__ = serverInfo.server;
}

export = globalSetup;
