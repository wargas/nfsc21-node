const Nfsc = require('../Nfsc');
const data = require('../data.json');

const nfsc = new Nfsc(data)

const { mestres, items, cadastros } = nfsc.make();

console.log({ mestres, items, cadastros })