const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim:true
        },

        email: {
            type: String,
            required: true,
            trim:true, 
            minlength: 5
        },

        // TODO password hash
        password: {                 
            type: String,
            required: true,
            trim:true, 
            minlength: 7
        }
    }, 
    
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;