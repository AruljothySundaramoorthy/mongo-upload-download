// getting-started.js
const mongoose = require('mongoose');
require('dotenv').config();
const connectionstring = process.env.MONGOCONNECTIONSTRING;
try {
    module.exports = {

        async mainconnect() {
            mongoose.connect(connectionstring, { useNewUrlParser: true, useUnifiedTopology: true })
            mongoose.set('debug', true);
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                console.log('Mongo Connected');
                return db
            });
        }
    }

} catch (e) { console.log(e); }