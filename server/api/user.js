var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var model = require('../model');
var User = model.User;
/**
 * @api {post} user/signup 用户登录
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription 接口详细描述
 *
 * @apiParam {String} user_name 用户名
 * @apiParam {String} pass_word密码(MD5加密)
 *
 *
 * @apiSuccess {String} status 1/0 (成功/异常)
 * @apiSuccess {String} err_info 消息说明(<span style="color:red">用户名不存在</span>/<span style="color:red">密码错误</span>)
 * @apiSuccess {String} auth_token 访问令牌
 *
 */
router.post('/signup', function(req, res) {
    var {user_name, pass_word} = req.body;
    if (!(user_name && pass_word)) {
        return res.send({err_info: '参数错误', status: 0});
    }
    User.findOne({
        user_name: user_name
    }, function(err, data) {
        if (!data) {
            return res.send({err_info: '用户名不存在', status: 0});
        }
        if (pass_word == data.pass_word) {
            var time_stamp = new Date().getTime().toString();
            var auth_token = Math.random().toString(36).substr(2);
            User.update({
                user_name: user_name
            }, {
                time_stamp: time_stamp,
                auth_token: auth_token
            }, function(err, data) {
                return res.send({auth_token: auth_token, status: 1});
            });
        } else {
            return res.send({err_info: '密码错误', status: 0});
        };
    });
});
/**
 * @api {post} user/signin 注册用户
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription 接口详细描述
 *
 * @apiParam {String} user_name 用户名
 * @apiParam {String} nick_name 用户昵称
 * @apiParam {String} pass_word密码(MD5加密)
 *
 *
 * @apiSuccess {String} status 1/0 (成功/异常)
 * @apiSuccess {String} err_info 消息说明(<span style="color:red">用户名已存在</span>)
 * @apiSuccess {String} auth_token 访问令牌
 *
 */
router.post('/signin', function(req, res) {
    var {user_name, pass_word, nick_name} = req.body;
    if (!(user_name && pass_word && nick_name)) {
        return res.send({err_info: '参数错误', status: 0});
    }
    User.findOne({
        user_name: user_name
    }, function(err, data) {
        if (data) {
            return res.send({err_info: '用户名已存在', status: 0});
        } else {
            var time_stamp = new Date().getTime().toString();
            var auth_token = Math.random().toString(36).substr(2);
            var new_user = new User({user_name: user_name, pass_word: pass_word, nick_name: nick_name, time_stamp: time_stamp, auth_token: auth_token});
            new_user.save(function(err, data) {
                res.send({auth_token: auth_token, status: 1})
            });
        }
    });
});

module.exports = router;
