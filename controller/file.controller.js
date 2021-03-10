const multer = require('multer');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const { Readable } = require('stream');
const FileType = require('file-type');


const filebusiness = require('../business/file.business')
const fileinformationmodel = require('../models/fileinformation.model')

require('dotenv').config();
const connectionstring = process.env.MONGOCONNECTIONSTRING;
exports.uploadfile = function (req, res) {

    try {
        const storage = multer.memoryStorage();
        const upload = multer({
            storage,
            limits: {
                fields: 1,
                fileSize: 6000000,
                files: 1,
                parts: 2,
            },
        });
        upload.single('uploadedfile')(req, res, (err) => {
            if (err) {
                return res
                    .status(400)
                    .json({ message: 'Upload Request Validation Failed' });
            }

            const fileuploadname = req.body.filename + new Date().getTime()
            const stream = Readable.from(req.file.buffer);

            try {

                mongoose.connect(connectionstring, { useNewUrlParser: true, useUnifiedTopology: true })
                mongoose.set('debug', true);
                const db = mongoose.connection;
                db.on('error', console.error.bind(console, 'connection error:'));
                db.once('open', function () {
                    console.log('Mongo Connected');
                    const bucket = new mongodb.GridFSBucket(db.db, {
                        bucketName: 'fileupload',
                    });
                    stream
                        .pipe(bucket.openUploadStream(fileuploadname))
                        .on('error', (error) => res.status(500).send(error))
                        .on('finish', async () => {

                            // To store the file information into a seperate table 
                            fileinformationmodel.create({
                                fileinformationname: fileuploadname,
                                fileinformationextension: req.file.mimetype,
                                filename: req.body.filename,
                                updatedat: new Date()
                            })
                            return res.status(200).send({ message: `File uploaded successfully use the provided value to download the data ${fileuploadname}` });
                        });
                });
            } catch (e) {
                console.log(e)
            }
        });
    } catch (e) {
        console.log(e)
    }
}

exports.downloadfile = async function (req, res) {

    try {
        if (!req.params.fileid) {
            return res.status(500).json({ message: 'File Information missing' });
        }
        const { fileid } = req.params;

        try {

            mongoose.connect(connectionstring, { useNewUrlParser: true, useUnifiedTopology: true })
            mongoose.set('debug', true);
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', async function () {
                console.log('Mongo Connected');
                const documentinfo = JSON.parse(
                    JSON.stringify(
                        await fileinformationmodel.findOne({ fileinformationname: fileid })
                    )
                );


                const bucket = new mongodb.GridFSBucket(db.db, {
                    bucketName: 'fileupload',
                });

                res.set('content-type', documentinfo.fileinformationname);
                // res.set('accept-ranges', 'bytes');
                res.setHeader(
                    'Content-Disposition',
                    `attachment; filename="${documentinfo.filename}.${documentinfo.fileinformationextension.split("/")[1]}"`
                );
                const downloadStream = bucket.openDownloadStreamByName(
                    documentinfo.fileinformationname
                );

                downloadStream.on('data', (chunk) => {
                    res.write(chunk);
                });

                downloadStream.on('error', () => {
                    res.sendStatus(404);
                });

                downloadStream.on('end', () => {
                    res.end();
                });
            });
        } catch (e) {
            console.log(e)
        }

    } catch (e) {
        log.error(e);
    }
}