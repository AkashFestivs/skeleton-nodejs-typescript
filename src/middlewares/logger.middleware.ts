import { logger } from '../config/logger';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import expressWinston from 'express-winston';

export const addRequestId = (req: Request, res: Response, next: NextFunction) => {
	req.reqId = randomUUID();
	next();
};

export const requestLogger = expressWinston.logger({
	winstonInstance: logger,
	meta: true, // Log metadata such as req.url, req.method, etc.
	msg: 'HTTP {{req.method}} {{req.url}}',
	expressFormat: true,
	colorize: true, // Disable colorization if you want plain text logs
	dynamicMeta: (req: Request, res: Response) => {
		return {
			requestId: req.reqId
		};
	}
});
export const attachChildLogger = (req: Request, res: Response, next: NextFunction) => {
	req.logger = logger.child({ requestId: req.reqId });
	next();
};
