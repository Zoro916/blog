var express = require('express');
var Api = require('./api_model.js');
var router = express.Router();

router.get('/api_doc', function(req, res) {
  var list = [];
  var detail = [];
  var api_list = '';
  var detail_list = '';
  Api.find(function(err, data) {
    data.forEach((item, index) => {
      var str1 = `
                  <tr>
                      <td>${index}</td>
                      <td>${item.url}</td>
                      <td>${item.api}</td>
                  </tr>
              `;
      var param = '';
      var res = '';
      for(var i in JSON.parse(item.param) ){
          param = param + `<p class="code">${i}</p>`;
      };
      for(var j in JSON.parse(item.res)){
        res = res + `<p class="code">${j}</p>`;
      }
      var str2 = `
            <div>
              <p><span>【${index + 1}】</span><span>api名称：</span><span>${item.api}</span></p>
              <div class="code-des">
                <p>
                  <span>@param：</span>
                  <pre>
                      ${param}
                  </pre>
                  <span>@return：</span>
                  <pre>
                      ${res}
                  </pre>
                </p>
              </div>
            </div>
            `
      list.push(str1);
      detail.push(str2);
    });
    list.forEach((data, index) => {
      api_list = api_list + data;
    });
    detail.forEach((data, index) => {
      detail_list = detail_list + data;
    });
    var document = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="./api.css">
        <title>OA api doc</title>
        <style>
        html{
          padding: 20px;
        }
        h3{
          border-bottom: 1px solid #000;
        }
        table,tr,td{
          border: 1px solid #000;
        }
        td:nth-child(1){
          width:50px;
          text-align: center;
        }
        table{
          width:100%;
          margin: auto;
          border-collapse:collapse;
        }
        .code-des{
          padding: 10px 30px;
          border: 1px solid #999;
        }
        .code{
          text-indent: 100px;
        }
      </style>

      </head>
      <body>
        <h3>api-OA接入钉钉</h3>
        <h4>api列表</h4>
          <table>
              <tr>
                  <td>编号</td>
                  <td>api名称</td>
                  <td>描述</td>
              </tr>
              ${api_list}
          </table>
          ${detail_list}
      </body>
      </html>
      `;
    res.send(document);
  });
  })

  module.exports = router;
