// Initial Setup

var express=require("express");
var router=express.Router();

// authentication

var passport=require("passport");
var User=require("../models/user.js");


router.get("/",function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    res.redirect("/signup");
});

router.get("/signup",function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    res.render("signup.ejs");
});




function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}