// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_detail:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
    this.setData({
      data_detail:[{img:"/images/home/hot1.png",title:"解锁微信小功能",date:"2021.1.1",content:"微信发现"},
    {img:"/images/home/hot2.png",title:"MAC快捷键大揭秘",date:"2021.1.2",content:"微信发现"},{img:"/images/home/hot1.png",title:"MAC快捷键大揭秘",date:"2021.1.3",content:"微信发现"},{img:"/images/home/hot1.png",title:"MAC快捷键大揭秘",date:"2021.1.3",content:"微信发现"}
  ]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})