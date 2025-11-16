Below is a clear, complete **README-style task description** you can give your students:

---

# Full-Stack Assignment: Lectures Management System

## Goal

Build a small **Lectures Management System** consisting of:

- A **React SPA client**
- A **Node.js Express backend**
- A **MongoDB database**

The system will allow adding new lecturers using a form and then viewing the list of all lecturers in a table.

---

# 📝 Task Overview

You will create a simple full-stack application that manages lecturers and their skill ratings.

## ✔ What you must build:

1. **React UI (SPA)**
2. **Node.js + Express backend API**
3. **MongoDB database connection**
4. **Lecturer model + CRUD endpoint (only CREATE + GET + DELETE required)**
5. **Form to add a lecturer**
6. **Popup confirmation on success**
7. **Navigation to a Lecturers Table page**

---

# 🎨 Frontend (React) Requirements

## Pages / Components

### 1. **Add Lecturer Form Page**

Create a form that allows the user to add a new lecturer.

#### Form fields:

- **Lecturer Name** – text input (required)
- **Subjects knowledge list** – categories with numeric ranking

The user should rate the lecturer’s knowledge level (0–10 or 1–5, choose and document) for each subject.

#### Required Categories:

- React
- Node
- Angular
- .NET
- Microservices
- Microfrontends
- AI
- Docker

Each category must include:

- A **number input** (or slider/select) for the _knowledge rating_
- _Example:_

  - React: [ 0–10 ]
  - Docker: [ 0–10 ]

#### Form behavior:

- When the user submits:

  - Validate required fields
  - Send the data to the backend via a POST request
  - On success:

    - Show a **success popup** ("Lecturer added successfully")
    - Provide a button or link: **"Go to Lecturers Table"**

---

### 2. **Lecturers Table Page**

Create a page that fetches all lecturers from the backend and displays them in a table.

#### Table columns:

- Name
- React rating
- Node rating
- Angular rating
- .NET rating
- Microservices rating
- Microfrontends rating
- AI rating
- Docker rating

This page must call your backend GET endpoint and show the lecturers returned from MongoDB.

---

# ⚙️ Backend (Node.js + Express) Requirements

### 1. **Express Server Setup**

Create an Express server with:

- JSON body parsing
- CORS enabled
- Environment variables (PORT, MONGO_URL)

### 2. **MongoDB Models**

Create a **Lecturer** model with this structure:

```js
{
  name: String,
  skills: {
    react: Number,
    node: Number,
    angular: Number,
    dotnet: Number,
    microservices: Number,
    microfrontends: Number,
    ai: Number,
    docker: Number
  }
}
```

### 3. **API Routes**

#### POST `/api/lecturers`

- Receives lecturer data from the React form
- Validates required fields
- Saves lecturer to MongoDB
- Returns success response

#### GET `/api/lecturers`

- Returns the list of all lecturers
- Used by the Lecturers Table page

#### DELETE `/api/lecturers/:id`

- delete the lecturer
-

---

# 🗄 Database (MongoDB)

You must:

- Create a database (name is your choice: `lectures_management`, `lecturers_db`, etc.)
- Store all lecturers inside a collection called `lecturers`

---

# 🧪 What We Expect to See

### ✔ Functional Requirements

- Working form that submits new lecturers
- Ratings saved correctly for all categories
- Success popup on successful save
- Working table that lists all lecturers
- Clean UI and reasonable validation

### ✔ Technical Requirements

- React components organized logically
- Axios or Fetch used for API calls
- Express routes clean and modular
- Mongoose schema used properly
- Proper error handling in both client and server

---

## IMPORTANT

- input validation
- validate the lecturer is not exist
- table should show the information - order by datetime ( created at)
