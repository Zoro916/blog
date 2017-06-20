var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');

var db = mongoose.createConnection('127.0.0.1','oa');

var userSchema = require('./user');
var projectSchema = require('./project');
var workSchema = require('./work');
var planSchema = require('./plan')
var todolistSchema = require('./todolist');
var aidanceSchema = require('./aidance');


autoIncrement.initialize(db);

userSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'user_id'});
projectSchema.plugin(autoIncrement.plugin, {model: 'Project', field: 'project_id'});
workSchema.plugin(autoIncrement.plugin, {model: 'Work', field: 'work_id'});
planSchema.plugin(autoIncrement.plugin, {model: 'Plan', field: 'plan_id'});
todolistSchema.plugin(autoIncrement.plugin, {model: 'Todolsit', field: 'todo_id'});
aidanceSchema.plugin(autoIncrement.plugin, {model: 'Aidance', field: 'mission_id'});

exports.User = db.model('User', userSchema);
exports.Project = db.model('Project', projectSchema);
exports.Work = db.model('Work', workSchema);
exports.Plan = db.model('Plan', planSchema);
exports.Todolist = db.model('Todolist', todolistSchema);
exports.Aidance = db.model('Aidance', aidanceSchema);
