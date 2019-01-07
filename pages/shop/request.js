const http = require('../../utils/http.js');

/**
 * 查询商品
 */
const getAllGoods = async(pageNum,cateId,keyWords)=>{
  try{
    return await http.post('/weixin/getAllGoods',{pageNum:pageNum,goodsCategoryId:cateId,goodsName:keyWords},true);
  }catch(e){
    return null;
  }
};

/**
 * 根据商品id查询商品信息
 */
const getGoodsById = async(gid)=>{
  try{
    return await http.post('/weixin/findGoodsById', {goodsId:gid},true);
  }catch(e){
    return null;
  }
};

/**
 * 查询商品分类
 */
const getAllCategory = async()=>{
  try {
    return await http.post('/weixin/getAllGoodsCategorys', {}, false);
  } catch (e) {
    return null;
  }
};

/**
 * 收藏商品
 */
const collectGoods = async(gid)=>{
  try {
    return await http.post('/weixin/saveUserGoods', {product_id:gid}, true);
  } catch (e) {
    return null;
  }
};
/**
 * 取消收藏
 */
const noCollectGoods = async(id)=>{
  try {
    return await http.post('/weixin/deleteUserGoods', {id:id}, true);
  } catch (e) {
    //console.log(e)
    return null;
  }
};

/**
 * 添加购物车
 */
const addShoppingCar = async(gid,gnum)=>{
  try {
    return await http.post('/weixin/saveShopping', { product_id: gid, product_num:gnum }, true);
  } catch (e) {
    return null;
  }
};

/**
 * 获取服务电话
 */
const getServicePhone = async()=>{
  try{
    return await http.post('/weixin/getAllServicePhone',{},true);
  }catch(e){
    return null;
  }
};

module.exports = {getAllGoods,getAllCategory,getGoodsById,collectGoods,noCollectGoods,addShoppingCar,getServicePhone};