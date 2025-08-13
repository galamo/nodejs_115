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
