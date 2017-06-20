var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planSchema = new Schema({
    plan_id: { type: Schema.Types.ObjectId, ref: 'plan_id' },
    partner_id: String,
    work_id: String,
    title: String,
    plan: String,
    create_time: String,
    finish_time: String,
    task_time: String
})

module.exports = planSchema;
