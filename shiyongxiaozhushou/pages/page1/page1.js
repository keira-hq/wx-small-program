Page({

  data:{
    datalist:[]
  },
  //跳转到详情页
  
  onLoad(){
    let that = this;
    wx.request({
      url: 'https://20210330.keirahq.com/getpagelist',
      header: {
        'content-type': 'application/json' // 默认值
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
  }
})