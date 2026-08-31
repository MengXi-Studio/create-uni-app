<template>
  <view class="content">
    <text class="title">分包页面示例</text>
    <text class="tip">位于子包 pages-sub/，genaratePages / generateUni 会自动将其注册到 pages.json 的 subPackages</text>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  const demo = ref('pages-sub/demo/demo')
</script>

<style lang="${cssExt}">
  .content { display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 160rpx; padding: 0 40rpx; }
  .title { font-size: 44rpx; font-weight: 600; color: #333; }
  .tip { margin-top: 24rpx; font-size: 28rpx; color: #999; text-align: center; }
</style>