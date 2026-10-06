# Inventory Backend

This is the backend for the **Inventory Management System**, built with **Express.js** and **MongoDB**. It provides a clean, modular, and scalable API for managing products, users, and orders.

**Demo account:** [to be added: a dedicated demo login for the live app]


It manages products, brands, categories, suppliers, customers, purchases, sales, returns and expenses, with date-range reports and OTP password recovery.

**Data integrity:** a purchase, sale or return is a parent document plus its line items in a separate collection. Both are written, and deleted, inside one MongoDB transaction (`src/service/common/CreateParentChildsService.js`, `DeleteParentChildsService.js`), so a failure never leaves a sale without its items or items without their sale. Deleting a brand, category, customer, supplier, product or expense type that other records still reference is refused (`CheckAssociateService.js`).

## ✨ Features

- RESTful API with **Express.js**
- MongoDB models for structured data management
- Modular folder structure for controllers, routes, services, middleware, and utilities
- Middleware for input validation, sanitization, and error handling
- Easy integration with any frontend via CORS and environment variables
- Maintains **data consistency and integrity** between products, suppliers, and orders
- Docker-ready for production deployment

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following:

```
PORT=8080
URL=<your-database-connection-string>
ORIGIN=<frontend-url1>,<frontend-url2>
```

Replace `<...>` with your actual backend URL, database connection string, and allowed frontend origins.

## 🚀 Getting Started

1. Clone the repository:

```
git clone https://github.com/mezbaur2004/inventoryBackend.git
cd inventoryBackend
```

2. Install dependencies:

```
npm install
```

3. Start the development server (restarts on file changes):

```
npm run dev
```

   Or run it once with `npm start`.

The server will start on the port specified in `.env` (default `8080`). You can now connect your frontend or test endpoints with Postman.

## 📁 Project Structure

```
inventoryBackend/
├─ src/
│  ├─ controller/      # API logic
│  ├─ middleware/      # Auth, validation, error handling
│  ├─ model/           # MongoDB schemas
│  ├─ route/           # Route definitions (api.js)
│  ├─ service/         # Business logic / database interactions
│  └─ utility/         # Helper functions
├─ .dockerignore
├─ .gitignore
├─ Dockerfile
├─ app.js              # Express app setup
├─ index.js            # Entry point: load env + start server
├─ Inventory.postman_collection.json
├─ package.json
├─ package-lock.json
└─ README.md
```

## 🔍 Quick Test Flow

- Start the backend server
- Use Postman or a frontend client to test endpoints in `src/route/api.js`
- Verify CRUD operations for inventory, suppliers, and orders
- Ensure data consistency across related entities

## 🧑‍💻 Author

**Mezbaur Are Rafi** – [GitHub](https://github.com/mezbaur2004)
