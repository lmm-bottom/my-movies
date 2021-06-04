// pages/list/list.js
let datas = require('../../datas/list_data.js');
// console.log(datas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listArr: datas.list_data
    }),	wx.onBackgroundAudioPlay(function() {
      console.log('onBackgroundAudioPlay')
  })

  /**
   * 监听音乐暂停
   */
  wx.onBackgroundAudioPause(function() {
      console.log('onBackgroundAudioPause')
  })

  /**
   * 监听音乐停止
   */
  wx.onBackgroundAudioStop(function() {
      console.log('onBackgroundAudioStop')
  })

  },

  /*点击进入详情页 */
  toDetail(event){
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
       url: '/pages/detail/detail?index=' + index,
   })
  },

  /*
    轮播图跳转
  */
  carouselDetail(event){
  
    let index = event.target.dataset.index
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
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
  
  },
  listenerButtonPlay: function() {
    wx.playBackgroundAudio({
    //播放地址
    dataUrl: 'http://sc1.111ttt.com/2016/1/09/28/202280605509.mp3',
    title: '青云志',
    //图片地址
    coverImgUrl: 'http://r1.ykimg.com/050E0000576B75F667BC3C136B06E4E7'

    })
},
/**
* 播放状态
*/
listenerButtonGetPlayState: function() {
    wx.getBackgroundAudioPlayerState({
        success: function(res) {
          console.log(res)
          //duration 总时长
          //currentPosition 当前播放位置
          //status 播放状态
          //downloadPercent 下载状况 100 即为100%
          //dataUrl 当前播放音乐地址
        }
    }) 
},
/**
* 监听button暂停按钮
*/
listenerButtonPause: function() {
   wx.pauseBackgroundAudio();
},
/**
* 设置进度
*/
listenerButtonSeek: function() {
    wx.seekBackgroundAudio({
        position: 30
    })
},
/**
*停止播放 
*/
listenerButtonStop: function() {
    wx.stopBackgroundAudio()
}
})
// //record.js 
// //获取应用实例  
// Page({
// 	data:{
// 	// text:"这是一个页面"
// 	},
// 	onLoad:function(options){
// 		// 页面初始化 options为页面跳转所带来的参数
// 		/**
// 		 * 监听音乐播放
// 		 */
	
 
// 	},//播放音乐

// })