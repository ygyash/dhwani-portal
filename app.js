
// Initial Setup

var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
//static files 

app.use('/public', express.static('public'));

// Mongoose 

var mongoose=require("mongoose");
var mongoDB="mongodb://dhwani:dhwanibitm123@ds235180.mlab.com:35180/dhwani";
mongoose.connect(mongoDB,{ useNewUrlParser: true });



// Models

var User=require("./models/user.js");
var Slot=require("./models/slot.js");

// Passport

var passport=require("passport");
var localStrategy=require("passport-local");
app.use(require("express-session")({
    secret: "Godfather...",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Enable data of user

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

// Routes

var indexRoute=require("./routes/index.js");
var dashboardRoute=require("./routes/dashboard.js");
var notifRoute = require("./routes/notification.js");
app.use(indexRoute);
app.use(dashboardRoute);
app.use(notifRoute);

app.listen(3000,function(){
    console.log("Server Running on Local host 3000");
});
