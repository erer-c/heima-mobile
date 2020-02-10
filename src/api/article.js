// 文章接口
import request from '@/utils/request'
export const getArticleList = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取文章详情
export const getArticleDetails = articleId => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${articleId}`
  })
}
// 文章点赞
export const articleLiking = articleId => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
// 取消文章点赞
export const cancelArticleLiking = articleId => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
// 文章收藏
export const articleCollect = articleId => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}
// 取消文章收藏
export const cancelArticleCollect = articleId => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}
