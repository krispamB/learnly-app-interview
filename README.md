# Taskman App
## Overview
This is a simple task management API. It provides basic CRUD (Create, Read, Update, Delete) operations for managing tasks. And also uses JWT for authentication and authorization. 

## Features

- Create a user with name, email and other basic information.
- Login in user with email and password.
- Creating a task with task name, description and other important information.
- Retrieving a particular task by ID.
- Retrieving task for specific user.
- retrieving all tasks from database.
- Updating an existing task.
- Deleting a task.

## Getting Started

### Prerequisites
- This API was created using nestjs, therefore you must have [nestjs](https://docs.nestjs.com/) installed on your machine.
- get a postgres database running.

## Dependencies used
### Validation
For data integrity, I used class-validator and class-transformer. With the help of DTO (Data Transfer Object), I have been able to validate form input and return the appropriate responses.

### Authorization and Authentication
I used Jwt with passport to give authorization to users, authenticate users and also restrict access to some API endpoints.

### API Response
I created a generic API response type so all responses would have the same format. You can find this in the common/types/defaultReturn.type.ts file.

## Installation
1. Clone this repository:
```bash
 git clone https://github.com/krispamB/learnly-app-interview
```
2. Install dependencies:
```bash
  npm install or yarn install
```
3. Start the server:
  ```bash
    yarn start:dev
  ```

## Usage

### Endpoints

- **POST /auth/signup:** To signup user.
- **POST /auth/login:** To login user, this returns the access token.
- **POST /task:** Create a task.
- **GET /task/:taskId:** Get task by Id.
- **GET /task/user:** Get logged in user task.
- **GET /task/all:** Get all tasks in DB.
- **PATCH /task/:taskId:** Update user task.
- **DELETE /task/:taskId:** Get logged in user task.

## Testing
To test the API:
- Go to the published postman docs at [DOCS](https://documenter.getpostman.com/view/31093363/2s9YeN3UgQ)
- Click on **Run in Postman**(You can use it on the web)
- Select a workspace.
- Add **LIVE_URL** to a new environment and set the initial and current value to: 
```
https://tiny-tan-chinchilla-garb.cyclic.app/api/v1
```
and save.
- Run tests.



## DB DIAGRAM
You can find the Database model at [DB](https://lucid.app/documents/view/6390f608-b069-47c1-894e-f075f8dc6e7e)
