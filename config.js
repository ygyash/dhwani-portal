var mongoose=require("mongoose");
var secretKey = "Godfather...";

// Mongoose 


var mongoDB="mongodb://dhwani:dhwanibitm123@ds235180.mlab.com:35180/dhwani";
mongoose.connect(mongoDB,{ useNewUrlParser: true },function(){
    console.log("Database Connected");
});

module.exports = {
    secretKey,
    mongoDB
}