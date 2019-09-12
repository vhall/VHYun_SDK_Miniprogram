// pages/player/player.js

import { videoJs } from '../sdk/vhall-mpsdk-player-0.1.5'
let v = null;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 播放地址，默认空。初始化vhall播放器后设置
    videoUrl: '',
    // 是否静音
    muted:false,
    // 播放器窗口尺寸设置
    playerHeight:'100%',
    // 默认当前清晰度，初始化vhall播放器后设置
    quality:'', 
    // 清晰度映射表
    qualitys: {
      'same': '原画',
      '720p': '高清',
      '480p': '标清',
      '360p': '流畅',
      'a':'音频'
    },
    // 支持的清晰度列表，初始化vhall播放器后设置
    qualityData:[''],
    // 是否显示清晰度列表（默认不显示）
    qualitySelectorDisplay:'none',
    // 当前播放时间点
    currentTime: 0
  },

  player:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageLoadOptions:options
    });
    this.load(options);
  },

  load: function (options){
    var _this = this;
    for (var key in options) {
      if (_this.data.hasOwnProperty(key)) {
        var _d = {};
        _d[key] = options[key];
        _this.setData(_d);
      }
    }

    wx.getSystemInfo({
      success: function (res) {
        var h = (res.windowWidth / 16) * 9;
        _this.setData({
          playerHeight: h
        });
      }
    });

    // 实例化vhall播放器
    this.player = new videoJs({
      wx: wx, // 微信句柄
      context: this, // 当前页面上下文句柄
      playerKey: 'videoUrl', // 播放器src变量，用于配置播放源
      id_: 'live-player', // 播放器元素id
      type: 'vod', // live or vod。观看直播或点播
      access_token: options.token, // 用户access_token
      account_Id: options.accountId, // 第三方用户ID
      aid: options.recordId, // 直播为roomid、点播为recordid
      app_id: options.appId, // 应用id
    }, function() {
      // 成功回调
      _this.player.play();
      // 设置当前分辨率和分辨率列表展示
      _this.setData({ quality: _this.data.qualitys[_this.player.getCurrentQuality()] });
      _this.setData({ qualityData: _this.player.getQualityList() });
    }, function() {
      // 失败回调
      console.error('The player init error!');
      wx.showToast({
        title: '播放失败，请检查参数正确性.',
        icon: 'none',
        duration: 3000
      })
    });

    // 保持屏幕常亮
    wx.setKeepScreenOn({keepScreenOn: true});
  },

  onTimeUpdata: function (event) {
    // 保存当前播放时间点，用于点播切换清晰度后从当前时间点开始播放
    this.data.currentTime = event.detail.currentTime;
    if (this.player) {
      this.player.onTimeUpdata(event);
    }
  },

  // 播放
  play: function(){
    this.player.play();
  },

  // 停止
  stop: function(){
    this.player.stop();
  },

  // 开关静音
  mutedChange: function(){
    this.setData({ muted: !this.data.muted});
  },

  goback: function () {
    wx.navigateBack({});
  },

  // 点击列出清晰度列表
  switchQuality: function () {
    var _display = 'none';
    if (this.data.qualitySelectorDisplay == 'none') {
      _display = 'block';
    } else {
      _display = 'none';
    }
    this.setData({ qualitySelectorDisplay: _display });
  },

  // 点击选择清晰度
  qualityClick: function (e) {
    var _idx = e.target.dataset.index,
      _item = e.target.dataset.item;
    // 调用vhall播放器接口，设置清晰度
    this.player.switchQualityLevel(this.data.qualityData[_idx], this.data.currentTime);
    // 设置后清晰度选择列表消失
    this.setData({ qualitySelectorDisplay: 'none' });
    // 改变当前清晰度显示
    this.setData({ quality: this.data.qualitys[_item] });
  },

  onError: function (event) {
    console.log(event);
    wx.showToast({
      title: '播放失败，请检查视频源是否有效.',
      icon: 'none',
      duration: 3000
    })
  },

  onProgress: function (event) {
    console.log(event);
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