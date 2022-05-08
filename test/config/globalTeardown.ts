import { Config } from '@jest/types';

async function globalTearDown(
	globalConfig: Config.GlobalConfig,
	projectConfig: Config.ProjectConfig,
) {
	console.log('Tearing down...');
}

export = globalTearDown;
