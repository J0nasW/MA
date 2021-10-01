import { NextFunction, Request, Response } from 'express';

import { Container } from '../../models/container.model';

export const find = (req: Request, res: Response, next: NextFunction) => {
	// If a query string ?publicAddress=... is given, then filter results
	const whereClause =
		req.query && req.query.id
			? {
					where: { id: req.query.id },
			  }
			: undefined;

	return Container.findAll(whereClause)
		.then((container: Container[]) => res.json(container))
		.catch(next);
};

export const create = (req: Request, res: Response, next: NextFunction) =>
Container.create(req.body)
		.then((container: Container) => res.json(container))
		.catch(next);