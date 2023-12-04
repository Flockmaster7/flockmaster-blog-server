import Redis from 'ioredis';
import processEnv from '../config/config.default';

const redis = new Redis({
	host: processEnv.REDIS_HOST,
	port: Number(processEnv.REDIS_PORT),
	password: processEnv.REDIS_PWD
});

// 测试是否连接成功
redis.ping((err, result) => {
	if (err) {
		console.error('redis连接失败, 错误信息: ', err);
	} else {
		console.log(`redis连接成功, 端口号: ${processEnv.REDIS_PORT}`, result);
	}
});

export default redis;
