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

router.post("/signup",function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
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
    res.render("/dashboard.ejs");
});

module.exports=router;