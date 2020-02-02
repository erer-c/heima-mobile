import request from '@/utils/request'
export const getSuggestion = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: { q }
  })
}
// 获取搜索结果
export const getSearchResult = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}
// 获取用户搜索历史
export const getHistory = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/search/histories'
  })
}
