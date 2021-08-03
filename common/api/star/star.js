/**
 * 商品相关api
 */
import http from '@/common/http/http.js'

/**
 * 查询商品列表
 * @param {Object} params - 查询参数  
 */
export const addStar = (data, params) => {
  return http.middleware({
    method: 'POST', // 必须大写
    url: '/api/star/add',
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
export const removeStar = (data, params) => {
  return http.middleware({
    method: 'POST', // 必须大写
    url: '/api/star/remove',
    data: data,
    params: params,
    custom: {
      auth: true
    }
  })
}