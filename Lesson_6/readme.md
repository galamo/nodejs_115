# Building Login Test

1. implement Login Handler, SELECT query
2. `SELECT * FROM northwind.users where email = ? AND password = ?`
3. `[email,password]`
4. if we found a user return true - generate token...
5. else failed
6. integration test =>
7. Connect to DB from test folder
8. Writing a query to insert a user into the DB ( dummyuser )
9. Run login test with dummyuser
10. delete dummyuser

# EX - Create full expenses flow

1. Create table expenses - the table will contain id, amount, category , date, description
2. create api GET /expenses - get all expenses between dates.
3. create api POST /expense - create new expense amount, category , date, description
4. create integration test for each api

# EX

1. Create Test Util which deletes an Expense with only recieving input ID.
2. Replace between rows

```javascript
app.use("/api/expenses", expensesRouter);
app.use(authorizationMiddleware); // all the routers below protected!!!
```

and try to run the tests, whats wrong? how should it be fixed?

3. create 2 entry potins

- first one will return all the relevant expenses distinct

```sql
SELECT DISTINCT
    (category)
FROM
    northwind.expenses;
```

- second request should return aggregated expenses amount by category

```sql

SELECT
category, SUM(amount) AS total_amount
FROM
northwind.expenses
GROUP BY category
HAVING total_amount > 1000
ORDER BY total_amount DESC


```

# Homework

### FULLSTACK FLOW

1. Using the client application, after user perform a login
2. page redirect to data - page
3. change data => expenses
4. support fetching the data from expenses
5. remember - use seed to insert data
6. advanced - create pie chart for the statiscs data
7. present all the data in the same page ? new statiscs page.

#### Running security-app-starter

1. navigate to folder security-app-starter
2. run `npm i`
3. run `npm run dev`

# FS Flow 2

1. Support new route client /orders
2. table will show the orders, employee name and customer name
3. show only the following information - orderId, employee full name, customer full name, shipping fee, ship city
4. use mainAxios
5. protect the entry point - authorization
6. create api route GET /orders , implement query with JOIN

```sql
SELECT
    northwind.orders.id AS order_id,
    CONCAT(employees.first_name,
            ' ',
            employees.last_name) AS employee_full_name,
    CONCAT(customers.first_name,
            ' ',
            customers.last_name) AS customer_full_name,
    shipping_fee,
    ship_city,
    orders.order_date
FROM
    northwind.orders
        JOIN
    employees ON northwind.orders.employee_id = employees.id
        JOIN
    customers ON northwind.orders.customer_id = customers.id


```

# Define for /dates

1. the following roles - ["admin", "viewer", "owner" , "configurator"]
2. change the test according to the new roles ( in case needed )

# Use the new API result /user/details

1. support showing or not the "create new expesne" Button
2. according the user role, admin, show it, not admin, hide.
3. show the user email at the header - dynamically according to the response
- only after login