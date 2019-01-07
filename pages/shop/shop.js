// pages/shop/shop.js
const $http = require('request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    cate: [],
    height: 0,
    dropDown: false,
    currentIndex: 0
  },
  data2: {
    pageNum: 1,
    noMore: false,
    load: false,
    keyWords: '',
    selectCate: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    //初始化tab颜色
    wx.setTabBarStyle({
      color: '#919191',
      selectedColor: '#ff4c4c',
      borderStyle: 'black'
    });

    if (!wx.getStorageSync('userinfo')) {
      //运行auth页面
      wx.reLaunch({
        url: '../auth/auth',
      })
    } else {
      //检查session，登录的状态是否失效
      let self = this;
      wx.checkSession({
        success: res => {
          //当前状态可用
        },
        fail: e => {
          //当前状态不可用，重新登录
          wx.showToast({
            title: '登录状态失效，请重新登录',
            icon: 'none'
          });
          //将本地的信息置空
          wx.removeStorageSync('remoteUserInfo');
          //
          wx.navigateTo({
            url: '../../utils/login/login',
          })
        }
      });
    }

    //初始化高度
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        wx.createSelectorQuery().select('.search-bar').boundingClientRect((rect) => {
          let topHeight = Number(rect.height);
          self.setData({
            height: Number(res.windowHeight) - topHeight
          });
        }).exec();
      },
    });
    //加载商品
    this.loadGoods(this.data2.pageNum, this.data2.selectCate, this.data2.keyWords);

    //加载数据
    let res = await $http.getAllCategory();
    cate = [{
      name: '全部'
    }];
    if (res.data) {
      cate = cate.concat(res.data.list);
    }
    this.setData({
      cate: cate
    });
  },
  onInput(e) {
    this.data2.keyWords = e.detail.value;
  },
  onSearch() {
    this.data2.pageNum = 1;
    this.data2.noMore = false;
    this.loadGoods(this.data2.pageNum, this.data2.selectCate, this.data2.keyWords);
  },
  onGoodsClick(e) {
    console.log(e)
    let gid = e.currentTarget.dataset.gid;
    wx.navigateTo({
      url: 'goods/goodsDetail?gid=' + gid,
    })
  },
  onDropDown() {
    if (this.data.dropDown) {
      this.setData({
        dropDown: false
      });
    } else {
      this.setData({
        dropDown: true
      });
    }

  },
  onCateClick(e) {
    //console.log(e);
    let id = e.target.dataset.did;
    let index = e.target.dataset.index;
    this.setData({
      currentIndex: index,
      dropDown: false
    });
    this.data2.selectCate = this.data.cate[index].id;
    this.data2.pageNum = 1;
    this.data2.keyWords = '';
    this.data2.noMore = false;
    //加载数据
    this.loadGoods(this.data2.pageNum, this.data2.selectCate, this.data2.keyWords);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  async loadGoods(pageNum, cateId, keyWords) {
    if (this.data2.load)
      return;
    this.data2.load = true;
    let res = await $http.getAllGoods(pageNum, cateId, keyWords);
    this.data2.load = false;
    //console.log(res);
    if (res.data) {
      res.data.list.map(e => {
        e.pic = e.head_img_url.split(";")[0];
      });
      if (res.data.isLastPage) {
        this.data2.noMore = true;
      } else {
        this.data2.pageNum++;
      }
      this.setData({
        goodsList: pageNum === 1 ? res.data.list : this.data.goodsList.concat(res.data.list)
      });
    } else {
      if (this.data2.pageNum === 1) {
        this.setData({
          goodsList: []
        });
      }
    }
  },
  //下拉加载更多
  onScroll(e) {
    //console.log(e);
    if(this.data2.noMore)
      return;
    this.loadGoods(this.data2.pageNum, this.data2.selectCate, this.data2.keyWords);
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