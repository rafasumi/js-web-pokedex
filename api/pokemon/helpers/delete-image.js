const fs = require('fs').promises;
const path = require('path');
const config = require('config');

function deleteImage(fileName) {
    const relPath = config.get('api.uploadPath');
    const filePath = path.resolve(__dirname, relPath, fileName);
    
    return fs.unlink(filePath);
}

module.exports = deleteImage;