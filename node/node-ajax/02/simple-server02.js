var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var queryString = require("querystring");

http.createServer(function(req, res){

    if(req.url == "/favicon.ico"){
        return;
    }

    //  由于使用了post 提交   提交的参数数据不在query参数中
    //  emitter.addListener(eventName, listener)
    //  通过监听 data事件，将由post提交的一段一段的数据，拼接到一起。

    if(req.url == '/login' && req.method.toLowerCase() == 'post') {
        var allData = "";
        req.addListener('data', function(chunk){
            allData += chunk;
        })
        req.addListener('end', function(){
            var dataString = allData.toString();
            var dataObj = queryString.parse(dataString);
            dataObj.success = "验证通过，恭喜你，登录成功"

            if(dataObj.username == 'alwaysquiet' && dataObj.password == '123456') {
                res.writeHead(200,{"Content-type":"application/json;charset=UTF-8",'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
                //  这里返回的就是接收到的参数
                res.end(JSON.stringify(dataObj));
            }
        })  
    }

}).listen(3001, 'localhost');