import { Forecast, ForecastBuilder } from '../../domain/forecasting/forecast';
import {
	WeatherService,
	WeatherServiceIntervals,
	WeatherServiceUnits,
} from '../../infrastructure/weather/weather.interface';
import {
	Forecast as OWMForecast,
	Daily,
	Current,
} from '../../infrastructure/weather/types/openweathermap';
import { Location } from '../../domain/forecasting/location';

export interface ForecastQuery {
	location: string;
	interval?: string;
	units?: string;
}

export interface ForecastResult {
	location: Location;
	units: string;
	forecasts: Forecast[];
}

export class ForecastHandler {
	constructor(private weatherService: WeatherService) { }

	async handle(query: ForecastQuery): Promise<ForecastResult> {
		const {
			location: locQuery,
			interval = WeatherServiceIntervals.CURRENT,
			units: locUnits = WeatherServiceUnits.METRIC,
		} = query;

		const forecast = (await this.weatherService.getForecasting(
			locQuery,
			interval as WeatherServiceIntervals,
			locUnits as WeatherServiceUnits,
		)) as OWMForecast;

		const location = new Location({
			city: forecast.timezone,
			lat: forecast.lat,
			lon: forecast.lon,
		});

		const units = query.units ?? 'metric';

		const _interval = interval as WeatherServiceIntervals;

		const list =
			_interval === WeatherServiceIntervals.CURRENT
				? [forecast[_interval]]
				: forecast[_interval];

		const forecasts = list.map((f) => {
			const builder = new ForecastBuilder();

			builder.withWeather({
				name: f.weather[0].main,
				description: f.weather[0].description,
			});

			builder.withWind({
				speed: f.wind_speed,
				degree: f.wind_deg,
				gust: f.wind_gust,
			});

			if (f.sunrise && f.sunset) {
				builder.withPlanetary({
					sunrise: new Date(f.sunrise * 1000),
					sunset: new Date(f.sunset * 1000),
				});
			}

			if (this.isHourly(f)) {
				builder.withTemperature({
					current: f.temp,
					feelsLike: f.feels_like,
				});
			}

			if (this.isDaily(f)) {
				builder.withTemperature({
					min: f.temp.min,
					max: f.temp.max,
					day: f.temp.day,
					evening: f.temp.eve,
					night: f.temp.night,
					morning: f.temp.morn,
				});
			}

			const forecast = builder.build();
			forecast.date = new Date(f.dt * 1000);

			return forecast;
		});

		return {
			location,
			units,
			forecasts,
		};
	}

	private isHourly(f: Current | Daily): f is Current {
		return typeof f.temp === 'number';
	}

	private isDaily(f: Current | Daily): f is Daily {
		return typeof f.temp === 'object';
	}
}
