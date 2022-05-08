import { Server } from 'http';

declare global {
	var __TEST_SERVER__: ?Server;
}
