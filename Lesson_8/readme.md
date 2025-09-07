# Dockerizing Nodejs app

1. docker build -t api-env-1 .
2. docker run -p 3500:3500 --env-file .env api-env-1

# Ex 
1. Create a new Environment variables:
- Secret - from .env process.env.SECRET
- print the Secret on container loading.
