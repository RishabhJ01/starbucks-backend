// import dependencies
require('dotenv').config();
var express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');

// create express app
var app = express();

// import routes
const authRoutes = require('./routes/auth');

// setup database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, (err) => {
  if(err) throw err;
  console.log('Connected to database');
})

// setup the app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// setup routes
app.use('/', authRoutes);

// home screen
app.get('/', (req,res) => {
  res.send("Welcome to home page")
})

// setup server
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})