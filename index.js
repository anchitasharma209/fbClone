const express = require('express')
const app = express()
const path = require('path')
var passport =require('passport') 
const session = require('express-session')
const MongoStore = require('connect-mongo');

const cookieParser = require('cookie-parser')
const port = 8000
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded());
app.use(cookieParser())
const router = require('./routes/')
app.use(expressLayouts)
app.use('/', router)
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);
app.use(express.static(path.join(__dirname,"public")));
app.use(session(
  {
    secret: 'facebook',
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge:(1000*60*90)
    },
    store: MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/facebookClone'})
  }
));
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})