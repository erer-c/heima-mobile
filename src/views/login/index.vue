<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" required />
      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
        <van-button slot="button" type="primary" size="small">获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="loginBtn">
      <van-button type="info" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user-login'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    login () {
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '登录中...',
        forbidClick: true
      })
      login(this.user).then(res => {
        // alert(1)
        this.$toast.success('登录成功！')
      }).catch(() => {
        this.$toast.fail('手机号或验证码错误！')
      })
    }
  }
}
</script>

<style scoped lang='less'>
.loginBtn {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
