var express = require('express');
var moment = require('moment');
var model = require('../model');
var create = require('../doc/create');
var Aidance = model.Aidance;
var router = express.Router();
//新建协助请求项
router.post('/create', function(req, res) {
    var create_time = moment().format('YYYY-MM-DD, HH:mm:ss');
    var new_aidance = new Aidance(Object.assign(req.body, {create_time: create_time}));
    new_aidance.save(function(err, data) {
        create(req, {
            status: 1
        }, '新建协助请求项');
        res.send({
            data: {
                status: 1
            }
        });
    })
});
//获取协助请求列表
router.post('/itemlist', function(req, res) {
    var call,
        on_call;
    Aidance.find({
        call: req.body.id
    }, function(err, data) {
        call = data;
        Aidance.find({
            on_call: req.body.id
        }, function(err, data) {
            on_call = data;
            create(req, {
                call: call,
                on_call: on_call
            }, '获取协助请求列表');
            res.send({
                data: {
                    call: call,
                    on_call: on_call
                }
            })
        })
    })
})
//完成协助请求
router.post('/finish', function(req, res) {
    var finish_time = moment().format('YYYY-MM-DD, HH:mm:ss');
    Aidance.update({
        mission_id: req.body.mission_id
    }, {
        finish_time: finish_time
    }, function(err, data) {
        create(req, {
            status: 1
        }, '完成协助请求');
        res.send({
            data: {
                status: 1
            }
        })
    })
})
module.exports = router;
