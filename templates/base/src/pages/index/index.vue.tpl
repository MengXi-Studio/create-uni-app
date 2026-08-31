<template>
  <view class="content">
    <text class="title">欢迎来到 ${safeName}</text>
    <text class="tip">基于 uni-app + Vite 的项目脚手架已就绪</text>
    <text class="tip">编辑 pages/index/index.vue 开始你的开发</text>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  const count = ref(0)
</script>

<style lang="${cssExt}">
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 160rpx;
    padding: 0 40rpx;
  }

  .title {
    font-size: 44rpx;
    font-weight: 600;
    color: #333;
  }

  .tip {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: #999;
    text-align: center;
  }
</style>