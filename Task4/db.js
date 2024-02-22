const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "username",
  password: "password",
  database: "task4",
});

// Define the CREATE TABLE query
const createAuthorsTableQuery = `
  CREATE TABLE IF NOT EXISTS Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    bio TEXT
  )
`;

// Define another CREATE TABLE query for Posts table
const createPostsTableQuery = `
  CREATE TABLE IF NOT EXISTS Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
  )
`;

// Define the INSERT INTO queries for dummy data
const insertAuthorsQuery = `
  INSERT INTO Authors (name, email, bio) VALUES
  ('John Doe', 'john@example.com', 'Software engineer and blogger'),
  ('Jane Smith', 'jane@example.com', 'Freelance writer and poet'),
  ('Alice Brown', 'alice@example.com', 'Web developer and designer')
`;

const insertPostsQuery = `
  INSERT INTO Posts (title, content, author_id) VALUES
  ('Introduction to JavaScript', 'JavaScript is a powerful language...', 1),
  ('The Beauty of Nature', 'Nature''s beauty is unmatched...', 2),
  ('Building Responsive Websites', 'Responsive web design is crucial...', 3),
  ('JavaScript Tips and Tricks', 'Here are some useful JavaScript tips', 1),
  ('The Power of Words', 'Words have the power to inspire...', 2),
  ('Designing User-friendly Apps', 'User experience is key in app design', 3)
`;

// Function to execute a query and return a promise
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to execute all queries sequentially using async/await
async function executeQueries() {
  try {
    // Execute CREATE TABLE queries
    await executeQuery(createAuthorsTableQuery);
    console.log("Authors table created successfully");
    await executeQuery(createPostsTableQuery);
    console.log("Posts table created successfully");

    // Execute INSERT INTO queries for dummy data
    await executeQuery(insertAuthorsQuery);
    console.log("Dummy authors inserted successfully");
    await executeQuery(insertPostsQuery);
    console.log("Dummy posts inserted successfully");

    // Retrieve data
    const retrieveQuery =
      "SELECT * FROM Posts p JOIN Authors a ON p.author_id = a.author_id WHERE a.name = 'John Doe'";
    const results = await executeQuery(retrieveQuery);
    console.log(results);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection
    pool.end();
  }
}

// Call the function to execute all queries
executeQueries();
