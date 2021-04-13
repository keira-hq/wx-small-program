Page({
  data:{},

  onLoad(options){
    console.log("详情页接受的id:",options.id)
    let that = this;
    let id = options.id;
    let row =id-1;
    wx.request({
      url: 'https://20210330.keirahq.com/getpagelist',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        id: id
      },
      success(res){
        console.log("detail成功："+res.data)
        that.setData({
          detail: res.data.data[row]
        })
      },
    })
  }
})