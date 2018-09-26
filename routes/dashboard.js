// Initial Setup

var express=require("express");
var router=express.Router();

// Models 

var Slot=require("../models/slot.js");
var User=require("../models/user.js");

// authentication

var passport=require("passport");


router.get("/dashboard/addSlot",function(req,res){
    if(req.isAuthenticated()===false){
        return res.redirect("/");
    }
    res.render("addSlot.ejs");
});

router.post("/dashboard/addSlot",function(req,res){
    if(req.isAuthenticated()===false) {
        return res.redirect("/");
    }
    Slot.create(req.body.slot,function(err,slot){
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            slot.owner.id=req.user._id;
            slot.owner.username=req.user.username;
            slot.save();
            res.redirect("/dashboard");
        }
    });
});

module.exports=router;