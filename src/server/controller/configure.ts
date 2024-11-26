import { Request, Response } from 'express';
import fse from 'fs-extra';
import { dbStorage } from '../constant';
import crypto from 'crypto';

export const configure = {
  create: async (req: Request, res: Response) => {
    try {
      const { cloud_storage, storage_name } = req.params;
      if (cloud_storage !== 'cloudinary' && cloud_storage !== 'amazons3') {
        res.status(400).json({
          message: 'Unsupported cloud storage type',
          success: false,
        });
      }

      let id = hashStr(storage_name + '/' + cloud_storage);

      const configure = req.body;
      let data: Record<string, any> = {}; // Khởi tạo data là một đối tượng trống

      // Kiểm tra xem file đã tồn tại chưa và đọc dữ liệu cũ
      if (fse.existsSync(dbStorage)) {
        const rawData = fse.readFileSync(dbStorage, 'utf8');
        try {
          data = JSON.parse(rawData);
        } catch (e) {
          console.error('Dữ liệu cũ không hợp lệ!');
        }
      }

      // Cập nhật hoặc thêm dữ liệu mới cho storage_name
      data[id] = {
        storage_name,
        cloud_storage,
        configure,
      };

      // Ghi lại toàn bộ dữ liệu vào file
      fse.writeFileSync(
        dbStorage,
        JSON.stringify(data, null, 2), // Dữ liệu đã cập nhật
        'utf8'
      );

      res.status(201).json({
        data: { id, ...data[id] },
        message: `Created configuration for ${storage_name}`,
        success: true,
      });
    } catch (e: unknown) {
      handleError(res, e);
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const { cloud_storage, storage_name } = req.params;
      const rawData = fse.readFileSync(dbStorage, 'utf8');
      const data = JSON.parse(rawData);
      let id = hashStr(storage_name + '/' + cloud_storage);
      if (data[id]) {
        res.status(200).json({
          data: data[id],
          success: true,
        });
      } else {
        res.status(404).json({
          message: `No configuration found for ${storage_name}`,
          success: false,
        });
      }
    } catch (e: unknown) {
      handleError(res, e);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { cloud_storage, id } = req.params;
      const configure = req.body;

      const rawData = fse.readFileSync(dbStorage, 'utf8');
      const data = JSON.parse(rawData);
      if (data[id]) {
        data[id] = {
          cloud_storage,
          configure,
        };

        fse.writeFileSync(dbStorage, JSON.stringify(data, null, 2), 'utf8');

        res.status(200).json({
          data: { configure },
          message: `Updated configuration for ${id}`,
          success: true,
        });
      } else {
        res.status(404).json({
          message: `No configuration found for ${id}`,
          success: false,
        });
      }
    } catch (e: unknown) {
      handleError(res, e);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const rawData = fse.readFileSync(dbStorage, 'utf8');
      const data = JSON.parse(rawData);

      if (data[id]) {
        const { storage_name } = data[id];
        delete data[id];
        fse.writeFileSync(dbStorage, JSON.stringify(data, null, 2), 'utf8');

        res.status(200).json({
          message: `Deleted configuration for ${storage_name}`,
          success: true,
        });
      } else {
        res.status(404).json({
          message: `No configuration found!`,
          success: false,
        });
      }
    } catch (e: unknown) {
      handleError(res, e);
    }
  },
};

const hashStr = (str: string, alg: string = 'sha256'): string => {
  const hash = crypto.createHash(alg);
  hash.update(str);
  const hashValue = hash.digest('hex');
  return hashValue;
};

const handleError = (res: Response, e: unknown) => {
  if (e instanceof Error) {
    res.status(500).json({
      error: { code: e.name, message: e.message },
      success: false,
    });
  } else {
    res.status(500).json({
      error: { code: 'UNKNOWN', message: 'An unknown error occurred' },
      success: false,
    });
  }
};
