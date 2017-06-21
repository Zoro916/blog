module.exports = function(app) {
    var user = require('./api/user');
    var article = require('./api/article');

    app.use('/user', user);
    app.use('/article', article);

};
