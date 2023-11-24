// to make the file a module and avoid the TypeScript error
export {};

declare global {
	namespace Express {
		export interface Request {
			reqId: string;
			logger: {
				error: (...message: any[]) => void;
				info: (...message: any[]) => void;
				debug: (...message: any[]) => void;
				warn: (...message: any[]) => void;
			};
		}
	}
}
