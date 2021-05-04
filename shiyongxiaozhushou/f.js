function login(){
   //发送code
   wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId

     //获取code
     console.log("code:"+res.code)
     wx.request({
      url: 'https://20210330.keirahq.com/getopenid',
     //  url: 'http://39.101.133.38/getopenid',
     //  url: 'http://localhost/getcode',
      method:"POST",
      data: {
          'code': res.code
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: (res) => {
        console.log("code发送成功")
        console.log(res.data)
        //将其放在缓存中
        wx.setStorageSync('userid', res.data.userid)
      }
    })
   }
 })
   
}
module.exports={
  login
}


