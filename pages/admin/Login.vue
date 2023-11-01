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
    // this.naverCallback()
  },
  methods: {
    async naverCallback() {
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
