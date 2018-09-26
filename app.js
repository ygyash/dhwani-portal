// Initial Setup

var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");

// Mongoose 

var mongoose=require("mongoose");
var mongoDB="mongodb://skbro:sk12345@ds115263.mlab.com:15263/dhwani";
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
app.use(indexRoute);
app.use(dashboardRoute);

app.listen(3000,function(){
    console.log("Server Running on Local host 3000");
});
