<template>
  <div class="background">
    <div class="window">
      <div class="popup">
        <div class="title-close-area">
          <div class="title-text">제휴 및 입점 문의</div>
          <img
            class="close-btn"
            draggable="false"
            src="@/assets/image/ic_dialog_close.png"
            @click="closeAction"
          />
        </div>

        <div class="remains-area">
          <div class="coalition-area">
            <select>
              <option>제휴문의</option>
              <option>입점문의</option>
            </select>
            <img class="right-arrow" src="@/assets/image/ic_down_arrow.png" />
          </div>

          <div class="company-phone-area">
            <input
              class="company-phone"
              placeholder="업체명/담당자 혹은 이름을 입력하세요."
            />
            <input class="company-phone" placeholder="연락처" />
          </div>

          <div class="pw-area">
            <textarea
              v-model="nowPw"
              class="pw"
              type="text"
              placeholder="문의하실 내용을 작성하세요."
            ></textarea>
          </div>

          <div class="first-check-box">
            <input type="checkbox" id="myCheck" />
            <label for="myCheck">개인정보 수집에 동의 합니다.</label>
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
  data() {
    return {
      nowPw: '',
      newPw: '',
      confirmPw: '',
    }
  },
  methods: {
    closeAction() {
      this.$emit('closeAction', true)
    },
    sendData() {
      this.$emit('sendData', this.nowPw, this.newPw, this.confirmPw)
      //   console.log(this.nowPw, this.newPw, this.confirmPw)
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
  width: 1000px;
  height: 867px;
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
    height: 767px;
    padding: 40px 50px 50px 50px;
    background-color: #f6f6f6;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;

    .coalition-area {
      width: 309px;
      height: 60px;
      border: 1px solid #ddd;
      background-color: #fff;
      display: flex;
      align-items: center;
      position: relative;
      select {
        width: 100%;
        height: 100%;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        font-family: 'score2';
        font-size: 16px;
        color: #000;
        background-color: #fff;
        outline: none;
        padding-left: 20px;
      }
      .right-arrow {
        position: absolute;
        width: 16.75px;
        height: 9.76px;
        right: 20px;
        -webkit-transform: rotate(270deg);
        -moz-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        -o-transform: rotate(270deg);
        transform: rotate(270deg);
      }
    }
    .company-phone-area {
      display: flex;
      margin-top: 20px;
      * + * {
        margin-left: 20px;
      }
      .company-phone {
        border: 1px solid #ddd;
        background-color: #fff;
        flex: 1;
        height: 60px;
        padding: 20px;
      }
    }
    .review-contents-text {
      color: #333;
      font-size: 18px;
      font-family: 'score5';
      margin-top: 30px;
    }
    .pw-area {
      margin-top: 20px;
      width: 100%;
      height: 330px;
      display: flex;
    }
    .pw {
      width: 100%;
      height: 100%;
      vertical-align: top;
      text-align: start;
      border: 1px solid #dddddd;
      background-color: #fff;
      color: #333;
      letter-spacing: -0.6px;
      border-radius: 1px;
      font-size: 16px;
      font-family: 'score2';
      padding: 20px;
      word-wrap: break-word;
      word-break: break-word;
    }
    .first-check-box {
      width: 100%;
      margin-top: 20px;
    }
    input[type='checkbox'] + label {
      display: inline-block;
      cursor: pointer;
      line-height: 24px;
      padding-left: 29px;
      font-family: 'score6';
      font-size: 16px;
      color: #333333;
      background: url('@/assets/image/ic_check_box_off.png') left/24px no-repeat;
    }

    input[type='checkbox']:checked + label {
      background: url('@/assets/image/ic_check_box_on.png') no-repeat 0 0px /
        contain;
    }

    input[type='checkbox'] {
      display: none;
    }
    .btn-area {
      display: flex;
      margin-top: 51px;
      padding: 0px 126px;
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
  }
}
</style>
