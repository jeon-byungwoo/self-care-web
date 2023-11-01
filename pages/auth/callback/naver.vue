<template>
  <v-layout column> </v-layout>
</template>

<script>
export default {
  head: {
    script: [
      { src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js' },
      { src: 'https://developers.kakao.com/sdk/js/kakao.min.js' }
    ]
  },
  mounted() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'n_Jfo39bgxlZcWQcQhYf'
    })
    naverLogin.init()
    let _this = this
    naverLogin.getLoginStatus(function(status) {
      if (status) {
        const info = {
          id: naverLogin.user.id,
          email: naverLogin.user.email,
          gender: naverLogin.user.gender,
        }

        console.log(info)

      //login proc
      _this.loginProc(info)
      } else {
        console.log('AccessToken이 올바르지 않습니다.') 
      }
    })
  },
  methods: {
    async loginProc(info){
      let conditions = [{ q: '=', f: 'token', v: info.id }]
      let formBody = {
        table: 'user',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', JSON.stringify(res.data))
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
                params: { token: info.id, email: info.email, type: '네이버' },
              })
            }
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    }
  }
}
</script>