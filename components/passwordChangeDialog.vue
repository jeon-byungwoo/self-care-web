<template>
  <div class="background">
    <div class="window">
      <div class="popup">
        <div class="title-close-area">
          <div class="title-text">비밀번호 변경</div>
          <img
            class="close-btn"
            draggable="false"
            src="@/assets/image/ic_dialog_close.png"
            @click="closeAction"
          />
        </div>

        <div class="remains-area">
          <div class="pw-area">
            <input
              v-model="nowPw"
              class="pw"
              type="password"
              placeholder="현재 사용중인 비밀번호를 입력 해주세요."
              autocomplete="off"
            />
          </div>
          <div :class="message == 1 ? 'error-text' : 'not-error-text'">
            현재 비밀번호를 확인해주세요.
          </div>
          <div class="pw-area">
            <input
              v-model="newPw"
              class="pw"
              type="password"
              placeholder="비밀번호를 입력 해주세요."
              autocomplete="off"
            />
          </div>

          <div class="pw-area">
            <input
              v-model="confirmPw"
              class="pw"
              type="password"
              placeholder="비밀번호 확인을 위해 한번 더 입력 해주세요."
              autocomplete="off"
            />
          </div>

          <div :class="pwCheckValue == 2 ? 'error-text' : 'not-error-text'">
            새로운 비밀번호를 확인해주세요.
          </div>

          <div class="btn-area">
            <div class="cancel-btn" @click="closeAction">취소</div>
            <div class="done-btn" @click="sendData">확인</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'howToView',
  props: ['message'],
  data() {
    return {
      nowPw: '',
      newPw: '',
      confirmPw: '',
      pwCheckValue: 0, //0 - none, 1 - success, 2 - fail
      currentPwCheck: this.message,
    }
  },
  methods: {
    preClick() {},
    closeAction() {
      this.$emit('closeAction', 'pw')
    },
    sendData() {
      if (
        this.nowPw.length != 0 &&
        this.newPw.length != 0 &&
        this.confirmPw.length != 0
      ) {
        let result = this.pwCheck()
        console.log(result)
        if (result == true) {
          console.log('bb')
          this.$emit('sendData', this.nowPw, this.newPw, this.confirmPw)
        }
      }
    },

    pwCheck() {
      console.log('aa', this.newPw, this.confirmPw)
      if (this.newPw != this.confirmPw) {
        this.pwCheckValue = 2
        return false
      } else {
        this.pwCheckValue = 1
        return true
      }
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
  height: 450px;
  border-radius: 30px;
  .title-close-area {
    display: flex;
    align-items: center;
    padding: 0px 30px;
    height: 100px;
    background-color: #fff;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    .title-text {
      flex: 1;
      font-size: 28px;
      font-family: 'score8';
      color: #333;
    }
    .close-btn {
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }
  .remains-area {
    height: 350px;
    padding: 30px;
    background-color: #f6f6f6;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    * + * {
      margin-top: 10px;
    }
    .pw-area {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
    }
    .pw {
      width: 100%;
      height: 60px;
      vertical-align: middle;
      border: 1px solid #dddddd;
      background-color: #fff;
      color: #999999;
      letter-spacing: -0.6px;
      border-radius: 1px;
      font-size: 16px;
      font-family: 'score2';
      padding: 12px;
    }
    .not-error-text {
      display: none !important;
    }
    .error-text {
      display: block;
      color: #ff0000;
      font-size: 12px;
      font-family: 'score2';
    }
    .btn-area {
      display: flex;
      .cancel-btn {
        flex: 1;
        border: 1px solid #ddd;
        background-color: #fff;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
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
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

    /* 임시 지정 */
    width: 90%;
    height: auto;
    border-radius: 30px;
    .title-close-area {
      display: flex;
      align-items: center;
      padding: 20px 10px;
      height: auto;
      background-color: #fff;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      .title-text {
        flex: 1;
        font-size: 22px;
        font-family: 'score8';
        color: #333;
      }
      .close-btn {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
    .remains-area {
      height: auto;
      padding: 10px;
      background-color: #f6f6f6;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      * + * {
        margin-top: 10px;
      }
      .pw-area {
        width: 100%;
        height: 55px;
        display: flex;
        align-items: center;
      }
      .pw {
        width: 100%;
        height: 55px;
        vertical-align: middle;
        border: 1px solid #dddddd;
        background-color: #fff;
        color: #999999;
        letter-spacing: -0.6px;
        border-radius: 1px;
        font-size: 16px;
        font-family: 'score2';
        padding: 12px;
      }
      .btn-area {
        display: flex;
        margin-bottom: 10px;
        .cancel-btn {
          flex: 1;
          border: 1px solid #ddd;
          background-color: #fff;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
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
  }
}
</style>
