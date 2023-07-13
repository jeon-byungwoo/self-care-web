<template>
  <div style="display: flex; flex-direction: column">
    <Header></Header>
    브랜드스토리
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
