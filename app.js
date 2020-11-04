const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const mongoose = require('mongoose');

// mongoose connect
mongoose.connect('mongodb://localhost/sportsblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// port 
const port = 3000;

// init app
const app = express();

const index = require('./routes/index');
const articles= require('./routes/articles');
const manage = require('./routes/manage');
const categories = require('./routes/categories');


// view 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// setup boostrap dependencies
app.use('/assets/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist'))); 
app.use('/assets/vendor/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery','dist'))); 
app.use('/assets/vendor/popper.js', express.static( path.join(__dirname, 'node_modules', 'popper.js', 'dist')));

// express messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req,res);
    next();
});

//expressValidator (tbd)



app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);


app.listen(port, () => {
    console.log(`The server is listening on ${port}.`);
});


