import path from 'path';
import fse from 'fs-extra';
import { localData } from '../constant';
import { Cloudinary } from '../services';
import { Request, Response } from 'express';

const dbStorage = path.join(localData, 'storage.json');

export const connection = {
  ping: async (req: Request, res: Response) => {
    try {
      const { storage_name } = req.params;
      let data;
      // Kiểm tra xem file đã tồn tại chưa và đọc dữ liệu cũ
      if (fse.existsSync(dbStorage)) {
        const rawData = fse.readFileSync(dbStorage, 'utf8');
        try {
          data = JSON.parse(rawData);
        } catch (e) {
          console.error('Dữ liệu cũ không hợp lệ!');
        }
      }
      const { cloud_storage, configure } = data[storage_name];
      switch (cloud_storage) {
        case 'cloudinary': {
          const { cloud_name, api_key, api_secret } = configure;

          const service = new Cloudinary({
            cloud_name,
            api_key,
            api_secret,
          });

          // Gọi phương thức ping
          const notify = await service.ping();
          res.status(200).json({
            status: 'success',
            message: notify,
            success: true,
          });
        }

        case 'amazons3':
          break;

        default:
          break;
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(500).json({
          error: { code: e.name, message: e.message },
          success: false,
        });
      }
      res.status(500).json({
        error: { code: 'UNKNOWN', message: 'An unknown error occurred' },
        success: false,
      });
    }
  },
};
