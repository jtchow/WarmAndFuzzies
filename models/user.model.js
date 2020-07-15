const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require("validator");
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
            validate(value){
                if (!validator.isEmail(value)){
                    throw new Error("Email is invalid")
                }
            }
        },

        password: {                 
            type: String,
            required: true,
            trim:true, 
            minlength: 7
        }, 

        writtenTo: {
            type: Array, 
            default: []
        }
    }, 
    
    // {
    //     timestamps: true
    // }
);

// User method to hash password input
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// User method to validate password input through login
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;