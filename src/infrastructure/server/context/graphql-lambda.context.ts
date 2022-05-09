import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer';
import { GraphQLContext } from './graphql.context';

// TODO
export class GraphQLLambdaContextProvider {
	async use(c: LambdaContextFunctionParams): Promise<any> {
		return c;
	}
}
