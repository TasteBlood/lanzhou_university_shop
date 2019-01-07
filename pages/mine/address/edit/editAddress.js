// pages/mine/address/add/addAddress.js
const $http = require('../request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: null,
    userMobile: null,
    region: {},
    detail: null,
    isDefault: false,
    address:{}
  },
  /**
   * 输入事件
   */
  onKeyInput(e) {
    //console.log(e);
    if (e.target.id === 'username') {
      this.setData({
        userName: e.detail.value
      });
    } else if (e.target.id === 'usermobile') {
      this.setData({
        userMobile: e.detail.value
      });
    } else if (e.target.id === 'detail') {
      this.setData({
        detail: e.detail.value
      });
    }
  },
  /**
   * 选择地址
   */
  onChooseAddress(e) {
    //console.log(e)
    this.setData({
      region: e.detail
    })
  },
  /**
   * 是否默认选中
   */
  onCheckChange(e) {
    //console.log(e)
    if (e.detail.value.length > 0) {
      this.setData({
        isDefault: true
      });
    } else {
      this.setData({
        isDefault: false
      });
    }
  },
  /**
   * 提交数据
   */
  async save() {
    if (!this.data.userName) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      });
      return;
    }
    if (!this.data.userMobile) {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none'
      });
      return;
    }
    if (!this.data.region.value || this.data.region.value.length < 3) {
      wx.showToast({
        title: '地址不能为空',
        icon: 'none'
      });
      return;
    }
    if (!this.data.detail) {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      });
      return;
    }

    let res = await $http.updateReceiveAddress(app.globalData.currentAddress.id,this.data.userName, this.data.region.value[0], this.data.region.value[1],
      this.data.region.value[2], this.data.detail, this.data.userMobile,this.data.isDefault?1:-1);
    if (res.code === 1) {
      wx.showToast({
        title: '更新成功',
        icon: 'none'
      });
      wx.navigateBack({

      });
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let region = [];
    region.push(app.globalData.currentAddress.provinceName);
    region.push(app.globalData.currentAddress.cityName);
    region.push(app.globalData.currentAddress.countyName);
    this.setData({
      address:app.globalData.currentAddress,
      region:{value:region},
      userName:app.globalData.currentAddress.receiveName,
      userMobile:app.globalData.currentAddress.telNumber,
      detail:app.globalData.currentAddress.detailInfo,
      isDefault:app.globalData.currentAddress.isdefault
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
    app.globalData.currentAddress = {};
  }
})