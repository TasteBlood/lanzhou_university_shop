// pages/shop/goods/goodsDetail.js
const $http = require('../request.js');
const $address = require('../../mine/fillOrder/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    goods: {},
    number: 1,
    phones:[],
    showModal:false
  },
  data2: {
    gid: 163
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    //console.log(options)
    //初始化高度
    let self = this;
    this.data2.gid = options.gid ? options.gid : 163;
    wx.getSystemInfo({
      success: function(res) {
        wx.createSelectorQuery().select('.bottom-bar').boundingClientRect((rect) => {
          let topHeight = Number(rect.height);
          self.setData({
            height: Number(res.windowHeight) - topHeight
          });
        }).exec();
      },
    });

    //查询商品详情
    let res = await $http.getGoodsById(this.data2.gid);
    console.log(res)
    if (res && res.data) {
      let data = res.data;
      data.pics = data.head_img_url.split(";");
      this.setData({
        goods: data
      });
    }
  },
  //点击联系人
  async onContactClick(e) {
    let res = await $http.getServicePhone();
    //console.log(res);
    if(!res||!res.data||res.data.list.length<=0){
      wx.showToast({
        title: '获取商家联系方式失败',
        icon:'none'
      });
      return;
    }

    //随机拨打
    let radom = Number.parseInt(Math.random() * res.data.list.length);
    wx.makePhoneCall({
      phoneNumber: res.data.list[radom].phone_number,
    })
  },
  onInput(e) {
    let value = e.detail.value;
    if (value) {
      value = Number.parseInt(value);
      if (this.data.goods.purchase_limit != -1) {
        //有购买上线
        if (value >= this.data.goods.purchase_limit) {
          value = this.data.goods.purchase_limit;
        }
      }
      this.setData({
        number: Number.parseInt(value)
      });
    } else {
      this.setData({
        number: 1
      });
    }
  },
  onPlus() {
    let number = this.data.number;
    number++;
    if (this.data.goods.purchase_limit != -1) {
      //有购买上线
      if (number >= this.data.goods.purchase_limit) {
        number = this.data.goods.purchase_limit;
      }
    }
    this.setData({
      number: number
    });
  },
  onMinus() {
    let number = this.data.number;
    number--;
    if (number <= 0) {
      //有购买上线
      number = 1;
    }
    this.setData({
      number: number
    });
  },
  //点击收藏
  async onCollectClick(e) {

    let res = await $http.collectGoods(this.data2.gid);
    if (res && res.code === 1) {
      let goods = this.data.goods;
      goods.userStoreDomain = {};
      this.setData({
        goods: goods
      });
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
    }
  },
  //点击购买
  async onBuyClick() {
    //拼装出商品
    getApp().globalData.buyGoods = [];
    let goods = {};
    goods.product_num = this.data.number;
    goods.mallGoodsDomain = this.data.goods;
    getApp().globalData.buyGoods.push(goods);
    //获取默认的收货地址
    let res = await $address.getDefaultAddress();
    if (res.data && res.data.list.length > 0) {
      getApp().globalData.currentAddress = res.data.list[0];
    }

    //跳转到填写订单页面
    wx.navigateTo({
      url: '../../mine/fillOrder/fillOrder',
    });
  },
  //点击添加到购物车
  async onAddClick() {
    let res = await $http.addShoppingCar(this.data.goods.id, this.data.number);
    if (res && res.code === 1) {
      wx.showToast({
        title: '添加成功'
      })
    } else {
      wx.showToast({
        title: '添加购物车失败',
        icon: 'error'
      })
    }
  },
  //购物车点击
  onShopCarClick() {
    wx.navigateTo({
      url: '../../mine/shoppingCar/shoppingCar',
    })
  },
  closeModal(){
    this.setData({
      phones:[],
      showModal:false
    });
  },
  //点击拨打电话
  onPhoneClick(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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