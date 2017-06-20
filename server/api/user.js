var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();
var model = require('../model');
var User = model.User;

router.post('/signup', function(req, res) {
    var {user_name, pass_word} = req.body;

    User.findOne({
        user_name: user_name
    }, function(err, data) {
        if (data.length == 0) {
            return res.send({err_info: '用户名不存在', status: 0})
        };
        console.log(data);
        if (pass_word == data.pass_word) {

            var time_stamp = new Date().getTime().toString();
            var auth_token = Math.random().toString(36).substr(2);

            User.update({
                user_name: user_name
            }, {
                time_stamp: time_stamp,
                auth_token: auth_token
            }, function(err, data) {
                return res.send({auth_token: auth_token, status: 1})
            })
        } else {
            return res.send({err_info: '密码错误', status: 0})
        };
    })
});

router.post('/signin', function(req, res) {
    User.find(function(err, data) {
        res.send(data);
    })
});

module.exports = router;
