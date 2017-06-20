var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'user_id' },
    user_name: String,
    pass_word: String,
    nick_name: String,
    auth_token: String,
    time_stamp: String
})


module.exports = userSchema;
