var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');

var db = mongoose.createConnection('127.0.0.1','blog');

var userSchema = require('./user');

autoIncrement.initialize(db);

userSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'user_id'});

exports.User = db.model('User', userSchema);
