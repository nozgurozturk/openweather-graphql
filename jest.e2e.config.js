module.exports = {
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/src/', '/.webpack/'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	verbose: true,
	transform: {
		'^.+\\.(t|j)s?$': ['@swc/jest'],
	},
	roots: ['<rootDir>/test'],
	setupFilesAfterEnv: ['./test/suite.ts'],
	globalSetup: './test/config/globalSetup.ts',
	globalTeardown: './test/config/globalTeardown.ts',
};
