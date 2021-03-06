const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        sender: {
            type: String,
            required: true
        },

        recipient: {
            type: String,
            required: true
        },

        contents: {
            type: String,
            required: true
        },
        anonymous: {
            default: false, 
            type: Boolean
        }
    },

    {
        timestamps: true
    }
);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;