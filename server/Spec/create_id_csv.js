const fs = require('fs');

let csvData = 'id,\n';

for (let i = 9000000; i < 10000000; i++) {
  csvData += `${i}\n`;
}

fs.writeFileSync('./id.csv', csvData);


