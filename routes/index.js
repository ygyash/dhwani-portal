// Initial Setup

var express=require("express");
var router=express.Router();

// Models 

var Slot=require("../models/slot.js");
var User=require("../models/user.js");

// authentication

var passport=require("passport");


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
    Slot.find({},function(err,slot){
        if(err) {
            console.log(err);
        }
        else {
            res.render("dashboard.ejs",{slot:slot});
        }
    });
});

router.get("/login",function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    res.render("login.ejs");
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}),function(req,res){

});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/signup");
});

module.exports=router;