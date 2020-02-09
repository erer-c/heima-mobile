<template>
  <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.title"
        @click="$router.push('/article/' + item.art_id)"
      />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'articleList',
  props: {
    channel: {
      // 限制
      type: Object,
      required: true
    }
  },
  data () {
    return {
      count: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    // 下拉刷新获取最新数据
    async onRefresh () {
      // 1,请求获取数据
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        timestamp: Date.now(), // 获取当前最新的文章列表   时间戳
        with_top: 1 // 是否包含置顶
      })
      // console.log(data)
      // 2,如果有最新数据，加载到顶部
      const { results } = data.data
      this.list.unshift(...results)
      // 3,关闭下拉的loading状态
      this.isLoading = false
      this.$toast(`已成功加载${results.length}条数据`)
    },
    async onLoad () {
      // 1 请求获取数据
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), // 获取当前最新的文章列表   时间戳
        with_top: 1 // 是否包含制置顶
      })
      // console.log(data)
      // 2 把请求到的数据添加到频道数据列表
      const results = data.data.results
      this.list.push(...results)
      // console.log(this.list)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp // 更新获取下一页的时间戳
      } else {
        this.finished = true // 停止加载
      }
    }
  }
}
</script>

<style scoped lang='less'>
.van-pull-refresh {
  margin-top: 90px;
  margin-bottom: 50px;
}
</style>
