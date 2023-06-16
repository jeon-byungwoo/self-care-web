<template>
  <div class="main-warper">
    <div class="main-warper-group">
      <div class="main-warper-group-guide">
        <div>
          <a class="title">나만의 맞춤 영양제<br />구독하고 싶다면?</a>
        </div>
        <div style="margin-top: 40px">
          <a class="guide-cursor">구독 서비스 이용가이드 ></a>
        </div>
      </div>
      <div>
        <div>
          <img
            class="main-warper-image-guide"
            src="https://www.mypuzzle.co.kr/resources/images/main/guide_btn_01.png"
          />
        </div>
        <div style="margin-top: 30px">
          <img
            class="main-warper-image-guide"
            src="https://www.mypuzzle.co.kr/resources/images/main/guide_btn_02.png"
          />
        </div>
        <div style="margin-top: 30px">
          <img
            class="main-warper-image-guide"
            src="https://www.mypuzzle.co.kr/resources/images/main/guide_btn_03.png"
          />
        </div>
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
  }
  .main-warper-group-guide {
    flex: 1;

    .title {
      font-size: 30px;
      font-weight: bold;
    }
    .guide-cursor {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .main-warper-image-guide {
    cursor: pointer;
  }
}
</style>
