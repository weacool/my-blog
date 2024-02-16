const { Pool } = require("pg");
const express = require("express");
const createBlogServer = (app) => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "bokuwachrisdesu123",
    port: 5432,
  });

  pool.on("connect", () => {
    console.log("Connected to the database");
  });
  app.use(express.json());

  // Endpoint to fetch blogs
  app.get("/api/blogs", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM blogs");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
};

// Exporting the function
module.exports = createBlogServer;
