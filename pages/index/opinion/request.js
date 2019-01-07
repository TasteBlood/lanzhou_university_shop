const http = require('../../../utils/http.js');

/**
 * 发表意见
 */
const addOpinion = async(content)=>{
  try{
    return await http.post('/weixin/saveOpinion',{content:content});
  }catch(e){
    return null;
  }
};

/**
 * 获取全部的意见列表
 */
const getOpinions = async(pageNum,pageSize)=>{
  try{
    return await http.post('/weixin/getOpinion',{pageNum:pageNum,pageSize:pageSize});
  }catch(e){
    return null;
  }
};

module.exports = { addOpinion, getOpinions};