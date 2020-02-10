<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <ValidationObserver ref="formVerify">
        <ValidationProvider name="手机号" rules="required|mobile" v-slot="{ errors }">
          <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" required />
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|code" v-slot="{ errors }">
          <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
            <van-count-down
              v-if="isCountDownShow"
              slot="button"
              :time="1000*60"
              format="ss s"
              @finish="isCountDownShow = false"
            ></van-count-down>
            <van-button v-else slot="button" type="primary" size="small" @click="onSendSms">获取验证码</van-button>
          </van-field>
        </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <div class="loginBtn">
      <van-button type="info" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user-login'
import { validate } from 'vee-validate'
export default {
  name: 'loginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  methods: {
    // 发送验证码
    async onSendSms () {
      const { mobile } = this.user
      // 验证手机号是否有效
      const res = await validate(mobile, 'required|mobile', { name: '手机号' })
      if (!res.valid) {
        this.$toast(res.errors[0])
        return
      }
      // 发送验证码
      try {
        this.isCountDownShow = true
        await sendSms(mobile)
      } catch (error) {
        this.isCountDownShow = false
        // console.log(error.response)
        if (error.response.status === 429) {
          return this.$toast('不能频繁操作!')
        }
        this.$toast('发送失败')
      }
    },
    // 点击登录手动校验
    async login () {
      const res = await this.$refs.formVerify.validate()
      if (!res) {
        setTimeout(() => {
          const { errors } = this.$refs.formVerify
          // console.log('失败', errors)
          const item = Object.values(errors).find(item => {
            return item[0]
          })
          this.$toast(item[0])
          // for (let key in errors) {
          //   // console.log(errors[key], key, errors, errors.key)
          //   const item = errors[key]
          //   // console.log(item[0])
          //   if (item[0]) {
          //     this.$toast(item[0])
          //     return
          //   }
          // }
        }, 100)
        return
      }
      // 登录中显示loading
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '登录中...',
        forbidClick: true
      })
      // 返回结果状态消息提示
      try {
        const res = await login(this.user)
        // console.log(res.data)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功！')
        this.$router.push('/')
      } catch (error) {
        this.$toast.fail('手机号或验证码错误！')
      }
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
