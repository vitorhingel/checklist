require('dotenv').config();

const express = require('express');

const usersRouter = require('./routes/users');

const app = express();
const port = process.env.API_PORT || 10000;

app.use(express.json());

app.use(usersRouter);

app.listen(port, () => {
  console.log(`Server is running at localhost: ${port}`);
});
