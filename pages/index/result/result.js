// pages/index/result/result.js
const $request = require('../request.js');
const $likeRequest = require('../../index/like/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishList:[]
  },
  keyWords:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.keyWords = options.keyWords;
    //this.keyWords = "猪头";
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function () {
    let res = await $request.getDishesByName(this.keyWords);
    console.log(res);
    if(res){
      this.setData({
        dishList: res.data.list
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 当菜品点赞时
   */
  async onClickNum(e) {
    console.log(e)
    let item = e.target.dataset.item;
    let id = e.target.dataset.did;
    let type = e.target.dataset.type;
    let index = e.target.dataset.index;
    let click = item.organDishesDomains[0].click_num
    let res = await $likeRequest.clickNum(id, type);
    if (res) {
      if (res.code === 1) {
        wx.showToast({
          title: '点赞成功',
          icon: 'none'
        })
        let ele = `dishList[${index}].organDishesDomains[0].click_num`;
        this.setData({
          [ele]:click+=1
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '点赞失败',
        icon: 'none'
      })
    }
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