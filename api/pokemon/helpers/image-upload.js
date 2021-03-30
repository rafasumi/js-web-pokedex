const fs = require('fs').promises;
const path = require('path');
const config = require('config');

function checkFileExtension(fileName) {
    const allowedExtensions = config.get('api.allowedExtensions');
    const extension = path.extname(fileName);

    const isValidExtension = allowedExtensions.indexOf(
        extension.substring(1).toLowerCase()) !== -1;

    if(!isValidExtension) {
        throw new InvalidExtensionError(
            `A extensão de arquivo '${extension}' não é válida!`);
    }
}

function getNewFileName(originalFileName, newFileName) {
    const extension = path.extname(originalFileName);
    return newFileName.toLowerCase() + extension;
}

async function upload(file, newName) {
    checkFileExtension(file.name);
    
    const completeFileName = getNewFileName(file.name, newName);
    
    const relativeUploadPath = config.get('api.uploadPath');
    const uploadPath = path.resolve(__dirname, relativeUploadPath, completeFileName);
    
    await fs.writeFile(uploadPath, file.data);

    return completeFileName;
}

module.exports = upload;