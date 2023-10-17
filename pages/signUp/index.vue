<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div :class="navigationStatus == false ? 'main' : 'mobile-main'">
      <div class="body">
        <div class="title">회원가입</div>
        <div class="input-group">
          <div class="title-area">이름</div>
          <input class="input-area" placeholder="이름을 입력해 주세요." />
        </div>

        <div class="input-group">
          <div class="title-area">연락처</div>
          <input class="input-area" placeholder="연락처를 입력해 주세요." />
        </div>

        <div class="input-group">
          <div class="title-area">거주지역</div>
          <div class="input-half-group">
            <div class="left-group">
              <div>
                <select>
                  <option value="">시/도</option>
                  <option>가</option>
                  <option>나</option>
                  <option>다</option>
                </select>
              </div>
            </div>
            <div class="right-group">
              <select>
                <option value="">군/구</option>
                <option>가</option>
                <option>나</option>
                <option>다</option>
              </select>
            </div>
          </div>
        </div>
        <div class="input-group">
          <div class="input-half-group">
            <div class="left-group">
              <div class="title-area">출생년도</div>
              <select>
                <option value="">선택</option>
                <option>가</option>
                <option>나</option>
                <option>다</option>
              </select>
            </div>
            <div class="right-group">
              <div class="title-area">성별</div>
              <select>
                <option value="">선택</option>
                <option>남</option>
                <option>여</option>
              </select>
            </div>
          </div>
        </div>
        <div class="input-group">
          <div class="title-area">성별</div>
          <select>
            <option value="">다음 중 하나를 선택하세요</option>
            <option>가</option>
            <option>나</option>
            <option>다</option>
          </select>
        </div>
        <div class="input-group">
          <div class="title-area">이메일</div>
          <input class="input-area" placeholder="이메일을 입력해 주세요." />
        </div>

        <div class="input-group">
          <div class="title-area">비밀번호</div>
          <input class="input-area" placeholder="비밀번호를 입력해 주세요." />
        </div>

        <div class="input-group">
          <div class="title-area">비밀번호 확인</div>
          <input
            class="input-area"
            placeholder="비밀번호 확인을 위해 한번 더 입력 해주세요."
          />
        </div>

        <div class="check-box-group">
          <div class="first-check-box">
            <input type="checkbox" id="myCheck1" />
            <label for="myCheck1">만 14세 이상입니다.(필수)</label>
          </div>
          <div class="first-check-box">
            <input type="checkbox" id="myCheck2" />
            <label for="myCheck2">이용약관 동의(필수)</label>
          </div>
          <div class="first-check-box">
            <input type="checkbox" id="myCheck3" />
            <label for="myCheck3">개인정보 처리방침 동의(필수)</label>
          </div>
        </div>

        <div class="done-group">
          <div class="btn-done">회원가입 완료</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
  },
  data() {
    return {
      navigationStatus: false,
      items11: ['a', 'a', 'a', 'a', 'a'],
    }
  },
  methods: {
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 0px;
  width: 100%;
  .body {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding-top: 100px;
    padding-bottom: 100px;
    .title {
      font-family: 'score7';
      font-size: 36px;
      color: #333333;
      text-align: center;
    }
    .input-group {
      margin-top: 50px;
      .input-half-group {
        display: flex;
        flex-direction: row;
        .left-group {
          flex: 1;
        }
        .right-group {
          flex: 1;
          margin-left: 10px;
        }
      }
      .title-area {
        font-family: 'score5';
        font-size: 16px;
        color: #333333;
      }
      .input-area {
        width: 100%;
        border-bottom: 1px solid #dddddd;
        color: #333;
        font-size: 14px;
        font-family: 'score2';
        vertical-align: baseline;
        padding: 10px 0px;
        margin-top: 21px;
        outline: none;
      }
      .select-area {
        width: 100%;
        height: 100%;
        display: inline-block;
        border: 1px solid darkgray;
        width: 100px;
        background: url('@/assets/image/ic_down_arrow.png') no-repeat 10px 10px;
        position: relative;
      }
      select {
        width: 100%;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        font-family: 'score2';
        font-size: 14px;
        color: #333;
        background-color: #fff;
        border-bottom: 1px solid #aaa;
        padding: 0.6em 1.4em 0.5em 0em;
        margin: 0;
        margin-top: 21px;
        outline: none;
      }
      label {
        font-family: 'score2';
        font-size: 14px;
        line-height: 1.3;
        color: #444;
        margin-right: 0.5em;
      }
    }
    .check-box-group {
      width: 100%;
      margin-top: 10px;
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
        background: url('@/assets/image/ic_check_box_off.png') left/24px
          no-repeat;
      }

      input[type='checkbox']:checked + label {
        background: url('@/assets/image/ic_check_box_on.png') no-repeat 0 0px /
          contain;
      }

      input[type='checkbox'] {
        display: none;
      }
    }
    .done-group {
      margin-top: 70px;
      width: 100%;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn-done {
        width: 324px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #333333;
        color: #fff;
        font-family: 'score6';
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 720px) {
  .mobile-main {
    height: 100%;
  }
  .main {
    margin-top: 0px;
    width: 100%;
    .body {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 40px 20px;
      .title {
        font-family: 'score7';
        font-size: 30px;
        color: #333333;
        text-align: center;
      }
      .input-group {
        margin-top: 50px;
        .input-half-group {
          display: flex;
          flex-direction: row;
          .left-group {
            flex: 1;
          }
          .right-group {
            flex: 1;
            margin-left: 10px;
          }
        }
        .title-area {
          font-family: 'score5';
          font-size: 16px;
          color: #333333;
        }
        .input-area {
          width: 100%;
          border-bottom: 1px solid #dddddd;
          color: #333;
          font-size: 14px;
          font-family: 'score2';
          vertical-align: baseline;
          padding: 10px 0px;
          margin-top: 21px;
          outline: none;
        }
        .select-area {
          width: 100%;
          height: 100%;
          display: inline-block;
          border: 1px solid darkgray;
          width: 100px;
          background: url('@/assets/image/ic_down_arrow.png') no-repeat 10px
            10px;
          position: relative;
        }
        select {
          width: 100%;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          font-family: 'score2';
          font-size: 14px;
          color: #333;
          background-color: #fff;
          border-bottom: 1px solid #aaa;
          padding: 0.6em 1.4em 0.5em 0em;
          margin: 0;
          margin-top: 21px;
          outline: none;
        }
        label {
          font-family: 'score2';
          font-size: 14px;
          line-height: 1.3;
          color: #444;
          margin-right: 0.5em;
        }
      }
      .check-box-group {
        width: 100%;
        margin-top: 10px;
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
          background: url('@/assets/image/ic_check_box_off.png') left/24px
            no-repeat;
        }

        input[type='checkbox']:checked + label {
          background: url('@/assets/image/ic_check_box_on.png') no-repeat 0 0px /
            contain;
        }

        input[type='checkbox'] {
          display: none;
        }
      }
      .done-group {
        margin-top: 40px;
        width: 100%;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        .btn-done {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #333333;
          color: #fff;
          font-family: 'score6';
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
