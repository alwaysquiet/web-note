var http = require('http');
var queryString = require("querystring");
var fs = require('fs');

http.createServer(function(req, res){

    if(req.url == "/favicon.ico"){
        return;
    }

    if(req.url == '/login' && req.method.toLowerCase() == 'post') {
        var allData = "";
        req.addListener('data', function(chunk){
            allData += chunk;
        })
        req.addListener('end', function(){
            var dataString = allData.toString();
            var dataObj = queryString.parse(dataString);

            if(dataObj.username == 'alwaysquiet' && dataObj.password == '123456') {

                //  这里的话，返回一个页面好像没啥技术含量，跟前面读取json没啥不同
                //  做点改变，加入这个html页面引入了css image 看看是什么情况
                //  如果你有尝试去运行的话，肯定会发现页面处于pending状态了，永远不会加载结束

                //  问题出在哪里了呢，如果你了解页面请求的原理的话，那么我们可以分析下，浏览器的行为
                //  服务器给客户端，返回一个html页面，客户端(浏览器)解析html页面，发现里面有css image
                //  就会继续向客户端发送css image请求。

                fs.readFile('./test1.html', function(err,data){
                    if(err) throw err;
                    res.writeHead(200,{"Content-type":"text/html;charset=UTF-8",'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
                    res.end(data);
                })
                
            }
        })
    }

    //  到这的话，请求的css也就发给了客户端
    if(req.url == '/style.css') {
        fs.readFile('./style.css', function(err, data){
            if(err) throw err;
            res.writeHead(200,{"Content-type":"text/css;charset=UTF-8",'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
            res.end(data);
        })
    }

    // 图片请求的话，就不写了，哈哈哈

}).listen(3001, 'localhost');