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



# How to start developing this Task ? (Ofek)
1. Create MySQL scripts for tables? 
2. Entry Points API? 
3. UI - table
4. Node.js Connect TO TABLE DB 
5. Entry point? in API 
6. Tets


# How to start developing this Task ? (Talya)
1. Client - Start with Axios client GET/PUT
2. DB - create DB 
3. Backend to DB
4. Client connect to Server 


# How to start developing this Task ? (Idan)
1. Create DB - Structure, + data.sql, dummy data. 
2. API - entry points
3. Client templates - call api 



# How to start developing this Task? 
START WITH GITHUB REPO.

1. Docker compose + Mysql + sql structure - 10m
2. Workbench - check connectivity -  10m 
3. + sql data. - 5m
4. API - Node.js Express + middelware + usefull  + ts build `npm run all` - 25m
5. API - Entry point -/ HC - 5m 
6. DB Connectivity from Node.js ( hardcoded and then .env ) - 10m  
7. API - /GET + integration test - 10m 
8. API - /PUT + integration test- 10m 
9. Client Application in react - 30m 
10. Components + Services: Api layer (7+8) 10m 
11. UI finlization + validations + manual tests - 20m 
12. submittion - 1m 


