var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var article_schema = new Schema({
    article_id: { type: Schema.Types.ObjectId, ref: 'article_id' },
    title: String,
    author: String,
    author_id: String,
    create_time: String,
    update_time: String,
    article: String,
    classify: String
});


module.exports = article_schema;
