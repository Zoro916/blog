var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');

var db = mongoose.createConnection('127.0.0.1','blog');

var user_schema = require('./user');
var article_schema = require('./article');
var reply_schema = require('./reply');

autoIncrement.initialize(db);

user_schema.plugin(autoIncrement.plugin, {model: 'User', field: 'user_id'});
article_schema.plugin(autoIncrement.plugin, {model: 'Article', field: 'article_id'});
reply_schema.plugin(autoIncrement.plugin, {model: 'Reply', field: 'reply_id'});

exports.User = db.model('User', user_schema);
exports.Article = db.model('Article', article_schema);
exports.Reply = db.model('Reply', reply_schema);
