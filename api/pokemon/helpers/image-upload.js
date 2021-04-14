const {writeFile} = require('fs').promises;
const {resolve, extname} = require('path');
const config = require('config');
const InvalidExtensionError = require('../../errors/InvalidExtensionError');
const FileSizeTooLargeError = require('../../errors/FileSizeTooLargeError');

function checkFileExtension(fileName) {
    const allowedExtensions = config.get('api.allowedExtensions');
    const extension = extname(fileName);

    const isValidExtension = allowedExtensions.indexOf(
        extension.substring(1).toLowerCase()) !== -1;

    if(!isValidExtension) {
        throw new InvalidExtensionError(
            `A extensão de arquivo '${extension}' não é válida!`);
    }
}

function getNewFileName(originalFileName, newFileName) {
    const extension = extname(originalFileName);
    return newFileName.toLowerCase() + extension;
}

async function upload(file, newName) {
    const oneMB = 1000000;
    if(file.size > oneMB) {
        throw new FileSizeTooLargeError(
            'O tamanho do arquivo enviado não pode ultrapassar 1 MB!');
    }
    
    checkFileExtension(file.name);
    
    const completeFileName = getNewFileName(file.name, newName);
    
    const relativeUploadPath = config.get('api.uploadPath');
    const uploadPath = resolve(__dirname, relativeUploadPath, completeFileName);

    await writeFile(uploadPath, file.data);

    return completeFileName;
}

module.exports = upload;