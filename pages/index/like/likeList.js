// pages/index/like/likeList.js
const $request = require('request.js');
const indexRequest = require('../request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    restaurantList: [],
    floorList: [],
    windowList: [],
    //select data 
    selectData: {
      restaurant: {},
      floor: {},
      window: {}
    },
    //style 相关
    hideMenu: true,
    restaurantPos: null,
    floorPos: null,
    windowPos: null,
    showFloor: false,
    showWindow: false,
    currentTab: 0,
    height: 800,
    //渲染页面相关
    dishList: [],
    cookList: [],
    otherList: []
  },
  data2: {
    dishPage: 1,
    cookPage: 1,
    otherPage: 1,
    noMoreDish: false,
    noMoreCook: false,
    noMoreOther: false,
    loadDish: false,
    loadCook: false,
    loadOther: false
  },
  /**
   * 当食堂的item点击
   */
  async onRestaurantClick(e) {
    //console.log(e)
    //改变当前的样式
    this.setData({
      restaurantPos: e.target.dataset.position,
      selectData: {
        restaurant: e.target.dataset.item
      }
    });
    //显示楼层列表
    this.setData({
      showFloor: true,
      floorPos: null,
      windowPos: null,
      windowList: [],
      floorList: []
    });
    //获取楼层列表
    let res = await $request.getFloors(this.data.selectData.restaurant.id);
    if (res != null)
      this.setData({
        floorList: res.data.list
      });
  },
  async onFloorItemClick(e) {
    //改变当前的样式
    this.setData({
      floorPos: e.target.dataset.position,
      selectData: {
        restaurant: this.data.selectData.restaurant,
        floor: e.target.dataset.item
      }
    });
    //显示窗口列表
    this.setData({
      showWindow: true,
      windowPos: null,
      windowList: []
    });
    //查询窗口列表
    let res = await $request.getWindows(this.data.selectData.restaurant.id, this.data.selectData.floor.id);
    if (res != null)
      this.setData({
        windowList: res.data.list
      });
  },
  onWindowItemClick(e) {
    //改变当前的样式
    this.setData({
      windowPos: e.target.dataset.position,
      selectData: {
        restaurant: this.data.selectData.restaurant,
        floor: this.data.selectData.floor,
        window: e.target.dataset.item
      }
    });
  },
  onClear() {
    this.setData({
      restaurantPos: 0,
      floorPos: 0,
      windowPos: 0,
      showFloor: false,
      showWindow: false,
      currentTab: 0,
      selectData: {
        restaurant: {},
        floor: {},
        window: {}
      },
      dishList: [],
      cookList: [],
      otherList: []
    });
    this.data2.dishPage = 1;
    this.data2.cookPage = 1;
    this.data2.otherPage = 1;
    this.data2.noMoreDish = false,
      this.data2.noMoreCook = false,
      this.data2.noMoreOther = false,
      this.data2.loadDish = false,
      this.data2.loadCook = false,
      this.data2.loadOther = false

    //默认查询菜品信息,解决bug，当前的currentTab===0，回掉方法不会执行，需要手动写
    if (this.data.currentTab === 0) {
      this.loadData(this.data2.dishPage, 10, 1);
    }
  },
  async onOk() {
    if (!this.data.selectData.restaurant || !this.data.selectData.floor || !this.data.selectData.window) {
      wx.showToast({
        title: '请完善查询信息',
      });
      return;
    }
    this.setData({
      hideMenu: true,
      restaurantPos: 0,
      floorPos: 0,
      windowPos: 0,
      showFloor: false,
      showWindow: false,
      currentTab: 0,
      dishList: [],
      cookList: [],
      otherList: []
    });
    this.data2.dishPage = 1;
    this.data2.cookPage = 1;
    this.data2.otherPage = 1;
    this.data2.dishPage = 1;
    this.data2.cookPage = 1;
    this.data2.otherPage = 1;
    this.data2.noMoreDish = false,
      this.data2.noMoreCook = false,
      this.data2.noMoreOther = false,
      this.data2.loadDish = false,
      this.data2.loadCook = false,
      this.data2.loadOther = false
    //默认查询菜品信息,解决bug，当前的currentTab===0，回掉方法不会执行，需要手动写
    if (this.data.currentTab === 0) {
      this.loadData(this.data2.dishPage, 10, 1);
    }

  },
  openMenu() {
    this.setData({
      hideMenu: false
    });
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
  async swiperTab(e) {
    //console.log(e)
    this.setData({
      currentTab: e.detail.current
    });

    //加载数据
    if (e.detail.current === 0) {
      //加载菜品
      if (this.data.dishList.length > 0)
        return;
      this.loadData(this.data2.dishPage, 10, 1);
    } else if (e.detail.current === 1) {
      //加载厨师
      if (this.data.cookList.length > 0)
        return;
      this.loadData(this.data2.cookPage, 10, 2);
    } else if (e.detail.current === 2) {
      //加载分菜员
      if (this.data.otherList.length > 0)
        return;
      this.loadData(this.data2.otherPage, 10, 3);
    }
  },

  /**
   * 当菜品点赞时
   */
  async onClickNum(e) {
    console.log(e);
    let id = e.target.dataset.did;
    let type = e.target.dataset.type;
    let res = await $request.clickNum(id, type);
    if (res) {
      if (res.code === 1) {
        wx.showToast({
          title: '点赞成功',
          icon: 'none'
        });
        //更新数据
        let num = '';
        let click = null;
        if (type === '1') {
          num = `dishList[${e.target.dataset.index}].click_num`;
          click = e.target.dataset.item.click_num;
        } else if (type === '2') {
          num = `cookList[${e.target.dataset.index}].staffDomain.click_num`;
          click = e.target.dataset.item.staffDomain.click_num;
        } else if (type === '3') {
          num = `otherList[${e.target.dataset.index}].staffDomain.click_num`;
          click = e.target.dataset.item.staffDomain.click_num;
        }
        this.setData({
          [num]: click + 1
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    } else {
      wx.showToast({
        title: '点赞失败',
        icon: 'none'
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    //初始化高度
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        wx.createSelectorQuery().select('.top-info').boundingClientRect((rect) => {
          let topHeight = Number(rect.height);
          self.setData({
            height: Number(res.windowHeight) - topHeight
          });
        }).exec();
      },
    });
    //默认加载菜品
    this.loadData(this.data2.dishPage, 10, 1);

    //加载数据
    res = await $request.getRestaurants(1, 50);
    if (res != null) {
      this.setData({
        restaurantList: res.data.list
      });
    }
  },
  async loadData(pageNum, pageSize, type) {
    // //默认加载全部的内容
    let select = this.data.selectData;
    let res = await $request.getFronts(pageNum, pageSize, type,
      select.restaurant.id ? select.restaurant.id : null,
      select.floor.id ? select.floor.id : null,
      select.window.id ? select.window.id : null);
    console.log(res);
    if (res.data) {
      if (type === 1) {
        //菜品加载
        this.data2.loadDish = false;
        if (res.data.isLastPage) {
          this.data2.noMoreDish = true;
        } else {
          this.data2.dishPage++;
        }
        let data = pageNum === 1 ? res.data.list : this.data.dishList.concat(res.data.list);
        this.setData({
          dishList: data
        });
      } else if (type === 2) {
        //厨师加载
        this.data2.loadCook = false;
        if (res.data.isLastPage) {
          this.data2.noMoreCook = true;
        } else {
          this.data2.cookPage++;
        }
        let data = pageNum === 1 ? res.data.list : this.data.cookList.concat(res.data.list);
        this.setData({
          cookList: data
        });
      } else if (type === 3) {
        //分菜员加载
        this.data2.loadOther = false;
        if (res.data.isLastPage) {
          this.data2.noMoreOther = true;
        } else {
          this.data2.otherPage++;
        }
        let data = pageNum === 1 ? res.data.list : this.data.otherList.concat(res.data.list);
        this.setData({
          otherList: data
        });
      }
    } else {
      if (type === 1) {
        if (this.data2.dishPage === 1) {
          this.setData({
            dishList: []
          });
        }
      } else if (type === 2) {
        if (this.data2.cookPage === 1) {
          this.setData({
            cookList: []
          });
        }
      } else if (type === 3) {
        if (this.data2.cookPage === 1) {
          this.setData({
            otherList: []
          });
        }
      }
    }
  },
  //当菜品列表滑动
  onDishScroll(e) {
    if (this.data2.noMoreDish)
      return;
    if (this.data2.loadDish) {
      return;
    }
    this.data2.loadDish = true;
    this.loadData(this.data2.dishPage, 10, 1);
  },
  //当厨师列表滑动
  onCookScroll(e) {
    if (this.data2.noMoreCook)
      return;
    if (this.data2.loadCook) {
      return;
    }
    this.data2.loadCook = true;
    this.loadData(this.data2.cookPage, 10, 2);
  },
  //当分菜员列表滑动
  onOtherScroll(e) {
    if (this.data2.noMoreOther)
      return;
    if (this.data2.loadOther) {
      return;
    }
    this.data2.loadOther = true;
    this.loadData(this.data2.otherPage, 10, 3);
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
  onUnload: function() {},

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