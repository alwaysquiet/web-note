var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){

    if(req.url == "/favicon.ico"){
        return;
    }

    //  fs.readFile(path[, options], callback)
    //  如果未指定字符编码，则返回原始的buffer
    //  http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback
    fs.readFile('./simpledata.json', 'utf8', function(err, data){
        if(err) throw err;
        res.writeHead(200,{
            "Content-type":"application/json;charset=UTF-8",
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'
        });
        res.end(data);
    })

}).listen(3001, 'localhost');