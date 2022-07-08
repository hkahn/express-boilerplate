import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  mongoHost: process.env.MONGO_HOST || 'mongodb://localhost:27017/example',
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
  secretKey: process.env.SECRET_KEY || 'secret key in env file needed',
};
