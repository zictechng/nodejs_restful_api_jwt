 const jwt = require('jsonwebtoken');

 const {SECRET_KEY} = require('./../config');

// this function will get user token then we can use it to protect routes for not
// logged in users
 module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 403;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
    
        if(token){
            try {
               const user = jwt.verify(token, SECRET_KEY);
               req.user = user;
               return next(); 
            } catch (e) {
                error.message = 'invalid/expired access token';
                return next(error);
            }
        }
        error.message = 'authorization token must be Bearer [token]';
        return next(error);
    }
    error.message = 'authorization header must be provided';
    return next(error);
 };