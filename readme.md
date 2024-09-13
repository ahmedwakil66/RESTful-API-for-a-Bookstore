This is an [ExpressJS](https://expressjs.com/) project.<br>
You will need [`NodeJS`](https://nodejs.org/) and [MySQL](https://www.mysql.com/) installed on your local machine.

### First Thing First

Install necessary dependencies, run:

```bash
npm install
```

### Prerequisite

Review `.env` and make sure database related variables are okay with yours <br>

The app won't start if it -

- fails to connect to the database
- fails to initiate jsonwebtoken instance

### How to run

```bash
npm run dev
```

Execute the above command in terminal to start the development server at [http://localhost:3000](http://localhost:3000). If port `3000` is busy for you, please either free it or change the port number in `.env` file. Also make sure that your terminal entry point is the project root.

### What Is This Project?

This project is an assessment task for nodejs developer position at [https://m360ict.com/](https://m360ict.com/).

### How much is implemented?

Everything that are asked in the original instruction has been implemented.

1. Environment Setup: DONE
2. Database Schema: DONE
3. Endpoints: DONE
4. Validation: DONE
5. View: DONE
6. Error Handling: DONE
7. TypeScript: DONE
8. Database Connection: DONE (MySQL)
9.  Project Structure: DONE
10. Bonus (Optional): DONE in the following way:

    - Implemented pagination for the GET /books and GET /authors endpoints. **Visitor may define page number and limit count. Default limit is 10.**
    - Add a search functionality to filter books by title and authors by name. **get books route accepts a query parameter eg: ?author=2 and for get authors, it will be eg: ?name=author_name**
    - Implement authentication and authorization using JWT (JSON Web Tokens). **A cookie based authentication has been implemented. For convenience, authorization has only been applied for delete routes. Only the author itself can delete its associated data.**

```
*** IMPORTANT ***

At author's creation, a default password '12345' is set, and remember that currently there is no way to manually set or update the password. But security is not ignored! Plain password is not stored in database. A hash with random salt is generated on the fly before saving the author. You can check it by querying authors at get routes.
```

##### If you are reading this far kindly  have me in your connection in [LinkedIn](https://www.linkedin.com/in/wakil-ahmed-a62a47248/). <br/> I would love to hear your suggestions. <br/> That was all. Thank You!


## Original instructions

### Task: Create a RESTful API for a Bookstore

### Objective:
Build a RESTful API for managing a bookstore. The API should allow users to perform CRUD (Create, Read, Update, Delete) operations on books and authors.

The project should use TypeScript for type safety, Express for the web framework, Express Validator for input validation, and either MySQL or PostgreSQL for the database.

### Requirements:

1. #### Environment Setup:
   - Initialize a new Node.js project with TypeScript.
   - Use Knex as a query builder.
   - Configure ESLint and Prettier for code quality and formatting.
   - Use a .env file for environment variables.

2. #### Database Schema:
   - Create a schema for the database with the following tables:
        - #### authors:
            - id (primary key, auto-increment)
            - name (string, required)
            - bio (text, optional)
            - birthdate (date, required)

       - #### books:

            - id (primary key, auto-increment)
            - title (string, required)
            - description (text, optional)
            - published_date (date, required)
            - author_id (foreign key, references authors.id, required)

3. #### Endpoints:

   - #### Authors:
        - GET /authors: Retrieve a list of all authors.
        - GET /authors/:id: Retrieve details of a single author.
        - POST /authors: Create a new author.
        - PUT /authors/:id: Update an existing author.
        - DELETE /authors/:id: Delete an author.

   - #### Books:
        - GET /books: Retrieve a list of all books.
        - GET /books/:id: Retrieve details of a single book.
        - POST /books: Create a new book.
        - PUT /books/:id: Update an existing book.
        - DELETE /books/:id: Delete a book.

   - #### Queries:
       - GET /books?author=6 Retrieve a list of all books written by a specific author.

4. #### Validation:
   - Use Joi or Express Validator to validate request bodies for the POST and PUT endpoints.
   - Ensure that:
        - name is a non-empty string.
        - birthdate is a valid date.
        - title is a non-empty string.
        - published_date is a valid date.
        - author_id is a valid reference to an existing author.

5. #### Views:
   - Implement views to retrieve:
        - A list of authors along with their respective books.
        - A detailed view of an author with a list of their books.
        - A detailed view of a book with author information.

6. #### Error Handling:
   - Implement proper error handling and return meaningful HTTP status codes and error messages.
   - Handle common errors like resource not found, validation errors, and database connection errors.

7. #### TypeScript:
   - Ensure all code is typed, including request and response objects.
   - Use interfaces to define the shape of data.

8. #### Database Connection:
   - Use a database client library like mysql2 for MySQL or pg for PostgreSQL.
   - Create a connection pool for efficient database operations.
   - Use environment variables to manage database credentials.

9. #### Project Structure:
   - Follow best practices for project structure, such as separating routes, controllers, and models.

### Bonus (Optional):
- Implement pagination for the GET /books and GET /authors endpoints.
- Add a search functionality to filter books by title and authors by name.
- Implement authentication and authorization using JWT (JSON Web Tokens).

### Deliverables:
- Source code in a public Git repository (e.g., GitHub).
- README file with instructions on how to set up and run the project.
- SQL script or migration files for setting up the database schema.
- Env file
