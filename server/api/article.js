var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();
var model = require('../model');
var Article = model.Article;
var User = model.User;
/**
 * @api {post} article/create 新建文章
 * @apiGroup Article
 * @apiVersion 1.0.0
 * @apiDescription 接口详细描述
 *
 * @apiParam {String} auth_token 访问令牌
 * @apiParam {String} title 文章标题
 * @apiParam {String} classify 文章分类(<span style="color:green">可为空字符串</span>)
 * @apiParam {String} article 文章内容(<span style="color:green">可为空字符串</span>)
 *
 * @apiSuccess {String} status 1/0 (成功/异常)
 * @apiSuccess {String} err_info 消息说明
 */
router.post('/create', function(req, res) {
    var {auth_token, title, classify, article} = req.body;
    if (!(auth_token && title)) {
        return res.send({err_info: '参数错误', status: 0});
    };
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
        var author = data.user_name;
        var author_id = data.user_id;
        var create_time = moment().format('YYYY-MM-DD, HH:mm:ss');
        var new_article = new Article({
            title: title,
            author: author,
            author_id: author_id,
            create_time: create_time,
            article: article,
            classify: classify
        });
        new_article.save(function(err, data) {
            if (data) {
                return res.send({status: 1});
            };
        });
    });
});
/**
 * @api {post} article/all_search 搜索所有文章
 * @apiGroup Article
 * @apiVersion 1.0.0
 * @apiDescription 接口详细描述
 *
 * @apiParam {String} title 文章标题(模糊查询，需trim)
 *
 * @apiSuccess {String} status 1/0 (成功/异常)
 * @apiSuccess {String} err_info 消息说明
 * @apiSuccess {Array} article_list
 * <p>article_id: 文章id</p>
 * <p>author: 作者</p>
 * <p>author_id: 作者用户id</p>
 * <p>title: 文章标题</p>
 * <p>create_time: 创建时间</p>
 * <p>update_time: 修改时间</p>
 * <p>classify: 文章分类</p>
 * <p>article: 文章内容</p>
 */
router.post('/all_search', function(req, res) {
    var title = new RegExp(req.body.title);
    Article.find({
        title: title
    }, function(err, data) {
        if (err) {
            return res.send({status: 0, err_info: '数据库异常'})
        };
        res.send({status: 1, article_list: data})
    })

});
/**
  * @api {post} article/search 搜索个人用户文章
  * @apiGroup Article
  * @apiVersion 1.0.0
  * @apiDescription 接口详细描述
  *
  * @apiParam {String} auth_token 访问令牌
  * @apiParam {String} title 文章标题(模糊查询，需trim)
  *
  * @apiSuccess {String} status 1/0 (成功/异常)
  * @apiSuccess {String} err_info 消息说明
  * @apiSuccess {Array} article_list
  * <p>article_id: 文章id</p>
  * <p>author: 作者</p>
  * <p>author_id: 作者用户id</p>
  * <p>title: 文章标题</p>
  * <p>create_time: 创建时间</p>
  * <p>update_time: 修改时间</p>
  * <p>classify: 文章分类</p>
  * <p>article: 文章内容</p>
  */
  router.post('/search', function(req, res) {
      var auth_token = req.body.auth_token;
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
          var author_id = data.user_id;
          var title = new RegExp(req.body.title);
          Article.find({
              title: title,
              author_id: author_id
          }, function(err, data) {
              if (err) {
                  return res.send({status: 0, err_info: '数据库异常'})
              };
              res.send({status: 1, article_list: data})
          })
      });


  });
module.exports = router;
