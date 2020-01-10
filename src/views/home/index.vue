<template>
  <div class="home">
    <van-nav-bar></van-nav-bar>
    <van-tabs>
      <van-tab :title="channel.name" v-for="channel in channelList" :key="channel.id">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user-login'
export default {
  data () {
    return {
      count: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      channelList: [] // 用户频道数据
    }
  },

  methods: {
    // 获取用户频道数据
    async loadUserChannels () {
      const { data } = await getUserChannels()
      // console.log(data)
      this.channelList = data.data.channels
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  },
  created () {
    this.loadUserChannels()
  }
}
</script>

<style>
</style>
