import mongoose from "mongoose";
export const connect = (): void => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected!'));
}