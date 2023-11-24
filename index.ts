import express, { Express } from 'express';
import router from './src/routes/router';
import { addRequestId, attachChildLogger, requestLogger } from './src/middlewares/logger.middleware';
import useragent from 'express-useragent';
import { customErrorHandler } from './src/middlewares/error.middleware';
import { redisClient } from './src/config/redis.config';

const app: Express = express();
const PORT = process.env.PORT;

redisClient.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(useragent.express());

// Request logger
app.use(addRequestId);
app.use(requestLogger);
app.use(attachChildLogger);

app.use("/auth", router);
app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});