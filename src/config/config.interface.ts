export interface ServerConfig {
	port: number;
}

export interface GraphqlConfig {
	schemaDir: string;
}

export interface WeatherAPIConfig {
	apiKey: string;
	apiUrlForecast: string;
	apiUrlLocation: string;
}

export interface Config {
	server: ServerConfig;
	graphql: GraphqlConfig;
	weatherAPI: WeatherAPIConfig;
}
