import { Context } from 'koa';
import { ErrorReturnType } from '../types/error';
const errHandler = <T>(err: ErrorReturnType<T>, ctx: Context, error?: any) => {
	if (error) console.error(err.message, error);
	let status = 500;
	switch (err.code) {
		case '10002':
			status = 403;
			break;
		case '10101':
			status = 401;
			break;
		case '10102':
			status = 401;
			break;
		case '11111':
			status = 400;
			break;
		default:
			status = 500;
			break;
	}
	ctx.body = err;
	ctx.status = status;
};
export default errHandler;
