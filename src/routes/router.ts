import { Router } from 'express';
import { test } from '../controller/index.controller';
import { asyncErrorHandler, validate } from '../middlewares/error.middleware';
import { registerSchema } from '../validations/index.validation';

const router = Router();

router.get('/test', asyncErrorHandler(validate(registerSchema)), asyncErrorHandler(test));

export default router;
