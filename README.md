# 🛍️ Next.js Products CRUD App

A full-featured **Next.js 13+ App Router** project using **TypeScript**, **Redux Toolkit**, **Axios**, and **Sonner** for toast notifications.
This app demonstrates **CRUD operations** (Create, Read, Update, Delete) for products via a remote API.

---
🚀 Live Demo

You can view the deployed project on Vercel:

https://camp-coding-test.vercel.app/ 

---
## 🚀 Features

* **List Products**: Fetch and display products from the API.
* **Create Product**: Add a new product using a dedicated form.
* **Update Product**: Edit product details with a pre-filled form.
* **Delete Product**: Delete products with confirmation.
* **Image Display**: Render product images using Next.js `Image` component.
* **Responsive Design**: Fully responsive layout with Tailwind CSS.
* **Toasts**: Success and error messages via **Sonner**.

---

## 🛠️ Tech Stack

* **Next.js 13+** (App Router)
* **TypeScript**
* **Redux Toolkit** for state management
* **Axios** for HTTP requests
* **Tailwind CSS** for styling
* **Sonner** for notifications

---

## ⚡ Installation

1. Clone the repository:

```bash
git clone https://github.com/ahmedwaelalkaliby/camp-coding-test
cd nextjs-crud-products
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 📝 Usage

1. **View Products**: Products are listed on the main page.
2. **Create Product**: Click **"Create New Product"** → Fill the form → Submit.
3. **Edit Product**: Click **"Edit"** on a product → Update details → Save.
4. **Delete Product**: Click **"Delete"** → Confirm deletion.

All operations update the local Redux store immediately, with feedback via **toast notifications**.

---

## 🔗 API

All API requests are proxied through Next.js API routes:

| Operation      | Method | Route                  |
| -------------- | ------ | ---------------------- |
| Create Product | POST   | `/api/products/create` |
| Update Product | POST   | `/api/products/update` |
| Delete Product | POST   | `/api/products/delete` |
| Read Products  | GET    | `/api/products/read`   |

---

## 🎨 Styling

* Tailwind CSS is used for a **modern, responsive UI**.
* Flexbox and grid layouts are used for product cards.

---

## ⚠️ Notes

* Ensure the backend API (`camp-coding.tech`) is reachable.
* Product images are optional; the UI will render only if available.
* Form validations are minimal; adjust as needed for production.

---

This project is ready for **extension**, including authentication, file uploads, or more advanced product management features.
