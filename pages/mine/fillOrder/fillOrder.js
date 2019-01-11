// pages/mine/fillOrder/fillOrder.js
const $http = require('request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    address:{},
    totalFee:0.00
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
  onChooseAddress(){
    wx.navigateTo({
      url: '../address/addressList?check=true',
    });
  },
  /**
   * 提交数据
   */
  async submit(){
    if(!this.data.address||this.data.address.id===undefined){
      wx.showToast({
        title: '请选择收货地址',
        icon:'none'
      });
      return;
    }

    //判断是直接购买还是购物车购买
    let res = null;
    if(this.data.goods[0].id>0){
      //这是购物车结算
      let ids = [];
      this.data.goods.map(e=>{
        ids.push(e.id);
      });
      res = await $http.buyFromCar(ids.join(","),this.data.totalFee,this.data.address.id);
    }else{
      //这是直接购买
      let goods = this.data.goods[0];
      res = await $http.buyNow(goods.mallGoodsDomain.id,goods.product_num,this.data.totalFee,this.data.address.id);
    }
    //console.log(res);
    if(res.code===1){
      //下单成功  {code: 1, msg: "下单成功", data: "1151_1546511321355"}
      let data = res.data;
      //跳转到收银台
      wx.redirectTo({
        url: `../paying/paying?totalFee=${this.data.totalFee}&orderNum=${data}`,
      });
    }else{
      wx.showToast({
        title: '下单失败'+res.msg,
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let goods = getApp().globalData.buyGoods;
    let total = 0;
    goods.map(e=>{
      e.pic = e.mallGoodsDomain.head_img_url.split(';')[0]
      if (e.mallGoodsDomain.salesProductDomain){
        total += e.product_num * Number.parseFloat(e.mallGoodsDomain.salesProductDomain.sales_yuan);
      }else{
        total += e.product_num * Number.parseFloat(e.mallGoodsDomain.sell_price_yuan);
      }
    });
    this.setData({
      goods: goods,
      address: getApp().globalData.currentAddress,
      totalFee:total
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