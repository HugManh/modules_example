import mongoose from 'mongoose';

const connectMongoDB = async () => {
  const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.gscff.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;