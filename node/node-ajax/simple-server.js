var http = require('http');
var url = require('url');
var queryString = require("querystring");

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

            if(dataObj.userName == '叶子汉' && dataObj.password == '123456') {
                res.writeHead(200,{"Content-type":"application/json;charset=UTF-8",'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
                res.end(JSON.stringify(dataObj));
            }
        })        
    }

}).listen(3001, 'localhost');