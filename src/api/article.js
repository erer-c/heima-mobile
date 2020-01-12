// 文章接口
import request from '@/utils/request'
export const getArticleList = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
