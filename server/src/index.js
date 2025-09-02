const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // explicitly allow frontend
  credentials: true                // allow cookies/auth headers
}));

const userAuthRoute = require('./routes/userauth.route');
app.use("/auth", userAuthRoute);


module.exports = app;