<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field label="用户名" placeholder="请输入用户名" />
      <van-field label="验证码" placeholder="获取验证码" />
    </van-cell-group>
    <div class="loginBtn">
      <van-button type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.loginBtn{
    padding: 20px;
    .van-button {
        width: 100%;
    }
}
</style>
