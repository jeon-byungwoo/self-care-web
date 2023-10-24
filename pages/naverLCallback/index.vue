<template>
  <div class="main-warper"></div>
</template>

<script>
export default {
  layout: 'default',
  name: 'IndexPage',
  data() {
    return {
      naverClientId: 'n_Jfo39bgxlZcWQcQhYf',
      clientSecret: '8nfsmd6vRH',
      callbackUrl: 'http://localhost:8080' + '/naverLCallback',
      token: '',
      email: '',
    }
  },
  mounted() {
    // console.log('asdbsdasd')
    console.log('gg', this.$route.query.code, this.$route.query.state)
    this.naverCallback()
  },
  methods: {
    async naverCallback() {
      console.log(this.$route.query.code)
      const url = `/oauth2.0/token?grant_type=authorization_code&client_id=${this.naverClientId}&client_secret=${this.clientSecret}&code=${this.$route.query.code}&state=${this.$route.query.state}`
      const headers = {
        'X-Naver-Client-Id': this.naverClientId,
        'X-Naver-Client-Secret': this.clientSecret,
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': '*',
      }
      console.log('여기1134567898')
      // console.log(url)
      const { data } = this.$axios.get(url, { headers })
      console.log('data => ', data)

      // console.log('data.access_token => ', data.access_token)
      // // state.access_token = data.access_token

      // console.log('data.refresh_token => ', data.refresh_token)

      // // state.refresh_token = data.refresh_token
      // this.userInfo(data.access_token)
      // // return new Promise((resolve, reject) => {

      // })
      // await this.$axios
      //   .get(url, { headers })
      //   .then((res) => {
      //     console.log('인서트 결과값:: ', JSON.stringify(res.data))
      //   })
      //   .catch(function (error) {
      //     console.log('에러!!', error)
      //   })
      // window.location.href = url
      // let test = window.document.getSelection('body pre')
      // console.log(test)
    },
    async userInfo(access_token) {
      const url = `https://openapi.naver.com/v1/nid/me`
      let header = 'Bearer ' + access_token
      const headers = { Authorization: header }
      console.log('headers => ', headers)
      const { data } = await this.$axios.get(url, { headers })
      console.log('*****naverUserInfo data***** => ', data)
      this.token = data.response.id
      this.email = data.response.email
      window.parent.opener.setChildValue(this.token, this.email)
      window.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.main-warper {
}
</style>
