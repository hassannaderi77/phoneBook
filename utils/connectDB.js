import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (mongoose.connection[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to db succsessfully")
  } catch (error) {
    console.log("connection failed")
  }
}

mongoose
  .connect("mongodb://localhost:27017/next-phone")
  .then(() => {
    if (mongoose.connection[0].readyState) return;
    console.log("connected to db succsessfully");
  })
  .catch((error) => console.log(error));
