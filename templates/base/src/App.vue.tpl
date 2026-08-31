<script>
  export default {
    onLaunch() {
      console.log('App Launch')
    },
    onShow() {
      console.log('App Show')
    },
    onHide() {
      console.log('App Hide')
    },
  }
</script>

<style lang="${cssExt}">
  /* 全局公共样式 */
  page {
    background-color: #f5f6f7;
    color: #333;
  }

  button::after {
    border: none;
  }
</style>