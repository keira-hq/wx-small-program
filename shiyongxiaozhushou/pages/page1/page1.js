Page({

  data:{
    datalist:[],
    classid:null

  },
  //跳转到详情页
  
  onLoad(options){
    console.log("option内容")
    console.log(options)
    let classid = options.classid
    let that = this;
    that.setData({
      classid: classid
    })
    let userid = (wx.getStorageSync('userid') || ('err'))
    wx.request({
      url: 'https://20210330.keirahq.com/getpagelist',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        userid:userid,
        classid:classid
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

  goClass(event){
    console.log("分区")
    console.log(event.currentTarget)
    wx.navigateTo({
      url: '/pages/page1/page1?classid='+event.currentTarget.dataset.classid,
    })
    var that = this;
    
    console.log(this.data.classid);

    
  },

  
  
})