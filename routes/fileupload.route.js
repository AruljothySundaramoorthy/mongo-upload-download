var filerouter = require('express').Router();
var filecontroller = require('../controller/file.controller')


filerouter.post('/upload', filecontroller.uploadfile)
filerouter.get('/download/:fileid', filecontroller.downloadfile)

module.exports = filerouter;