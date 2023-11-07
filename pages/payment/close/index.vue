<template>
    <div>
        <div class="pay-success">
            <div style="margin-top: 50px;" class="pay-success-title">고객님의 주문이</div>
            <div class="pay-success-title">취소되었습니다.</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        item:null,
    }
  },

  mounted() {
    this.updateItem()
  },
  methods: {
    async updateItem(){

        // let conditions = [{ q: '=', f: 'o_id', v: this.$route.query.oid }]
        // let formBody = {
        //     table: 'orders',
        //     conditions: conditions,
        // }
        // await this.$axios
        // .post('/api/select', formBody).then((res) => {
        //     console.log('조회된 데이터:: ', (res.data))
        //     if (res.data.length > 0) {
        //         let qOrder = res.data[0]

        //         let param = {  }
        //         param['no']=qOrder.no
        //         param['table']="orders"
        //         param['status'] = 6
        //         param['conditions'] = [{q:"=",f:"no",v:qOrder.no}]
        //         this.$axios.post('/admin/update', param).then((res) => {
        //             console.log('업데이트 결과값: ', res.data)
        //         }).catch((err) => {
        //             console.log('에러!!', err)
        //         }) 
        //     }
        // })

        
    }

  }
}
</script>
<style lang="scss" scoped>
.pay-success-title{
    display: flex;
    font-size: 30px;
}
.pay-success{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.pay-success-sub-title{
    margin-top: 30px;
    display: flex;
    font-size: 20px;
}
</style>