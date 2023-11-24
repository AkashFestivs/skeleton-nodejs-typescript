import { HTTP_STATUS } from "../constants/http.constants";
import { CookieSerializeOptions } from 'cookie';

export type BrandData = {
    year: number;
    brand: string;
    amount: number;
};

export type ErrorObject = {
    message: string;
    moduleName: string;
    status: HTTP_STATUS;
    httpStatus?: number;
    error: any;
    errorObject?: any;
}

export type ResponseOptions = {
    status: HTTP_STATUS;
    json: any;
}

type CookieOptions = {
    name: string;
    value: string;
    options?: CookieSerializeOptions;
}