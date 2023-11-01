<template>
  <div style="display: flex; flex-direction: column">
    <Header></Header>
    이용 약관
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
