<template>
  <div class="searchArticle">
    <!-- 搜索框 -->
    <form class="search-form" action="/">
      <van-search
        placeholder="请输入搜索关键词"
        show-action
        v-model="searchContent"
        @cancel="$router.back()"
        @search="onSearchResult"
        @focus="isResult=false"
        @input="onSearchInput"
      />
    </form>
    <!-- 搜索列表 -->
    <searchList v-if="isResult" :q="searchContent"></searchList>
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell
        icon="search"
        :title="item"
        v-for="item in suggestion"
        :key="item"
        @click="onSearchResult(item)"
      />
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录" size="large">
        <template v-if="delIcon">
          <span @click="searchHistory=[]">全部删除</span>
          &nbsp;&nbsp;
          <span @click="delIcon = false">完成</span>
        </template>
        <van-icon v-else name="delete" @click="delIcon = true" />
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item,index) in searchHistory"
        :key="index"
        @click="onDelHistory(item,index)"
      >
        <van-icon v-show="delIcon" name="close"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import searchList from './component/search-list'
import { getSuggestion } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'
export default {
  name: 'searchPage',
  components: {
    searchList
  },
  data () {
    return {
      searchContent: '', // 搜索内容
      delIcon: false, // 删除操作
      isResult: false, // 搜索结果
      suggestion: [], // 联想建议列表
      searchHistory: getItem('search-histories') || [] // 搜索历史
    }
  },
  methods: {
    // 展示搜索结果
    onSearchResult (q) {
      this.searchContent = q // 如果搜索内容为联想建议则把传过来的值赋值给搜索内容
      const index = this.searchHistory.indexOf(this.searchContent)
      if (index !== -1) {
        this.searchHistory.splice(index, 1) // 如果历史列表中存在相同搜索内容，删除历史内容
      }
      this.searchHistory.unshift(this.searchContent) // 把最新搜索内容追加到列表最前面
      this.isResult = true
    },
    // 历史记录删除
    onDelHistory (item, index) {
      if (this.delIcon) {
        this.searchHistory.splice(index, 1)
      } else {
        this.onSearchResult(item)
      }
    },
    // 内容发生变化时
    // 防抖处理
    onSearchInput: debounce(async function () {
      if (!this.searchContent) {
        // 判断非空
        return
      }
      const { data } = await getSuggestion(this.searchContent)
      // console.log(data)
      this.suggestion = data.data.options
      // this.isResult = true
    }, 500)
    // async onSearchInput () {
    //   if (!this.searchContent) {
    //     // 判断非空
    //     return
    //   }
    //   const { data } = await getSuggestion(this.searchContent)
    //   // console.log(data)
    //   this.suggestion = data.data.options
    //   // this.isResult = true
    // }
  },
  watch: {
    searchHistory (newVal) {
      setItem('search-histories', newVal)
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
