import { v2 as cloudinary } from 'cloudinary';

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

class CloudinaryService {
  private cloud_name: string;
  private api_key: string;
  private api_secret: string;

  constructor(configure: CloudinaryConfig) {
    // Kiểm tra cấu hình hợp lệ
    if (!configure.cloud_name || !configure.api_key || !configure.api_secret) {
      throw new Error('Missing required Cloudinary configuration values.');
    }

    this.cloud_name = configure.cloud_name;
    this.api_key = configure.api_key;
    this.api_secret = configure.api_secret;

    // Cấu hình Cloudinary
    cloudinary.config({
      cloud_name: this.cloud_name,
      api_key: this.api_key,
      api_secret: this.api_secret,
    });
  }

  // Phương thức ping để kiểm tra kết nối
  async ping(): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      // Gọi một API nào đó từ Cloudinary để kiểm tra kết nối
      const result = await cloudinary.api.ping();
      return { success: true, message: 'Ping successful!', data: result };
    } catch (error: any) {
      return { success: false, message: `Ping failed: ${error.message}` };
    }
  }
}

export default CloudinaryService;
