import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Db Connected ✅');
    })
    .catch(() => {
      console.log('Db Not Connected ❌');
    });
};
