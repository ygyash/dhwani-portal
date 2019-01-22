// Initial Setup

var express=require("express");
var router=express.Router();
var path = require('path');
// Models 

var Slot=require("../models/slot.js");
var User=require("../models/user.js");

// authentication

var passport=require("passport");

router.get("/login",(req,res)=> {
    if(req.isAuthenticated()===false) {
        return res.redirect("/public/login.html");
    }
    res.redirect('/dashboard');
});

router.get("/",function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    res.redirect("/login");
});

router.get("/signup",function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    res.redirect("/public/signup.html");
});

router.post("/signup",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err) {
            console.log(err);
            return res.redirect("/");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/dashboard");
        });
    });
});

router.get("/dashboard",function(req,res){
    if(req.isAuthenticated()===false){
        return res.redirect("/");
    }
    console.log(req.user);
    res.redirect('/public/dashboard.html');
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}),function(req,res) {
    console.log(req.user);
});

router.get("/logout",function(req,res){
    req.logout();
    res.status(200).json({
        logout: true
    });
});

module.exports=router;