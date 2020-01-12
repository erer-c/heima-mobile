<template>
  <div class="searchArticle">
    <!-- 搜索框 -->
    <form class="search-form" action="/">
      <van-search
        placeholder="请输入搜索关键词"
        show-action
        v-model="searchContent"
        @search="searchResult"
        @cancel="onCancel"
        @focus="isResult=false"
      />
    </form>
    <!-- 搜索列表 -->
    <searchList v-if="isResult"></searchList>
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell icon="search" :title="item" v-for="item in suggestion" :key="item" />
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell v-else title="历史记录" size="large">
      <template v-if="delIcon">
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span @click="onFinish">完成</span>
      </template>
      <van-icon v-else name="delete" @click="delOperation" />
    </van-cell>
  </div>
</template>

<script>
import searchList from './component/search-list'
import { getSuggestion } from '@/api/search'
export default {
  components: {
    searchList
  },
  name: 'searchPage',
  data () {
    return {
      searchContent: '', // 搜索内容
      delIcon: false, // 全部删除操作
      isResult: false, // 搜索结果
      suggestion: [] // 联想建议列表
    }
  },
  methods: {
    // 确定搜索文章时
    async searchResult () {
      const { data } = await getSuggestion(this.searchContent)
      console.log(data)
      this.suggestion = data.data.options
      this.isResult = true
    },
    // 点击完成
    onFinish () {
      this.delIcon = false
    },
    //   点击删除图标
    delOperation () {
      this.delIcon = true
    },
    // 点击取消返回上一级
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang='less'>
.searchArticle {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
