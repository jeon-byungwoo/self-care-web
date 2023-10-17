<template>
  <div class="login-group">
    <div class="login-child-group">
      <div class="logo-area">
        <img
          class="logo"
          src="../assets/image/login-logo.png"
          draggable="false"
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
          />
        </div>
        <div class="pw-area">
          <input
            class="pw"
            type="password"
            placeholder="비밀번호"
            autocomplete="off"
          />
        </div>

        <div class="login-btn">로그인</div>

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
            <div class="sns-naver-text">네이버 로그인</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  data() {
    return {
      naverClientId: 'n_Jfo39bgxlZcWQcQhYf',
      clientSecret: '8nfsmd6vRH',
      callbackUrl: 'http://localhost:3000/naverLCallback',
    }
  },
  mounted() {
    console.log('asdbsdasd')
  },
  methods: {
    async naverLoginBtn() {
      const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=n_Jfo39bgxlZcWQcQhYf&redirect_uri=http://localhost:3000/naverLCallback`

      console.log('==================url====================')
      console.log(url)

      window.location.href = url
    },
    kakaoLoginBtn: function () {
      window.Kakao.init('43da0fc0239b6430f0c2b7eddf3dd1b5') // Kakao Developers에서 요약 정보 -> JavaScript 키

      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: '/v1/user/unlink',
          success: function (response) {
            console.log(response)
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
              console.log(response)
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

    signUpClick() {
      this.$router.push({ name: 'signUp' })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-group {
  width: 100%;
  max-width: 1080px;
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
