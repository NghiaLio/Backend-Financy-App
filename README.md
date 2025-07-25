## 📦 Backend (NodeJS + MongoDB) - README-backend.md

### 🏗️ Mô tả dự án
Ứng dụng quản lý tài chính cá nhân (Personal Finance App) - backend API dùng NodeJS + Express + MongoDB. Cho phép người dùng đăng nhập bằng Google, tạo tài khoản ví/bank/e-wallet, ghi giao dịch chi tiêu/thu nhập, đặt ngân sách theo danh mục, và chuẩn bị cho tích hợp ngân hàng sau này.

---

### 🚀 Công nghệ sử dụng
- NodeJS + Express
- MongoDB (Mongoose ODM)
- JWT (Google Sign-in Auth)
- dotenv, cors, helmet, rate-limit, joi (validation)

---

### 📁 Cấu trúc thư mục
```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
├── .env
└── index.js
```

---

### 🔐 Xác thực
- Đăng nhập qua Google → client gửi idToken → backend xác thực → tạo accessToken (JWT)
- Mỗi request từ client cần Authorization: Bearer <token>

---

### 🧾 Các endpoints chính

#### Auth
- POST /auth/google-signin → xác thực Google, tạo token

#### Account
- POST /accounts → tạo account
- GET /accounts → lấy danh sách
- GET /accounts/:id → chi tiết
- PUT /accounts/:id → cập nhật
- DELETE /accounts/:id → xoá

(Tạm thời chỉ hỗ trợ CRUD thủ công; tích hợp ngân hàng sẽ làm sau)

#### Category
- Tương tự /categories (CRUD)

#### Transaction
- /transactions (CRUD + query theo thời gian, account, category)

#### Budget
- /budgets (CRUD, theo category + tháng)

---

### 🛡️ Bảo mật
- JWT middleware kiểm tra token
- Chỉ user sở hữu mới truy cập được account/transaction riêng
- Validation với Joi
- Rate limiting
- MongoDB không công khai, dùng env

---

### ⚙️ Cấu hình .env
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/finance_app
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=...
```

---

### ▶️ Chạy local
```bash
git clone ...
cd backend
npm install
npm run dev
```

---

### ✅ TODO
- [x] Auth Google
- [x] CRUD Account,
- [ ]  Category
- [ ]  Transaction
- [ ] Refresh token flow
- [ ] Audit log
- [ ] Tích hợp ngân hàng (phase 2)

---

