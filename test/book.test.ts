import { client } from './helpers/graphql';

describe('E2E', () => {
	test('should work', () => {
		expect(client).toBeDefined();
	});
});
