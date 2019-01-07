const http = require('../../../utils/http.js');

/**
 * 查询收藏列表
 */
const getList = async(pageNum)=>{
  try{
    return await http.post('/weixin/getAllUserStores',{paegNum:pageNum},true);
  }catch(e){
    return null;
  }
};

module.exports = {getList};