import { ConfigService } from '../config/config.service';
import { WeatherService } from '../infrastructure/weather/weather.interface';
import {
	ForecastHandler,
	ForecastQuery,
	ForecastResult,
} from './query/forecast.handler';

interface Handler<T, R> {
	handle(query: T): Promise<R>;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Commands { }
interface Queries {
	forecastHandler: Handler<ForecastQuery, ForecastResult>;
}

export class App {
	public commands: Commands;
	public queries: Queries;

	private constructor(
		private configService: ConfigService,
		private weatherService: WeatherService,
	) {
		this.commands = {};
		this.queries = {
			forecastHandler: new ForecastHandler(this.weatherService),
		};
	}

	static create(
		configService: ConfigService,
		weatherService: WeatherService,
	): App {
		return new App(configService, weatherService);
	}
}
