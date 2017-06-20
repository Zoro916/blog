var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    ding_id: String,
    user_id: { type: Schema.Types.ObjectId, ref: 'user_id' },
    user_name: String
})


module.exports = userSchema;
