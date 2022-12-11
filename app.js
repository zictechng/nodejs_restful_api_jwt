const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors'); // this allowed frontend to access backend from different server

const {MONGODB} = require('./config');
mongoose.set('strictQuery', false);

const userRoutes = require('./routes/user'); // import user routes here...
const noteRoutes = require('./routes/note'); // import note route here..

const auth = require('./middleware/auth'); // this is the protected route function
// imported here so we can use it to protect routes

app.use(cors()); // this import the cors for action
app.use(bodyParser.json());

// routes
// this route is protected so, is only logged user that can access it.
app.use('/api/protected', auth, (req, res) =>{
    res.end(`Hi ${req.user.firstname}, you are authenticated`);
});

app.use('/api/notes', auth, noteRoutes); // all note routes will use this for all operation with protection
app.use('/api/users', userRoutes);

// error handling page not found or route not define
app.use((req, res, next) =>{
    const err = new Error('not found');
    err.status = 404;
    next(err);
    });

// error handling function, to handle error in the text input with mongo instead of showing
// those 404 html tags code, it will show define error which is better
app.use((err, req, res, next) =>{
const status = err.status || 500;
res.status(status).json({error: {message: err.message}});
});

//app.get('/', (req, res, next) => res.send('Welcome Home'));

// start server after successful connection
mongoose.connect(MONGODB, { useNewUrlParser: true})
.then(() =>{
    console.log('connected to mongodb');
    return app.listen(3300);
})
.then(() => console.log('server running at 3300'))
.catch(err => console.log(err.message));

//app.listen(3300, ()=> console.log('server runing at 3300'));

