let articleid = ''
let shoucang= 0
let dianzan= 0
let userid = (wx.getStorageSync('userid') || ('err'))

Page({
  data:{
    detail:'',
    imgUrl:"../../images/shoucang-no.png",
    dianzanUrl:"../../images/dianzan-no.png"
  },

  onLoad(options){
    console.log("option的内容") //url里的id
    console.log(options);
    articleid = options.id
    // let userid = (wx.getStorageSync('userid') || ('err'))
    console.log("userid:",userid)
    console.log("详情页接受的id:",articleid)
    let that = this;
    wx.request({
      url: 'https://20210330.keirahq.com/getpagedetail',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        articleid: articleid,
        userid:userid
      },
      success(res){
        console.log("detail成功")
        console.log(res.data)
        shoucang = res.data.detail[0].shoucang
        dianzan = res.data.detail[0].dianzan
        console.log("收藏："+shoucang,dianzan)
        that.setData({
          detail: res.data.detail[0],
          dianzanUrl:dianzan==0?"../../images/dianzan-no.png":"../../images/dianzan-yes.png",
          imgUrl:shoucang==0?"../../images/shoucang-no.png":"../../images/shoucang-yes.png"
        })
      },
    })
  },

  clickMe(c1){
    console.log("点赞前:"+shoucang)
    let that = this
    that.setData({
      imgUrl:shoucang==1?"../../images/shoucang-no.png":"../../images/shoucang-yes.png"
    })
    shoucang = Math.abs(shoucang-1)
    console.log("点赞后:"+shoucang)
    console.log(userid)
    console.log(c1.currentTarget.dataset.articleid)
    wx.request({
      url: 'https://20210330.keirahq.com/changestatus1',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        userid:userid,
        shoucang: shoucang,
        articleid:c1.currentTarget.dataset.articleid
      },
      success(res){
        console.log("改变收藏状态成功：",res.data.c1[0])
        that.setData({
          detail: res.data.c1[0],
        })
      },
    })
  },

//点赞
  clickMe2(c2){
    let that=this
    that.setData({
      dianzanUrl:dianzan==1?"../../images/dianzan-no.png":"../../images/dianzan-yes.png"
    })
    dianzan = Math.abs(dianzan-1)
    wx.request({
      url: 'https://20210330.keirahq.com/changestatus2',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        userid:userid,
        dianzan: dianzan,
        articleid:c2.currentTarget.dataset.articleid
      },
      success(res){
        console.log("改变点赞状态成功：",res.data)
        that.setData({
          detail: res.data.c2[0]
        })
      },
    })
  }

})