export enum ForecastInterval {
	CURRENT = 'CURRENT',
	DAILY = 'DAILY',
	HOURLY = 'HOURLY',
}

export enum ForecastUnits {
	METRIC = 'METRIC',
	IMPERIAL = 'IMPERIAL',
}

interface Weather {
	name: string;
	description: string;
}

interface Planetary {
	sunrise: string;
	sunset: string;
}

interface Wind {
	speed: number;
	degree: number;
	gust?: number;
}

interface TemperatureDaily {
	day: number;
	min: number;
	max: number;
	night: number;
	evening: number;
	morning: number;
}

interface TemperatureHourly {
	feelsLike: number;
	current: number;
}

export type Temperature = TemperatureDaily | TemperatureHourly;

interface Location {
	city: string;
	lat: number;
	lon: number;
}

interface Forecast {
	date: string;
	weather: Weather;
	planetary: Planetary;
	wind: Wind;
	temperature: Temperature;
}

export interface ForecastResult {
	location: Location;
	forecasts: Forecast[];
	units: ForecastUnits;
}
