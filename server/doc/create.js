var Api = require('./api_model');
var create_doc = function(req, res, api){
    Api.findOne({url: req.originalUrl}, function(err, data){
        if(!data){
          var new_api = new Api({
              url: req.originalUrl,
              api: api,
              param: JSON.stringify(req.body),
              res: JSON.stringify(res)
          })
          new_api.save();
        }
    })

};
module.exports = create_doc;
