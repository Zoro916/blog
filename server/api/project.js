var express = require('express');
var mongoose = require('mongoose');
var model = require('../model');
var Project = model.Project;
var moment = require('moment');
var create = require('../doc/create');

var router = express.Router();
//获取项目列表
router.post('/itemlist', function(req, res) {
    Project.find(function(err, data) {
        var arr = [];
        data.forEach((item, index) => {
            var obj = {
                id: item.project_id,
                project: item.project_name
            };
            arr.push(obj);
        })
        res.send({
            data: {
                status: 1,
                project_list: arr
            }
        })
    })
})
//创建新的项目
router.post('/create', function(req, res) {
    var {project_name, project_desc, start_date, test_date, end_date} = req.body;
    var create_time = moment().format('YYYY-MM-DD, HH:mm:ss');
    var new_project = new Project({
        project_name: project_name,
        project_desc: project_desc,
        create_time: create_time,
        start_date: start_date,
        test_date: test_date,
        end_date: end_date,
        porject_member: []
    });
    new_project.save(function(err, data) {
        res.send({
            data: {
                status: 1,
                project_id: data.project_id
            }
        });
    });
});
//获取项目详情
router.post('/detail', function(req, res) {
    Project.findOne({
        project_id: req.body.project_id
    }, function(err, data) {
        res.send({data: data});
    })
})
//修改项目
router.post('/update', function(req, res) {
    Project.findOne({
        project_id: req.body.project_id
    }, function(err, data) {
        var {
            project_desc = data.project_desc,
            project_member = data.project_member,
            test_date = data.test_date
        } = req.body;
        Project.update({
            project_id: req.body.project_id
        }, {
            project_desc: project_desc,
            project_member: project_member,
            test_date: test_date
        }, function(err) {
            res.send({
                data: {
                    status: 1
                }
            })
        })
    })

});
//删除项目
router.post('/remove', function(req, res) {
    Project.remove({
        project_id: req.body.project_id
    }, function(err) {
        res.send({
            data: {
                status: 1
            }
        })
    })
});
//获取当前时间节点、当前角色所对应项目
router.post('/current', function(req, res) {
    var cur_time = moment().format('YYYY-MM-DD');
    Project.find({
        project_member: req.body.partner_id,
        end_date: {
            "$gte": cur_time
        }
    }, function(err, data) {
        var item = data[0];
        res.send({
            data: {
                project_id: item.project_id
            }
        });
    }).sort({end_date: 1})
});
module.exports = router;
