const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//import bcrypt for password hashing
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstname: {
        type:String,
        require: true
    },
    lastname:{type: String, require: true},
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate: [emailValidator, 'incorrect email format']
    },
    password:{type: String, require: true}
});

function emailValidator(value){
    return /^.+@.+\..+$/.test(value);
}


// this is due to the use of the bcrypt password hashing
// it will hash the password before saving it
userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

// login function to compare if password hash is the same with user provided details
userSchema.methods.isPasswordValid = async function(value){
    try {
        return await bcrypt.compare(value, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

// eport the module
module.exports = mongoose.model('user', userSchema);