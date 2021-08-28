const crypto = require('crypto')
const fs = require('fs')

async function run() {
    const file = await fs.readFileSync('./test.txt');


    const md5 = crypto
        .createHash('md5')
        .update(file.toString('latin1'), 'latin1')
        .digest('hex')

    console.log(md5)
}

run();
