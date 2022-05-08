import { Config } from '@jest/types';

async function globalSetup(
	globalConfig: Config.GlobalConfig,
	projectConfig: Config.ProjectConfig,
) {
	console.log('Setting up...');
}

export = globalSetup;
