<template>
  <van-list v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onSearchResult">
    <van-cell :title="item.title" v-for="(item,index) in list" :key="index">
      <van-icon name="close"></van-icon>
    </van-cell>
  </van-list>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  props: {
    q: {
      // type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false, // 加载状态
      finished: false, // 数据加载状态
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onSearchResult () {
    // 1,请求获取数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      // 2，将数据添加到列表中
      // console.log(data)
      const { results } = data.data
      this.list.push(...results)
      // console.log(this.list)
      // 3，加载状态结束
      this.loading = false
      // 4，判断数据是否加载完成
      if (results.length) {
        this.page++ // 如果有数据，更新获取下一页数据
      } else {
        this.finished = false // 如果没有数据，不再onload
      }
    }
  },
  created () {
    this.onSearchResult()
  }
}
</script>

<style>
</style>
