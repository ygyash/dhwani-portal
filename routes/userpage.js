// Initial Setup

var express=require("express");
var router=express.Router();

// Models 

var Slot=require("../models/slot.js");
var User=require("../models/user.js");

// authentication

var passport=require("passport");

//user routing
router.get("/user",function(req,res){
   console.log("User page loading.")
  Slot.find({},function(err,slot){
      if(err){
          console.log(err);
      }         
        console.log("User page loaded.");
    res.render("user.ejs",{slot:slot});
  });
 //res.render("user.ejs");
});

module.exports=router;