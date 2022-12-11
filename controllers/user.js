const jwt = require('jsonwebtoken'); // import jwt for authentication k

const {SECRET_KEY} = require('./../config');
const User = require('./../models/user'); // import user model data schema

 
exports.register = async(req, res, next) =>{
    const {firstname, lastname, email, password} = req.body;
    const user = await User.findOne({email}); // check if email already taking
    if(user)
    return res.status(403).json({error: {message: 'Email already taken'}});
    const newUser = new User({firstname, lastname, email, password});
   // this will handle the error in case if there is any
    try {
    await newUser.save();
    // show the generated token
    const token = getSignedToken(newUser);
    res.status(200).json({message: 'Register successfully! Token:'+ token});
   } catch (error) {
    error.status = 400;
    next(error);
   }
};

exports.login = async(req, res, next) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user)
    return res.status(403).json({error: {message: 'invalid email/password'}});

    //compare hash password here...
    const isValid = await user.isPasswordValid(password);

    //if(password !== user.password)
    if(!isValid)
    return res.status(403).json({error: {message: 'invalid email/password'}});

    // get generated token after login successfuly
    const token = getSignedToken(user);
    //else return success
    return res.status(200).json({token});

}

//this will generate token once sign In and get user details too
getSignedToken = user =>{
    return jwt.sign({
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
    }, SECRET_KEY, {expiresIn: '1h'});
}