const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'HOST', 
     user:'USER', 
     password: 'PASS',
     //connectionLimit: 15
});

module.exports = pool;



