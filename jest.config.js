module.exports = {
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/test/', '/.webpack/'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	verbose: true,
	coverageDirectory: '<rootDir>/coverage/',
	collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
	coverageReporters: ['lcov', 'text', 'text-summary'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	transform: {
		'^.+\\.(t|j)s?$': ['@swc/jest'],
	},
	roots: ['<rootDir>/src'],
};
