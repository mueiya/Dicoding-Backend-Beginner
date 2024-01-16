# Dicoding BackEnd Beginner - Submission Bookshelf API

This repository contains the code for the BackEnd Beginner course submission on Dicoding. The project is named "Submission Bookshelf API," which is a simple RESTful API developed using the Hapi framework in Node.js. The API allows basic CRUD (Create, Read, Update, Delete) operations related to bookshelf data.

## Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) installed
- Any code editor of your choice (e.g., Visual Studio Code)

## Getting Started

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/mueiya/Dicoding-BackEnd-Beginner.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Dicoding-BackEnd-Beginner
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the application:

    ```bash
    npm start
    ```

   The API will be accessible at [http://localhost:9000](http://localhost:9000).

## Development

If you want to run the application in development mode with auto-restart using nodemon:

```bash
npm run start-dev
```

## Endpoints

- `GET /books`: Get all books.
- `GET /books/{bookId}`: Get a specific book by ID.
- `POST /books`: Add a new book.
- `PUT /books/{bookId}`: Update a book by ID.
- `DELETE /books/{bookId}`: Delete a book by ID.

## Usage

You can use tools like [Postman](https://www.postman.com/) to test the API endpoints.
