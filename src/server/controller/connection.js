import path from 'path';
import fse from 'fs-extra';
import { localData } from '../constant';
import { Cloudinary } from '../services';

const dbStorage = path.join(localData, 'storage.json');

export const connection = {
  ping: async (req, res) => {
    try {
      const { storage_name } = req.params;
      let data = {};
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
      let service = {};
      switch (cloud_storage) {
        case 'cloudinary':
          service = new Cloudinary.default({
            cloud_name: 'your-cloud-name',
            api_key: 'your-api-key',
            api_secret: 'your-api-secret',
          });

          // Gọi phương thức ping
          const pingResult = await service.ping();
          return res.status(200).json({
            data: { pingResult },
            message: 'Saved configuration ' + storage_name,
            success: true,
          });

        case 'amazons3':
          break;

        default:
          break;
      }
    } catch (e) {
      return res.status(500).json({
        error: { code: e.code, message: e.message },
        success: false,
      });
    }
  },
};
