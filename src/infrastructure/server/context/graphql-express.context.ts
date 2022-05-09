import { Request, Response } from 'express';

// TODO
export class GraphQLExpressContextProvider {
	async use({ req, res }: { req: Request; res: Response }): Promise<any> {
		return { req, res };
	}
}
