const { Web3Storage, File } = require('web3.storage');
require('dotenv').config();

const client = new Web3Storage({ token: process.env.WEB3_TOKEN });

function makeFileObjects(obj) {
    const buffer = Buffer.from(JSON.stringify(obj));
    return [
        new File([buffer], 'users.json'),
    ];
}

async function uploadToIPFS(data) {
    return await client.put(makeFileObjects(data));
}

module.exports = { client, uploadToIPFS };