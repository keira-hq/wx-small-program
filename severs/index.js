
const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require("body-parser");

const request = require('request');
const querystring = require('querystring');

let https = require("https");
let fs = require("fs");

//调用文件
const fun = require('./fun.js');
const system = require('./system.js')


app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));


// 配置 https
const httpsOption = system.httpsOption;

//解决跨域问题
app.all('*', system.kuayu);


app.get('/', function(req, res){
    res.send('Hi,myServer');
});


//获取openid
app.post('/getopenid', fun.getOpenId)
//获取首页文章列表
app.get('/gethomelist', fun.gethomelist)
//获取文章列表
app.get('/getpagelist', fun.getpagelist)
//获取收藏列表
app.get('/getshoucanglist',fun.getshoucanglist)
//获取具体的文章内容
app.get('/getpagedetail', fun.getpagedetail)
//改变收藏状态
app.get('/changestatus1', fun.changestatus1)
//改变点赞状态
app.get('/changestatus2', fun.changestatus2)



//配置服务端口80 443

const server = app.listen(80, function () {
    const port = server.address().port;
    console.log('App listening at %s', port);
});

https.createServer(httpsOption, app).listen(443);
