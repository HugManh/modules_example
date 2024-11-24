import path from 'path';
import fse from 'fs-extra';
import { localData } from '../constant';

const dbStorage = path.join(localData, 'storage.json');

export const configure = {
  save: async (req, res) => {
    try {
      const { cloud_storage, storage_name } = req.params;
      console.log(req.body);
      const configure = req.body;

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
      switch (cloud_storage) {
        case 'cloudinary':
          // Cập nhật hoặc thêm dữ liệu mới cho storage_name
          data[storage_name] = {
            cloud_storage,
            configure,
          };

          // Ghi lại toàn bộ dữ liệu vào file
          fse.writeFileSync(
            dbStorage,
            JSON.stringify(data, null, 2), // Dữ liệu đã cập nhật
            'utf8'
          );

          return res.status(200).json({
            data: { configure },
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
