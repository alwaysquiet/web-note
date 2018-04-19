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

                fs.readFile('./test.html', function(err,data){
                    if(err) throw err;
                    res.writeHead(200,{"Content-type":"text/html;charset=UTF-8",'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
                    res.end(data);
                })
                
            }
        })
    }

}).listen(3001, 'localhost');