// Initial Setup

var express=require("express");
var router=express.Router();

// Models 

var Slot=require("../models/slot.js");
var User=require("../models/user.js");

// authentication

var passport=require("passport");

router.get("/notif",function(req,res){
   if(req.isAuthenticated()==false){
            res.redirect("/");
   }

  Slot.find({},function(err,event){
      if(err){
          console.log(err);
      }
    res.render("notifications.ejs",{username:req.user.username,event:event});
  });
});

module.exports=router;