/** 
 * This file is for the server of the Faculty Development Grants 
 * web application using Node.js in order for it to run.
 *  ver 1.0
 *  October 8, 2018
 *  @author Sai Manalili
 */

/**
 * Module dependencies.
 */
const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const hbs = require("hbs")
const mongoose = require("mongoose")

/* Setting up of middleware */
const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/VCA-Database",{
    useNewUrlParser: true
})

app.set("view engine", "hbs")
app.use(express.static(__dirname))
app.use(express.static(__dirname + "/public"))

app.use(session({
    secret : "secret",
    name : "secretname",
    resave: true,
    saveUninitialized :true,
  }))

app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next()
});
  
app.use(require("./controllers"))

app.listen(3000, () => {
    console.log("Listening to Port 3000...");
})
