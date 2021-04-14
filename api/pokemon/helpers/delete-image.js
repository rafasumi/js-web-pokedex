const {unlink} = require('fs').promises;
const {resolve} = require('path');
const config = require('config');

async function deleteImage(fileName) {
    const relPath = config.get('api.uploadPath');
    const filePath = resolve(__dirname, relPath, fileName);
    
    await unlink(filePath);
}

module.exports = deleteImage;