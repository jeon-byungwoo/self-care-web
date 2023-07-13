<template>
  <div class="main-warper">
    <div class="main-warper-group">
      <div>
        <div class="buttons">AI 건강 설문하기</div>
        <div class="buttons" style="margin-top: 20px">전문가와 상담하기</div>
      </div>
      <div class="content">
        간단한 맞춤 설문으로 나에게 꼭 맞는 영양성분을<br />추천 받아보세요.
      </div>
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
  padding-top: 100px;
  padding-bottom: 100px;
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
  }
  .content {
    font-size: 30px;
    margin-left: 20px;
  }
}
</style>
