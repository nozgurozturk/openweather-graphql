import { Planetary } from './planetary';
import { DailyTemperature, HourlyTemperature } from './temperature';
import { Weather } from './weather';
import { Wind } from './wind';

export class Forecast {
	date: Date;

	constructor(
		private wind: Wind,
		private planetary: Planetary,
		private temperature: DailyTemperature | HourlyTemperature,
		private weather: Weather,
	) {}

	getWind(): Wind {
		return this.wind;
	}

	getPlanetary(): Planetary {
		return this.planetary;
	}

	getTemperature(): DailyTemperature | HourlyTemperature {
		return this.temperature;
	}

	getWeather(): Weather {
		return this.weather;
	}
}

export class ForecastBuilder {
	private windHolder: Wind;
	private planetaryHolder: Planetary;
	private temperatureHolder: DailyTemperature | HourlyTemperature;
	private weatherHolder: Weather;

	withWind(wind: Wind): ForecastBuilder {
		this.windHolder = wind;
		return this;
	}

	withPlanetary(planetary: Planetary): ForecastBuilder {
		this.planetaryHolder = planetary;
		return this;
	}

	withTemperature(
		temperature: DailyTemperature | HourlyTemperature,
	): ForecastBuilder {
		this.temperatureHolder = temperature;
		return this;
	}

	withWeather(weather: Weather): ForecastBuilder {
		this.weatherHolder = weather;
		return this;
	}

	build(): Forecast {
		return new Forecast(
			this.windHolder,
			this.planetaryHolder,
			this.temperatureHolder,
			this.weatherHolder,
		);
	}
}
