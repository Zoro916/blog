var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();
var model = require('../model');
var until = require('../utils');

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

    until.token(auth_token, res, function(err, data) {
        var author = data.user_name;
        var author_id = data.user_id;
        var create_time = moment().format('YYYY-MM-DD, HH:mm:ss');
        var new_article = new Article({
            title: title,
            author: author,
            author_id: author_id,
            create_time: create_time,
            update_time: create_time,
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
 * <p>title: 文章标题</p>
 * <p>update_time: 修改时间</p>
 * <p>classify: 文章分类</p>
 */
router.post('/all_search', function(req, res) {
    var title = new RegExp(req.body.title);
    Article.find({title: title})
        .sort({'update_time': -1})
        .exec(function(err, data) {
            if (err) {
                return res.send({status: 0, err_info: '数据库异常'})
            };
            if (data.length == 0) {
                res.send({status: 1, article_list: data})
            }else{
                var arr = data.map((item, index) => {
                    return {
                        article_id: item.article_id,
                        title: item.title,
                        author: item.author,
                        update_time: item.update_time,
                        classify: item.classify
                    }
                })
                res.send({
                    status: 1,
                    article_list: arr
                })
            }
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
  * <p>title: 文章标题</p>
  * <p>update_time: 修改时间</p>
  * <p>classify: 文章分类</p>
  */
router.post('/search', function(req, res) {
    var auth_token = req.body.auth_token;
    until.token(auth_token, res, function(err, data) {
        var author_id = data.user_id;
        var title = new RegExp(req.body.title);
        Article.find({title: title, author_id: author_id})
            .sort({'update_time': -1})
            .exec(function(err, data) {
                if (err) {
                    return res.send({status: 0, err_info: '数据库异常'})
                };
                if (data.length == 0) {
                    res.send({status: 1, article_list: data})
                }else{
                    var arr = data.map((item, index) => {
                        return {
                            article_id: item.article_id,
                            title: item.title,
                            author: item.author,
                            update_time: item.update_time,
                            classify: item.classify
                        }
                    })
                    res.send({
                        status: 1,
                        article_list: arr
                    })
                }
            })
    });
});
/**
  * @api {post} article/remove 删除文章
  * @apiGroup Article
  * @apiVersion 1.0.0
  * @apiDescription 接口详细描述
  *
  * @apiParam {String} auth_token 访问令牌
  * @apiParam {String} article_id 文章id
  *
  * @apiSuccess {String} status 1/0 (成功/异常)
  * @apiSuccess {String} err_info 消息说明
  */
  router.post('/remove', function(req, res) {
      var {auth_token, article_id} = req.body;
      until.token(auth_token, res, function(err, data) {
          var author_id = data.user_id;
          Article.findOne({article_id: article_id, author_id: author_id})
              .exec(function(err, data){
                  if (err) {
                      return res.send({status: 0, err_info: '数据库异常'})
                  };
                  if (!data) {
                      return res.send({status: 0, err_info: '无此条数据'})
                  }
                  Article.remove({article_id: article_id, author_id: author_id})
                  .exec(function(err) {
                      if (err) {
                          return res.send({status: 0, err_info: '数据库异常'})
                      };
                      res.send({status: 1});
                  })
              })

      });
  });
  /**
    * @api {post} article/update 修改文章
    * @apiGroup Article
    * @apiVersion 1.0.0
    * @apiDescription 接口详细描述
    *
    * @apiParam {String} auth_token 访问令牌
    * @apiParam {String} article_id 文章id
    * @apiParam {String} title 文章标题
    * @apiParam {String} classify 文章分类(<span style="color:green">可为空字符串</span>)
    * @apiParam {String} article 文章内容(<span style="color:green">可为空字符串</span>)
    *
    * @apiSuccess {String} status 1/0 (成功/异常)
    * @apiSuccess {String} err_info 消息说明
    */
    router.post('/update', function(req, res) {
        var {auth_token, article_id, title, classify, article} = req.body;
        until.token(auth_token, res, function(err, data) {
            var author_id = data.user_id;
            Article.findOne({article_id: article_id, author_id: author_id})
                .exec(function(err, data){
                    if (err) {
                        return res.send({status: 0, err_info: '数据库异常'})
                    };
                    if (!data) {
                        return res.send({status: 0, err_info: '无此条数据'})
                    }
                    var update_time = moment().format('YYYY-MM-DD, HH:mm:ss');
                    Article.update({
                        article_id: article_id,
                        author_id: author_id
                    }, {
                        title: title,
                        update_time: update_time,
                        article: article,
                        classify: classify
                    })
                    .exec(function(err) {
                        if (err) {
                            return res.send({status: 0, err_info: '数据库异常'})
                        };
                        res.send({status: 1});
                    })
                })

        });
    });
    /**
      * @api {post} article/detail 文章详情
      * @apiGroup Article
      * @apiVersion 1.0.0
      * @apiDescription 接口详细描述
      *
      * @apiParam {String} article_id 文章id
      *
      * @apiSuccess {String} status 1/0 (成功/异常)
      * @apiSuccess {String} err_info 消息说明
      * @apiSuccess {Object} data
      * <p>title: 文章标题</p>
      * <p>article_id: 文章id</p>
      * <p>author: 作者</p>
      * <p>author_id: 作者用户id</p>
      * <p>create_time: 创建时间</p>
      * <p>update_time: 修改时间</p>
      * <p>classify: 文章分类</p>
      * <p>article: 文章内容</p>
      */
      router.post('/detail', function(req, res) {
          var {article_id} = req.body;
          Article.findOne({article_id: article_id})
             .exec(function(err, data){
                 res.send({
                     status: 1,
                     data: {
                         title: data.title,
                         article_id: data.article_id,
                         author: data.author,
                         author_id: data.author_id,
                         create_time: data.create_time,
                         update_time: data.update_time,
                         classify: data.classify,
                         article: data.article
                     }
                 })
             })
      });
module.exports = router;
