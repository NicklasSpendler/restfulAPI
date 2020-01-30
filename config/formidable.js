const formidable = require('express-formidable');
const path = require('path')

module.exports = formidable({
    encoding: 'utf-8',
    uploadDir: path.join(__dirname, '..', 'assets'),
    multiples: true, // req.files to be arrays of files
    keepExtensions: true
});