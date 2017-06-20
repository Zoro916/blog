var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aidanceSchema = new Schema({
    mission_id: { type: Schema.Types.ObjectId, ref: 'mission_id' },
    call: String,
    on_call: String,
    create_time: String,
    finish_time: String,
    mission: String,
})

module.exports = aidanceSchema;
