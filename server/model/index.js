var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');

var db = mongoose.createConnection('127.0.0.1','blog');

var user_schema = require('./user');
var article_schema = require('./article');

autoIncrement.initialize(db);

user_schema.plugin(autoIncrement.plugin, {model: 'User', field: 'user_id'});
article_schema.plugin(autoIncrement.plugin, {model: 'Article', field: 'article_id'});

exports.User = db.model('User', user_schema);
exports.Article = db.model('Article', article_schema);
