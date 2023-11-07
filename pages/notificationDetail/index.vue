<template>
  <div style="display: flex; flex-direction: column">
    <Header></Header>
    <div v-if="item!=null" class="policy-wrap">
        <div class="noti-detail-back" @click="$router.go(-1)">목록</div>
        <div class="title-wrap">
        <div class="title"> {{item.title}} </div>
        <div class="date"> {{item.cd}} </div>
        </div>

        <div v-html="item.content" class="policy-content">

        </div>

    </div>
    
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import Moment from 'moment'
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
        let no = this.$route.query.no
        let conditions = [{ q: '=', f: 'no', v: no }]
        let formBody = {
        table: 'board',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            if (res.data.length > 0) {
                this.item = res.data[0]
                this.item.cd = Moment(this.item.cd).format('YYYY년MM월DD일 HH:mm')

                console.log(this.item.title)
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
.noti-detail-back{
    margin-top: 20px;
    margin-left: 20px;
    width: 80px;
    height: 40px;
    border: 1px solid #ddd;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #333333;
    font-size: 16px;
    font-family: 'score6';
    border-radius: 25px;
}
.policy-wrap{
    max-width: 1000px;
    width:100%;
    margin: auto;
    .policy-content{
        width:100%;
    }
}
.title{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 20px;
    font-family: 'score7';
    height: 50px;
    width: 100%;
}
.title-wrap{
    display: flex;
    flex-direction: column;
}
.date{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
}
</style>