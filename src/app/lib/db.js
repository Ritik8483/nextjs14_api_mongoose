import mongoose from "mongoose";

const mongooseUrl = process.env.DB_MONGO_DB;
console.log("mongooseUrl", mongooseUrl);

export const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("ALREADY CONNECTED");
    return;
  } else if (connectionState === 2) {
    console.log("CONNECTING...");
    return;
  }
  try {
    mongoose.connect(mongooseUrl, {
      dbName: "nextjs",
      bufferCommands: false,
    });
    console.log("CONNECTED");
  } catch (error) {
    console.log("error", error);
  }
};
