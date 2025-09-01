const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // explicitly allow frontend
  credentials: true                // allow cookies/auth headers
}));

app.use(express.json());


module.exports = app;