var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//建立用户信息模型
var todolistSchema = new Schema({
    project_id: String,
    todo_user_id: String,
    todo_id: { type: Schema.Types.ObjectId, ref: 'todo_id' },
    todo: String,
    todo_time: String,
    title: String,
    remark: String,
    create_time: String,
    finish_time: String
})

module.exports = todolistSchema;
