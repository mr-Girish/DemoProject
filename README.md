# 🛠️ Full Stack Dynamic CRUD App – React + Express + PostgreSQL

This is a full-stack CRUD application that allows users to:

- Dynamically create PostgreSQL tables with custom columns and data types
- Perform full CRUD operations on any table
- Node.js Express server with PostgreSQL connection, routes for tables, queries, CRUD, create/delete table, and manage table columns

**Backend Dependencies:** `cors`, `dotenv`, `pg`, `nodemon (dev)`

You can start the backend with `node server.js` or `npx nodemon server.js`.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) ≥ v16
- [PostgreSQL](https://www.postgresql.org/) ≥ v12
- npm or yarn installed

---



## 📁 Project Structure

testproject/
├── backend/ #  server with PostgreSQL integration
└── frontend/ # React frontend with Material UI 



---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev



 Backend Setup

```bash
cd backend
cp .env.example .env  
npm install
npx nodemon server.js           # Starts backend on http://localhost:5000

# test the api route http://localhost:5000/api/tables   to get the all Tables





# .env Example for Backend# .env
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=your_pg_user
# DB_PASSWORD=your_pg_password
# DB_NAME=your_database_name


