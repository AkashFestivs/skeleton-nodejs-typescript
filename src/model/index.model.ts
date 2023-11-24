import { BrandData } from '../types';
import sql from '../config/postgres.config';

export function getTestDataNew(year: number) {
	return sql<BrandData[]>`SELECT * FROM public.brands WHERE year = ${year}`;
}
