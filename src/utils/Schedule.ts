import schedule from 'node-schedule';
import redis from '../db/redis';
import CommonServiceImpl from '../service/Implement/CommonServiceImpl';
const fs = require('fs');
const path = require('path');
import processEnv from '../config/config.default';

const commonService = new CommonServiceImpl();

export const websiteVisit = () => {
	schedule.scheduleJob('59 23 * * *', async () => {
		console.log('定时任务执行');
		const count = await redis.get('website_visit_num');
		await redis.del('website_visit');
		const res = await commonService.addVisitNum(Number(count));
		return res;
	});
};

export const staticInit = async () => {
	const { NODE_ENV } = processEnv;
	let staticPath: string;

	if (NODE_ENV === 'development') {
		staticPath = path.join('src', 'static');
	} else {
		staticPath = path.join('dist', 'static');
	}

	fs.stat(staticPath, (err: any, stats: any) => {
		if (err) {
			if (err.code === 'ENOENT') {
				fs.mkdir(staticPath, { recursive: true }, (err: any) => {
					if (err) {
						console.error('static创建失败:', err);
					} else {
						console.log('static创建成功');
					}
				});
			} else {
				console.error('Failed to check static directory:', err);
			}
		} else {
			console.log('static目录已经存在');
		}
	});
};

export const deleteStatic = async () => {
	const { NODE_ENV } = processEnv;
	let staticPath: string;

	if (NODE_ENV === 'development') {
		staticPath = path.join('src', 'static');
	} else {
		staticPath = path.join('dist', 'static');
	}

	schedule.scheduleJob('55 23 * * *', async () => {
		fs.readdir(staticPath, (err: any, files: any) => {
			if (err) {
				console.error('读取static失败:', err);
			} else {
				files.forEach((file: any) => {
					const filePath = path.join(staticPath, file);
					fs.unlink(filePath, (err: any) => {
						if (err) {
							console.error(
								`static下文件删除失败: ${filePath}`,
								err
							);
						} else {
							console.log(`static下文件删除成功: ${filePath}`);
						}
					});
				});
			}
		});
	});
};
