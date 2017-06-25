var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();
var model = require('../model');
var until = require('../utils');

var {User, Article, Reply} = model;

/**
 * @api {post} reply/create 新建文章评论
 * @apiGroup Reply
 * @apiVersion 1.0.0
 * @apiDescription 接口详细描述
 *
 * @apiParam auth_token 访问令牌
 * @apiParam article_id 文章id
 * @apiParam recv_id 艾特人id(<span stylr="color: red">无艾特人仅回复楼主该字段传 0 </span>)
 * @apiParam reply 评论内容(需trim)
 *
 * @apiSuccess {String} status 1/0 (成功/异常)
 * @apiSuccess {String} err_info 消息说明
 *
 */
router.post('/create', function(req, res) {
    var {auth_token, article_id, recv_id, reply} = req.body;

    if (!(auth_token && article_id && recv_id && reply)) {
        return res.send({err_info: '参数错1误', status: 0});
    };
    until.token(auth_token, res, function(err, data) {
        var post_id = data.user_id;
        var post_nick = data.nick_name;

        var create_time = moment().format('YYYY-MM-DD, HH:mm:ss');
        if (recv_id != 0) {
            User.findOne({user_id: recv_id}).exec(function(err, item) {
                var recv_nick = item.nick_name;
                var new_reply = new Reply({
                    article_id: article_id,
                    post_id: post_id,
                    post_nick: post_nick,
                    recv_id: recv_id,
                    recv_nick: recv_nick,
                    reply: reply,
                    create_time: create_time
                });
                new_reply.save(function(err, data) {
                    if (data) {
                        res.send({status: 1})
                    }
                })
            });
        } else {
            var new_reply = new Reply({
                article_id: article_id,
                post_id: post_id,
                post_nick: post_nick,
                recv_id: recv_id,
                recv_nick: '',
                reply: reply,
                create_time: create_time
            });
            new_reply.save(function(err, data) {
                if (data) {
                    res.send({status: 1})
                }
            })
        }

    });
})
/**
 * @api {post} reply/list 获取文章评论列表
 * @apiGroup Reply
 * @apiVersion 1.0.0
 * @apiDescription 接口详细描述
 *
 * @apiParam article_id 文章id
 *
 * @apiSuccess {String} status 1/0 (成功/异常)
 * @apiSuccess {String} err_info 消息说明
 * @apiSuccess {Array} reply_list
 * <p>reply_id: 评论id</p>
 * <p>post_id: 评论人id</p>
 * <p>post_nick: 评论人昵称</p>
 * <p>recv_id: 艾特人id</p>
 * <p>recv_nick: 艾特人昵称</p>
 * <p>create_time: 评论时间</p>
 * <p>reply: 评论内容</p>
 */
router.post('/list', function(req, res) {
    var {article_id} = req.body;
    if (!article_id) {
        return res.send({err_info: '参数错误', status: 0});
    };
    Reply.find({article_id: article_id}).sort({'create_time': 1}).exec(function(err, data) {
        var arr = data.map((item, index) => {
            return {
                reply_id: item.reply_id,
                post_id: item.post_id,
                post_nick: item.post_nick,
                recv_id: item.recv_id,
                recv_nick: item.recv_nick,
                create_time: item.create_time,
                reply: item.reply
            }
        });
        res.send({status: 1, reply_list: arr})
    })
})
module.exports = router;
