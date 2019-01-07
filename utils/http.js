// const BASE_URL = "http://192.168.31.47:8040";
const BASE_URL = "http://lzdxservice.sandianke.com";
const http = {
  get: function(url, loading) {
    let isLoading = loading === undefined ? true : loading;
    if (isLoading)
      wx.showLoading({
        title: '请稍后',
        mask: true
      });

    return new Promise((resolve, reject) => {
      let req = wx.request({
        url: `${BASE_URL}${url}`,
        // url: `https://www.baidu.com`,
        method: 'GET',
        success: res => {
          if (isLoading)
            wx.hideLoading();
          if (res.data.code === 1) {
            resolve(res.data);
          } else if (res.code === 99) {
            //用户未登录操作，提示登录
            wx.showModal({
              title: '微信登录',
              content: '请先登录?',
              success: res => {
                if (res.confirm) {
                  //跳转到登录页面
                  wx.navigateTo({
                    url: '../../../utils/login/login',
                  });
                } else {
                  wx.navigateBack({

                  });
                }
              }
            })
          } else {
            resolve(res.data);
          }
        },
        fail: err => {
          console.log(err);
          reject(err);
          if (isLoading)
            wx.hideLoading();
        }
      });
    });
  },
  post: function(url, data, loading) {
    let isLoading = loading === undefined ? true : loading;
    if (isLoading)
      wx.showLoading({
        title: '请稍后',
        mask: true
      });
    let user = wx.getStorageSync('remoteUserInfo');
    if (!user) {
      user = {};
    }
    data.userId = user.id;
    data.user_id = user.id;
    data.token = user.token;
    return new Promise((resolve, reject) => {
      const req = wx.request({
        url: `${BASE_URL}${url}`,
        method: 'POST',
        data: data,
        success: res => {
          if (isLoading)
            wx.hideLoading();
          //console.log(res);
          if (res.data.code === 1) {
            resolve(res.data);
          } else if (res.data.code === 99) {
            //用户未登录操作，提示登录
            wx.showModal({
              title: '微信登录',
              content: '请先登录?',
              success: res => {
                if (res.confirm) {
                  //跳转到登录页面
                  wx.navigateTo({
                    url: '../../../utils/login/login',
                  });
                } else {
                  wx.navigateBack({

                  });
                }
              }
            })
          } else {
            resolve(res.data);
          }
        },
        fail: err => {
          console.log(err);
          reject(err);
          if (isLoading)
            wx.hideLoading();
        }
      });
    });
  }
};
module.exports = http;