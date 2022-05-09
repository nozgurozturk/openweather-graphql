import { App } from '../../../../application/app';
import { GraphQLContext } from '../../../server/context/graphql.context';
import {
	ForecastInterval,
	ForecastResult,
	ForecastUnits,
	Temperature,
} from './forecast.interface';
import { ForecastMapper } from './forecast.mapper';

interface GetForecastArgs {
	location: string;
	interval: ForecastInterval;
	units: ForecastUnits;
}

export function forecastResolver(
	forecastHandler: App['queries']['forecastHandler'],
) {
	return async (
		_: any,
		args: GetForecastArgs,
		context: GraphQLContext,
	): Promise<ForecastResult> => {
		const { location, interval, units } = args;

		const forecast = await forecastHandler.handle({
			location: location,
			interval: interval?.toLowerCase(),
			units: units?.toLowerCase(),
		});

		return ForecastMapper.to(forecast);
	};
}

export function temperatureTypeResolver() {
	return {
		__resolveType(obj: Temperature, context: GraphQLContext, info: any) {
			if ('current' in obj) {
				return 'TemperatureHourly';
			}

			return 'TemperatureDaily';
		},
	};
}
