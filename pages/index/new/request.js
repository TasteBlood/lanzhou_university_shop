const http = require('../../../utils/http.js');

/**
 * @param pageNum 分页数
 * @param type 菜品类型  1 早餐 2 午餐 3 晚餐
 * @description 查询新品推荐列表
 */
const getNewDishes = async(pageNum,type)=>{
  try{
    return  await http.post('/weixin/getOldOrganDishes', { pageNum: pageNum, type: type });
  }catch(e){
    return null;
  }
  
};

module.exports = { getNewDishes };