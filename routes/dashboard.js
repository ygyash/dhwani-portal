// Initial Setup

var express=require("express");
var router=express.Router();

// Models 

var Slot=require("../models/slot.js");
var User=require("../models/user.js");

// authentication

var passport=require("passport");

router.get("/dashboard/slotsBooked",function(req,res){
    if(req.isAuthenticated()===false) {
        return res.status(200).json({success:false,msg:"Not Logged in!"});
    }
    Slot.find({},function(err,slot){
        if(err){
            console.log(err);
            return res.status(200).send({
                success: false,
                msg: "Interval Server Error!"
            }); 
        }
        return res.status(200).send({success:true,len:slot.length});
    });
});

router.post("/dashboard/addSlot",function(req,res){
    if(req.isAuthenticated()===false) {
        return res.status(200).json({success:false,msg:"Not Logged in!"});
    }
    Slot.find({"owner.id": req.user._id},function(err,slot){
        if(err) {
            console.log(err);
            return res.status(200).send({
                success: false,
                msg: "Interval Server Error!"
            }); 
        }
        else {
            if(slot.length>0) {
                res.status(200).json({
                    success: false,
                    msg: "Already booked for the day"
                });
            }
            else {
                var obj={
                    start:req.body.start,
                    end:req.body.end
                };
                Slot.create(obj,function(err,slot){
                    if(err) {
                        console.log(err);
                        res.redirect("/");
                    } else {
                        slot.owner.id=req.user._id;
                        slot.owner.username=req.user.username;
                        slot.save();
                        res.status(200).json({
                            success: true,
                            msg: "Slot Booked Successfully!"
                        });
                    }
                });
            }
        }
    });
});

module.exports=router;