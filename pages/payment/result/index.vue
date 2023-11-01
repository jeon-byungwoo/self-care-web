<template>
  <div style="display: flex; flex-direction: column">
    <Header></Header>
    주문 결과 화면
  </div>
</template>

<script>
import Header from '../../../components/header.vue'
export default {
  layout: 'default',
  name: 'IndexPage',
  data() {
    return {
        item:null,
    }
  },
  components: {
    Header,
  },
  mounted() {
    this.selectItem()
  },
  methods: {
    async selectItem(){
       
    }

  }
}
</script>
<style lang="scss" scoped>
</style>