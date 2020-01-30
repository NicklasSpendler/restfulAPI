
const express = require('express');
const router = express.Router();
const { join } = require("path");
const { readdir } = require("fs")

readdir(join(__dirname, "routes"), fileHandler);

function fileHandler(err ,files){
    if(err){
        console.error('', err);
        return;
    }

    for (file of files){
        require(join(__dirname, "routes", file))(router);
    }
}

module.exports = router;