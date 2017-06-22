var express = require('express');
var mongoose = require('mongoose');
var model = require('../model');

var User = model.User;

var ancient = function(auth_token, res, todo){
    var time_stamp = new Date().getTime().toString();
    User.findOne({
        auth_token: auth_token
    }, function(err, data) {
        if (!data) {
            return res.send({err_info: 'auth_token不存在！', status: 0});
        };
        if (time_stamp - data.time_stamp >= 10800000) {
            return res.send({err_info: 'auth_token已过期！', status: 0});
        };
        todo(err, data);
    })
};
module.exports = ancient;
