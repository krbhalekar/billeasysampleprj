# Project Title

Build a secure file upload service in Node.js that stores file metadata in a database, runs background processing tasks, and tracks the status of those tasks.

## Features

- User Creation API
- Login and Validate User API
- Provide Json Web Token on successful login
- File Upload API using JWT for Authentication
- Maintain logs for files uploaded
- Get file information using file id

## Project Structure

- controller/
- cron/
- database/
- node_modules/
- redis/
- routes/
- services/
- uploads/
- utils/
- .env
- app.js
- package.json
- README.md

## Usage

- Run the below command to install all packages and dependencies
    - npm install

- Create .env file if not present
    - #POSTGRE DB DETAILS
    - DB_USER='sampleuser'
    - DB_HOST = 'localhost'
    - DB_PASSWORD = 'Password@123'
    - DB_NAME = 'sampledb'
    - DB_PORT = 5432


    - #APPLICATION CONSTANTS
    - SERVER_PORT = 9891
    - SECRET_KEY = "7r849urifjnj4g47ty749u4ijfn4u84ty748i4huigu"
    - TOKEN_EXPIRY = "24h"
    - REDIS_HOST = 'localhost'
    - REDIS_PORT = 6379
    - REDIS_QUEUE = 'bill-easy-queue'

- Run the file named as app.js using below mentioned command
    - node app.js

- Run the file named as addfiletoredis.js using below mentioned command
    - node cron/addfiletoredis.js

- Run the file named as consumer.js using below mentioned command
    - node redis/consumer.js

## Example

- User Creation API

    - curl --location 'http://localhost:9891/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"abc@gmail.com",
    "password":"123456"
}'

- Login API

    - curl --location 'http://localhost:9891/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"krb15784@gmail.com",
    "password":"123456"
}'

- File Upload API

    - curl --location 'http://localhost:9891/file/upload' \
--header 'accesstoken: <JSON_WEB_TOKEN>' \
--form 'file=@"/home/khushal/sample.txt"' \
--form 'title="sample title"' \
--form 'description="this is description"'

- Get File using File Id API

    - curl --location 'http://localhost:9891/file/files/8' \
--header 'accesstoken: <JSON_WEB_TOKEN>'
