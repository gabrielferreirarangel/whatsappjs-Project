import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.URL_BD);

    console.log(`MongoDB conectado: ${connect.connection.host}`);
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;