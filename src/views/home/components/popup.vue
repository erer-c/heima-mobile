<template>
  <div class="popup">
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        type="danger"
        round
        plain
        @click="isEditShow=!isEditShow"
      >{{!isEditShow?'编辑':'完成'}}</van-button>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid>
      <van-grid-item
        v-for="(item,index) in channelList"
        :key="item.id"
        @click="onSwitchChannel(index)"
      >
        <span class="colorSpan" slot="text" :class="{red:value===index}">{{item.name}}</span>
        <van-icon
          v-show="isEditShow&&index!==0"
          name="close"
          slot="icon"
          color="red"
          size="16"
          @click="onDelChannel(index)"
        />
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" :border="false"></van-cell>
    <!-- 剩余频道 -->
    <van-grid>
      <van-grid-item
        :text="channel.name"
        v-for="channel in remanent"
        :key="channel.id"
        @click="onAllChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'channels',
  props: {
    channelList: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannel: [], // 所有频道
      isEditShow: false // 控制编辑时图标显隐
    }
  },
  methods: {
    // 点击频道切换
    onSwitchChannel (index) {
      // console.log(this.isEditShow)
      if (!this.isEditShow) {
        this.$emit('input', index)// 修改激活标签
        this.$emit('close')// 关闭弹层
      }
    },
    // 点击删除我的频道
    // onDelChannel (id) {
    //   console.log(id)
    //   this.channelList = this.channelList.filter(item => {
    //     return item.id !== id
    //   })
    //   // console.log(this.channelList)
    // },
    onDelChannel (index) {
      if (index !== 0) {
        this.channelList.splice(index, 1)
      }
    },
    // 添加频道
    onAllChannel (channel) {
      // console.log(this.remanent)
      this.channelList.push(channel) // 原数组元素改变，计算属性会重新计算
    },
    // 加载所有频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannel = data.data.channels
      // console.log(data)
    }
  },
  // 计算剩余频道=所有频道-用户频道
  computed: {
    remanent () {
      // console.log(1, this.channelList)
      let arr = []
      this.allChannel.forEach(channel => {
        let same = this.channelList.find(item => {
          // debugger
          return item.id === channel.id
        })
        if (!same) {
          arr.push(channel)
        }
      })
      return arr
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style scoped lang='less'>
.popup {
  .van-cell {
    padding-top: 40px;
  }
  .van-grid-item {
    position: relative;
    .van-icon {
      position: absolute;
      top: -20px;
      right: -45px;
    }
  }
}
span{
  font-size: 12px;
}
.colorSpan{
  color: #646566;
}
.red{
  color: red;
}
</style>
