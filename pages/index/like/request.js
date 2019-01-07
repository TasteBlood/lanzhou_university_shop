const http = require('../../../utils/http.js');

/**
 * 分页获取食堂列表
 */
const getRestaurants = async(pageNum = 1, pageSize = 100)=>{
  try{
    return await http.post('/weixin/getAllCanteens', { pageNum: pageNum, pageSize: pageSize },false);
  }catch(e){
    console.log(e);
    return null;
  }
};

/**
 * 根据食堂id获取楼层列表
 */
const getFloors = async (canteen_id)=>{
  try {
    return await http.post('/weixin/getAllFloor', { canteen_id: canteen_id});
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * 根据楼层id获取窗口列表
 */
const getWindows = async(canteen_id,floor_id)=>{
  try {
    return await http.post('/weixin/getAllWindows', { canteen_id: canteen_id, floor_id: floor_id});
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * 按照分类查询数据
 */
const getFronts = async(pageNum,pageSize,type,canteen_id,floor_id,window_id)=>{
  try {
    return await http.post('/weixin/frontDishes', { pageNum:pageNum, pageSize:pageSize, type:type, canteen_id: canteen_id, floor_id: floor_id,organ_window_id:window_id},true);
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * 点赞  id 对象的id
 *       type  1 菜品 2 厨师 3 分菜员
 */
const clickNum = async(id,type)=>{
  try{
    return await http.post('/weixin/clickNum', {type:type,objectId:id},false);
  }catch(e){
    console.log(e)
    return null;
  }
};

module.exports = { getRestaurants, getFloors, getWindows, getFronts,clickNum};