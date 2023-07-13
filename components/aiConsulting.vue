<template>
  <div class="main-warper">
    <div class="main-warper-group">
      <div style="margin-left: 20px">
        <div class="title">
          123456명이<br />맞춤으로 필요한 영양 성분을 확인했어요
        </div>
        <div class="content">
          오직 self-care에서만 간단한 설문을 통해 AI가 추천해주는<br />유용한
          정보를 제공해요.
        </div>
      </div>

      <div class="buttons">AI 건강 설문하기</div>
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
  padding-top: 200px;
  padding-bottom: 200px;
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
