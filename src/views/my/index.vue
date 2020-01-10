<template>
  <div class="homepage">
    <!-- 已登录 -->
    <div class="userInfo" v-if="$store.state.user">
      <!-- 基本信息 -->
      <div class="baseInfo">
        <div class="leftBaseInfo">
          <van-image class="avatar" round fit="cover" :src="user.photo" />
          <div class="username">{{user.name}}</div>
        </div>
        <van-button round size="mini">编辑资料</van-button>
      </div>
      <!-- 数据信息 -->
      <van-grid class="dataInfo" :border="false">
        <van-grid-item>
          <span>{{user.art_count}}</span>
          <span>头条</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.follow_count}}</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.fans_count}}</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.like_count}}</span>
          <span>获赞</span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 未登录 -->
    <div class="not-login" v-else @click="$router.push('/login')">
      <div class="mobile"></div>
      <div class="text">点击登录</div>
    </div>

    <!-- 其它 -->
    <van-grid :column-num="3" class="effect">
      <van-grid-item icon="like-o" style="color:#eb5253" text="我的收藏" />
      <van-grid-item icon="eye-o" style="color:#ffa023" text="浏览历史" />
      <van-grid-item icon="edit" style="color:#678eff" text="作品" />
    </van-grid>
    <van-cell-group :border="false">
      <van-cell title="消息通知" is-link />
      <van-cell title="小爱同学" is-link />
    </van-cell-group>

    <!-- 退出登录 -->
    <van-cell-group v-if="$store.state.user" @click="onQuitLogin">
      <van-cell style="text-align: center;" title="退出登录" clickable />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user-login'
export default {
  data () {
    return {
      user: {} // 用户信息
    }
  },
  methods: {
    onQuitLogin () {
      this.$dialog.confirm({
        title: '提示',
        message: '退出当前头条账号，将不能同步收藏，发布评论和云端分享等'
      }).then(() => {
        // console.log(1)
        this.$store.commit('setUser', null)
      })
    },
    // 获取用户信息
    async GainUserInfo () {
      const { data } = await getUserInfo()
      // console.log(res)
      this.user = data.data
    }
  },
  created () {
    // 如果用户登录，请求用户数据信息
    if (this.$store.state.user) {
      this.GainUserInfo()
    }
  }
}
</script>

<style scoped lang='less'>
.homepage {
  // 用户信息
  // 已登录
  .userInfo {
    height: 182px;
    padding: 40px 20px;
    box-sizing: border-box;
    font-size: 15px;
    color: #fff;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    // 基本信息
    .baseInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .leftBaseInfo {
        display: flex;
        align-items: center;
        .avatar {
          width: 66px;
          height: 66px;
          padding: 2px;
          margin-right: 15px;
          background: #fff;
        }
      }
    }
    // 数据信息
    .dataInfo {
      ::v-deep .van-grid-item__content {
        background: none;
      }
    }
  }
  // 未登录
  .not-login {
    background: url("./banner.png") no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile {
      background: url("./mobile.png") no-repeat;
      background-size: cover;
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  .van-cell-group {
    margin-top: 10px;
  }
}
</style>
