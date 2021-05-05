// pages/article/article2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let userid = (wx.getStorageSync('userid') || ('err'))
    wx.request({
      url: 'https://20210330.keirahq.com/getshoucanglist',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        userid:userid,
      },
      success(res){
        console.log("取数据成功")
        console.log(res.data)
        that.setData({
          datalist: res.data.data
        })
      },
    })
  },
  goDetail(event){
    console.log("点击事件")
    console.log(event.currentTarget)
    wx.navigateTo({
      url: '/pages/article/article1?id='+event.currentTarget.dataset.articleid,
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