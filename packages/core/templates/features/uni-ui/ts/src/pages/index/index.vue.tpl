<template>
  <view class="content">
    <text class="title">欢迎来到 ${safeName}</text>
    <text class="tip">基于 uni-app + Vite 的项目脚手架已就绪</text>
    <text class="tip">uni-ui 已通过 easycom 按需引入，可直接使用 uni 组件</text>

    <view class="demo">
      <uni-button type="primary" size="small" @click="onClick">uni-button 按钮</uni-button>
      <uni-icons type="star-filled" color="#4b3fe3" :size="28" />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const count = ref(0)

  function onClick(): void {
    count.value++
    uni.showToast({ title: `点击了 ${count.value} 次`, icon: 'none' })
  }
</script>

<style lang="${cssExt}">
  .content {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    margin-top: 160rpx; padding: 0 40rpx;
  }
  .title { font-size: 44rpx; font-weight: 600; color: #333; }
  .tip { margin-top: 24rpx; font-size: 28rpx; color: #999; text-align: center; }
  .demo { display: flex; align-items: center; gap: 16rpx; margin-top: 40rpx; }
</style>