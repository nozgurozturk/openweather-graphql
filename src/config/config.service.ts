import { Config } from './config.interface';

export class ConfigService {
	private static instance: ConfigService;

	private constructor(private config: Config) {}

	public static getInstance(): ConfigService {
		if (!ConfigService.instance) {
			ConfigService.instance = ConfigService.fromEnv();
		}
		return ConfigService.instance;
	}

	public static fromEnv(): ConfigService {
		const {
			SERVER_PORT,
			GRAPHQL_SCHEMA_DIR,
			WEATHER_API_KEY,
			WEATHER_FORECAST_API_URL,
			WEATHER_LOCATION_API_URL,
		} = process.env;

		const config: Config = {
			server: {
				port: Number(SERVER_PORT) || 3000,
			},
			graphql: {
				schemaDir: GRAPHQL_SCHEMA_DIR || '',
			},
			weatherAPI: {
				apiKey: WEATHER_API_KEY || '',
				apiUrlForecast: WEATHER_FORECAST_API_URL || '',
				apiUrlLocation: WEATHER_LOCATION_API_URL || '',
			},
		};
		const configService = new ConfigService(config);
		this.instance = configService;

		return configService;
	}

	public get<TConfig extends Config, TKeyOfConfig extends keyof Config>(
		key: TKeyOfConfig,
	): TConfig[TKeyOfConfig] {
		const config = this.config[key];
		if (!config) {
			throw new Error(`Config key ${key} not found`);
		}

		return config as TConfig[TKeyOfConfig];
	}

	public set<TKeyOfConfig extends keyof Config>(
		key: TKeyOfConfig,
		val: Config[TKeyOfConfig],
	): Config {
		const config = this.config[key];
		if (!config) {
			throw new Error(`Config key ${key} not found`);
		}

		this.config[key] = val;

		return this.config;
	}
}
