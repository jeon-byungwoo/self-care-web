<template>
  <div class="login-group">
    <div class="login-child-group">
      <div class="child-area">
        <a>아이디</a>
        <div class="id-area">
          <input
            class="id"
            value=""
            type="email"
            placeholder="이메일 입력"
            autocomplete="off"
            data-gtm-form-interact-field-id="0"
          />
        </div>
        <a style="margin-top: 20px">비밀번호</a>
        <div class="pw-area">
          <input
            class="pw"
            type="password"
            placeholder="비밀번호 입력"
            autocomplete="off"
          />
        </div>
        <div class="login-save">
          <input type="checkbox" id="myCheckbox" name="myCheckbox" />
          <label for="myCheckbox">아이디 저장</label>
        </div>

        <div class="login-btn">Login</div>

        <div class="login-sns">
          <img
            class="img-sns"
            src="https://www.mypuzzle.co.kr/resources/images/common/icn_kakao_48.png"
            alt
          />
          <img
            class="img-sns"
            :style="{ 'margin-left': '24px;' }"
            src="https://www.mypuzzle.co.kr/resources/images/common/icn_naver_48.png"
            alt
          />
          <img
            class="img-sns"
            :style="{ 'margin-left': '24px;' }"
            src="https://www.mypuzzle.co.kr/resources/images/common/icn_apple_48.png"
            alt
          />
        </div>

        <div class="utill_div">
          <div class="utill_text">아이디 찾기</div>
          <div class="utill_line"></div>
          <div class="utill_text">비밀번호 찾기</div>
          <div class="utill_line"></div>
          <div class="utill_text">회원가입</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.login-group {
  width: 100%;
  max-width: 1080px;
  min-width: 960px;
  margin: auto;
  height: 100vh;
  .login-child-group {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .child-area {
      width: 420px;
      display: flex;
      flex-direction: column;
      .id-area {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        border-width: 1px;
        border-radius: 8px;
        background-color: #f7f7f7;
        margin-top: 4px;
      }

      .id {
        width: 100%;
        height: 48px;
        vertical-align: middle;
        background: #f7f7f7;
        border: 1px solid transparent;
        color: #000;
        letter-spacing: -0.6px;
        border-radius: 6px;
        font-weight: 900;
        font-size: 16px;
        padding: 12px;
        background: url('https://static.thenounproject.com/png/101791-200.png')
          no-repeat right;
        background-size: 20px;
      }
      .pw-area {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        border-width: 1px;
        border-radius: 8px;
        background-color: #f7f7f7;
        margin-top: 4px;
      }
      .pw {
        width: 100%;
        height: 48px;
        vertical-align: middle;
        background: #f7f7f7;
        border: 1px solid transparent;
        color: #000;
        letter-spacing: -0.6px;
        border-radius: 6px;
        font-weight: 900;
        font-size: 16px;
        padding: 12px;
      }
      .login-save {
        display: block;
        width: 100%;
        flex-direction: row;
        margin-top: 20px;
      }
      input[type='checkbox'] + label {
        display: flex;
        width: 150px;
        height: 24px;
        padding-left: 30px;
        align-items: center;
        background: url('https://www.mypuzzle.co.kr/resources/images/chk_icon.png')
          no-repeat 0 0px / contain;
      }

      input[type='checkbox']:checked + label {
        background: url('https://www.mypuzzle.co.kr/resources/images/chk_icon_on.png')
          no-repeat 0 0px / contain;
      }

      input[type='checkbox'] {
        display: none;
      }

      label {
        font: 1rem 'Fira Sans', sans-serif;
      }
      .login-btn {
        display: flex;
        width: 100%;
        height: 56px;
        margin-top: 50px;
        border-radius: 8px;
        background-color: #5b1a7c;
        font-size: 18px;
        font-weight: bold;
        color: white;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .login-sns {
        margin-top: 36px;
        display: flex;
        justify-content: center;
      }
      .img-sns {
        width: 48px;
        height: 48px;
        cursor: pointer;
      }
      .utill_div {
        display: flex;
        margin-top: 36px;
        justify-content: center;
      }
      .utill_text {
        color: #555555;
        font-size: 14px;
        cursor: pointer;
      }
      .utill_line {
        color: #d0d0d0;
        width: 2px;
        height: 10px;
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }
}
</style>
