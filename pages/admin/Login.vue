<template>
    <div>
        <div id="snackbar">{{ snackbarMessage }}</div>
        <div class="login-group">
            <div class="login-child-group">
                <div class="logo-area">
                    <img
                        class="logo"
                        src="@/assets/image/login-logo.png"
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'AdminLogin',
    name: 'IndexPage',
    data() {
        return {
            email: '',
            pw: '',
            userObj: {
                no: null
            },
            snackbarMessage: '==='
        }
    },
    mounted() {
        
    },
    methods: {
        loginClick() {
            if (this.email?.length > 0 && this.pw?.length > 0) {
                let conditions = [
                    { q: '=', f: 'email', v: this.email },
                    { op: 'AND', q: '=', f: 'pw', v: this.pw },
                ]
                let param = {
                    table: 'user',
                    conditions: conditions
                }
                this.$axios.post('admin/select', param).then(res => {
                    console.log(res.data)
                    if (res.data.length > 0) {
                        if (res.data[0].is_admin == 1) {
                            let userInfo = {
                                no: res.data[0].no,
                                email: res.data[0].email,
                                gender: res.data[0].gender,
                                token: res.data[0].token,
                                name: res.data[0].name,
                                phone: res.data[0].phone,
                                status: res.data[0].status,
                            }
                            // localStorage.setItem('loginStatus', true)
                            // localStorage.setItem('userInfo', JSON.stringify(userInfo))
                            this.$store.dispatch('userModule/loginRegist', userInfo)
                            this.$router.replace({path: '/admin/user'})
                        }
                    } else {
                        alert('로그인에 실패하였습니다.')
                    }
                }).catch(err => {
                    alert(`로그인 실패 ${err.message}`)
                })
            }
        },
        showToast() {
            var x = document.getElementById('snackbar')
            x.className = 'show'
            setTimeout(function () {
                x.className = x.className.replace('show', '')
            }, 2000)
        },
        logoClick() {
            this.$router.push({ path: '/' })
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
</style>
