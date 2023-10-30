const getIndex = (connection) => {
  return new Promise((resolve, reject) => {
    const getAllIndexQuery = `SELECT * FROM ${process.env.WIG20TABLE} `;

    connection.query(getAllIndexQuery, (err, results) => {
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

module.exports = getIndex;
