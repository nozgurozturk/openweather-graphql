import { ForecastResult as Result } from '../../../../application/query/forecast.handler';
import { ForecastResult as GQL, ForecastUnits } from './forecast.interface';

export class ForecastMapper {
	static to(forecast: Result): GQL {
		const { location, units, forecasts } = forecast;

		const coordinates = location.getCoordinates();
		return {
			location: {
				city: location.getCity(),
				lat: coordinates[0],
				lon: coordinates[1],
			},
			units: units.toUpperCase() as ForecastUnits,
			forecasts: forecasts.map((f) => {
				const date = f.date.toISOString();
				const weather = f.getWeather();
				const wind = f.getWind();
				const planetary = f.getPlanetary();
				const temperature = f.getTemperature();

				return {
					date,
					weather,
					wind,
					planetary: {
						sunrise: planetary?.sunrise.toISOString(),
						sunset: planetary?.sunset.toISOString(),
					},
					temperature,
				};
			}),
		};
	}
}
