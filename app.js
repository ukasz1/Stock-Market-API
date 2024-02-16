require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const connection = require('./config/connect');

const {getCandlestickIndexDetails, getIndexValues} = require('./queries/getIndex');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

// Establishing DB connection
connection.connect(err => {
  if (err) {
    console.error('Error when connecting DB: ', err.stack);
    return;
  }
  console.log('Database connection successful as: ', connection.threadId);
});

// Endpoints
app.get('/', (req, res) => {
  res.send('<h2>Welcome to stock-API!<h2>');
});

app.get('/wig20', async (req, res) => {
  const chartType = req.query.type;

  if (chartType === 'line') {
    try {
      const data = await getCandlestickIndexDetails(connection);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'DB error' });
    }
  } else if (chartType === 'candlestick') {
    try {
      const data = await getCandlestickIndexDetails(connection);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'DB error' });
    }
  } else {
    console.log('Chart type error - bad request');
    res.status(400).json({ error: 'Bad request'})
  }
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is listening on port ${port}...`));
