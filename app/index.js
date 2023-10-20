const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db.config");
const productRoute = require("./routes/productRoute");
require("dotenv").config();

const app = express();

//MiddleWare
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Sync database
db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Routes
app.use("/api/products", productRoute);

// Start the server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

module.exports = app;
