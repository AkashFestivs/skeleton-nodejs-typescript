import { Response } from 'express';
import { ResponseOptions } from '../types';

export const customResponseHandler = (res: Response, options: ResponseOptions) => {
	const { status = 200, json } = options;

	return res.status(status).json(json);
};
