// import mongoose from "mongoose";

// export default async function connectDB() {
//   try {
//     if (mongoose.connection[0].readyState) return;
//     await mongoose.connect("mongodb://localhost:27017/next-phone")
//     console.log("connected to db succsessfully")
//   } catch (error) {
//     console.log("connection failed")
//   }
// }

// mongoose
//   .connect("mongodb://localhost:27017/next-phone")
//   .then(() => {
//     if (mongoose.connection[0].readyState) return;
//     console.log("connected to db succsessfully");
//   })
//   .catch((error) => console.log(error));

// connectDB.js
import mongoose from "mongoose";

const connectDB = async () => {

  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectDB;
