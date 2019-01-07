const $http = require('../../../utils/http.js');

/**
 * 查询公告列表
 */
const getNoticeList = async(pageNum,pageSize,loading)=>{
  try{
    return await $http.post('/weixin/getAnnounce',{pageNum:pageNum,pageSize:pageSize},loading);
  }catch(e){
    return null;
  }
};

module.exports = {getNoticeList};