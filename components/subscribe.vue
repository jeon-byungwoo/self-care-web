<template>
  <div class="main-warper">
    <div class="main-warper-group">
      <img style="background-color: aqua; width: 120px; height: 120px" />
      <div style="margin-left: 20px">
        <div class="title">셀프케어 뉴스레터 구독 신청</div>
        <div class="content">새로운 건강식품 관련 정보를 받아보세요.</div>
      </div>

      <div class="buttons">무료 구독하기</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'howToView',
  data() {
    return {}
  },
  methods: {
    preClick() {},
  },
}
</script>

<style lang="scss" scoped>
.main-warper {
  width: 100%;
  max-width: 1080px;
  min-width: 980px;
  margin: auto;
  padding-top: 40px;
  padding-bottom: 40px;
  .main-warper-group {
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
    align-items: center;
  }
  .buttons {
    cursor: pointer;
    border-radius: 8px;
    padding: 12px 40px;
    background: #707070;
    text-align: center;
    margin-left: 20px;
  }
  .title {
    font-size: 40px;
  }
  .content {
    font-size: 20px;
    margin-top: 20px;
  }
}
</style>
