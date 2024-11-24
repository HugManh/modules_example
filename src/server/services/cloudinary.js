import { v2 as cloudinary } from 'cloudinary';

class Cloudinary {
  constructor(configure) {
    this.cloud_name = configure.cloud_name;
    this.api_key = configure.api_key;
    this.api_secret = configure.api_secret;
    // Cấu hình Cloudinary
    this.client = cloudinary.config({
      cloud_name: this.cloud_name,
      api_key: this.api_key,
      api_secret: this.api_secret,
    });
  }

  // Phương thức ping để kiểm tra kết nối
  async ping() {
    // Ping có thể là một yêu cầu kiểm tra kết nối đến Cloudinary
    // Để đơn giản, ví dụ này sẽ trả về thông tin Cloudinary sau khi cấu hình
    try {
      // Gọi một API nào đó từ Cloudinary để kiểm tra
      await this.client.api.ping();
      return { success: true, message: 'Ping successful!' };
    } catch (error) {
      return { success: false, message: `Ping failed: ${error.message}` };
    }
  }
}

export default Cloudinary;
