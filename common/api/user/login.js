/**
 * 商品相关api
 */
import http from '@/common/http/http.js'

/**
 * 查询商品列表
 * @param {Object} params - 查询参数  
 */
export const userLogin = (params) => {
  return http.get('/api/user/login', {
    params
  })
}

