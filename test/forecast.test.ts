import { client } from './helpers/graphql';

const ISO_DATE_FORMAT =
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

describe('Forecast', () => {
	test('current weather forecast', async () => {
		const response = await getForecast({
			location: 'Amsterdam',
		});

		expect(response.forecast.location).toMatchObject({
			city: 'Europe/Amsterdam',
			lat: expect.any(Number),
			lon: expect.any(Number),
		});
		expect(response.forecast.units).toBe('METRIC');
		expect(response.forecast.forecasts[0]).toMatchObject({
			date: expect.stringMatching(ISO_DATE_FORMAT),
			weather: {
				name: expect.any(String),
				description: expect.any(String),
			},
			planetary: {
				sunrise: expect.stringMatching(ISO_DATE_FORMAT),
				sunset: expect.stringMatching(ISO_DATE_FORMAT),
			},
			temperature: {
				feelsLike: expect.any(Number),
				current: expect.any(Number),
			},
			wind: {
				speed: expect.any(Number),
				degree: expect.any(Number),
			},
		});
		expect(response.forecast.forecasts).toHaveLength(1);
	});

	test('hourly weather forecast', async () => {
		const response = await getForecast({
			location: 'Amsterdam',
			interval: ITForecastInterval.HOURLY,
		});

		expect(response.forecast.location).toMatchObject({
			city: 'Europe/Amsterdam',
			lat: expect.any(Number),
			lon: expect.any(Number),
		});
		expect(response.forecast.units).toBe('METRIC');
		expect(response.forecast.forecasts[0]).toMatchObject({
			date: expect.stringMatching(ISO_DATE_FORMAT),
			weather: {
				name: expect.any(String),
				description: expect.any(String),
			},
			planetary: {
				sunrise: null,
				sunset: null,
			},
			temperature: {
				feelsLike: expect.any(Number),
				current: expect.any(Number),
			},
			wind: {
				speed: expect.any(Number),
				degree: expect.any(Number),
			},
		});
		expect(response.forecast.forecasts).toHaveLength(48);
	});

	test('daily weather forecast', async () => {
		const response = await getForecast({
			location: 'Amsterdam',
			interval: ITForecastInterval.DAILY,
		});

		expect(response.forecast.location).toMatchObject({
			city: 'Europe/Amsterdam',
			lat: expect.any(Number),
			lon: expect.any(Number),
		});
		expect(response.forecast.units).toBe('METRIC');
		expect(response.forecast.forecasts[0]).toMatchObject({
			date: expect.stringMatching(ISO_DATE_FORMAT),
			weather: {
				name: expect.any(String),
				description: expect.any(String),
			},
			planetary: {
				sunrise: expect.stringMatching(ISO_DATE_FORMAT),
				sunset: expect.stringMatching(ISO_DATE_FORMAT),
			},
			temperature: {
				min: expect.any(Number),
				max: expect.any(Number),
				day: expect.any(Number),
				night: expect.any(Number),
				evening: expect.any(Number),
				morning: expect.any(Number),
			},
			wind: {
				speed: expect.any(Number),
				degree: expect.any(Number),
			},
		});
		expect(response.forecast.forecasts).toHaveLength(8);
	});

	test('weather forecast for given city name', async () => {
		const response = await getForecast({
			location: 'Berlin',
		});

		expect(response.forecast.location).toMatchObject({
			city: 'Europe/Berlin',
			lat: expect.any(Number),
			lon: expect.any(Number),
		});
	});
});

enum ITForecastInterval {
	CURRENT = 'CURRENT',
	DAILY = 'DAILY',
	HOURLY = 'HOURLY',
}

enum ITForecastUnits {
	METRIC = 'METRIC',
	IMPERIAL = 'IMPERIAL',
}

interface ITWeather {
	name: string;
	description: string;
}

interface ITPlanetary {
	sunrise: string;
	sunset: string;
}

interface ITWind {
	speed: number;
	degree: number;
	gust?: number;
}

interface ITTemperatureDaily {
	day: number;
	min: number;
	max: number;
	night: number;
	evening: number;
	morning: number;
}

interface ITTemperatureHourly {
	feelsLike: number;
	current: number;
}

type ITTemperature = ITTemperatureDaily | ITTemperatureHourly;

interface ITLocation {
	city: string;
	lat: number;
	lon: number;
}

interface ITForecast {
	date: string;
	weather: ITWeather;
	planetary: ITPlanetary;
	wind: ITWind;
	temperature: ITTemperature;
}

interface ITForecastResult {
	location: ITLocation;
	forecasts: ITForecast[];
	units: ITForecastUnits;
}

interface ITGetForecastQueryArgs {
	location: string;
	interval?: ITForecastInterval;
	units?: ITForecastUnits;
}

const LOCATION_FIELDS_FRAGMENT = `
fragment LocationFields on Location {
    city
    lat
    lon
}`;

const WIND_FIELDS_FRAGMENT = `
fragment WindFields on Wind {
    speed
    degree
}`;

const PLANETARY_FIELDS_FRAGMENT = `
fragment PlanetaryFields on Planetary {
    sunrise
    sunset
}`;

const WEATHER_FIELDS_FRAGMENT = `
fragment WeatherFields on Weather {
    name
    description
}`;

const FORECAST_FIELDS_FRAGMENT = `
fragment ForecastFields on Forecast {
    weather {
        ...WeatherFields
    }
    planetary {
        ...PlanetaryFields
    }
    temperature {
        ... on TemperatureHourly {
            current
            feelsLike
        }
        ... on TemperatureDaily {
            min
            max
            day
            night
            evening
            morning
        }        
    }
    wind {
        ...WindFields
    }
    date
}
    ${WEATHER_FIELDS_FRAGMENT}
    ${PLANETARY_FIELDS_FRAGMENT}
    ${WIND_FIELDS_FRAGMENT}
`;

const GET_FORECAST_QUERY = `
query Forecast($location: String!, $interval: ForecastInterval = CURRENT, $units: ForecastUnits = METRIC) {
    forecast(location: $location, interval: $interval, units: $units) {
        location {
            ...LocationFields
        }
        units
        forecasts {
            ...ForecastFields
        }
    }
}
${LOCATION_FIELDS_FRAGMENT}
${FORECAST_FIELDS_FRAGMENT}
`;

async function getForecast(params: ITGetForecastQueryArgs) {
	const response = await client.query<{ forecast: ITForecastResult }>(
		GET_FORECAST_QUERY,
		{
			location: params.location,
			interval: params.interval,
			units: params.units,
		},
	);

	return response;
}
