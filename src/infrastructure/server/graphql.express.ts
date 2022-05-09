import { App } from '../../application/app';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import { loadTypedefsSync } from '@graphql-tools/load';
import { ApolloServer } from 'apollo-server';
import { ConfigService } from '../../config/config.service';
import {
	forecastResolver,
	temperatureTypeResolver,
} from '../delivery/graphql/forecast/forecast.resolver';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import { ApolloServerExpressConfig } from 'apollo-server-express';

export class ApolloExpressServer extends ApolloServer {
	private constructor(config: ApolloServerExpressConfig) {
		super(config);
	}

	static create(app: App): ApolloExpressServer {
		const config = ConfigService.getInstance();
		const graphqlConfig = config.get('graphql');

		const typeDefs = loadTypedefsSync(
			join(graphqlConfig.schemaDir, 'forecast.graphql'),
			{ loaders: [new GraphQLFileLoader()] },
		).map(({ document }) => document!);

		return new ApolloExpressServer({
			typeDefs,
			resolvers: {
				Temperature: temperatureTypeResolver(),
				Query: {
					forecast: forecastResolver(app.queries.forecastHandler),
				},
			},
			// context: (c) => new GraphQLExpressContextProvider().use(c),
			plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
		});
	}
}
