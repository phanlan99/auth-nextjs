B1 :Truy cập nextjs 

Cài :   npx create-next-app@latest

B2 :Truy cập monngo tạo access netword and access database để có được link :

mongodb+srv://phanlan99:phanlan99@cluster0.6aulvxn.mongodb.net/


B3 : Cài thêm các thư viện 

npm i axios bcryptjs jsonwebtoken nodemailer react-hot-toast mongoose

| Thư viện            | Dùng để làm gì                                                                          |
| ------------------- | --------------------------------------------------------------------------------------- |
| **axios**           | Gửi request HTTP (GET, POST, PUT, DELETE,...) từ client đến server. Dùng thay `fetch`.  |
| **bcryptjs**        | Mã hóa mật khẩu (hash password) trước khi lưu vào database. Dùng cho đăng ký/đăng nhập. |
| **jsonwebtoken**    | Tạo và xác minh **JWT tokens** để xác thực người dùng (authentication).                 |
| **nodemailer**      | Gửi email từ backend (ví dụ: gửi mã xác nhận, khôi phục mật khẩu, v.v.).                |
| **react-hot-toast** | Thư viện hiển thị **toast notification** trên frontend (nhanh, đẹp, dễ dùng).           |
| **mongoose**        | Thư viện dùng để kết nối và thao tác với MongoDB bằng cú pháp dễ hiểu (ODM).            |

B4 : src sẽ được thực hiện trong app , ngoài ra sẽ tạo ra các thư mục dbConfig , helper , models .

B5 : Tạo trang login , signup , profile là các page.tsx

B6 : Cấu hình kết nối với MongoDB bằng dbConfig



**B7 (tiếp): Viết API cho các trang**
`app/api/users/signup` và `app/api/users/login`

#### ✅ Với `signup`:

* Nhận thông tin: `email`, `username`, `password` từ frontend.
* Kiểm tra xem user đã tồn tại chưa (`User.findOne({ email })`).
* Hash mật khẩu bằng `bcryptjs`.
* Tạo user mới bằng `new User(...)` và `.save()` vào MongoDB.
* Trả về JSON response khi thành công hoặc lỗi.

```ts
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)
```

---

#### ✅ Với `login`:

* Nhận `email` và `password`.
* Tìm user trong MongoDB theo `email`.
* So sánh password nhập vào với `user.password` đã mã hoá bằng `bcrypt.compare(...)`.
* Nếu đúng, tạo `JWT token` bằng `jsonwebtoken.sign(...)`.
* Gửi token qua `httpOnly cookie` về trình duyệt.

---

**B8: Tạo model user với Mongoose (`models/userModel.ts`)**

```ts
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
})

export default mongoose.models.User || mongoose.model("User", userSchema)
```

---

**B9: Tạo `dbConfig/dbConfig.ts` để kết nối MongoDB**

```ts
import mongoose from "mongoose"

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log("✅ Kết nối MongoDB thành công")
  } catch (error) {
    console.log("❌ Kết nối MongoDB thất bại:", error)
  }
}
```

⚠️ Đừng quên tạo file `.env`:

```
MONGO_URI=mongodb+srv://phanlan99:phanlan99@cluster0.6aulvxn.mongodb.net/
TOKEN_SECRET=your-secret-key
```

---

**B10: Tạo các trang giao diện (`signup.tsx`, `login.tsx`, `profile.tsx`)**

* Sử dụng `useState` để lấy input người dùng.
* Gửi `axios.post("/api/users/signup", data)` hoặc `login` tương ứng.
* Sau khi login thành công, dùng `useRouter().push("/profile")` để chuyển trang.

---

**B11: Hiển thị thông báo bằng `react-hot-toast`**

```tsx
import toast, { Toaster } from 'react-hot-toast'

toast.success("Đăng ký thành công!")
toast.error("Sai mật khẩu!")
```

---

**B12: Kiểm tra token để bảo vệ route `/profile`**

* Tạo middleware check JWT token.
* Nếu không có token → redirect về `/login`.

---

**B13: Thêm chức năng `logout`**

* Gửi request xoá cookie chứa token.
* Sau đó `router.push("/login")`.

---

📌 **Tóm tắt ngắn gọn các bước chính:**

```
1. Cài Next.js + MongoDB URI
2. Cài thư viện
3. Cấu trúc thư mục: /app /api /models /dbConfig /helpers
4. Viết model user
5. Kết nối DB
6. Tạo API signup + login
7. Tạo trang giao diện login/signup/profile
8. Xác thực bằng JWT token
```

---

Bạn muốn mình đóng gói thành tài liệu tổng hợp markdown hoặc PDF để dễ học lại sau không?
