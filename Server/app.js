const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserRoutes = require('./Routes/UserRoutes');

const app = express();

require('dotenv').config();

mongoose.connect(process.env.DB_HOST,{useNewUrlParser: true,useCreateIndex:true},(err) => {
    if(err) {console.error('Database connection error ' + err)}
    console.log('Database connected');
})

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(UserRoutes);

app.listen(process.env.PORT || 5000,(err) => {
    if(err) {return new Error(err)};
    console.log("Server started on http://localhost:5000");
});