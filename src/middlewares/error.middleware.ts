import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/customError';
import { AnyZodObject, ZodError } from 'zod';
import { logger } from '../config/logger';

export const customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	req.logger.error(err);

	if (err instanceof CustomError) {
		return res
			.status(err.httpStatus)
			.json({ error: err.message, status: err.status, code: err.httpStatus, object: err.errorObject });
	} else {
		return res.status(500).json({ error: 'Internal Server Error', status: 500 });
	}
};

// Custom async error handler middleware
export const asyncErrorHandler =
	(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};

export const validate =
	(schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params
			});
			return next();
		} catch (error) {
            logger.error(error);
            if (error instanceof ZodError) {
                throw new CustomError({
                    moduleName: 'validate',
                    status: 400,
                    message: error.issues[0].message,
                    error: error,
                    errorObject: error.issues
                });
            } else {
                throw new CustomError({
                    moduleName: 'validate',
                    status: 400,
                    message: "validation error",
                    error: error
                });
            }
		}
	};
