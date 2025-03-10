# eCommerce Application

This project is an eCommerce application built with Node.js, Express, and Sequelize (with PostgreSQL as the database). Follow these instructions for installation, environment setup, testing, and troubleshooting.

---

## Installation

1. **Clone the Repository:**

    ```bash
    git clone <githubUrlHere>
    cd your-repo
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

---

## Environment Setup

1. **Create a `.env` File:**

    In the root directory of the project, create a file named `.env`.

2. **Configure Environment Variables:**

    Add the following lines to your `.env` file. Replace the placeholders with your actual configuration values:

    ```env
    # Database connection string for PostgreSQL
    DATABASE_URL=postgres://username:password@localhost:5432/your_database_name

    # Port for the Express server
    PORT=5000
    ```

3. **Important Notes:**

    - Ensure that your PostgreSQL server is running.
    - The `DATABASE_URL` must be in the correct format. Double-check for any typos.
    - Use environment variables to keep sensitive data out of your source code.

---

## Testing

### Testing Database Connection

Before starting the server, verify your database connection by running:

```bash
npm run test-db
```

If successful, you'll see output similar to:

```
✅  Database connection successful: { now: 2025-03-09T13:40:41.051Z }
```

### Testing Models

To test your models, follow these steps:

1. **Create a `.env.test` file**  
   Ensure you have a `.env.test` file set up with the necessary environment variables, using your local database for testing.

2. **Run the test script**  
   Execute the following command:

    ```bash
    npm run test-models
    ```

This script will:

-   Synchronize the database (drop existing tables and re-create them).
-   Create tables and insert test data.

Expected output:

```
Model User loaded successfully.
Model Product loaded successfully.
Model Order loaded successfully.
Model Category loaded successfully.
Database synchronized.
User created: { id: 1, name: 'Test User', email: 'test@example.com' }
Product created: {
  id: 1,
  name: 'Book Title',
  description: 'A very interesting book description that is more than fifty characters long to satisfy the validation rules.',
  price: 19.99,
  categoryId: 1
}
Order created: {
  id: 1,
  userId: 1,
  products: [ { productId: 1, quantity: 2 } ],
  total: 39.98
}
All models tested successfully.
```

---

## Troubleshooting

### Port Conflict on macOS

When running the server with:

```bash
node server.js
```

Mac users might encounter an error similar to:

```
Error: listen EADDRINUSE: address already in use :::5000
```

This issue occurs because port `5000` is often used by the system for the internet WLAN on macOS.

**Fix:**

1. Open your `.env` file.
2. Update the `PORT` value to a different port, such as `5001`:

    ```env
    PORT=5001
    ```

3. Restart your server:

    ```bash
    node server.js
    ```
