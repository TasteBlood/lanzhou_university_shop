// pages/mine/orders/detail/detail.js
const $http = require('../orders/request.js');
const $service = require('../../shop/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    order:{}
  },
  order_id:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.order_id = options.oid?options.oid:1149;

    //初始化高度
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        wx.createSelectorQuery().select('.top-panel').boundingClientRect((rect) => {
          let topHeight = Number(rect.height);
          self.setData({
            height: Number(res.windowHeight) - topHeight
          });
        }).exec();
      },
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
    if(this.data.order.order_num)
      return;
    let res = await $http.getOrderDetail(this.order_id);
    console.log(res);
    if(res&&res.data){
      //格式化数据
      res.data.ordersProductDomainList.map(e=>{
        e.mallGoodsDomain.pic = e.mallGoodsDomain.head_img_url.split(';')[0];
      });
      this.setData({
        order:res.data
      });
    }
  },
  //删除订单
  async deleteOrder(){

  },
  //去支付
  async goPay(){

  },
  //联系商家
  async contactShop(){
    let res = await $service.getServicePhone();
    if(res&&res.data&&res.data.list){
      let radom = Number.parseInt(Math.random() * res.data.list.length);
      wx.makePhoneCall({
        phoneNumber: res.data.list[radom].phone_number,
      })
    }else{
      wx.showToast({
        title: '获取商家联系方式失败',
        icon:'none'
      });
    }
  },
  //申请退款
  async applyRefund(){

  },
  //确定收货
  async enterReceive(){

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