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
   console.log("Notification page loading.")
  Slot.find({},function(err,slot){
      if(err){
          console.log(err);
      }         
        console.log("Notification page loaded.");
    res.render("notifications.ejs",{slot:slot});

  });
});

module.exports=router;