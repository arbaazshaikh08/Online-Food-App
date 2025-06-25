# 🍔 Online Food Ordering App (Backend)

A RESTful API backend for an online food ordering platform where users can register, browse restaurants, view food items, add items to cart, and place orders. Built using **Node.js**, **Express.js**, and **MongoDB**, with support for role-based access (user/admin), cart management, and order processing.

---

## 🚀 Features

| Feature                           | Description                                           |
|---------------------------------- |------------------------------------------------------ |
| 🔐 JWT Authentication            |  Secure login/register for users                      |
| 👤 Role-Based Access (User/Admin) | Admins manage restaurants and food items             |
| 🏪 Restaurant Management         | Admin can add/update/delete restaurants              |
| 🍕 Food Items CRUD               |  Food items linked to restaurants                     |
| 🛒 Cart System                   | Users can add/remove food items to/from cart         |
| 📦 Order Placement               |  Users can place orders from their cart               |
| 💰 Total Price Calculation       |  Auto calculation of order total                      |
| ⚠️ Payment Gateway Integration    Can be integrated using Razorpay/Stripe              |

---

## 🧠 Tech Stack

| Layer         | Tech Used                          |
|---------------|------------------------------------|
| Backend       | Node.js, Express.js                |
| Database      | MongoDB with Mongoose ODM          |
| Authentication| JWT + bcryptjs                     |
| Validation    | Custom input checks (basic only)   |
| Others        | dotenv, cors, nodemon              |

---
