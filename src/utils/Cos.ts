import processEnv from '../config/config.default';
import fs from 'fs';
const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
	SecretId: processEnv.SecretId,
	SecretKey: processEnv.SecretKey
});
const Bucket = processEnv.Bucket;

// 上传图片到cos
export const uploadFile = async (
	filePath: string,
	fileName: string,
	path: string
) => {
	return new Promise((resolve, reject) => {
		cos.putObject(
			{
				Bucket,
				Region: 'ap-guangzhou',
				Key: `flockmaster-blogs/${path}/${fileName}`,
				Body: fs.createReadStream(filePath),
				ContentLength: fs.statSync(filePath).size,
				ContentType: 'image/jpeg'
			},
			(err: unknown, data: unknown) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});
};

// 删除cos文件
export const deleteObject = async (key: string) => {
	return new Promise((resolve, reject) => {
		cos.deleteObject(
			{
				Bucket,
				Region: 'ap-guangzhou',
				Key: key
			},
			(err: string, data: string) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		);
	});
};

export const getObjectUrl = (key: string) => {
	return cos.getObjectUrl({
		Bucket,
		Region: 'ap-guangzhou',
		Key: key,
		Expires: 3600 // URL 过期时间，单位秒，默认 300 秒
	});
};
