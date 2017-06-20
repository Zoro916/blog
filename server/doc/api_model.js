var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('127.0.0.1','oa');


var apidocSchema = new Schema({
    url: String,
    api: String,
    param: String,
    res: String
});
var Api = db.model('Api', apidocSchema);
module.exports = Api;
