const fs = require('fs');
const db_path = '../DroidScript';
var js = '';

['db', 'db.localidades', 'db.tipos', 'db.dias'].forEach((file) => {
  js += '\n' + fs.readFileSync(`${db_path}/${file}.js`);
});

eval(js);

module.exports = $db;