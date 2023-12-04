// require('module-alias/register');
import app from './app/index';
import processEnv from './config/config.default';

app.listen(processEnv.APP_PORT, () => {
	console.log(
		`服务已经启动, 环境:${processEnv.NODE_ENV}，端口号:${processEnv.APP_PORT}`
	);
});
