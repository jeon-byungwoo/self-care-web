<template>
  <div style="display: flex; flex-direction: column">
    <Header></Header>
    <div v-if="item!=null" class="policy-wrap">
        <div v-html="item.policy" class="policy-content">

        </div>

    </div>
    
  </div>
</template>

<script>
import Header from '../../components/header.vue'
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
        let conditions = [{ q: '=', f: '1', v: 1 }]
        let formBody = {
        table: 'site',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.item = res.data[0]
                console.log(this.item.policy)
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
<style lang="scss" scoped>
.policy-wrap{
    max-width: 1000px;
    margin: auto;
    .policy-content{
        width:1000px;
    }
}
</style>