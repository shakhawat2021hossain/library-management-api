# 📚 Library Management API

A Library Management System built with Express, TypeScript, and Mongoose. This API allows you to manage books and borrowing operations with strict validation, business logic, and clear error handling.

---

## 🚀 Features

- **CRUD Operations:** Full support for creating, reading, updating, and deleting books.
- **Advanced Query:** Filter books by genre and sort results with multiple criteria.
- **Borrowing Book:** Manage book borrowing with robust business logic to handle availability and stock.
- **Aggregation:** Get a summary of all borrowed books.

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI="mongodb://127.0.0.1:27017/library_management"
```

### 4. Run the Application

For Development (with hot reload using ts-node-dev):

```bash
npm run dev
```

---

## 📖 API Endpoints

### 1. Create Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

### 2. Get All Books

**GET** `/api/books`

Query parameters:

- `filter` (e.g. genre)
- `sortBy` (e.g. createdAt)
- `sort` (asc or desc)
- `limit` (default: 10)

Example: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

---

### 3. Get Book by ID

**GET** `/api/books/:bookId`

---

### 4. Update Book

**PATCH** `/api/books/:bookId`

Example body:

```json
{
  "copies": 50
}
```

---

### 5. Delete Book

**DELETE** `/api/books/:bookId`

---

### 6. Borrow a Book

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

### 7. Borrowed Books Summary

**GET** `/api/borrow`

Returns total borrowed quantity per book.

---

## ❌ Error Response Format

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "issues": [
      {
        "code": "too_small",
        "minimum": 0,
        "type": "number",
        "inclusive": true,
        "message": "Copies must be a non-negative number",
        "path": ["copies"]
      }
    ],
    "name": "ZodError"
  }
}
```

---

## 📘 Book Model Fields

- `title` (string, required)
- `author` (string, required)
- `genre` (string, required, one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- `isbn` (string, required, unique)
- `description` (string, optional)
- `copies` (number, required, non-negative)
- `available` (boolean, default: true)

---

## 📦 Borrow Model Fields

- `book` (ObjectId, required)
- `quantity` (number, required, positive)
- `dueDate` (date, required)

