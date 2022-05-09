import {
	WeatherService,
	WeatherServiceIntervals,
	WeatherServiceUnits,
} from './weather.interface';
import { WeatherAPIConfig } from '../../config/config.interface';
import got from 'got';
import { ConfigService } from '../../config/config.service';
import { Forecast } from './types/openweathermap';

interface OpenWeatherMapLocation {
	city: string;
	lat: number;
	lon: number;
	country: string;
	state: string;
}

export class OpenWeatherMapService extends WeatherService {
	private weatherAPIconfig: WeatherAPIConfig;
	// All members of WeatherServiceIntervals
	private intervals = Object.values(WeatherServiceIntervals);

	constructor(config: ConfigService) {
		super();
		this.weatherAPIconfig = config.get('weatherAPI');
	}

	private async getLocationByCityName(
		name: string,
	): Promise<OpenWeatherMapLocation[]> {
		const url = new URL(this.weatherAPIconfig.apiUrlLocation);
		url.searchParams.append('appid', this.weatherAPIconfig.apiKey);
		url.searchParams.append('q', name);

		return got.get(url.toString()).json<OpenWeatherMapLocation[]>();
	}

	async getForecasting(
		location: string,
		interval?: WeatherServiceIntervals,
		units?: WeatherServiceUnits,
	): Promise<Forecast> {
		const url = new URL(this.weatherAPIconfig.apiUrlForecast);

		const [loc] = await this.getLocationByCityName(location);
		if (!loc) {
			throw new Error(`Location ${location} not found`);
		}

		url.searchParams.append('appid', this.weatherAPIconfig.apiKey);
		url.searchParams.append('lat', loc.lat.toString());
		url.searchParams.append('lon', loc.lon.toString());
		url.searchParams.append('units', units || 'metric');

		if (interval) {
			const exclude = this.intervals.filter((i) => !interval);
			url.searchParams.append('exclude', exclude.join(','));
		}

		return got.get(url.toString()).json();
	}
}
