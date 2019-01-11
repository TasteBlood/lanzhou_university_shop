const http = require('../../../utils/http.js');

/**
 * 微信支付
 */
const pay = async(order_num)=>{
  try{
    return await http.post('/wxpay/pay', { order_num:order_num}, true);
  }catch(e){
    return null;
  }
};

module.exports = {pay};