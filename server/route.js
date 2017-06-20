module.exports = function(app) {

    var api_doc = require('./doc/api_doc');//API文档路由地址

    var user = require('./api/user');
    
    app.use('/', api_doc);
    app.use('/user', user);
};
