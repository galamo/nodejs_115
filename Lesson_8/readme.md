# Dockerizing Nodejs app

1. docker build -t api .
2. docker run -p 3500:3500 --env-file .env api

# Ex 
1. Create a new Environment variables:
- Secret - from .env process.env.SECRET
- print the Secret on container loading.
