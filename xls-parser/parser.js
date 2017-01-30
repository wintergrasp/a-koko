// https://github.com/SheetJS/js-xlsx

const XLSX = require('xlsx');

var file = process.argv[2];

if (!file) {
  console.error('USAGE:');
  console.error('$ ', process.argv[0], process.argv[1], 'file.xls');
  process.exit(1);
}

console.info('File:', file);

try {
  const workbook = XLSX.readFile(file);
} catch (e) {
  console.error('Error! Invalid input file', file);
  throw e;
}

const sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach((sheet_name) => {
  if (sheet_name) {
    var worksheet = workbook.Sheets[sheet_name],
        merges = worksheet['!merges'];

    for (cell_address_code in worksheet) {
      // all keys that do not begin with "!" correspond to cell addresses
      if (cell_address_code[0] === '!') continue;

      var cell_address = XLSX.utils.decode_cell(cell_address_code),
          cell_value = worksheet[cell_address_code].w,
          cell_x = cell_address_code.replace(/\d+/g, ''),
          cell_y = cell_address_code.replace(/[a-zA-Z]+/g, '');

      //console.log(`${sheet_name}!${cell_address_code}:`, cell_value, cell_address);
    }
  }
});

console.info('Finish');