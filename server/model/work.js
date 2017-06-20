var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workSchema = new Schema({
    work_id: { type: Schema.Types.ObjectId, ref: 'work_id' },
    project_id: String,
    partner_id: String,
    work: String,
    check_time: String,
})

module.exports = workSchema;
