USE my_database;

-- Seed users
INSERT INTO users (first_name, last_name, age) VALUES
('John', 'Doe', 28),
('Jane', 'Smith', 34),
('Alice', 'Johnson', 25),
('Bob', 'Brown', 40),
('Charlie', 'Davis', 22),
('Eve', 'Miller', 30),
('Frank', 'Wilson', 27),
('Grace', 'Taylor', 29),
('Hank', 'Anderson', 35),
('Ivy', 'Thomas', 31);

-- Seed jobs
INSERT INTO jobs (job_name, price) VALUES
('Developer', 5000.00),
('Designer', 4000.00),
('Manager', 7000.00),
('Tester', 3500.00),
('DevOps', 6000.00),
('HR', 4500.00),
('Analyst', 4800.00),
('Support', 3000.00),
('Consultant', 6500.00),
('Intern', 1500.00);

-- Seed users_jobs
INSERT INTO users_jobs (user_id, job_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
