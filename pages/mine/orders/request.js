const http = require('../../../utils/http.js');

/**
 * state 0:已下单，未支付; 1:用户取消订单 2:已支付未发货; 3:商家已发货; 4:用户确认收货; 5:用户退单（用户确认收货之前); 6:退单成功
 */
const getAllOrders = async(pageNum,state)=>{
  try{
    return await http.post('/weixin/getMyOrders', { pageNum: pageNum, order_type:state},true);
  }catch(e){
    return null;
  }
};

/**
 * 获取订单详情
 */
const getOrderDetail = async(orderId)=>{
  try{
    return await http.post('/weixin/getOrderDetailById', { order_id:orderId},true);
  }catch(e){
    return null;
  }
};

/**
 * 删除订单
 */
const delOrder = async(orderId)=>{
  try {
    return await http.post('/weixin/deleteOrders', { order_id: orderId }, true);
  } catch (e) {
    return null;
  }
};

/**
 * 确认收货
 */
const receive = async(orderId)=>{
  try {
    return await http.post('/weixin/receivingGoods', { order_id: orderId }, true);
  } catch (e) {
    return null;
  }
};

/**
 * 申请退单
 */
const refundApply = async(orderId)=>{
  try{
    return await http.post('/weixin/chargeBack', { order_id: orderId }, true);
  }catch(e){
    return null;
  }
};

module.exports = {getAllOrders,getOrderDetail,delOrder,receive,refundApply};