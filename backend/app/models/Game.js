const mongoose = require('mongoose');
const Schema = mongoose.Schema



const Game = new Schema({
    name: String,
    image: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
// 
module.exports = mongoose.model('Game', Game);