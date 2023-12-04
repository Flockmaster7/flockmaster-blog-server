import { Sequelize } from 'sequelize-typescript';
import processEnv from '../config/config.default';
import path from 'path';

const {
	MYSQL_DB,
	MYSQL_HOST,
	MYSQL_USER,
	MYSQL_PWD,
	MYSQL_SERVICE_USER,
	MYSQL_SERVICE_PWD,
	MYSQL_SERVICE_DB,
	MYSQL_SERVICE_HOST,
	NODE_ENV
} = processEnv;

// 本地数据库
const sequelize =
	NODE_ENV === 'development'
		? // 本地数据库
		  new Sequelize(MYSQL_DB as string, MYSQL_USER as string, MYSQL_PWD, {
				host: MYSQL_HOST,
				dialect: 'mysql',
				timezone: '+8:00', //设置为东八区
				models: [
					`${path.resolve(__dirname, '../model')}/*.ts`,
					`${path.resolve(__dirname, '../model')}/*.js`
				], // 数据库模板存放地址
				// 配置日期格式
				dialectOptions: {
					dateStrings: true,
					typeCast: true,
					useUTC: false
				}
		  })
		: //   服务器数据库
		  new Sequelize(
				MYSQL_SERVICE_DB as string,
				MYSQL_SERVICE_USER as string,
				MYSQL_SERVICE_PWD,
				{
					host: MYSQL_SERVICE_HOST,
					dialect: 'mysql',
					timezone: '+8:00', //设置为东八区
					models: [
						`${path.resolve(__dirname, '../model')}/*.ts`,
						`${path.resolve(__dirname, '../model')}/*.js`
					], // 数据库模板存放地址
					// 配置日期格式
					dialectOptions: {
						dateStrings: true,
						typeCast: true,
						useUTC: false
					}
				}
		  );

// 服务器数据库
// const sequelize = new Sequelize(
// 	MYSQL_SERVICE_DB as string,
// 	MYSQL_SERVICE_USER as string,
// 	MYSQL_SERVICE_PWD,
// 	{
// 		host: MYSQL_SERVICE_HOST,
// 		dialect: 'mysql',
// 		timezone: '+8:00', //设置为东八区
// 		models: [
// 			`${path.resolve(__dirname, '../model')}/*.ts`,
// 			`${path.resolve(__dirname, '../model')}/*.js`
// 		], // 数据库模板存放地址
// 		// 配置日期格式
// 		dialectOptions: {
// 			dateStrings: true,
// 			typeCast: true,
// 			useUTC: false
// 		}
// 	}
// );

// sequelize.sync({ force: true });
// sequelize.sync();

sequelize
	.authenticate()
	.then(() => {
		console.log('数据库连接成功');
	})
	.catch((err: any) => {
		console.log('数据库连接失败', err);
	});

export default sequelize;
