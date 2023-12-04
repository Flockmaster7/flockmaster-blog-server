import path from 'path';
// Koa业务
import Koa from 'koa';
import { koaBody } from 'koa-body';
import cors from 'koa2-cors'; // 跨域处理
// import parameter from 'koa-parameter';
// import koaStatic from 'koa-static';
import errHandler from './errHandler';
import router from '../router/index';
import { corsHandler } from '../middleware/cors';
import Result from '../utils/Result';
import { websiteVisit } from '../utils/Schedule';
// import sequelize from '../db/index';

const parameter = require('koa-parameter');
const koaStatic = require('koa-static');
const logger = require('koa-logger');
// 引入数据库
const sequelize = require('../db/mysql');
const redis = require('../db/redis');

// // 初始化模型
// sequelize.addModels([
// 	`${path.resolve(__dirname, '../model')}/*.ts`,
// 	`${path.resolve(__dirname, '../model')}/*.js`
// ]);

const app = new Koa();

// const { koaSwagger } = require('koa2-swagger-ui')
// const swagger = require('../config/swagger')

// require("babel-register");

// 添加全局异常处理
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (error: any) {
		console.error(error);
		ctx.status = error.statusCode || 500;
		ctx.body = new Result(500, '全局异常', 'error');
	}
});

// 日志
app.use(logger());

app.use(
	koaBody({
		multipart: true,
		formidable: {
			uploadDir: path.resolve(__dirname, '../static'),
			keepExtensions: true
		}
	})
);
// 可以通过路径访问静态资源
app.use(koaStatic(path.resolve(__dirname, '../static')));
// app.use(parameter(app))
parameter(app);

// swagger配置
// app.use(swagger.routes(), swagger.allowedMethods())
// app.use(koaSwagger({
//     routePrefix: '/swagger', // host at /swagger instead of default /docs
//     swaggerOptions: {
//       url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
//     },
// }))

app.use(router.routes());
app.use(router.allowedMethods());

// 跨域
app.use(cors(corsHandler));

app.on('error', errHandler);

// 执行定时任务
websiteVisit();

export default app;
