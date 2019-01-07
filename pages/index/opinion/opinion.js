// pages/index/opinion/opinion.js
const $request = require('request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:null
  },
  onInputChange(e){
    this.setData({
      content:e.detail.value
    });
  },
  async save(){
    if(!this.data.content){
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      })
      return;
    }
    //提交数据
    let res = await $request.addOpinion(this.data.content);
    if(res.code===1){
      wx.navigateBack({
        
      });
    }else{
      wx.showToast({
        title: '提交失败',
        icon:'none'
      });
    }
  },
  //历史提交和服务提升计划
  historyClick(){
    wx.navigateTo({
      url: 'history/history',
    })
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