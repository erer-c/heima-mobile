import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const sendSms = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取当前用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
// 获取用户频道数据
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
// 关注用户
export const followings = userId => {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const cancelFollowings = userId => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
