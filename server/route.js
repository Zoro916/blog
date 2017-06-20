module.exports = function(app) {

    var user = require('./api/user');
    var project = require('./api/project');
    var work = require('./api/work');
    var plan = require('./api/plan');
    var todo = require('./api/todo');
    var aidance = require('./api/aidance');
    //文档路由
    var api_doc = require('./doc/api_doc')

    app.use('/user', user);
    app.use('/project', project);
    app.use('/work', work);
    app.use('/plan', plan);
    app.use('/todo', todo);
    app.use('/aidance', aidance);
    app.use('/', api_doc);
};
