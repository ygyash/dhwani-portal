
// Initial Setup

var express=require("express");
var app=express();
var cors = require('cors');
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");

var {secretKey} = require('./config.js');
app.use('/public', express.static('public'));



/**
 * CORS middleware. This is important for letting the UI and APIs on separate domain.
 */
app.use(cors());


// Models

var User=require("./models/user.js");
var Slot=require("./models/slot.js");

// Passport

var passport=require("passport");
var localStrategy=require("passport-local");

app.use(require("express-session")({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var mongoDB = require('./config.js').mongoDB;
// Enable data of user

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

// Routes

var indexRoute=require("./routes/index.js");
var dashboardRoute=require("./routes/dashboard.js");
var notifRoute = require("./routes/notification.js");
var userRoute = require("./routes/userpage.js");
app.use(indexRoute);
app.use(dashboardRoute);
app.use(notifRoute);
app.use(userRoute);


app.listen(5000,function(){
    console.log("Server Running on Local host 5000");
});
