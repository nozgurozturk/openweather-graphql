export enum WeatherServiceUnits {
	METRIC = 'metric',
	IMPERIAL = 'imperial',
}

export enum WeatherServiceIntervals {
	CURRENT = 'current',
	DAILY = 'daily',
	HOURLY = 'hourly',
}

export abstract class WeatherService {
	abstract getForecasting(
		location: string,
		interval?: WeatherServiceIntervals,
		units?: WeatherServiceUnits,
	): Promise<unknown>;
}
