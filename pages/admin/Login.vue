<template>
  <div class="main-warper">main content</div>
</template>

<script>
export default {
  layout: 'Login',
  name: 'IndexPage',
  data() {
    return {
      naverClientId: 'n_Jfo39bgxlZcWQcQhYf',
      clientSecret: '8nfsmd6vRH',
      callbackUrl: 'http://localhost:3000/naverLCallback',
    }
  },
  mounted() {
    // console.log('asdbsdasd')
    console.log('gg', this.$route.query.code)
    // this.naverCallback()
  },
  methods: {
    async naverCallback() {
      console.log(this.$route.query.code)
      const url = `/oauth2.0/token?grant_type=authorization_code&client_id=${this.naverClientId}&client_secret=${this.clientSecret}`
      console.log(url)
      const headers = {
        'X-Naver-Client-Id': this.naverClientId,
        'X-Naver-Client-Secret': this.clientSecret,
      }
      const { data } = await axios.get(url, { headers })

      console.log('data => ', data)

      console.log('data.access_token => ', data.access_token)
      // state.access_token = data.access_token

      console.log('data.refresh_token => ', data.refresh_token)
      // state.refresh_token = data.refresh_token
    },
  },
  // methods: {
  //   kakaoLoginBtn:function(){

  //     window.Kakao.init('43da0fc0239b6430f0c2b7eddf3dd1b5') // Kakao Developers에서 요약 정보 -> JavaScript 키

  //     if (window.Kakao.Auth.getAccessToken()) {
  //       window.Kakao.API.request({
  //         url: '/v1/user/unlink',
  //         success: function (response) {
  //           console.log(response)
  //         },
  //         fail: function (error) {
  //           console.log(error)
  //         },
  //       })
  //       window.Kakao.Auth.setAccessToken(undefined)
  //     }

  //     window.Kakao.Auth.login({
  //       success: function () {
  //         window.Kakao.API.request({
  //           url: '/v2/user/me',
  //           data: {
  //             property_keys: ["kakao_account.email"]
  //           },
  //           success: async function (response) {
  //             console.log(response);
  //           },
  //           fail: function (error) {
  //             console.log(error)
  //           },
  //         })
  //       },
  //       fail: function (error) {
  //         console.log(error)
  //       },
  //     })
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.main-warper {
  width: 100%;
  max-width: 1080px;
  min-width: 960px;
  margin: auto;
  height: 100vh;
  background-color: aqua;
}
</style>
