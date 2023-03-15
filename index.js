const express = require('express')
const app = express()
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
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})