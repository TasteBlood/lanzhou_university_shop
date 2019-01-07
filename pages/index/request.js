const $http = require('../../utils/http.js');

/**
 * 获取点赞前几名的菜品、厨师、分菜员 type:1 菜品 2 厨师  3分菜员
 */
const getFronts = async (pageNum,pageSize,type)=>{
  try{
    return await $http.post('/weixin/frontDishes',{pageNum:pageNum,pageSize:pageSize,type:type},false);
  }catch(e){
    return null;
  }
};

/**
 * 关键字查询菜品
 */
const getDishesByName = async (name)=>{
  try{
    return await $http.post('/weixin/getAllDisheByName',{dishesName:name,pageSize:10},true);
  }catch(e){
    return null;
  }
};

module.exports = {getFronts,getDishesByName};