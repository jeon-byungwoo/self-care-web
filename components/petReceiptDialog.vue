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
            <div class="bold-text">접수가 완료되었습니다.</div>
          </div>
          <div class="text">
            접수하신 내용을 통해 딱 맞는 견적을 전달드리겠습니다.
          </div>
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

  /* 임시 지정 */
  width: 500px;
  height: 400px;
  border-radius: 30px;
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
    color: #666;
    font-size: 16px;
    font-family: 'score2';
    margin-top: 20px;
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
</style>
