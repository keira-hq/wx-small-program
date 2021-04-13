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
        console.log("成功"+res.data)
        that.setData({
          datalist: res.data.data
        })
      },
    })
  },
  goDetail(event){
    console.log("点击获取的数据",event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/article/article1?id='+event.currentTarget.dataset.id,
    })
  }
})