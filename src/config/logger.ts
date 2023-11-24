import winston from 'winston';

// Define log levels and colors
const logLevels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3
};

const logColors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	debug: 'blue'
};

// Create a Winston logger
const logger = winston.createLogger({
	levels: logLevels,
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), winston.format.simple())
		}),
		new winston.transports.File({
			level: 'error',
			filename: process.env.LOG_DIR + 'error.log',
			maxsize: 5 * 1024 * 1024, // 5MB
			maxFiles: 5
		}),
		new winston.transports.File({
			level: 'info',
			filename: process.env.LOG_DIR + 'info.log',
			maxsize: 5 * 1024 * 1024, // 5MB
			maxFiles: 5
		})
	]
});

// Add colors to the logger
winston.addColors(logColors);

export { logger };
