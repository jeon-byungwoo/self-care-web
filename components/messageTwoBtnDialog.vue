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
            <div class="bold-text">{{ message }}</div>
          </div>
        </div>
        <div class="btn-area">
          <div class="cancel-btn" @click="closeAction">취소</div>
          <div class="done-btn" @click="sendData">확인</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'howToView',
  props: ['message', 'dialogType'],
  data() {
    return {}
  },
  methods: {
    preClick() {},
    closeAction() {
      this.$emit('closeAction', 'messageTwoDialog')
    },
    sendData() {
      this.$emit('sendData', 'messageTwoDialog', this.dialogType)
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
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

  /* 임시 지정 */
  width: 500px;
  height: auto;
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
    color: #333333;
    font-size: 24px;
    font-family: 'score2';
  }
}

.btn-area {
  display: flex;
  margin: 40px 20px;
  .cancel-btn {
    flex: 1;
    border: 1px solid #ddd;
    background-color: #fff;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #333;
    font-size: 18px;
    font-family: 'score5';
  }
  .done-btn {
    flex: 1;
    background-color: #9ad144;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    font-family: 'score5';
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
    display: flex;
    flex-direction: column;

    /* 임시 지정 */
    width: 80%;
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
    width: 50px;
    height: 50px;
    margin-top: 30px;
  }
  .info-area {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .first-text-area {
      display: flex;
      .bold-text {
        color: #333333;
        font-size: 16px;
        font-family: 'score6';
      }
    }

    .text {
      color: #333333;
      font-size: 16px;
      font-family: 'score2';
    }
  }

  .btn-area {
    display: flex;
    margin-bottom: 20px;
    margin-top: 40px;
    .cancel-btn {
      flex: 1;
      border: 1px solid #ddd;
      background-color: #fff;
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #333;
      font-size: 18px;
      font-family: 'score5';
    }
    .done-btn {
      flex: 1;
      background-color: #9ad144;
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      cursor: pointer;
      color: #fff;
      font-size: 18px;
      font-family: 'score5';
    }
  }
}
</style>
