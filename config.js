var mongoose=require("mongoose");
var secretKey = "Godfather...";

// Mongoose 


var mongoDB="mongodb+srv://admin:IoNPhro0F96mJBqH@yg.c6s7i.mongodb.net/dhwani_portal?retryWrites=true&w=majority";
mongoose.connect(mongoDB,{ useNewUrlParser: true },function(){
    console.log("Database Connected");
});

module.exports = {
    secretKey,
    mongoDB
}