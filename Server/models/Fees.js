const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const FeesSchema = new Schema({
    // uid: {type:String},
    firstName: {type:String},
    lastName: {type:String},
    yearlyFees: {type:Number, default: 0},
    feesPaid: {type:Number, default: 0},
    grade: {type:String},
    monthsPaid: {type:Array, default: []} 
});


/**Months will be associated with array indexes. 
 * i.e. 0 = January 1=Februrary . . . . 11=December
 */
module.exports = mongoose.model('Fees',FeesSchema);