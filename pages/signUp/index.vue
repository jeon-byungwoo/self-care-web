<template>
  <div>
    <div id="snackbar">빈 항목을 확인해 주세요.</div>
    <Header @update="onChildUpdate"> </Header>
    <messageOneBtnDialog
      v-if="messageOneBtnDialogStatus"
      @closeAction="dialogClose"
      message="회원가입이 정상적으로 진행되었습니다."
    ></messageOneBtnDialog>
    <div :class="navigationStatus == false ? 'main' : 'mobile-main'">
      <div class="body">
        <div class="title">회원가입</div>
        <div class="input-group">
          <div class="title-area">이름</div>
          <input
            class="input-area"
            placeholder="이름을 입력해 주세요."
            v-model="name"
          />
        </div>

        <div class="input-group">
          <div class="title-area">연락처</div>
          <input
            class="input-area"
            placeholder="연락처를 입력해 주세요."
            v-model="phone"
          />
        </div>

        <div class="input-group">
          <div class="title-area">거주지역</div>
          <div class="input-half-group">
            <div class="left-group">
              <div>
                <select v-model="city">
                  <option value="">시/도</option>
                  <option>가</option>
                  <option>나</option>
                  <option>다</option>
                </select>
              </div>
            </div>
            <div class="right-group">
              <select v-model="region">
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
              <select v-model="birth">
                <option value="">선택</option>
                <option>가</option>
                <option>나</option>
                <option>다</option>
              </select>
            </div>
            <div class="right-group">
              <div class="title-area">성별</div>
              <select v-model="gender">
                <option value="">선택</option>
                <option>남</option>
                <option>여</option>
              </select>
            </div>
          </div>
        </div>
        <!-- <div class="input-group">
          <div class="title-area">성별</div>
          <select>
            <option value="">다음 중 하나를 선택하세요</option>
            <option>가</option>
            <option>나</option>
            <option>다</option>
          </select>
        </div> -->
        <div class="input-group">
          <div class="title-area">이메일</div>
          <input
            class="input-area"
            placeholder="이메일을 입력해 주세요."
            v-model="email"
          />
          <div :class="emailCheckValue == 2 ? 'error-text' : 'not-error-text'">
            이미 존재하는 이메일입니다.
          </div>
        </div>

        <div class="input-group" v-if="token.length == 0">
          <div class="title-area">비밀번호</div>
          <input
            class="input-area"
            placeholder="비밀번호를 입력해 주세요."
            v-model="pw"
            type="password"
          />
        </div>

        <div class="input-group" v-if="token.length == 0">
          <div class="title-area">비밀번호 확인</div>
          <input
            class="input-area"
            placeholder="비밀번호 확인을 위해 한번 더 입력 해주세요."
            v-model="pwConfirm"
            type="password"
          />
          <div :class="pwCheckValue == 2 ? 'error-text' : 'not-error-text'">
            비밀번호를 확인해주세요.
          </div>
        </div>

        <div class="check-box-group">
          <div class="first-check-box">
            <input type="checkbox" id="myCheck1" v-model="check1" />
            <label for="myCheck1">만 14세 이상입니다.(필수)</label>
          </div>
          <div class="first-check-box">
            <input type="checkbox" id="myCheck2" v-model="check2" />
            <label for="myCheck2">이용약관 동의(필수)</label>
          </div>
          <div class="first-check-box">
            <input type="checkbox" id="myCheck3" v-model="check3" />
            <label for="myCheck3">개인정보 처리방침 동의(필수)</label>
          </div>
        </div>

        <div class="done-group">
          <div
            class="btn-done"
            @click="token.length > 0 ? socialSignUpDone() : signUpDone()"
          >
            회원가입 완료
          </div>
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
      messageOneBtnDialogStatus: false,
      navigationStatus: false,
      name: '',
      phone: '',
      city: '',
      region: '',
      birth: '',
      gender: '',
      email: '',
      emailCheckValue: 0, // 0 - none, 1 - success, 2 - fail
      pw: '',
      pwConfirm: '',
      pwCheckValue: 0, // 0 - none, 1 - success, 2 - fail
      token: '',
      type: '이메일',
      check1: false,
      check2: false,
      check3: false,
    }
  },
  created() {
    if (this.$route.params.token != undefined) {
      this.token = '' + this.$route.params.token
      this.type = this.$route.params.type
      if (this.$route.params.email.length > 0) {
        this.email = this.$route.params.email
      }
    }
  },
  methods: {
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
    showToast() {
      var x = document.getElementById('snackbar')
      x.className = 'show'
      setTimeout(function () {
        x.className = x.className.replace('show', '')
      }, 2000)
    },
    dialogClose(dialogType) {
      console.log('action', dialogType)
      if (dialogType == 'messageDialog') {
        this.messageOneBtnDialogStatus = false
        this.$router.replace({ name: 'index' })
      }
    },
    async socialSignUpDone() {
      if (
        this.lengthCheck(this.name) &&
        this.lengthCheck(this.phone) &&
        this.lengthCheck(this.city) &&
        this.lengthCheck(this.region) &&
        this.lengthCheck(this.birth) &&
        this.lengthCheck(this.gender) &&
        this.lengthCheck(this.email) &&
        this.booleanCheck(this.check1) &&
        this.booleanCheck(this.check2) &&
        this.booleanCheck(this.check3)
      ) {
        let req = await this.emailCheck()
        if (req == false) {
          return
        }
        let obj = {
          table: 'user',
          name: this.name,
          phone: this.phone,
          city: 1,
          town: 1,
          birth: this.birth,
          gender: this.gender == '남' ? 0 : 1,
          email: this.email,
          token: this.token,
          type: this.type,
        }
        try {
          await this.$axios
            .post('/api/insert', obj)
            .then((res) => {
              console.log('인서트 결과값:: ', JSON.stringify(res.data))
              console.log(res.data.length)
              if (res.data.length > 0) {
                localStorage.removeItem('userInfo')
                let userInfo = {
                  no: res.data[0].no,
                  type: res.data[0].type,
                  email: res.data[0].email,
                  gender: res.data[0].gender,
                  token: res.data[0].token,
                  name: res.data[0].name,
                  phone: res.data[0].phone,
                  email: res.data[0].email,
                  status: res.data[0].status,
                }
                localStorage.setItem('loginStatus', true)
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                this.messageOneBtnDialogStatus = true
              }
            })
            .catch(function (error) {
              console.log('에러!!', err)
            })
        } catch (err) {
          console.log('err!! : ' + err)
        }
      } else {
        console.log('false1234')
        this.showToast()
        // console.log(this.emailCheck())
      }
    },
    async signUpDone() {
      if (
        this.lengthCheck(this.name) &&
        this.lengthCheck(this.phone) &&
        this.lengthCheck(this.city) &&
        this.lengthCheck(this.region) &&
        this.lengthCheck(this.birth) &&
        this.lengthCheck(this.gender) &&
        this.lengthCheck(this.email) &&
        this.lengthCheck(this.pw) &&
        this.lengthCheck(this.pwConfirm) &&
        this.booleanCheck(this.check1) &&
        this.booleanCheck(this.check2) &&
        this.booleanCheck(this.check3)
      ) {
        let req = await this.emailCheck()
        let req1 = this.pwCheck()
        if (req == false) {
          return
        } else if (req1 == false) {
          return
        }
        let obj = {
          table: 'user',
          name: this.name,
          phone: this.phone,
          city: 1,
          town: 1,
          birth: this.birth,
          gender: this.gender == '남' ? 0 : 1,
          email: this.email,
          pw: this.pw,
          type: this.type,
        }
        try {
          await this.$axios
            .post('/api/insert', obj)
            .then((res) => {
              console.log('인서트 결과값:: ', JSON.stringify(res.data))
              console.log(res.data.length)
              if (res.data.length > 0) {
                localStorage.removeItem('userInfo')
                let userInfo = {
                  no: res.data[0].no,
                  email: res.data[0].email,
                  type: res.data[0].type,
                  gender: res.data[0].gender,
                  token: res.data[0].token,
                  name: res.data[0].name,
                  phone: res.data[0].phone,
                  email: res.data[0].email,
                  status: res.data[0].status,
                }
                localStorage.setItem('loginStatus', true)
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                this.messageOneBtnDialogStatus = true
              }
            })
            .catch(function (error) {
              console.log('에러!!', err)
            })
        } catch (err) {
          console.log('err!! : ' + err)
        }
      } else {
        console.log('false')
        this.showToast()
        // console.log(this.emailCheck())
      }
    },
    emailCheck() {
      return new Promise((resolve, reject) => {
        if (this.email.length > 0) {
          let obj = [{ table: 'user' }]
          let conditions = [{ q: '=', f: 'email', v: this.email }]
          let formBody = {
            table: 'user',
            conditions: conditions,
          }
          console.log('obj : ', formBody)
          try {
            this.$axios
              .post('/api/select', formBody)
              .then((res) => {
                console.log('인서트 결과값:: ', JSON.stringify(res.data))
                if (res.data.length > 0) {
                  this.emailCheckValue = 2
                  resolve(false)
                } else {
                  this.emailCheckValue = 1
                  resolve(true)
                }
              })
              .catch(function (error) {
                console.log('에러!!', err)
              })
          } catch (err) {
            console.log('err!! : ' + err)
          }
        }
      })
    },
    async pwCheck() {
      if (this.pw != this.pwConfirm) {
        this.pwCheckValue = 2
        return false
      } else {
        this.pwCheckValue = 1
        return true
      }
    },
    lengthCheck(param) {
      return param.length != 0
    },
    booleanCheck(param) {
      return param != false
    },
  },
}
</script>

<style lang="scss" scoped>
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1001;
  left: 50%;
  top: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
.not-error-text {
  display: none;
}
.error-text {
  display: block;
  color: #ff0000;
  font-size: 12px;
  font-family: 'score2';
}
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
  #snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    top: 80px;
    font-size: 17px;
  }

  #snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  .mobile-main {
    height: 100%;
  }
  .not-error-text {
    display: none;
  }
  .error-text {
    display: block;
    color: #ff0000;
    font-size: 12px;
    font-family: 'score2';
    margin-top: 10px;
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
