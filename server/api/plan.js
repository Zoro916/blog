var express = require('express');
var moment = require('moment');
var model = require('../model');
var Plan = model.Plan;
var create = require('../doc/create');

var router = express.Router();
//新建任务分解
router.post('/create', function(req, res) {
    var create_time = moment().format('YYYY-MM-DD, HH:mm:ss');
    var new_plan = new Plan(Object.assign(req.body, {create_time: create_time}));
    new_plan.save(function(err, data) {
        if (err)
            res.send(err);
        create(req, data, '新建任务分解');
        res.send(data);
    })
})
//获取任务分解列表
router.post('/itemlist', function(req, res) {
    Plan.find({
        work_id: req.body.work_id,
        partner_id: req.body.partner_id
    }, function(err, data) {
        create(req, data, '获取任务分解列表');
        res.send({data: data});
    })
});
//完成任务分解项
router.post('/finish', function(req, res) {
    var finish_time = moment().format('YYYY-MM-DD, HH:mm:ss');
    Plan.update({
        plan_id: req.body.plan_id
    }, {
        finish_time: finish_time
    }, function(err, data) {
        create(req, data, '完成任务分解项');
        res.send({
            data: {
                status: 1,
                finish_time: data.finish_time
            }
        });
    })
});
//获取任务分解项详情
router.post('/detail', function(req, res) {
    Plan.findOne({
        plan_id: req.body.plan_id
    }, function(err, data) {
        create(req, data, '获取任务分解项详情');
        res.send({data: data});
    })
});
//修改任务分解项
router.post('/update', function(req, res) {
    Plan.findOne({
        plan_id: req.body.plan_id
    }, function(err, data) {
        var {
            task_time = data.task_time,
            plan = data.plan,
            title = data.title
        } = req.body;
        Plan.update({
            plan_id: req.body.plan_id
        }, {
            title: title,
            task_time: task_time,
            plan: plan
        }, function(err, data) {
            create(req, data, '修改任务分解项');
            res.send({data: data});
        })
    });
});

module.exports = router;
