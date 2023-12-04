import { Context } from 'koa';
import { ErrorReturnType } from '../types/error';
const errHandler = <T>(err: ErrorReturnType<T>, ctx: Context, error: any) => {
	if (error) console.error(err.message, error);
	let status = 500;
	switch (err.code) {
		case '10001':
			status = 400;
			break;
		case '10002':
			status = 409;
			break;
		case '10006':
			status = 400;
		default:
			status = 500;
			break;
	}
	ctx.body = err;
	ctx.status = status;
};
export default errHandler;
