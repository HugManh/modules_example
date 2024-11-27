import { Request, Response } from 'express';
import { Cloudinary } from '../services';

export const connection = {
  ping: async (req: Request, res: Response) => {
    try {
      const {cloud_storage} = req.params;
      const configure = req.body;
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
            message: notify.message,
            data: notify.data,
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
