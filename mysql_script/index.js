import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateSQLQuery(userInput) {
  const schema = `
  CREATE DATABASE IF NOT EXISTS my_database;
  USE my_database;

  CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      age INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      job_name VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL
  );

  CREATE TABLE users_jobs (
      user_id INT NOT NULL,
      job_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, job_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );
  `;

  const prompt = `
  You are a SQL expert. 
  Generate a MySQL query based on the following user request.
  Schema:
  ${schema}
  
  User request: "${userInput}"
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: "You are a helpful SQL generator." },
      { role: "user", content: prompt },
    ],
    max_tokens: 300,
  });

  // Extract the generated SQL
  const sqlQuery = response.choices[0].message.content.trim();
  return sqlQuery;
}

// Example usage
(async () => {
  const userInput = "Aggregate all jobs and count users for each job";
  const query = await generateSQLQuery(userInput);
  console.log(query);
})();
