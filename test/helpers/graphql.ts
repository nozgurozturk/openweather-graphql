import request from 'supertest';

let client: GraphQLClient;

const NotInitializedMessage =
	'\x1b[31m' + '!!! GraphQLClient is not initialized !!!' + '\x1b[0m';

type DefaultVariables = Record<string, unknown>;

interface QueryParams<V> {
	query: string;
	variables?: V;
}

class GraphQLClient {
	private constructor(private path: string) {}

	public static create(path: string) {
		if (!path) {
			throw new Error('Path is required');
		}
		if (client) {
			return client;
		}

		const _client = new GraphQLClient(path);
		client = _client;

		return client;
	}

	public async query<
		T = unknown,
		V extends DefaultVariables = DefaultVariables,
	>(query: string, variables?: V) {
		if (!this.isInitialized()) {
			throw new Error(NotInitializedMessage);
		}

		const params: QueryParams<V> = {
			query,
			variables,
		};

		const response = await request(this.path)
			.post('/')
			.set('Accept', 'application/json')
			.send(params);

		if (response.body.errors) {
			throw new Error(
				'\x1b[31m' + JSON.stringify(response.body.errors, null, 2) + '\x1b[0m',
			);
		}

		return response.body.data as T;
	}

	private isInitialized() {
		return !!client;
	}
}

export { GraphQLClient, client };
