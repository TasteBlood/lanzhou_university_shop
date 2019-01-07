// pages/mine/address/addressList.js
const $http = require('request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    check:false
  },
  addAddress() {
    wx.navigateTo({
      url: 'add/addAddress',
    })
  },
  /**
   * 删除地址
   */
  deleteAddress(e) {
    //console.log(e);
    let self = this;
    let id = e.target.dataset.did;
    let index = e.target.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要删除这个收货地址吗?',
      success: async res => {
        if(res.confirm){
          res = await $http.deleteReceiveAddress(id);
          if (res.code === 1) {
            wx.showToast({
              title: '删除成功',
              icon: 'none'
            });
            //刷新列表
            self.data.addressList.splice(index, 1);
            self.setData({
              addressList: self.data.addressList
            });
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        }
      }
    })
  },
  updateAddress(e){
    app.globalData.currentAddress = e.target.dataset.item;
    wx.navigateTo({
      url: 'edit/editAddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.check = options.check;
  },
  async onItemChange(e){
    console.log(e)
    let item = e.target.dataset.item;
    let res = await $http.updateReceiveAddress(item.id,item.receiveName,item.provinceName,item.cityName,item.countyName,item.detailInfo,item.telNumber,
    item.isdefault===1?-1:1);
    if(res.code===1){
      wx.showToast({
        title: '修改成功',
        icon:'none'
      });

      //加载数据
      let res = await $http.getAddressList();
      console.log(res);
      if (res.code === 1 && res.data) {
        this.setData({
          addressList: res.data.list
        });
      } else {
        addressList: []
      }
    }else{
      wx.showToast({
        title: '修改失败',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  async onItemClick(e){
    //console.log(e.target);
    if(this.data.check&&!e.target.id){
      //说明是选择地址返回
      getApp().globalData.currentAddress = e.currentTarget.dataset.item;
      wx.navigateBack({
        
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    //加载数据
    let res = await $http.getAddressList();
    console.log(res);
    if (res.code === 1 && res.data) {
      this.setData({
        addressList: res.data.list
      });
    } else {
      addressList: []
    }
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