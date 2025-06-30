# 🛡️ Auth API Routes – Express.js

This API provides authentication routes for registering an admin, logging in, and handling password resets.

---

# 🚀 Job Portal API – Main Routing Overview

This Express.js backend provides routes for employee registration/login, category/subcategory management, job postings, and payment verification.

---

## 🌐 Live Base URL

```
----->>> https://job-backend-uwzv.onrender.com  <<<<<<--------



## 📂 API Routes Overview

| Route Prefix       | Description                               |
|--------------------|-------------------------------------------|
| `/user`            | Employee registration and profile routes  |
| `/employee`        | Login and password reset via OTP          |
| `/category`        | Job category management                   |
| `/subcategory`     | Job subcategory management                |
| `/api`             | Job listings + payment verification       |

---

## 🧭 Route Details

### 👤 `/user` – Employee Registration & Profile

- `POST /user/register` – Register new employee  
- `GET /user/profile/:id` – Get employee profile  

---

### 🔐 `/employee` – Login & OTP Reset

- `POST /employee/login` – Login with email & password  
- `POST /employee/send-otp` – Send OTP to email  
- `POST /employee/reset-password` – Reset password using OTP  

---

### 📁 `/category` – Category Management

- `GET /category/` – Get all categories  
- `POST /category/` – Add new category  
- `PUT /category/:id` – Update category  
- `DELETE /category/:id` – Delete category  

---

### 📂 `/subcategory` – Subcategory Management

- `GET /subcategory/` – Get all subcategories  
- `POST /subcategory/` – Add new subcategory  
- `PUT /subcategory/:id` – Update subcategory  
- `DELETE /subcategory/:id` – Delete subcategory  

---

### 💼 `/api` – Job Management + Payment

- `GET /api/` – Get all jobs  
- `GET /api/:id` – Get job by ID  
- `GET /api/category/:categoryId` – Jobs by category  
- `GET /api/subcategory/:subcategoryId` – Jobs by subcategory  
- `POST /api/` – Create new job (requires login)  
- `PUT /api/:id` – Update job (requires login)  
- `DELETE /api/:id` – Delete job (requires login)  

---

### 💳 Payment Verification

> **Endpoint**:  
> `POST /api/verify-payment`

#### 🔸 Sample Request:

```json
{
  "razorpay_payment_id": "pay_ABC123",
  "razorpay_order_id": "order_DEF456",
  "razorpay_signature": "signature_xyz789"
}
```

#### ✅ Sample Success Response:

```json
{
  "success": true,
  "message": "Payment verified and job activated"
}
```

---

## ✅ Example Usage

### 🔹 Register Employee

```http
POST https://job-backend-uwzv.onrender.com/user/register
```

### 🔹 Login

```http
POST https://job-backend-uwzv.onrender.com/employee/login
```

### 🔹 Create Job (Authenticated)

```http
POST https://job-backend-uwzv.onrender.com/api/
Authorization: Bearer <token>
```

---

## 🧪 Testing Tips

Use **Postman** or **Thunder Client** to test all routes.

---

## 📬 Contact

For issues or support, contact: [youremail@example.com](mailto:youremail@example.com)




# 🚀 Express API – Main Routing Overview

This Express.js API includes user registration/login, category management, job posting with payment integration, and employee authentication.

---

## 🌐 Base URL

```
http://localhost:<your-port>
```

Replace `<your-port>` with your actual server port (e.g., `5000`, `8080`, etc.)

---

## 🧭 Route Structure

| Route Prefix       | Description                               |
|--------------------|-------------------------------------------|
| `/user`            | User (employee) registration & profile    |
| `/employee`        | Employee login & password reset (OTP)     |
| `/category`        | Job category management                   |
| `/subcategory`     | Job subcategory management                |
| `/api`             | Job posting, payment verification, admin  |

---

## 📂 Routes Breakdown

### 👤 `/user` – Employee Registration Routes

Handled by: `UserEmployee`  
Includes registration, profile, and related features.

#### Example:

```http
POST /user/register
GET /user/profile/:id
```

---

### 🔐 `/employee` – Employee Login & OTP Routes

Handled by: `UserEmployeelogin`

#### Example Endpoints:

- `POST /employee/login` – Login with email/password  
- `POST /employee/send-otp` – Send OTP to email for reset  
- `POST /employee/reset-password` – Reset password with OTP  

---

### 📁 `/category` – Category Management

Handled by: `CategoryRoute`

CRUD operations on job categories.

#### Example:

```http
GET /category/
POST /category/
PUT /category/:id
DELETE /category/:id
```

---

### 📂 `/subcategory` – Subcategory Management

Handled by: `SubCategoryRoute`

CRUD for subcategories under categories.

---

### 💼 `/api` – Job Posting & Payment

Handled by: `jobRoute`

Includes all job-related features + payment verification.

#### Example Endpoints:

- `GET /api/` – Get all jobs  
- `GET /api/:id` – Get job by ID  
- `POST /api/` – Create job (protected)  
- `PUT /api/:id` – Update job  
- `DELETE /api/:id` – Delete job  

---

### 💳 Payment Verification

> Endpoint:  
> `POST /api/verify-payment`

#### 🔸 Sample Request:

```json
{
  "razorpay_payment_id": "pay_ABC123",
  "razorpay_order_id": "order_DEF456",
  "razorpay_signature": "signature_789xyz"
}
```

#### ✅ Sample Success Response:

```json
{
  "success": true,
  "message": "Payment verified and job activated"
}
```

---

## 🛠 Setup Instructions

1. Clone the repository.
2. Run `npm install`
3. Add a `.env` file with:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
4. Start the server:

```bash
node index.js
# or
nodemon index.js
```

---

## 🧪 Testing Tools

Use **Postman**, **Thunder Client**, or **Swagger** for API testing.

---

## 📬 Contact

For support or feedback, contact: [youremail@example.com](mailto:youremail@example.com)



## 🌐 Base URL

```
http://localhost:<8000>/api/auth
```

---

## 🔐 Endpoints Overview

### 📥 1. Register Admin

- **Endpoint**: `/register`
- **Method**: `POST`
- **Purpose**: Register a new admin user.

#### ✅ Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "id": "60f1bc...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### ❌ Error Response:

```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### 🔑 2. Login

- **Endpoint**: `/login`
- **Method**: `POST`
- **Purpose**: Login admin user.

#### ✅ Request Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

#### ❌ Error Response:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 🔁 3. Forgot Password (Send Link)

- **Endpoint**: `/reset-password/:id`
- **Method**: `GET`
- **Purpose**: Sends password reset link to email.

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

#### ❌ Error Response:

```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 🔄 4. Reset Password

- **Endpoint**: `/resetpassword`
- **Method**: `POST`
- **Purpose**: Reset user's password.

#### ✅ Request Body:

```json
{
  "userId": "60f1bc...",
  "newPassword": "newpassword123"
}
```

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

#### ❌ Error Response:

```json
{
  "success": false,
  "message": "Password reset failed"
}
```

---

## ⚙️ Setup Instructions

1. Clone this repository.
2. Run `npm install`.
3. Start the server using:
   ```bash
   node index.js
   # or
   nodemon index.js
   ```
4. Use **Postman** or **Insomnia** for API testing.

---

## 📬 Contact

Need help? Reach out: [youremail@example.com](mailto:youremail@example.com)



# 👨‍💼 Employee Auth API – Express.js

This API handles authentication for employees, including registration, login, sending OTP for password reset, and resetting password.

---

## 🌐 Base URL

```
http://localhost:<your-port>/api/employee
```

Replace `<your-port>` with the actual port (e.g., `5000`, `8000`).

---

## 🔐 API Endpoints

### 📥 1. Register Employee

- **Endpoint**: `/register`
- **Method**: `POST`
- **Purpose**: Register a new employee.

#### ✅ Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "Employee registered successfully",
  "data": {
    "id": "65bc1d...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### ❌ Error Response:

```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### 🔑 2. Login Employee

- **Endpoint**: `/login`
- **Method**: `POST`
- **Purpose**: Login existing employee.

#### ✅ Request Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

#### ❌ Error Response:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### ✉️ 3. Send OTP (for Password Reset)

- **Endpoint**: `/send-otp`
- **Method**: `POST`
- **Purpose**: Send OTP to employee’s email for password reset.

#### ✅ Request Body:

```json
{
  "email": "john@example.com"
}
```

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

#### ❌ Error Response:

```json
{
  "success": false,
  "message": "Employee not found"
}
```

---

### 🔁 4. Reset Password with OTP

- **Endpoint**: `/reset-password`
- **Method**: `POST`
- **Purpose**: Reset password using OTP.

#### ✅ Request Body:

```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newpassword@123"
}
```

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "Password reset successful"
}
```

#### ❌ Error Response:

```json
{
  "success": false,
  "message": "Invalid OTP or email"
}
```

---

## ⚙️ Setup & Usage

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file for environment variables like MongoDB URI and JWT secret.
4. Start the server:

```bash
node index.js
# or
nodemon index.js
```

5. Test API using **Postman** or **Thunder Client**.

---

## 📬 Contact

Need help or found a bug? Contact us at: [youremail@example.com](mailto:youremail@example.com)




# 💼 Job API – Express.js

This API handles job listings, including job creation, retrieval, update, deletion, and admin moderation, with authentication and payment verification.

---

## 🌐 Base URL

```
http://localhost:<your-port>/api/jobs
```

---

## 📂 Public Routes

### 📃 1. Get All Jobs

- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Fetch all jobs.

#### ✔️ Success Response:

```json
{
  "success": true,
  "jobs": [ ... ]
}
```

---

### 🔍 2. Get Job by ID

- **Endpoint**: `/:id`
- **Method**: `GET`
- **Description**: Fetch a single job by its ID.

#### ✔️ Example:

```
GET /api/jobs/64df1d123456abc789
```

---

### 📂 3. Get Jobs by Category

- **Endpoint**: `/category/:categoryId`
- **Method**: `GET`
- **Description**: Get all jobs under a specific category.

#### ✔️ Example:

```
GET /api/jobs/category/64dfcat1234
```

---

### 📁 4. Get Jobs by Subcategory

- **Endpoint**: `/subcategory/:subcategoryId`
- **Method**: `GET`
- **Description**: Get all jobs under a specific subcategory.

---

## 🔐 Protected Routes (Requires Auth)

### 📝 5. Create a New Job

- **Endpoint**: `/`
- **Method**: `POST`
- **Headers**: Bearer Token
- **Description**: Create a new job post.

#### ✅ Request Body:

```json
{
  "title": "Web Developer",
  "company": "ABC Ltd",
  "location": "Delhi",
  "category": "IT",
  "subcategory": "Frontend",
  "salaryMin": 20000,
  "salaryMax": 40000,
  "description": "Looking for React Developer"
}
```

---

### ✏️ 6. Update Job

- **Endpoint**: `/:id`
- **Method**: `PUT`
- **Headers**: Bearer Token
- **Description**: Update an existing job by ID.

---

### ❌ 7. Delete Job

- **Endpoint**: `/:id`
- **Method**: `DELETE`
- **Headers**: Bearer Token
- **Description**: Delete a job by ID.

---

## 💳 Payment Route

### ✅ 8. Verify Payment

- **Endpoint**: `/verify-payment`
- **Method**: `POST`
- **Headers**: Bearer Token
- **Description**: Verifies payment made for job posting.

#### ✅ Request Body Example:

```json
{
  "razorpay_payment_id": "pay_29QQoUBi66xm2f",
  "razorpay_order_id": "order_9A33XWu170gUtm",
  "razorpay_signature": "generated_signature"
}
```

#### ✔️ Success Response:

```json
{
  "success": true,
  "message": "Payment verified and job activated"
}
```

---

## 🛡️ Admin-Only Route

### 🕓 9. Get Pending Jobs

- **Endpoint**: `/admin/pending`
- **Method**: `GET`
- **Headers**: Bearer Token (Admin)
- **Description**: Fetch jobs that are pending admin approval.

---

## ⚙️ Setup

1. Clone the repository
2. Run `npm install`
3. Set up your `.env` with MongoDB URI, JWT secret, Razorpay keys
4. Start the server:

```bash
node index.js
# or
nodemon index.js
```

---

## 🧪 Testing Tools

Use **Postman**, **Thunder Client**, or **cURL** to test endpoints.

---

## 📬 Contact

If you have questions or issues, reach out at: [youremail@example.com](mailto:youremail@example.com)

