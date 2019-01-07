const http = require('../../../utils/http.js');

/**
 * 获取默认的收货地址
 */
const getDefaultAddress = async()=>{
    try{
      return await http.post('/weixin/getAllReceiveAddressIsdefault',{},true);
    }catch(e){
      return null;
    }
};

/**
 * 购物车结算
 */
const buyFromCar = async(shoppings,totalPrice,addressId)=>{
  try {
    return await http.post('/weixin/shoppingBuy', { shoppings: shoppings, total_price: totalPrice, receiveId: addressId }, true);
  } catch (e) {
    return null;
  }
};

/**
 * 这是直接购买
 */
const buyNow = async (gid, gnum, totalPrice, addressId) => {
  try {
    return await http.post('/weixin/buyNow', { product_id: gid, product_num: gnum, total_price: totalPrice, receiveId:addressId}, true);
  } catch (e) {
    return null;
  }
};


module.exports = {getDefaultAddress,buyNow,buyFromCar};