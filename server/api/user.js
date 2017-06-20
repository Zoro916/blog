var express = require('express');
var mongoose = require('mongoose');
var querystring = require('querystring');
var rp = require('request-promise');

var router = express.Router();
var model = require('../model');
var User = model.User;

router.post('/login', function(req, res) {

    var access_token;
    var {CorpID, CorpSecret} = req.body;
    var access_token_url = `https://oapi.dingtalk.com/gettoken?corpid=${CorpID}&corpsecret=${CorpSecret}`
    rp(access_token_url).then((data) => {
        var obj = JSON.parse(data);
        var jsapi_ticket_url = `https://oapi.dingtalk.com/get_jsapi_ticket?access_token=${obj.access_token}`
        rp(jsapi_ticket_url).then((data) => {
            var noncestr = 'zoro';
            var timestamp = new Date().getTime().toString();
            var jsapi_ticket = JSON.parse(data).ticket;
            var url = 'http://192.168.0.120:3000/';
            var arr = ['noncestr', 'timestamp', 'jsapi_ticket', 'url']
            var str = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
            res.send({sign: str, access_token: obj.access_token});
        })
    });
});
router.post('/info', function(req, res) {
    var CODE = req.body.code;
    var ACCESS_TOKEN = req.body.access_token;
    var info_url = `https://oapi.dingtalk.com/user/getuserinfo?access_token=${ACCESS_TOKEN}&code=${CODE}`
    rp(info_url).then((data) => {
        var info = JSON.parse(data);
        User.findOne({
            ding_id: info.userid
        }, function(err, msg) {
            res.send({data: msg})
        });
    })
});
router.post('/is_new', function(req, res) {
    var CODE = req.body.code;
    var ACCESS_TOKEN = req.body.access_token;
    var info_url = `https://oapi.dingtalk.com/user/getuserinfo?access_token=${ACCESS_TOKEN}&code=${CODE}`
    rp(info_url).then((data) => {
        var info = JSON.parse(data);
        User.findOne({
            ding_id: info.userid
        }, function(err, msg) {
            if (msg == null) {
                res.send({
                    data: {
                        is_new: 1,
                        ding_id: info.userid
                    }
                })
            } else {
                res.send({
                    data: {
                        is_new: 0,
                        ding_id: info.userid
                    }
                })
            }
        });
    })
});
router.post('/list', function(req, res) {
    User.find(function(err, data) {
        res.send(data);
    })
});
router.post('/bind', function(req, res) {
    User.update({
        user_id: req.user_id
    }, {
        ding_id: req.ding_id
    }, function(err, data) {
        res.send({
            data: {
                status: 1
            }
        })
    })
});
router.post('/new_user', function(req, res) {
    var new_user = new User({ding_id: req.body.ding_id, user_name: req.body.user_name});
    new_user.save(function(err, data) {
        res.send(data);
    })
})
router.post('/access_token', function(req, res) {
    var get_access_token_url = req.body.get_access_token_url;
    rp(get_access_token_url).then((data) => {
        res.send(data);
    })
})
module.exports = router;
