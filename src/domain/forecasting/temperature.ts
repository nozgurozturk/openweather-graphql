export interface HourlyTemperature {
	current: number;
	feelsLike: number;
}

export interface DailyTemperature {
	min: number;
	max: number;
	day: number;
	night: number;
	evening: number;
	morning: number;
}
