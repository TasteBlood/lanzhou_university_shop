 //index.js
const $http = require("request.js");
const noticeRequest = require('../../pages/index/notice/request.js');
//获取应用实例
const app = getApp()

Page({
  load:false,
  keyWords:'',
  data: {
    showNotice:false,
    notice:{},
    dishList:[],
    cookList:[],
    otherList:[],
    showDish:true,
    loadDish:true,
    loadCook:true,
    loadOther:true
  },
  /**
   * 跳转页面
   */
  skipToPage(e){
    if (e.currentTarget.dataset.page === 'like') {
      wx.navigateTo({
        url: './like/likeList',
      });
    } else if (e.currentTarget.dataset.page === 'new') {
      wx.navigateTo({
        url: './new/newList',
      });
    } else if (e.currentTarget.dataset.page === 'notice') {
      wx.navigateTo({
        url: './notice/noticeList',
      });
    } else if (e.currentTarget.dataset.page === 'opinion') {
      wx.navigateTo({
        url: './opinion/opinion',
      });
    }
  },
  onSearch(e){
    //跳转到search result页面，顺便传入参数
    let self = this;
    if(this.keyWords)
      wx.navigateTo({
        url: `./result/result?keyWords=${self.keyWords}`,
      })

  },
  onInput(e){
    this.keyWords = e.detail.value;
  },
  //菜品item点击
  onDishItemClick(e){

  },
  onLoad: function () {
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
    }else{
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
      this.loadData();
    }
  },
  onShow:function(){
    
  },
  sckipToNotice(){
    wx.navigateTo({
      url: 'notice/noticeList',
    })
  },
  async loadData(){
    if(this.load){
      wx.stopPullDownRefresh();
      return;
    }
    wx.showNavigationBarLoading();
    this.load = true;
    //加载公告
    let res = await noticeRequest.getNoticeList(1,1,false);
    if(res&&res.data.list.length>0){
      //开启公告信息
      this.setData({
        notice:res.data.list[0],
        showNotice:true
      });
    }else{
      this.setData({
        notice: [],
        showNotice: false
      });
    }
    //加载菜品数据
    this.setData({
      loadDish:true
    });
    res = await $http.getFronts(1, 20, 1);
    console.log(res);
    if (res&&res.data) {
      this.setData({
        dishList: res.data.list
      });
    } else {
      this.setData({
        dishList: []
      });
    }
    this.setData({
      loadDish: false
    });
    //加载厨师数据
    this.setData({
      loadCook: true
    });
    res = await $http.getFronts(1, 20, 2);
    if(res&&res.data){
      this.setData({
        cookList:res.data.list
      });
    }else{
      this.setData({
        cookList: []
      });
    }
    this.setData({
      loadCook: false
    });
    //加载分菜员数据
    this.setData({
      loadOther: true
    });
    res = await $http.getFronts(1, 20, 3);
    if (res&& res.data) {
      this.setData({
        otherList: res.data.list
      });
    } else {
      this.setData({
        otherList: []
      });
    }
    this.setData({
      loadOther: false
    });
    this.load = false;
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  },
  onPullDownRefresh(){
      this.loadData();
  }

})
