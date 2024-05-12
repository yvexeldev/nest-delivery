# NestJS Sequelize Example

This is an extended example project showcasing the usage of NestJS with Sequelize for database operations, including authentication, authorization, database relations, and Swagger documentation. This project is useful for beginners looking to understand these concepts in a practical scenario.

## Features

- RESTful API endpoints for managing users, posts, and comments.
- JWT-based authentication and authorization middleware.
- Sequelize models for user, post, and comment entities with relationships.
- Express middleware for error handling.
- Swagger documentation for API endpoints.

## Requirements

- Node.js and npm installed on your machine.
- PostgreSQL database server running locally or remotely.
- Basic knowledge of NestJS, Sequelize, and Swagger.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yvexeldev/delivery-nest.git
   ```

2. Install dependencies:

   ```bash
   cd delivery-nest
   npm install
   ```

3. Set up the database:

   - Create a PostgreSQL database.
   - Copy the `.env.example` file to `.env` and update the database connection string.

4. Start the server:

   ```bash
   npm run start:dev
   ```

5. View Swagger documentation:

   Open your browser and navigate to `http://localhost:<PORT>/api/docs`.

## Endpoints

- All endpoints you can at `http://localhost:<PORT>/api/docs`
  
## Technologies Used

- NestJS - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- Sequelize - A promise-based Node.js ORM for PostgreSQL, MySQL, SQLite, and MSSQL.
- PostgreSQL - A powerful, open-source object-relational database system.
- Swagger - A tool for API documentation.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
