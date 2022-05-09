export interface Logger {
	debug(message: string): void;
	error(message: string): void;
	warn(message: string): void;
	info(message: string): void;
}
