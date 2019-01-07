// pages/mine/orders/orders.js
const $http = require('request.js');
const $phone = require('../../shop/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    payOrders: [],
    waitOrders: [],
    refundOrders: [],
    finishOrders: []
  },

  data2: {
    payPage: 1,
    waitPage: 1,
    refundPage: 1,
    finishPage: 1,
    payLoad: false,
    waitLoad: false,
    refundLoad: false,
    finishLoad: false,
    noMorePay: false,
    noMoreWait: false,
    noMoreRefund: false,
    noMoreFinish: false
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
    this.loadOrders(this.data2.payPage, 0);

  },
  /**
   * 加载数据
   */
  async loadOrders(pageNum, state) {
    //设置状态
    let orderState = 0;
    switch (state) {
      case 0:
        //未收货
        if (this.data2.payLoad)
          return;
        this.data2.payLoad = true;
        orderState = 0;
        break;
      case 1:
        //待收货
        if (this.data2.waitLoad)
          return;
        this.data2.waitLoad = true;
        orderState = 2;
        break;
      case 2:
        //退款中
        if (this.data2.refundLoad)
          return;
        this.data2.refundLoad = true;
        orderState = 5;
        break;
      case 3:
        //已完成
        if (this.data2.finishLoad)
          return;
        this.data2.finishLoad = true;
        orderState = 4;
        break;
    }
    wx.showNavigationBarLoading();
    let res = await $http.getAllOrders(pageNum, orderState);
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    console.log(res);
    if (res && res.data) {
      //解析数据
      switch (state) {
        case 0:
          //未收货
          this.data2.payLoad = false;
          if (res.data.isLastPage) {
            this.data2.noMorePay = true;
          } else {
            this.data2.payPage++;
          }
          this.setData({
            payOrders: pageNum === 1 ? this.transformOrder(res.data.list) : this.data.payOrders.concat(this.transformOrder(res.data.list))
          });
          break;
        case 1:
          //待收货
          this.data2.waitLoad = false;
          if (res.data.isLastPage) {
            this.data2.noMoreWait = true;
          } else {
            this.data2.waitPage++;
          }
          this.setData({
            waitOrders: pageNum === 1 ? this.transformOrder(res.data.list) : this.data.waitOrders.concat(this.transformOrder(res.data.list))
          });
          break;
        case 2:
          //退款中
          this.data2.refundLoad = false;
          if (res.data.isLastPage) {
            this.data2.noMoreRefund = true;
          } else {
            this.data2.refundPage++;
          }
          this.setData({
            refundOrders: pageNum === 1 ? this.transformOrder(res.data.list) : this.data.refundOrders.concat(this.transformOrder(res.data.list))
          });
          break;
        case 3:
          //已完成
          this.data2.finishLoad = false;
          if (res.data.isLastPage) {
            this.data2.noMoreFinish = true;
          } else {
            this.data2.finishPage++;
          }
          this.setData({
            finishOrders: pageNum === 1 ? this.transformOrder(res.data.list) : this.data.finishOrders.concat(this.transformOrder(res.data.list))
          });
          break;
      }
    } else {
      switch (state) {
        case 0:
          //未收货
          this.data2.payLoad = false;
          if (this.data2.payPage === 1) {
            this.setData({
              payOrders: []
            });
          }
          break;
        case 1:
          //待收货
          this.data2.waitLoad = false;
          if (this.data2.waitPage === 1) {
            this.setData({
              waitOrders: []
            });
          }
          break;
        case 2:
          //退款中
          this.data2.refundLoad = false;
          if (this.data2.refundPage === 1) {
            this.setData({
              refundOrders: []
            });
          }
          break;
        case 3:
          //已完成
          this.data2.finishLoad = false;
          if (this.data2.finishPage === 1) {
            this.setData({
              finishOrders: []
            });
          }
          break;
      }
    }
  },
  onTabClick(e) {
    this.setData({
      currentTab: Number.parseInt(e.currentTarget.dataset.current)
    });
  },
  /**
   * 当swiper滑动时
   */
  swiperTab(e) {
    this.setData({
      currentTab: e.detail.current
    });
    //加载数据
    if (e.detail.current === 0) {
      if (this.data.payOrders.length > 0)
        return;
      this.loadOrders(this.data2.payPage, 0);
    } else if (e.detail.current === 1) {
      if (this.data.waitOrders.length > 0)
        return;
      this.loadOrders(this.data2.waitPage, 1);
    } else if (e.detail.current === 2) {
      if (this.data.refundOrders.length > 0)
        return;
      this.loadOrders(this.data2.refundPage, 2);
    } else if (e.detail.current === 3) {
      if (this.data.finishOrders.length > 0)
        return;
      this.loadOrders(this.data2.finishPage, 3);
    }
  },
  scrollToTop(e) {
    let state = e.currentTarget.dataset.state;
    switch (state) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  },
  scrollToBottom(e) {
    let state = Number.parseInt(e.currentTarget.dataset.state);
    //console.log(e);
    switch (state) {
      case 0:
        if (this.data2.noMorePay)
          return;
        this.loadOrders(this.data2.payPage, state);
        break;
      case 1:
        if (this.data2.noMoreWait)
          return;
        this.loadOrders(this.data2.waitPage, state);
        break;
      case 2:
        if (this.data2.noMoreRefund)
          return;
        this.loadOrders(this.data2.refundPage, state);
        break;
      case 3:
        if (this.data2.noMoreFinish)
          return;
        this.loadOrders(this.data2.finishPage, state);
        break;
    }
  },
  //订单详情
  orderDetail(e) {
    if (e.target.id != '')
      return;
    let id = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '../orderDetail/detail?oid=' + id,
    })
  },
  //去支付
  goPay(e) {
    let item = e.currentTarget.dataset.item;
    wx.redirectTo({
      url: `../paying/paying?totalFee=${item.totalFee}&orderNum=${item.order_num}&orderId=${item.id}`,
    });
  },
  //联系商家
  async contact(e) {
    let res = await $phone.getServicePhone();
    if (res && res.data && res.data.list) {
      let radom = Number.parseInt(Math.random() * res.data.list.length);
      wx.makePhoneCall({
        phoneNumber: res.data.list[radom].phone_number,
      })
    } else {
      wx.showToast({
        title: '获取商家联系方式失败',
        icon: 'none'
      });
    }
  },
  //申请退款
  refund(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let self = this;
    wx.showModal({
      title: '提示',
      content: '确定要申请退款吗?',
      success: async res => {
        if (res.confirm) {
          //执行网络操作
          let res = await $http.refundApply(item.id);
          if (res.code === 1) {
            //申请退款成功
            wx.showToast({
              title: '申请退款成功',
              icon: 'none'
            })
            self.data.waitOrders.splice(index, 1);
            self.setData({
              waitOrders: self.data.waitOrders
            });
          } else {
            //失败
            wx.showToast({
              title: '申请退款失败' + res.msg,
              icon: 'none'
            })
          }
        }
      }
    })
  },
  //确定收货
  enterReceive(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let self = this;
    wx.showModal({
      title: '提示',
      content: '确定收货吗?',
      success: async res => {
        if (res.confirm) {
          //执行网络操作
          let res = await $http.receive(item.id);
          if (res.code === 1) {
            //申请退款成功
            wx.showToast({
              title: '收货成功',
              icon: 'none'
            })

            self.data.waitOrders.splice(index, 1);
            self.setData({
              waitOrders: self.data.waitOrders
            });

          } else {
            //失败
            wx.showToast({
              title: '收货失败' + res.msg,
              icon: 'none'
            })
          }
        }
      }
    })
  },
  //删除订单
  delOrder(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let self = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗?',
      success: async res => {
        if (res.confirm) {
          //执行网络操作
          let res = await $http.delOrder(item.id);
          if (res.code === 1) {
            //申请退款成功
            wx.showToast({
              title: '删除成功',
              icon: 'none'
            })
            switch (self.data.currentTab) {
              case 0:
                self.data.payOrders.splice(index, 1);
                self.setData({
                  payOrders: self.data.payOrders
                });
                break;
              case 2:
                self.data.refundOrders.splice(index, 1);
                self.setData({
                  refundOrders: self.data.refundOrders
                });
                break;
              case 3:
                self.data.finishOrders.splice(index, 1);
                self.setData({
                  finishOrders: self.data.finishOrders
                });
                break;
            }

          } else {
            //失败
            wx.showToast({
              title: '删除失败' + res.msg,
              icon: 'none'
            })
          }
        }
      }
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
    switch (this.data.currentTab) {
      case 0:
        this.data2.payPage = 1;
        this.loadOrders(this.data2.payPage, 0);
        break;
      case 1:
        this.data2.waitPage = 1;
        this.loadOrders(this.data2.waitPage, 1);
        break;
      case 2:
        this.data2.refundPage = 1;
        this.loadOrders(this.data2.refundPage, 2);
        break;
      case 3:
        this.data2.finishPage = 1;
        this.loadOrders(this.data2.finishPage, 3);
        break;
    }
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

  },
  /**
   * 转换订单
   */
  transformOrder(orders) {
    orders.map(e => {
      let num = 0;
      let fee = 0.00;
      e.ordersProductDomainList.map(j => {
        j.mallGoodsDomain.pic = j.mallGoodsDomain.head_img_url.split(';')[0];
        num += j.product_count;
        fee += Number.parseFloat(j.price_yuan);
      });
      e.totalNum = num;
      e.totalFee = fee;
    });
    return orders;
  }
})