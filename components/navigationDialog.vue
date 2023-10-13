<template>
  <div class="background">
    <div class="window">
      <div class="popup">
        <div class="img-area">
          <img
            class="icon-img"
            src="@/assets/image/ic_popup_danger.png"
            draggable="false"
          />
        </div>
        <div class="info-area">
          <div class="first-text-area">
            <div class="bold-text">건강체크</div>
            <div class="text">는 3개월 이내에 추가로</div>
          </div>
          <div class="text" :style="'margin-top:12px'">진행할 수 없습니다.</div>
        </div>
        <div class="btn-area">
          <div class="btn-done" @click="$router.go(-1)">확인</div>
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
@media (max-width: 720px) {
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }
  .window {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .popup {
    background-color: #ffffff;

    /* 임시 지정 */
    width: 100%;
    height: 100%;
  }
  .img-area {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-img {
    width: 70px;
    height: 70px;
    margin-top: 50px;
  }
  .info-area {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .first-text-area {
      display: flex;
      .bold-text {
        color: #333333;
        font-size: 24px;
        font-family: 'score6';
      }
    }

    .text {
      color: #333333;
      font-size: 24px;
      font-family: 'score2';
    }
  }

  .btn-area {
    margin-top: 46px;

    display: flex;
    align-items: center;
    justify-content: center;
    .btn-done {
      width: 300px;
      height: 72px;
      background-color: #9ad144;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 20px;
      font-family: 'score5';
      cursor: pointer;
    }
  }
}
</style>
