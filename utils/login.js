const $http = require('http.js');

const login =async()=>{
  wx.showLoading({
    title: '登录中...',
    mask:true
  });
  let res = await new Promise((resolve,reject)=>{
    wx.login({
      success: res => {
        resolve(res);
      },
      fail: e => {
        reject(e);
      }
    });
  });

  if(res){
    try{
      let userinfo = await $http.post('/weixin/login', { code: res.code,style:2}, false);
      wx.hideLoading();
      //console.log(userinfo);
      if(userinfo&&userinfo.code===1){
        //操作成功
        let user = {id:userinfo.data.id,token:userinfo.data.token};
        //在这里保存数据
        wx.setStorageSync('remoteUserInfo',user);
        return user;
      }else{
        return null;
      }
    }catch(e){
      console.log(e);
      return null;
    }
  }else{
    return null;
  }
  
};

module.exports = {login};