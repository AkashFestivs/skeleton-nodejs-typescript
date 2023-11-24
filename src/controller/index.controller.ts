import { NextFunction, Request, Response } from 'express';
import { getTestDataNew } from '../model/index.model';
import { CustomError } from '../utils/customError';
import { HTTP_STATUS } from '../constants/http.constants';
import { customResponseHandler } from '../middlewares/response.middleware';

export async function test(req: Request, res: Response, next: NextFunction) {
	const data = await getTestDataNew(2018);
	req.logger.info(data);

	if (data.length === 0) {
		throw new CustomError({
			moduleName: 'test2',
			status: HTTP_STATUS.NOT_FOUND,
			message: 'Not Found With id 1',
			error: 'error'
		});
	}

	return customResponseHandler(res, {
		status: HTTP_STATUS.OK,
		json: data
	});
}