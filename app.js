const express = require('express');
const app = express();
const router = require('./router');
const { dbAuth } = require("./config/database");
const formidable = require('./config/formidable')

dbAuth();
app.use(router);
router.use(formidable);

module.exports = app;