// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{}
  },

  skipToPage(data){
    console.log(data)
    if (data.currentTarget.dataset.page ==='orderPage'||data.target.dataset.page === 'orderPage'){
      wx.navigateTo({
        url: './orders/orders',
      });
    } else if (data.currentTarget.dataset.page === 'shoppingCar' || data.target.dataset.page === 'shoppingCar'){
        wx.navigateTo({
          url: './shoppingCar/shoppingCar',
        });
    } else if (data.currentTarget.dataset.page === 'addressPage' || data.target.dataset.page === 'addressPage'){
        wx.navigateTo({
          url: './address/addressList',
        });
    } else if (data.currentTarget.dataset.page === 'collectPage' || data.target.dataset.page === 'collectPage'){
        wx.navigateTo({
          url: './collect/collect',
        });
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
  onGotUserInfo(e){
    let info = e.detail.rawData;
    if (info) {
      //将信息保存在本地
      wx.setStorageSync('userinfo', info);
      //更新当前的信息
      this.setData({
        userinfo: JSON.parse(info)
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log(wx.getStorageSync('userinfo'));
    this.setData({
      userinfo: JSON.parse(wx.getStorageSync('userinfo'))
    });
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