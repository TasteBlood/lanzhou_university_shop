// pages/mine/shoppingCar/shoppingCar.js
const $http = require('request.js');
const $address = require('../fillOrder/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    totalPrice: 0,
    totalNum: 0.00,
    checkAll: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    //加载购物车商品
    let res = await $http.getAllItems();
    console.log(res);
    if (res.data && res.data.list) {
      res.data.list.map(e => {
        e.pic = e.mallGoodsDomain.head_img_url.split(';')[0];
        e.isCheck = false;
      });
      this.setData({
        list: res.data.list,
        checkAll: false,
        totalNum: 0,
        totalPrice: 0.00
      });
    }
  },
  onItemCheck(e) {
    let index = e.target.dataset.index;
    if (e.detail.value && e.detail.value.length > 0) {
      //选中
      let ele = `list[${index}].isCheck`;
      this.setData({
        [ele]: true
      });
      //还需要判断是否是全部选中
      let isAll = true;
      this.data.list.map(e => {
        if (!e.isCheck) {
          isAll = false;
          return;
        }
      });
      this.setData({
        checkAll: isAll
      });
    } else {
      //取消选中
      let ele = `list[${index}].isCheck`;
      this.setData({
        [ele]: false,
        checkAll: false
      });
    }

    this.calculate();
  },
  //当item数量增加
  async onItemPlus(e) {
    let item = e.target.dataset.item;
    let index = e.target.dataset.index;
    let num = item.product_num;
    num++;
    if (item.mallGoodsDomain.purchase_limit != -1) {
      //不限购
      if (num > item.mallGoodsDomain.purchase_limit) {
        num = item.mallGoodsDomain.purchase_limit;
        wx.showToast({
          title: `最大限购 ${item.mallGoodsDomain.purchase_limit}`,
          icon: 'none'
        })
        return;
      }
    }
    //更新数据
    let ele = `list[${index}].product_num`;
    this.setData({
      [ele]: num
    });
    this.calculate();
    //提交网络更改
    await $http.updateItem(item.id, num, item.mallGoodsDomain.id);
  },
  //当item数量减少
  async onItemMinus(e) {
    let item = e.target.dataset.item;
    let index = e.target.dataset.index;
    let num = item.product_num;
    num--;
    if (num === 0) {
      //不限购
      num = 1;
      return;
    }
    //更新数据
    let ele = `list[${index}].product_num`;
    this.setData({
      [ele]: num
    });
    this.calculate();
    //提交网络更改
    await $http.updateItem(item.id, num, item.mallGoodsDomain.id);
  },
  onItemClick(e){
    //console.log(e)
    if(e.target.id!="")
      return;
    wx.navigateTo({
      url: '../../shop/goods/goodsDetail?gid='+e.currentTarget.dataset.did,
    })
  },
  onItemLongClick(e){
    //console.log(e)
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.sid;
    let self  =this;
    wx.showModal({
      title: '提示',
      content: '确定要删除这个商品吗?',
      success:async res=>{
        if(res.confirm){
          res = await $http.deleteItem(id);
          if(res.code===1){
            self.data.list.splice(index,1);
            self.setData({
              list:self.data.list
            });
          }else{
            wx.showToast({
              title: '删除失败',
              icon:'none'
            });
          }
        }
      }
    })
  },
  checkAll(e) {
    if (e.detail.value && e.detail.value.length > 0) {
      //全选
      this.data.list.map(e => {
        e.isCheck = true;
      });
      this.setData({
        list: this.data.list,
        checkAll: true
      });
    } else {
      //全不选
      this.data.list.map(e => {
        e.isCheck = false;
      });
      this.setData({
        list: this.data.list,
        checkAll: false
      });
    }
    this.calculate();
  },
  //计算价格和数量
  calculate() {
    let num = 0;
    let total = 0;
    this.data.list.map(e => {
      if (e.isCheck) {
        num += e.product_num;
        if (e.mallGoodsDomain.salesProductDomain) {
          total += e.product_num * Number.parseFloat(e.mallGoodsDomain.salesProductDomain.sales_yuan);
        } else {
          total += e.product_num * Number.parseFloat(e.mallGoodsDomain.sell_price_yuan);
        }
      }

    });

    this.setData({
      totalNum: num,
      totalPrice: total
    });
  },
  //下一步
  async next() {
    let isCheck = false;
    let checkList = [];
    this.data.list.map(e => {
      if (e.isCheck) {
        isCheck = true;
        checkList.push(e);
      }
    });
    //转到提交订单页面
    if (!isCheck) {
      wx.showToast({
        title: '请选择结算的商品',
        icon: 'none'
      })
      return;
    }
    getApp().globalData.buyGoods = checkList;
    //加载地址
    let res = await $address.getDefaultAddress();
    if (res && res.data) {
      getApp().globalData.currentAddress = res.data.list[0];
    }
    //跳转到提交订单页面
    wx.navigateTo({
      url: '../fillOrder/fillOrder',
    })
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