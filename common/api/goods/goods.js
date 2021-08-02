/**
 * 商品相关api
 */
import http from '@/common/http/http.js'

/**
 * 添加商品
 * @param {Object} params - 查询参数  
 */
export const addGoods = (data, params) => {
  return http.middleware({
    method: 'POST', // 必须大写
    url: '/api/goods/add',
    data: data,
    params: params,
    custom: {
      auth: true
    }
  })
}

/**
 * 查询商品列表
 * @param {Object} params - 查询参数  
 */
export const goodsList = (data, params) => {
  return http.middleware({
    method: 'POST', // 必须大写
    url: '/api/goods/list',
    data: data,
    params: params,
    custom: {
      auth: true
    }
  })
}

/**
 * 查询商品想抢
 * @param {Object} params - 查询参数  
 */
export const goodsDetails = (data, params) => {
  return http.middleware({
    method: 'POST', // 必须大写
    url: '/api/goods/detail',
    data: data,
    params: params,
    custom: {
      auth: true
    }
  })
}

