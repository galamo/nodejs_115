# Running MySQL in Docker and Connecting with MySQL Workbench

This guide explains how to set up MySQL in Docker with initial data, download MySQL Workbench, and connect to the database.


## Prerequisites

1. **Docker**: Ensure Docker is installed and running on your system.  
   [Download Docker](https://www.docker.com/products/docker-desktop/)

2. **MySQL Workbench**: Download and install MySQL Workbench.  
   [Download MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

3. all the relevant commands need to be done in the folder: db

## Step 1: Set Up MySQL with Docker

1. **Create a Directory for Your Setup**:
   ```bash
   mkdir mysql-docker && cd mysql-docker
   ```

2. **Prepare Initial Data**:
   In your db folder you have an existing file with initial data, the data will be created automatically when running the mysql docker
   

3. **Start the MySQL Container**:
   Run the following command to start MySQL:
   ```bash
   docker-compose up -d
   ```

4. **Verify the Setup**:
   Check that the container is running:
   ```bash
   docker ps
   ```



## Step 2: Install MySQL Workbench

1. Visit the [MySQL Workbench download page](https://dev.mysql.com/downloads/workbench/).
2. Select your operating system and download the installer.
3. Follow the installation instructions for your platform.

## Step 3: Connect to MySQL from MySQL Workbench

1. Open **MySQL Workbench**.
2. Click on the **+** icon next to "MySQL Connections" to create a new connection.
3. Fill in the connection details:
   - **Connection Name**: (Any name, e.g., `Docker MySQL`)
   - **Hostname**: `127.0.0.1`
   - **Port**: `3306`
   - **Username**: `root`
   - **Password**: `root` (or whatever you set in `MYSQL_ROOT_PASSWORD`).
4. Click **Test Connection** to ensure the connection is successful.
5. Click **OK** to save the connection.


## Step 4: Explore the Database

1. Open the connection you just created in MySQL Workbench.
2. Navigate to the `test_db` database.
3. View the `users` table to see the initial data loaded from `init.sql`.


## Stopping MySQL

To stop the MySQL container:
```bash
docker-compose down
```
