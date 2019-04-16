
module.exports = {
  
  gotoPlay: function(){
    wx.navigateTo({
      url: 'player?appId=' + this.data.appId + '&accountId=' + this.data.accountId + '&roomId=' + this.data.roomId + '&token=' + this.data.token + '&orientation=' + this.data.pushTypesValue[this.data.pushTypesIndex] + '&pushTypesIndex=' + this.data.pushTypesIndex,
    })
  },
  getinput: function (e) {
    this.data[e.currentTarget.id] = e.detail.value;
    console.log(this.data);
  },
  pickerChange: function(e){
    this.setData({ pushTypesIndex: e.detail.value });
  },
  goback: function () {
    wx.navigateBack({});
  },

  gotoPlayWithChat: function(){
    wx.navigateTo({
      url: '../chat/index?appId=' + this.data.appId + '&accoutId=' + this.data.accountId + '&roomId=' + this.data.roomId + '&token=' + this.data.token + '&orientation=' + this.data.pushTypesValue[this.data.pushTypesIndex] + '&pushTypesIndex=' + this.data.pushTypesIndex,
    })
  }
};