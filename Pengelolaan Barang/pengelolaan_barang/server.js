const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express()
const barangRoute = require('./route/barangRoute');
const pinjamRoute = require('./route/pinjamRoute');
const authRoute = require('./route/authRoute');
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(__dirname + '/assets')); 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))
app.use(cookieParser('secret'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60}
}))
app.use(flash());

// Route
app.use(barangRoute)
app.use(pinjamRoute);
app.use(authRoute);

// Koneksi Database
const url = 'mongodb+srv://azhar:azhar@cluster0.bqhar.mongodb.net/nodejs?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database Terhubung...'))
.catch((err) => console.log(err))

app.listen(3000, () => console.log('Server dijalankan port 3000'))