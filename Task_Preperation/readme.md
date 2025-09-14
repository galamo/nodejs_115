# Lecturer Knowledge Management System

## Task Overview

Your task is to build a **Lecturer Knowledge Management System** using the following stack:

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: MySQL

You will implement a full-stack CRUD application that allows managing lecturers and tracking their knowledge levels across different tech domains.

Create a web application where users can:

- View a list of lecturers.
- See each lecturer's name, email, age, and number of courses taken.
- Rate each lecturer’s knowledge level in several technical domains.
- When adding new lecture, need to check duplication email ( should be the uniuqe column)

---

## Functional Requirements

### Lecturer Table UI

The frontend must display a **table** with the following columns:

| Name | Email | Age | # of Courses | Full Stack Dev | AI Tools | n8n | MySQL | MongoDB |
| ---- | ----- | --- | ------------ | -------------- | -------- | --- | ----- | ------- |

- Each of the tech domain columns (`Full Stack Dev`, `AI Tools`, `n8n`, `MySQL`, `MongoDB`,`Node.js`, `Typescript`) should be a **dropdown (DDL)** with the following levels:

  - No knowledge
  - Low
  - Medium
  - Expert

### Interaction

- When a user selects a new knowledge level from the dropdown:

  - An API request must be sent to **update the lecturer’s knowledge level** for that domain.
  - The update must happen based on the **lecturer’s ID** OR **Email**.

---

### Backend

- Create an **Express.js** server in **Node.js**.
- Define API endpoints for:

  - Fetching all lecturers with their knowledge levels.
  - Updating a lecturer’s knowledge level by ID and domain.

- Use **TypeScript** on the backend as well.

### Database

- Use **MySQL** to store all data.
- Define tables such as:

Suggestion Only:

```sql
Lecturers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  age INT,
  courses_count INT
)

KnowledgeLevels (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lecturer_id INT,
  domain VARCHAR(255), -- e.g., 'AI Tools', 'Full Stack Dev'
  level ENUM('No knowledge', 'Low', 'Medium', 'Expert'),
  FOREIGN KEY (lecturer_id) REFERENCES Lecturers(id)
)
```

## API Requirements

### `GET /lecturers`

- Returns a list of all lecturers with their basic info and knowledge levels.

### `PUT /lecturers/:id/knowledge`

- Updates a lecturer’s knowledge level in a specific domain.

**Request Body Example:**

```json
{
  "domain": "AI Tools",
  "level": "Expert"
}
```

---
