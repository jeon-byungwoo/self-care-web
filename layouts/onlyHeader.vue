<template>
  <div>
    <Header></Header>
    <div style="margin-top: 197px">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from '../components/header.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Header,
  },
  data() {
    return {}
  },
}
</script>
