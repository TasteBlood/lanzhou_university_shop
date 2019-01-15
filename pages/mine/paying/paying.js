// pages/mine/paying/paying.js
const $http = require('request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalFee: 0.00,
    totalFeeFen: 0,
    orderNum: '',
    success:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      totalFee: options.totalFee,
      totalFeeFen: Number.parseInt(options.totalFee * 100),
      orderNum: options.orderNum
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  async buy() {
    let res = await $http.pay(this.data.orderNum);
    let self = this;
    if (res.code === 1) {
      let data = res.data;
      wx.requestPayment({
        timeStamp: data.timestamp,
        nonceStr: data.nonceStr,
        package: data.packages,
        signType: 'MD5',
        paySign: data.sign,
        success: res => {
          //console.log('psy success',res)
          self.setData({
            success:1
          });
        },
        fail: e => {
          self.setData({
            success: -1
          });
        }
      });
    } else {
      wx.showToast({
        title: res.msg ? '支付失败' : res.msg,
        icon: 'error'
      })
      self.setData({
        success: -1
      });
    }
  },
  buySuccess(e){
    wx.navigateBack({
      
    });
  },
  buyError(e){
    wx.navigateBack({

    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})