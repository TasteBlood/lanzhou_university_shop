// pages/index/new/newList.js
const $http = require('request.js');
const $clickRequest = require('../like/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    height: 0,
    zaocan: [],
    wucan: [],
    wancan: []
  },
  data2: {
    zaocanPage: 1,
    noMoreZaocan: false,
    loadZaocan: false,
    wucanPage: 1,
    noMoreWucan: false,
    loadWucan: false,
    wancanPage: 1,
    noMoreWancan: false,
    loadWancan: false
  },
  /**
   * 当tab点击时
   */
  onTabClick(e) {
    //console.log(e)
    switch (e.target.dataset.current) {
      case '0':
        this.setData({
          currentTab: 0
        });
        break;
      case '1':
        this.setData({
          currentTab: 1
        });
        break;
      case '2':
        this.setData({
          currentTab: 2
        });
        break;
    }
  },
  /**
   * 当swiper滑动时
   */
  swiperTab(e) {
    //console.log(e)
    this.setData({
      currentTab: e.detail.current
    });
    //加载数据
    if(e.detail.current===0){
      //加载早餐
      if(this.data.zaocan.length>0)
        return;
      this.loadData(this.zaocanPage,1);
    }else if(e.detail.current===1){
      //加载午餐
      if (this.data.wucan.length > 0)
        return;
      this.loadData(this.wucanPage,2);
    }else if(e.detail.current===2){
      //加载晚餐
      if (this.data.wancan.length > 0)
        return;
      this.loadData(this.wancanPage,3);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //初始化高度
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        wx.createSelectorQuery().select('.swiper-tab').boundingClientRect((rect) => {
          let topHeight = Number(rect.height);
          self.setData({
            height: Number(res.windowHeight) - topHeight
          });
        }).exec();
      },
    });

    //加载数据
    this.loadData(this.data2.zaocanPage,1);
  },
  //加载数据
  async loadData(pageNum, type) {
    let res = await $http.getNewDishes(pageNum, type);
    this.data2.loadZaocan = false;
    this.data2.loadWucan = false;
    this.data2.loadWancan = false;
    if (res.data) {
      if (type === 1) {
        //早餐
        if (res.isLastPage) {
          this.data2.noMoreZaocan = true;
        } else {
          this.data2.zaocanPage++;
        }
        let data = pageNum === 1 ? res.data.list : this.data.zaocan.concat(res.data.list);
        this.setData({
          zaocan: data
        });
      } else if (type === 2) {
        //午餐
        if (res.isLastPage) {
          this.data2.noMoreWucan = true;
        } else {
          this.data2.wucanPage++;
        }
        let data = pageNum === 1 ? res.data.list : this.data.wucan.concat(res.data.list);
        this.setData({
          wucan: data
        });
      } else if (type === 3) {
        //晚餐
        if (res.isLastPage) {
          this.data2.noMoreWancan = true;
        } else {
          this.data2.wancanPage++;
        }
        let data = pageNum === 1 ? res.data.list : this.data.wancan.concat(res.data.list);
        this.setData({
          wancan: data
        });
      }
    } else {
      if (type === 1) {
        if (this.data2.zaocanPage === 1) {
          this.setData({
            zaocan: []
          });
        }
      } else if (type === 2) {
        if (this.data2.zaocanPage === 1) {
          this.setData({
            wucan: []
          });
        }
      } else if (type === 3) {
        if (this.data2.zaocanPage === 1) {
          this.setData({
            wancan: []
          });
        }
      }
    }
  },
  //点赞事件
  async onClickNum(e) {
    let id = e.target.dataset.did;
    let type = e.target.dataset.type;
    let res = await $clickRequest.clickNum(id, type);
    if (res) {
      if (res.code === 1) {
        wx.showToast({
          title: '点赞成功',
          icon: 'none'
        });
        //更新数据
        let num = '';
        let click = e.target.dataset.item.click_num;
        if (type === '1') {
          num = `zaocan[${e.target.dataset.index}].click_num`;
        } else if (type === '2') {
          num = `wucan[${e.target.dataset.index}].click_num`;
        } else if (type === '3') {
          num = `wancan[${e.target.dataset.index}].click_num`;
        }
        this.setData({
          [num]: click + 1
        });
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //早餐滑动
  onZaocanScroll(){
    if (this.data2.noMoreZaocan)
      return;
    if (this.data2.loadZaocan) {
      return;
    }
    this.data2.loadZaocan = true;
    this.loadData(this.data2.zaocanPage, 1);
  },
  //午餐滑动
  onWucanScroll(){
    if (this.data2.noMoreWucan)
      return;
    if (this.data2.loadWucan) {
      return;
    }
    this.data2.loadWucan = true;
    this.loadData(this.data2.wucanPage, 2);
  },
  //晚餐滑动
  onWancanScroll(){
    if(this.data2.noMoreWancan)
      return;
    if (this.data2.loadWancan) {
      return;
    }
    this.data2.loadWancan = true;
    this.loadData(this.data2.wancanPage, 3);
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