require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const connection = require('./config/connect')

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

connection.connect(err => {
  if (err) {
    console.error('Error when connecting DB: ', err.stack);
    return;
  }
  console.log('Database connection successful as: ', connection.threadId);
});

const selectValuesQuery = `SELECT * FROM \`wig20DailyPoints\` `;

let selectQueryResult;
  
connection.query(selectValuesQuery, (err, results) => {
  if (err) {
    console.error('Error when quering: ', err);
    return;
  }

  console.log('result: ', results);
  selectQueryResult = results;

  connection.end(err => {
    if (err) {
      console.error('Error when disconnecting DB: ' + err);
      return;
    }
    console.log('DB disconnected succesfully');
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to stock-API!: <br /><br />' + JSON.stringify(selectQueryResult));
})

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is listening on port ${port}...`));
