/**
 * 商品相关api
 */
import http from '@/common/http/http.js'

/**
 * 查询商品列表
 * @param {Object} params - 查询参数  
 */
export const addDialog = (data, params) => {
  return http.middleware({
    method: 'POST', // 必须大写
    url: '/api/dialog/add',
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
export const getDialog = (data, params) => {
  return http.middleware({
    method: 'POST', // 必须大写
    url: '/api/dialog/list',
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
export const addResponse = (data, params) => {
  return http.middleware({
    method: 'POST', // 必须大写
    url: '/api/dialog/response',
    data: data,
    params: params,
    custom: {
      auth: true
    }
  })
}