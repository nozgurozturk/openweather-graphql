import { GraphQLClient } from './helpers/graphql';

beforeAll(() => {
	GraphQLClient.create(`http://localhost:${process.env.PORT ?? 3000}/`);
});
