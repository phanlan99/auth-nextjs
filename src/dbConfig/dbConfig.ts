import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!); // Đảm bảo await để bắt lỗi kết nối

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ Mongoose đã kết nối thành công");
    });

    connection.on("error", (err) => {
      console.error("❌ Mongoose gặp lỗi:", err);
      // process.exit(1); // Chỉ dùng nếu bạn muốn app dừng khi mất DB
    });
  } catch (error) {
    console.error("❌ Kết nối MongoDB thất bại:", error);
    // process.exit(1);
  }
}
