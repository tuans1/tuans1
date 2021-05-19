const mongoose = require('mongoose');
const Schema = mongoose.Schema



const Account = new Schema({
    acc : String,
    name: { type: String, required: true },
    password: { type: String, required: true, },
    isRent: { type: Boolean, default: 0 },
    isActive: { type: Boolean, default: 0 },
    image: [{ type: String, default: [] }],
    note: { type: String, default: "..." },
    game: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
// 
module.exports = mongoose.model('Account', Account);