var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reply_schema = new Schema({
    reply_id: { type: Schema.Types.ObjectId, ref: 'reply_id' },
    reply: String,
    post_id: String,
    post_nick: String,
    recv_id: String,
    recv_nick: String,
    article_id: String,
    create_time: String
})


module.exports = reply_schema;
