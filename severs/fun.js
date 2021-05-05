const request = require('request');
const querystring = require('querystring');

//调用文件
const system = require('./system.js');

//数据库信息
const pool = system.pool;

//获取openid
function getOpenId(req, res){
    const data = {
        'appid': 'wx7134395545792e75',
        'secret': 'f3c40b1bfac22dcbf1c1571149bbfb1c',
        'js_code': req.body.code,
        'grant_type': 'authorization_code'
    };
    console.log(data);
    // querystring的stringify用于拼接查询
    const content = querystring.stringify(data);
    // 根据微信开发者文档给的API
    const url = 'https://api.weixin.qq.com/sns/jscode2session?' + content;
    // 对url发出一个get请求
    request.get({
        'url': url
    }, (error, response, body) => {
        // 将body的内容解析出来
        let result = JSON.parse(body);
        result.code = req.body.code;
        let openid = result.openid
        console.log(result)
        //1.查数据库
        //2.判断openid是否存在
        //3.如果存在，则将对应信息返回给小程序端
        //4.否则，新插入记录到数据库，并将结果返回到小程序端
        pool.getConnection(function (err, connection){
            let sql = "select * from userinfo where openid='"+openid+"'";
            console.log(sql);
            connection.query(sql, function (err, rows){
                if(err){
                    throw err;
                }else{
                    //有openid则返回
                    if(rows.length>0){
                        let result = {
                            "status":"200",
                            "success":true
                        }
                        result.userid=rows[0].userid;
                        console.log(rows[0]);
                        res.json(result);
                    }else{
                        //插入一条记录
                        sql = "insert into userinfo (openid) values ('"+openid+"')";
                        console.log(sql);
                        connection.query(sql, function (err, rows) {
                            if (err) {
                                throw err;
                            } else {
                                console.log(rows);
                                let result={
                                    "status":"200",
                                    "success":true
                                }
                                result.userid = rows.insertId;
                                res.json(result);
                            }
                        });

                    }
                }
            });
            connection.release();
        })
    })
}

//获取首页文章列表
function gethomelist(req,res) {
    pool.getConnection(function(err, connection){
        let sql = "select * from articlelist order by date DESC limit 5"
        console.log(sql);
        connection.query(sql,function(err, rows){
            if(err) {
                throw err;
            }else{
                let result = {
                    "status": "200",
                    "success": true,
                }
                result.data=rows;
                console.log( rows );
                res.json(result);
            }
        });
        connection.release();
    });
}

//获取文章列表
function getpagelist(req,res) {
    pool.getConnection(function(err, connection){
        let userid = req.query.userid;
        let classid = req.query.classid;

        let sql = "select articlelist.*,IFNULL(dianzanshoucang.shoucang,0) as shoucang,IFNULL(dianzanshoucang.dianzan,0) as dianzan from articlelist left join dianzanshoucang on articlelist.articleid = dianzanshoucang.articleid and dianzanshoucang.userid ="+userid+" where articlelist.classid= "+classid;
        console.log(sql);
        connection.query(sql,function(err, rows){
            if(err) {
                throw err;
            }else{
                let result = {
                    "status": "200",
                    "success": true,
                }
                result.data=rows;
                console.log( rows );
                res.json(result);
            }
        });
        connection.release();
    });
}

//获取收藏列表
function getshoucanglist(req,res) {
    pool.getConnection(function(err, connection){
        let userid = req.query.userid;
        let sql = "select articlelist.* ,IFNULL(dianzanshoucang.shoucang,0) as shoucang,IFNULL(dianzanshoucang.dianzan,0) as dianzan from articlelist left join dianzanshoucang on articlelist.articleid = dianzanshoucang.articleid and dianzanshoucang.userid ="+userid+" where dianzanshoucang.shoucang = 1 order by stime DESC";
        console.log(sql);
        connection.query(sql,function(err, rows){
            if(err) {
                throw err;
            }else{
                let result = {
                    "status": "200",
                    "success": true,
                }
                result.data=rows;
                console.log( rows );
                res.json(result);
            }
        });
        connection.release();
    });
}
//获取具体的文章内容
function getpagedetail(req,res) {
    pool.getConnection(function(err, connection){
        let userid = req.query.userid;
        let articleid = req.query.articleid;
        //用户浏览量
        let sql = "update articlelist set view_sum = view_sum+1 where articleid = "+articleid;
        console.log(sql);
        connection.query(sql,function(err, rows){
            if(err) {
                throw err;
            }else{
                //在dianzanshoucang表里增加相应的记录
                let sql = "select * from dianzanshoucang where userid = "+userid+" and articleid = "+articleid;
                console.log(sql);
                connection.query(sql, function (err, rows) {
                    if (err) {
                        throw err;
                    } else {
                        //如果dianzanshoucang里有userid 和 articleid相应的记录 则左连接取出文章内容，否则增加一条记录
                        if (rows.length > 0){
                            sql = "select articlelist.*,IFNULL(dianzanshoucang.shoucang,0) as shoucang,IFNULL(dianzanshoucang.dianzan,0) as dianzan from articlelist left join dianzanshoucang on articlelist.articleid = dianzanshoucang.articleid  where articlelist.articleid = "+articleid+" and dianzanshoucang.userid ="+userid ;
                            console.log(sql);
                            connection.query(sql, function (err, rows) {
                                if (err) {
                                    throw err;
                                } else {
                                    let result = {
                                        "status": "200",
                                        "success": true
                                    }
                                    result.detail = rows;
                                    console.log(rows);
                                    res.json(result);
                                }
                            })
                        } else{
                            //dianzanshoucang表中没有记录 增加一条记录
                            sql = "insert into dianzanshoucang (userid, articleid) values (" + userid + ", " + articleid + ")";
                            console.log(sql);
                            connection.query(sql, function (err, rows) {
                                if (err) {
                                    throw err;
                                } else {
                                    //如果dianzanshoucang里有userid 和 articleid相应的记录 则左连接取出文章内容，否则增加一条记录
                                    sql = "select articlelist.*,IFNULL(dianzanshoucang.shoucang,0) as shoucang,IFNULL(dianzanshoucang.dianzan,0) as dianzan from articlelist left join dianzanshoucang on articlelist.articleid = dianzanshoucang.articleid  where articlelist.articleid = " + articleid + " and dianzanshoucang.userid =" + userid;
                                    console.log(sql);
                                    connection.query(sql, function (err, rows) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            let result = {
                                                "status": "200",
                                                "success": true
                                            }
                                            result.detail = rows;
                                            console.log(rows);
                                            res.json(result);
                                        }
                                    })
                                }
                            });

                        }

                    }
                })
            }
        })
        connection.release();
    })
}
//改变收藏状态
function changestatus1(req,res) {
    pool.getConnection(function(err, connection){
        console.log("changestatus1："+res.query);
        let userid =req.query.userid;
        let shoucang = req.query.shoucang;
        let articleid = req.query.articleid;
        let sql = "UPDATE `dianzanshoucang` SET `shoucang` = "+ shoucang +", stime = now()  where dianzanshoucang.articleid = " + articleid + " and dianzanshoucang.userid =" + userid;
        console.log(sql);
        connection.query(sql,function(err, rows){
            if(err) {
                throw err;
            }else{
                //更改articlelist里的总值
                sql = "update articlelist set shoucang_sum = (select sum(shoucang) from dianzanshoucang where articleid = "+articleid+") where articleid = "+articleid;
                console.log(sql);
                connection.query(sql, function (err, rows) {
                    if (err) {
                        throw err;
                    } else {
                        let sql = "select * from articlelist where articleid = "+articleid;
                        console.log(sql);
                        connection.query(sql, function (err, rows) {
                            if (err) {
                                throw err;
                            } else {
                                let result = {
                                    "status": "200",
                                    "success": true
                                }
                                result.c1 = rows;
                                console.log(rows);
                                res.json(result);
                            }
                        });
                    }
                });
            }
        });
        connection.release();
    });
}

//改变点赞状态
function changestatus2(req,res) {
    pool.getConnection(function(err, connection){
        console.log("changestatus2:"+res.query);
        let userid =req.query.userid;
        let dianzan = req.query.dianzan;
        let articleid = req.query.articleid;
        let sql = "UPDATE dianzanshoucang SET dianzan = "+ dianzan +" where dianzanshoucang.articleid = " + articleid + " and dianzanshoucang.userid =" + userid;
        console.log(sql);
        connection.query(sql,function(err, rows){
            if(err) {
                throw err;
            }else{
                //更改articlelist里的总值
                sql = "update articlelist set dianzan_sum = (select sum(dianzan) from dianzanshoucang where articleid = "+articleid+") where articleid = "+articleid;
                console.log(sql);
                connection.query(sql, function (err, rows) {
                    if (err) {
                        throw err;
                    } else {
                        let sql = "select * from articlelist where articleid = "+articleid;
                        console.log(sql);
                        connection.query(sql, function (err, rows) {
                            if (err) {
                                throw err;
                            } else {
                                let result = {
                                    "status": "200",
                                    "success": true
                                }
                                result.c2 = rows;
                                console.log(rows);
                                res.json(result);
                            }
                        });
                    }
                });
            }
        });
        connection.release();
    });
}

exports.getOpenId = getOpenId;
exports.getpagelist = getpagelist;
exports.gethomelist = gethomelist;
exports.getpagedetail = getpagedetail;
exports.changestatus1 = changestatus1;
exports.changestatus2 = changestatus2;
exports.getshoucanglist = getshoucanglist;


