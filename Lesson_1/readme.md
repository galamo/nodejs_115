# Node 
1. create new file logger.js - with function `logger`
2. `logger("TEXT")` => `[CURRENT TIMESTAMP] => TEXT`
3. create new file - index.js call logger from index.js `logger("hello world")` => ['2025-07-20T15:28:52.783Z']=>hello world



# Api
1. create new entry point 
2. HTTP GET /users
3. the API will return 10 random users ( create json )


4. create new entry point
5. HTTP GET /search
6. query param id=userId
7. if user id is not sent in the middleware - send back bad request status 400

# Homework 20-7
Create API from scratch
1. API - login  POST /login 
2. API - register POST /register - { userName, password } 
- when calling register the username and password will saved in users array in the server ( global param)
- when calling login the api will check if the username and passowrd exist in the users array - return 200 OK or 401
- use bodyParser middleware
