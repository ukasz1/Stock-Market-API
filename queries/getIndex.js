const getCandlestickIndexDetails = (connection) => {
  return new Promise((resolve, reject) => {
    const getCandlestickDataQuery = `SELECT * FROM ${process.env.WIG20TABLE} `;

    connection.query(getCandlestickDataQuery, (err, results) => {
      if (err) {
        console.error('Error when querying: ', err);
        reject(err);
        return;
      }
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
      resolve(results);
    });
  })
}

module.exports = {
  getCandlestickIndexDetails,
  getIndexValues
};
