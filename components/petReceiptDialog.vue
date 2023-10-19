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
          <div class="btn-done" @click="closeAction">확인</div>
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
    closeAction() {
      this.$emit('closeAction', true)
    },
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

    /* 임시 지정 */
    width: 90%;
    height: auto;
    border-radius: 30px;
    padding: 0px 20px;
  }
  .img-area {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-img {
    width: 60px;
    height: 60px;
    margin-top: 20px;
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
        font-size: 22px;
        font-family: 'score6';
      }
    }

    .text {
      color: #666;
      font-size: 14px;
      font-family: 'score2';
      margin-top: 20px;
      text-align: center;
      word-break: keep-all;
    }
  }

  .btn-area {
    margin-top: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-done {
      width: 100%;
      height: 72px;
      background-color: #9ad144;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 20px;
      font-family: 'score5';
      cursor: pointer;
      margin-bottom: 20px;
    }
  }
}
</style>
