<template>
  <div>
    <div id="snackbar">{{ snackbarMessage }}</div>
    <div class="login-group">
      <div class="login-child-group">
        <div class="logo-area">
          <img
            class="logo"
            src="../assets/image/login-logo.png"
            draggable="false"
            @click="logoClick"
          />
        </div>
        <div class="child-area">
          <div class="id-area">
            <input
              class="id"
              value=""
              type="email"
              placeholder="이메일"
              autocomplete="off"
              data-gtm-form-interact-field-id="0"
              v-model="email"
            />
          </div>
          <div class="pw-area">
            <input
              class="pw"
              type="password"
              placeholder="비밀번호"
              autocomplete="off"
              v-model="pw"
            />
          </div>

          <div class="login-btn" @click="loginClick">로그인</div>

          <div class="utill_div">
            <div class="utill_text">비밀번호 찾기</div>
            <div class="utill_line"></div>
            <div class="utill_text" @click="signUpClick">회원가입</div>
          </div>

          <div class="login-sns">
            <div class="sns-kakao" v-on:click="kakaoLoginBtn">
              <img
                class="img-sns"
                src="@/assets/image/ic_kakao.png"
                alt
                draggable="false"
              />
              <div class="sns-kakao-text">카카오톡 로그인</div>
            </div>

            <div class="sns-naver" v-on:click="naverLoginBtn">
              <img
                class="img-sns"
                src="@/assets/image/ic_naver.png"
                alt
                draggable="false"
              />
              <div class="sns-naver-text" id="parentValue">네이버 로그인</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    head: {
    script: [
      { src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js' },
      { src: 'https://developers.kakao.com/sdk/js/kakao.min.js' }
    ]
  },
  name: 'LoginLayout',
  data() {
    return {
      email: '',
      pw: '',
      naverClientId: 'n_Jfo39bgxlZcWQcQhYf',
      clientSecret: '8nfsmd6vRH',
      callbackUrl: 'http://localhost:8080' + '/naverLCallback',
      parentValue: '',
      snackbarMessage: '이메일 및 비밀번호를 확인해주세요.',
    }
  },
  mounted() {
    console.log(process.env.BASE_URL)
  },
  methods: {
    async naverLoginBtn() {

      const naverLogin = new naver.LoginWithNaverId({
        clientId: 'n_Jfo39bgxlZcWQcQhYf', // Naver client key
        callbackUrl: `${window.location.origin}/auth/callback/naver`,
        callbackHandle: true
      })
      naverLogin.init()
      naverLogin.reprompt()
    //   console.log(this.callbackUrl)
    //   const url =
    //     `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=n_Jfo39bgxlZcWQcQhYf&redirect_uri=` +
    //     this.callbackUrl

    //   console.log('==================url====================')
    //   // console.log(url)
    //   console.log(this.parentValue)
    //   // window.location.href = url

    //   var child
    //   window.open(url, 'Naver Login', 'width=450, height=600')
    //   window.setChildValue = this.setChildValue
    },
    setChildValue: function (token, email) {
      console.log('asdsadasdsa', token, email)
      this.socialLogin(token, email, '네이버')
    },
    socialLogin: function (token, email, type) {
      let conditions = [{ q: '=', f: 'token', v: token }]
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
              if (res.data[0].status == 1) {
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
                this.$router.push({ name: 'index' })
              } else {
                this.snackbarMessage =
                  '회원탈퇴된 계정입니다. 고객센터에 문의바랍니다.'
                this.showToast()
              }
            } else {
              this.$router.push({
                name: 'signUp',
                params: { token: token, email: email, type: type },
              })
            }
          })
          .catch(function (error) {
            console.log('에러!!', err)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },

    kakaoLoginBtn: function () {
      if (!Kakao.isInitialized()) {
        Kakao.init('43da0fc0239b6430f0c2b7eddf3dd1b5')
      }
      window.Kakao.socialLogin = this.socialLogin
      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: '/v1/user/unlink',
          success: function (response) {
            console.log('request: ', response)
            // window.Kakao.socialLogin(response.id, '', '카카오')
          },
          fail: function (error) {
            console.log(error)
          },
        })
        window.Kakao.Auth.setAccessToken(undefined)
      }

      window.Kakao.Auth.login({
        success: function () {
          window.Kakao.API.request({
            url: '/v2/user/me',
            data: {
              property_keys: ['kakao_account.email'],
            },
            success: async function (response) {
              console.log('login: ', response.id, response.kakao_account.email)
              window.Kakao.socialLogin(
                response.id,
                response.kakao_account.email,
                '카카오'
              )
            },
            fail: function (error) {
              console.log(error)
            },
          })
        },
        fail: function (error) {
          console.log(error)
        },
      })
    },
    logoClick() {
      this.$router.push({ path: '/' })
    },
    loginClick() {
      if (this.email.length > 0 && this.pw.length > 0) {
        let conditions = [
          { q: '=', f: 'email', v: this.email },
          { op: 'AND', q: '=', f: 'pw', v: this.pw },
        ]
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
                if (res.data[0].status == 1) {
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
                  this.$router.push({ name: 'index' })
                } else {
                  this.snackbarMessage =
                    '회원탈퇴된 계정입니다. 고객센터에 문의바랍니다.'
                  this.showToast()
                }
              } else {
                this.snackbarMessage = '이메일 및 비밀번호를 확인해주세요.'
                this.showToast()
              }
            })
            .catch(function (error) {
              console.log('에러!!', err)
            })
        } catch (err) {
          console.log('err!! : ' + err)
        }
      }
    },
    signUpClick() {
      this.$router.push({ name: 'signUp' })
    },
    showToast() {
      var x = document.getElementById('snackbar')
      x.className = 'show'
      setTimeout(function () {
        x.className = x.className.replace('show', '')
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
#snackbar {
  visibility: hidden;
  min-width: 400px;
  margin-left: -200px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
.login-group {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 100vh;
  .login-child-group {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo-area {
      width: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .logo {
      width: 120px;
      height: 48px;
    }
    .child-area {
      width: 400px;
      display: flex;
      flex-direction: column;
      margin-top: 70px;
      .id-area {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        border-width: 1px;
        border-radius: 1px;
        margin-top: 4px;
      }

      .id {
        width: 100%;
        height: 60px;
        vertical-align: middle;
        border: 1px solid #dddddd;
        color: #999999;
        letter-spacing: -0.6px;
        border-radius: 1px;
        font-size: 16px;
        font-family: 'score2';
        padding: 12px;
        background-size: 20px;
      }
      .pw-area {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        margin-top: 20px;
      }
      .pw {
        width: 100%;
        height: 60px;
        vertical-align: middle;
        border: 1px solid #dddddd;
        color: #999999;
        letter-spacing: -0.6px;
        border-radius: 1px;
        font-size: 16px;
        font-family: 'score2';
        padding: 12px;
      }
      .login-btn {
        display: flex;
        width: 100%;
        height: 60px;
        margin-top: 20px;
        border-radius: 5px;
        background-color: #9ad144;
        font-size: 16px;
        font-family: 'score6';
        color: white;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .login-sns {
        margin-top: 46px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .sns-kakao {
          width: 100%;
          height: 60px;
          border-radius: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #fee500;
          padding: 0px 30px;
          cursor: pointer;
          .sns-kakao-text {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 22px;
            font-size: 16px;
            font-family: 'score6';
            color: #3a1c1e;
          }
        }
        .sns-naver {
          width: 100%;
          height: 60px;
          margin-top: 15px;
          border-radius: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #02c759;
          padding: 0px 30px;
          cursor: pointer;
          .sns-naver-text {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 22px;
            font-size: 16px;
            font-family: 'score6';
            color: #ffffff;
          }
        }
      }

      .img-sns {
        width: 22px;
        height: 21px;
        cursor: pointer;
      }
      .utill_div {
        display: flex;
        margin-top: 20px;
        justify-content: center;
      }
      .utill_text {
        color: #999999;
        font-size: 15px;
        font-family: 'score5';
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
@media (max-width: 720px) {
  #snackbar {
    visibility: hidden;
    min-width: 90%;
    margin-left: -45%;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 12px 20px;
    position: fixed;
    z-index: 1;
    left: 50%;
    top: 30px;
    font-size: 16px;
  }

  #snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  .login-group {
    width: 100%;
    .login-child-group {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .logo-area {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .logo {
        width: 120px;
        height: 48px;
      }
      .child-area {
        width: 80%;
        display: flex;
        flex-direction: column;
        margin-top: 70px;
        .id-area {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          border-width: 1px;
          border-radius: 1px;
          margin-top: 4px;
        }

        .id {
          width: 100%;
          height: 60px;
          vertical-align: middle;
          border: 1px solid #dddddd;
          color: #999999;
          letter-spacing: -0.6px;
          border-radius: 1px;
          font-size: 16px;
          font-family: 'score2';
          padding: 12px;
          background-size: 20px;
        }
        .pw-area {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          margin-top: 20px;
        }
        .pw {
          width: 100%;
          height: 60px;
          vertical-align: middle;
          border: 1px solid #dddddd;
          color: #999999;
          letter-spacing: -0.6px;
          border-radius: 1px;
          font-size: 16px;
          font-family: 'score2';
          padding: 12px;
        }
        .login-btn {
          display: flex;
          width: 100%;
          height: 60px;
          margin-top: 20px;
          border-radius: 5px;
          background-color: #9ad144;
          font-size: 16px;
          font-family: 'score6';
          color: white;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .login-sns {
          margin-top: 46px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .sns-kakao {
            width: 100%;
            height: 60px;
            border-radius: 5px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background: #fee500;
            padding: 0px 30px;
            cursor: pointer;
            .sns-kakao-text {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 22px;
              font-size: 16px;
              font-family: 'score6';
              color: #3a1c1e;
            }
          }
          .sns-naver {
            width: 100%;
            height: 60px;
            margin-top: 15px;
            border-radius: 5px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background: #02c759;
            padding: 0px 30px;
            cursor: pointer;
            .sns-naver-text {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 22px;
              font-size: 16px;
              font-family: 'score6';
              color: #ffffff;
            }
          }
        }

        .img-sns {
          width: 22px;
          height: 21px;
          cursor: pointer;
        }
        .utill_div {
          display: flex;
          margin-top: 20px;
          justify-content: center;
        }
        .utill_text {
          color: #999999;
          font-size: 15px;
          font-family: 'score5';
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
}
</style>
