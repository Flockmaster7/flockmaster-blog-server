import fs from 'fs';
import Router from 'koa-router';

const router = new Router();

fs.readdirSync(__dirname).forEach((item) => {
	if (item != 'index.ts' && item != 'index.js') {
		let file = require('./' + item);
		router.use(file.routes());
	}
});

export default router;
