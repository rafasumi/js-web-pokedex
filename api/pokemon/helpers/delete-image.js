const fs = require('fs').promises;
const path = require('path');
const config = require('config');

async function deleteImage(fileName) {
    const relPath = config.get('api.uploadPath');
    const filePath = path.resolve(__dirname, relPath, fileName);
    
    await fs.unlink(filePath);
}

module.exports = deleteImage;