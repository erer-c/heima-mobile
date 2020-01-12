<template>
  <div class="home">
    <van-nav-bar fixed></van-nav-bar>
    <van-tabs v-model="active">
      <van-icon slot="nav-right" name="wap-nav" @click="showPopup" />
      <van-popup
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '95%' }"
        closeable
        v-model="show"
      >
        <popup :channel-list="channelList" v-model="active" @close='show=false'></popup>
      </van-popup>
      <van-tab :title="channel.name" v-for="channel in channelList" :key="channel.id">
        <!-- <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>-->

        <articleList :channel="channel"></articleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user-login'
import articleList from './components/article_list'
import popup from './components/popup'
export default {
  data () {
    return {
      channelList: [], // 用户频道数据
      show: false,
      active: 0
    }
  },
  components: {
    articleList,
    popup
  },
  methods: {
    // 显示弹层
    showPopup () {
      this.show = true
    },
    // 获取用户频道数据
    async loadUserChannels () {
      const { data } = await getUserChannels()
      // console.log(data)
      this.channelList = data.data.channels
    }
  },
  created () {
    this.loadUserChannels() // 获取频道数据
  }
}
</script>

<style scoped lang='less'>
.home {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-icon {
    position: fixed;
    right: 0px;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
  }
}
</style>
