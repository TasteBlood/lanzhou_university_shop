const http = require('../../../utils/http.js');
/**
 * 保存收货地址
 */
const saveReceiveAddress = async (receiveName, provinName, cityName, countyName, detailInfo, telNumber, isdefault)=>{
  try{
    return await http.post('/weixin/saveReceiveAddress', { receiveName: receiveName, provinceName: provinName, cityName: cityName, countyName: countyName, detailInfo: detailInfo,telNumber:telNumber,isdefault:isdefault},true);
  }catch(e){
    return null;
  }
};

/**
 * 查询全部的收货地址
 */
const getAddressList = async()=>{
  try{
    return await http.post('/weixin/getReceiveAddressByUserId',{},true);
  }catch(e){
    return null;
  }
};

/**
 * 删除收货地址
 */
const deleteReceiveAddress = async(id)=>{
  try{
    return await http.post('/weixin/deleteReceiveAddress',{id:id},true);
  }catch(e){
    return null;
  }
};

/**
 * 修改收货地址
 */
const updateReceiveAddress = async (id, receiveName, provinName, cityName, countyName, detailInfo, telNumber, isdefault) => {
  try {
    return await http.post('/weixin/updateReceiveAddress', {id:id,receiveName: receiveName, provinceName: provinName, cityName: cityName, countyName: countyName, detailInfo: detailInfo, telNumber: telNumber ,isdefault:isdefault}, true);
  } catch (e) {
    return null;
  }
};

module.exports = { saveReceiveAddress, getAddressList, deleteReceiveAddress,updateReceiveAddress};