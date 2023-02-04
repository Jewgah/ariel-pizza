const { generateData } = require('./simulator');


const orders1 = generateData(10, 1);
console.log("Orders from branch 1:", orders1);

const orders2 = generateData(5, 2);
console.log("Orders from branch 2:", orders2);