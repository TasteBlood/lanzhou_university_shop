// pages/mine/collect/collect.js
const $http = require('request.js');
const $collect = require('../../shop/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  data2:{
    pageNum:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  async loadData(pageNum){
    let res = await $http.getList(pageNum);
    //console.log(res);
    if(res&&res.data){
      res.data.list.map(e=>{
        e.pic = e.mallGoods.head_img_url.split(';')[0]
      });
      this.setData({
        list:res.data.list
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  lookGoods(e){
    //console.log(e)
    if(e.target.id==='delete')
      return;
    wx.navigateTo({
      url: '../../shop/goods/goodsDetail?gid='+e.currentTarget.dataset.did,
    })
  },
  onDelete(e){
    let index = e.currentTarget.dataset.index;
    let self = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗?',
      success:async(res)=>{
        console.log(res)
        if(res.confirm){
          res = await $collect.noCollectGoods(e.currentTarget.dataset.did);
          if (res && res.code === 1) {
            self.data.list.splice(index, 1);
            self.setData({
              list: self.data.list
            });
          }
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData(this.data2.pageNum);
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