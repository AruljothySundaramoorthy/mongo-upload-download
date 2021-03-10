const mongoose = require('mongoose');

const fileinformation = mongoose.Schema(
    {
        fileinformationname: {
            type: String,
        },
        fileinformationextension: {
            type: String

        },
        filename: { type: String },
        updatedat: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        versionKey: false,
    },
    {
        timestamps: false,
    },
    {
        strict: true,
    },
);
module.exports = mongoose.model('fileinformation', fileinformation);