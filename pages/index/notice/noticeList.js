// pages/index/notice/noticeList.js
const $request = require('request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      currentItem:{},
      show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    
  },
  onClick(e){
    let item = e.currentTarget.dataset.item;
    console.log(e);
    this.setData({
      currentItem:{
        title:item.title,
        content:item.content,
        time:item.createTime,
        pic:item.pic.split(";")
      }
    });
    this.setData({
      show: true
    });
  },
  onClose(e){
    this.setData({
      show:false
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    let res = await $request.getNoticeList(1, 50, true);
    if (res) {
      this.setData({
        list: res.data.list
      });
    }
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