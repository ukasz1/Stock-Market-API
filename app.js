require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.get('/', (req, res) => {
  res.send('Welcome to stock-API!');
})

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is listening on port ${port}...`));
