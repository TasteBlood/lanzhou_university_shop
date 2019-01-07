const http = require('../../../utils/http.js');
/**
 * 获取购物车商品
 */
const getAllItems = async()=>{
  try{
    return await http.post('/weixin/getAllShoppings',{},true);
  }catch(e){
    return null;
  }
};

/**
 * 更新购物车的数量
 */
const updateItem = async(id,num,gid)=>{
  try{
    return await http.post('/weixin/updateShopping', { id: id, product_num:num,product_id:gid},true);
  }catch(e){
    return null;
  }
};

/**
 * 删除购物车
 */
const deleteItem = async(id)=>{
  try{
    return await http.post('/weixin/deleteShopping',{id:id},true);
  }catch(e){
    return null;
  }
};
module.exports = {getAllItems,updateItem,deleteItem};