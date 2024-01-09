const getCandlestickIndexDetails = (connection) => {
  return new Promise((resolve, reject) => {
    const getCandlestickDataQuery = `SELECT * FROM ${process.env.WIG20TABLE} `;

    connection.query(getCandlestickDataQuery, (err, results) => {
      if (err) {
        console.error('Error when querying: ', err);
        reject(err);
        return;
      }
      console.log('result: ', results);
      resolve(results);
    });
  })
}

const getIndexValues = (connection) => {
  return new Promise((resolve, reject) => {
    const getIndexValuesQuery = `SELECT close, time FROM ${process.env.WIG20TABLE} `;

    connection.query(getIndexValuesQuery, (err, results) => {
      if (err) {
        console.error('Error when querying: ', err);
        reject(err);
        return;
      }
      console.log('result: ', results);
      resolve(results);
    });
  })
}

module.exports = {
  getCandlestickIndexDetails,
  getIndexValues
};
