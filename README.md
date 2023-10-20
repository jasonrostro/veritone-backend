# Shopping List Backend

This is the backend of simple shopping site for coding challenge.

## Installation

1. Clone the repository:

```
git clone https://github.com/jasonrostro/veritone-backend.git
```

2. Change to the project directory:

```
cd veritone-backend
```

3. Install dependencies:

```
npm install
```

4. Set up PostgreSQL database:

   - Install PostgreSQL if you haven't already: [PostgreSQL Downloads](https://www.postgresql.org/download/)
   - Create a new PostgreSQL database for the project.
   - Update the database configuration in the `config/db.config.js` file with your PostgreSQL credentials.

5. Run database migrations:

```
npm run migrate
```

This will create the necessary tables in the PostgreSQL database.

6. Start the development server:

```
npm start
```

The server will start running on `http://localhost:8000`.

## Usage

- API routes can be accessed using the specified endpoints and HTTP methods.
- Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the API endpoints.
- The project includes sample routes in the `routes` directory. Feel free to add your own routes and logic as needed.

## Configuration

- Database configuration can be found in the `config/db.config.js` file.
- Update the PostgreSQL credentials according to your setup.
- Customize any other configuration variables as required.

## Dependencies

- Express: Fast, unopinionated, minimalist web framework for Node.js.
- pg: PostgreSQL client for Node.js.
- sequelize: Promise-based ORM for Node.js.
- body-parser: Node.js body parsing middleware.

For a complete list of dependencies, refer to the `package.json` file.

## Contributing

Contributions are always welcome! Please feel free to submit a pull request.

## License

The project is licensed under the [MIT License](LICENSE).
