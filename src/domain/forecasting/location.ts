interface LocationArgs {
	city: string;
	lat: number;
	lon: number;
}

export class Location {
	private city: string;
	private lat: number;
	private lon: number;

	constructor({ city, lat, lon }: LocationArgs) {
		this.city = city;
		this.lat = lat;
		this.lon = lon;
	}

	getCity(): string {
		return this.city;
	}

	getCoordinates(): [number, number] {
		return [this.lat, this.lon];
	}

	setCoordinates(lat: number, lon: number): void {
		this.lat = lat;
		this.lon = lon;
	}
}
