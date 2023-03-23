const express = require('express')
const app = express()
const path = require('path')
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser') 
//var passportLocal = require('passport-local');

//require('./config/passport-local').boot(passportLocal, config);
//const passportLocal = require('./config/passport-local');
const port = 3000
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'facebook',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge:(1000*60*90)
  },
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/facebookClone' })
  
}));
app.use(passport.authenticate('session'));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(express.urlencoded()) // form submit 
app.use(cookieParser())
const router = require('./routes/')
app.use(expressLayouts)
app.use('/', router)

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.listen(port, () => {
  console.log(`Facebook app listening on port ${port}`)
})