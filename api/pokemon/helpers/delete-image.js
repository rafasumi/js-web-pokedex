const {unlink} = require('fs').promises;
const {resolve} = require('path');

async function deleteImage(fileName) {
    const relPath = process.env.uploadPath;
    const filePath = resolve(__dirname, relPath, fileName);
    
    await unlink(filePath);
}

module.exports = deleteImage;