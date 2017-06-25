module.exports = function(app) {
    var user = require('./api/user');
    var article = require('./api/article');
    var reply = require('./api/reply');

    app.use('/user', user);
    app.use('/article', article);
    app.use('/reply', reply);
};
