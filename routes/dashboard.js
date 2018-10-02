
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
    Slot.find({"owner.id": req.user._id},function(err,slot){
        if(err) {
            console.log(err);
            res.redirect("/");
        }
        else {
            if(slot.length>0) {
                console.log("Done for the day!");
                res.redirect("/");
            }
            else {
                res.render("addSlot.ejs");
            }
        }
    });
});

router.post("/dashboard/addSlot",function(req,res){
    if(req.isAuthenticated()===false) {
        return res.redirect("/");
    }
    Slot.find({"owner.id": req.user._id},function(err,slot){
        if(err) {
            console.log(err);
            res.redirect("/");
        }
        else {
            if(slot.length>0) {
                console.log("Done for the day!");
                res.redirect("/");
            }
            else {
                var timeVal=req.body.start;
                var start=0;
                var start_time=parseInt(timeVal);
                if(start_time<10) {
                    start=31;
                    start+=start_time*2;
                }
                else {
                    start+=17;
                    start+=(start_time-17)*2;
                }
                if(timeVal.charAt(3)==='3') {
                    start+=1;
                }
                var duration=req.body.duration;
                var end=0;
                if(duration==='one') {
                    end=start+3;
                } else {
                    end=start+4;
                }
                start=parseInt(start);
                end=parseInt(end);
                var obj={
                    start:start,
                    end:end
                }
                console.log(start+" "+end);
                Slot.create(obj,function(err,slot){
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
            }
        }
    });
});

module.exports=router;