# Dockerizing Nodejs app

1. docker build -t api-ts-stage .
2. docker run -p 3500:3500 --env-file .env api-ts-stage

# Ex 1
1. Create a new Environment variables:
- Secret - from .env process.env.SECRET
- print the Secret on container loading.


# Ex 2
- move the following libs to dev dependencies 
 "@types/dotenv": "^8.2.3",
 "@types/express": "^5.0.3",
 "typescript": "^5.9.2"

