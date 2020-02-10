<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 加载状态 -->
    <van-loading
      v-if="loading"
      class="articleLoading"
      color="#1989fa"
      vertical
      slot="default"
    >加载中...</van-loading>
    <!-- 文章详情 -->
    <div class="details" v-else-if="articleDetails.content">
      <h3 class="title">{{articleDetails.title}}</h3>
      <div class="author">
        <div class="baseInfo">
          <van-image
            class="avator"
            round
            :src="articleDetails.aut_photo?articleDetails.aut_photo:defaultImg"
          ></van-image>
          <div class="times">
            <span>{{articleDetails.aut_name}}</span>
            <span class="time">{{articleDetails.pubdate}}</span>
          </div>
        </div>
        <van-button
          v-if="!$store.state.user||articleDetails.aut_id !== $store.state.user.userId"
          class="follow-btn"
          :type="articleDetails.is_followed?'default':'info'"
          size="small"
          round
          :loading='isFollowLoading'
          @click="onFollow"
        >{{articleDetails.is_followed?'已关注':'+ 关注'}}</van-button>
      </div>
      <div class="markdown-body" v-html="articleDetails.content"></div>
    </div>
    <!-- 页面加载失败提示 -->
    <div v-else class="error">
      <img src="./no-network.png" alt="no-network" />
      <p class="text">亲，网络不给力哦~</p>
      <van-button class="btn" type="default" size="small">点击重试</van-button>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <van-button class="write-btn" type="default" round size="small">写评论</van-button>
      <van-icon class="comment-icon" name="comment-o" info="9" />
      <van-icon
        color="orange"
        :name="articleDetails.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="articleDetails.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLikes"
      />
      <van-icon class="share-icon" name="share" />
    </div>
  </div>
</template>

<script>
import {
  getArticleDetails,
  articleCollect,
  cancelArticleCollect,
  articleLiking,
  cancelArticleLiking
} from '@/api/article'
import {
  followings,
  cancelFollowings
} from '@/api/user-login'
export default {
  name: 'articlePage',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isFollowLoading: false, // 关注加载状态
      loading: true, // 加载状态
      articleDetails: {}, // 文章详情内容
      defaultImg: require('./no-network.png')
    }
  },
  methods: {
    // 获取文章详情
    async loadArticle () {
      this.loading = true
      const { data } = await getArticleDetails(this.articleId)
      // console.log(data)
      this.articleDetails = data.data
      this.loading = false
    },
    // 文章点赞
    async onLikes () {
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '操作中...',
        forbidClick: true // 是否禁用背景点击
      })
      try {
        if (this.articleDetails.attitude === 1) {
          await cancelArticleLiking(this.articleId)
          this.articleDetails.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await articleLiking(this.articleId)
          this.articleDetails.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 文章收藏
    async onCollect () {
      // 操作中显示loading
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '操作中...',
        forbidClick: true // 是否禁用背景点击
      })
      try {
        if (this.articleDetails.is_collected) {
          await cancelArticleCollect(this.articleId)
          this.articleDetails.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          await articleCollect(this.articleId)
          this.articleDetails.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 用户关注
    async onFollow () {
      this.isFollowLoading = true
      try {
        if (this.articleDetails.is_followed) {
          await cancelFollowings(this.articleDetails.aut_id)
        } else {
          await followings(this.articleDetails.aut_id)
        }
        this.articleDetails.is_followed = !this.articleDetails.is_followed
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    }
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style lang='less' scoped>
@import "./markdown.css";
.van-nav-bar .van-icon {
  color: #fff;
}
.error {
  text-align: center;
  margin-top: 150px;
  p {
    font-size: 18px;
  }
}
.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .articleLoading {
    margin-top: 250px;
  }
  .details {
    .title {
      margin: 0;
      font-size: 20px;
      padding-top: 24px;
    }
    .author {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .baseInfo {
        display: flex;
        align-items: center;
        .avator {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .times {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
          .time {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
