# Build image based on dockerfile
- docker build -t test_4 . 
                  image tag name, . - refers to the folder
- docker run test_4

- docker exec -it "<ContaienrId>" sh 