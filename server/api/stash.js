var {CorpID, CorpSecret} = req.body;
var access_token_url = `https://oapi.dingtalk.com/gettoken?corpid=${CorpID}&corpsecret=${CorpSecret}`
rp(access_token_url).then((data) => {
    var obj = JSON.parse(data)
    var jsapi_ticket_url = `https://oapi.dingtalk.com/get_jsapi_ticket?access_token=${obj.access_token}`
    rp(jsapi_ticket_url).then((data) => {
        var noncestr = 'zoro';
        var timestamp = new Date().getTime().toString();
        var jsapi_ticket = JSON.parse(data).ticket;
        var url = 'http://192.168.0.120:3000/';
        var arr = ['noncestr', 'timestamp', 'jsapi_ticket', 'url']
        var str = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
        res.send({sign: str});
    })
});
