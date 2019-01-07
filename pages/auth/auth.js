// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGetUserInfo:res=>{
    // console.log(res.detail.rawData);
    let info = res.detail.rawData;
    if(!info){
      wx.showToast({
        title: '拒绝授权，无法使用该小程序',
        icon:'none'
      });
    }else{
      //将信息保存在本地
      wx.setStorageSync('userinfo',info);
      //将页面回退
      wx.reLaunch({
        url: '../shop/shop',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log('on unload');
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