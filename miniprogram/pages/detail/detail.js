// pages/detail/detail.js
let datas = require('../../datas/list_data.js')
let appData = getApp()
// console.log(appData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    console.log("op"+options)
    //获取参数值
    this.setData({
      detailObj: datas.list_data[index],
      index
    })
    // 根据本地缓存数据判断用户是否收藏当前的电影
    let detailStorage = wx.getStorageSync('isCollected')
    // console.log(detailStorage)
      //第一次进入设置为空
      if (!detailStorage){
        wx.setStorageSync('isCollected', {})
      }
    if(detailStorage[index]){//收藏过
      this.setData({
        isCollected: true
      })
    }

  

    //监听音乐播放
    let backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPlay((event)=>{
      this.setData({
        isMusicPlay: true
      })
      appData.data.isMusicPlay = true
      appData.data.index = index
    })
    //监听音乐停止
    backgroundAudioManager.onPause((event) => {
      this.setData({
        isMusicPlay: false
      })
      appData.data.isMusicPlay = false
    })

    if (appData.data.isMusicPlay == true && appData.data.index === index){
      this.setData({
        isMusicPlay:true
      })
    }
  },
// 处理收藏功能
  handleCollection(){
    console.log(this)
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected
    })
    //提示用户收藏成功或取消收藏
    let title = isCollected?"收藏成功":"取消收藏"
    wx.showToast({
      title,
      icon:'success'
    })
    //获取缓存
    //不可行，会覆盖之前的状态
    //let obj = {}
    wx.getStorage({
      key: 'isCollected',
      success: (datas) => {
        let obj = datas.data
        let index = this.data.index
        //缓存到本地
        obj[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: (data) => {
            // console.log("缓存成功")
          }
        })
      },
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
  onShareappDataMessage: function () {
  
  },
  //控制音乐播放控制
  handleMusicPlay(){
    //控制音乐播发按钮
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay: isMusicPlay
    })

    //音乐播放控制
    let dataUrl = this.data.detailObj.music.dataUrl
    console.log(dataUrl)
    let title = this.data.detailObj.music.title
    if (isMusicPlay) {
    


      wx.playBackgroundAudio({
        dataUrl,
        title,
      })
    }else{
      wx.stopBackgroundAudio()
    }
  },
  //处理点击分享功能
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈',
        '分享到qq空间',
        '分享到微博'
      ],
    })
  }
})