<template>
  <div style="display: flex; flex-direction: column">
    <Header></Header>
    서비스센터
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
}
</script>
