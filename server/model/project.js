var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    project_id: { type: Schema.Types.ObjectId, ref: 'project_id' },
    project_name: String,
    project_desc: String,
    project_member: Array,
    create_time: String,
    start_date: String,
    test_date: String,
    end_date: String
})

module.exports = projectSchema;
