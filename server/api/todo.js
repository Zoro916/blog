var express = require('express');
var model = require('../model');
var Promise = require('bluebird');
var Todolist = model.Todolist;
var moment = require('moment');
var create = require('../doc/create');

var router = express.Router();
//新建todolist
router.post('/create', function(req, res) {
    console.log(req.body);
    var create_time = moment().format('YYYY-MM-DD');
    var new_todo = new Todolist(Object.assign(req.body, {create_time: create_time}));
    new_todo.save(function(err, data) {
        res.send({
            data: {
                status: 1
            }
        });
    })
});
//获取todolist列表
router.post('/itemlist', function(req, res) {
    Todolist.find({
        todo_user_id: req.body.todo_user_id,
        project_id: req.body.project_id
    }, function(err, data) {
        var arr = [];
        data.forEach((item, index) => {
            arr.push(item.todo_time);
        })
        arr = [...new Set(arr)].sort();
        var todo_list = arr.map((item, index) => {
            var item_list = [];
            data.forEach((todo, index) => {
                if (todo.todo_time == item) {
                    item_list.push(todo);
                }
            });
            return {todo_time: item, item_list};
        });
        res.send({data: {
                todo_list
            }})
    })
});
//获取TODO详情
router.post('/detail', function(req, res) {
    Todolist.find({
        todo_id: req.body.todo_id
    }, function(err, data) {
        res.send({data: data});
    })
});
//完成todo
router.post('/finish', function(req, res) {
    var finish_time = moment().format('YYYY-MM-DD, HH:mm:ss');

    Todolist.update({
        todo_id: req.body.todo_id
    }, {
        finish_time: finish_time
    }, function(err, data) {
        res.send({
            data: {
                status: 1
            }
        });
    })
})
module.exports = router;
