const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    title: {type:String, lowercase: true, default: 'Mr'},
    name: {type:String, lowercase: true},
    email: {type:String, lowercase: true, unique: true}
});


module.exports = mongoose.model('User',UserSchema);