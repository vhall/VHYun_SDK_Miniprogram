
module.exports = {
  
  gotoVod: function(){
    wx.navigateTo({
      url: 'player?appId=' + this.data.appId + '&accountId=' + this.data.accountId + '&recordId=' + this.data.recordId + '&token=' + this.data.token + '&orientation=' + this.data.pushTypesValue[this.data.pushTypesIndex] + '&pushTypesIndex=' + this.data.pushTypesIndex,
    })
    console.log(this.data.recordId);
  },
  getinput: function(e){
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
      url: '../chat/index?appId=' + this.data.appId + '&accoutId=' + this.data.accountId + '&rcordId=' + this.data.rcordId + '&token=' + this.data.token + '&orientation=' + this.data.pushTypesValue[this.data.pushTypesIndex] + '&pushTypesIndex=' + this.data.pushTypesIndex,
    })
  }
};