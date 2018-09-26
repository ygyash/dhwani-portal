var mongoose=require("mongoose");

var slotSchema = new mongoose.Schema({
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    start: Number,
    end: Number
}); 

module.exports = mongoose.model('Slot', slotSchema);