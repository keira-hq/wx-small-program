var f = require('./f');
// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    f.login();
 },
 
  globalData: {
    userInfo: null
  }
})
