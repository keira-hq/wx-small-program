// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

       //获取code
       console.log("code:"+res.code)

       
       //发送code
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
           console.log(res.data)
          //  wx.setStorageSync('uid', res.data.uid)
         }
       })
     }
   })
 },
 
  globalData: {
    userInfo: null
  }
})
