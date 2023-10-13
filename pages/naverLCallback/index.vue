<template>
  <div class="main-warper">main content</div>
</template>

<script>
export default {
  layout: 'default',
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
    this.naverCallback()
  },
  methods: {
    async naverCallback() {
      console.log(this.$route.query.code)
      const url = `/oauth2.0/token?grant_type=authorization_code&client_id=${this.naverClientId}&client_secret=${this.clientSecret}&code=${this.$route.query.code}&state=${this.$route.query.state}`
      const headers = {
        'X-Naver-Client-Id': this.naverClientId,
        'X-Naver-Client-Secret': this.clientSecret,
      }
      const { data } = await this.$axios.get(url, { headers })

      console.log('data => ', data)

      console.log('data.access_token => ', data.access_token)
      // state.access_token = data.access_token

      console.log('data.refresh_token => ', data.refresh_token)

      // state.refresh_token = data.refresh_token
      this.userInfo(data.access_token)
    },
    async userInfo(access_token) {
      const url = `/v1/nid/me`
      let header = 'Bearer ' + access_token
      const headers = { Authorization: header }
      console.log('headers => ', headers)
      const { data } = await this.$axios.get(url, { headers })
      console.log('*****naverUserInfo data***** => ', data)
    },
  },
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
