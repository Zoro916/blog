var express = require('express');
var model = require('../model');
var Work = model.Work;
var Project = model.Project;
var create = require('../doc/create');
var router = express.Router();
//新建任务分配
router.post('/create', function(req, res) {
    Project.findOne({
        project_id: req.body.project_id
    }, function(err, data) {
        var arr = data.project_member;
        arr.push(req.body.partner_id);
        Project.update({
            project_id: req.body.project_id
        }, {
            project_member: arr
        }, function(err) {
            var new_work = new Work(req.body);
            new_work.save(function(err, data) {
                res.send(data);
            })
        });
    })

});
//获取任务列表
router.post('/itemlist', function(req, res) {
    Work.find({
        project_id: req.body.project_id
    }, function(err, data) {
        var arr = [];
        data.forEach((item, index) => {
            var obj = {
                id: item.work_id,
                work: item.work,
                check_time: item.check_time,
                partner_id: item.partner_id
            };
            arr.push(obj);
        })
        res.send({
            data: {
                status: 1,
                work_list: arr
            }
        })
    })
})
//获取任务分配详情
router.post('/detail', function(req, res) {
    Work.findOne({
        project_id: req.body.project_id,
        partner_id: req.body.partner_id
    }, function(err, data) {
        res.send({data: data});
    })
});
//修改任务分配
router.post('/update', function(req, res) {
    var {work_id} = req.body;
    Work.findOne({
        work_id: work_id
    }, function(err, data) {
        var {
            partner_id = data.partner_id,
            work = data.work,
            check_time = data.check_time
        } = req.body;
        Work.update({
            work_id: work_id
        }, {
            work: work,
            partner_id: partner_id,
            check_time: check_time
        }, function(err) {
            if (err)
                res.send(err);
            res.send({
                data: {
                    status: 1
                }
            })
        })
    });

})
module.exports = router;
