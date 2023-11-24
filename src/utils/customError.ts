import { ErrorObject } from '../types';
import { HTTP_STATUS } from '../constants/http.constants';

export class CustomError extends Error {
	moduleName: string;
	status: string;
	httpStatus: HTTP_STATUS;
	date?: Date;
	error: any;
    errorObject?: any;

	constructor(err: ErrorObject) {
		super(err.message);
		this.name = 'CustomError';
		this.moduleName = err.moduleName;
		this.status = HTTP_STATUS[err.status];
		this.httpStatus = err.status;
		this.date = new Date();
		this.error = err.error;
		this.error = err.errorObject;
	}
}
