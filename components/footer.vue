<template>
  <div>
    Footer
    <div class="main_footer">
      <div class="left">left text</div>
      <div class="middle">test</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.main_footer {
  .left {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle {
    width: 1080px;
    height: 300px;
    margin: auto;
  }
  width: 100%;
}
</style>
