<template>
    <div>
        <div class="pay-success">
            <div style="margin-top: 50px;" class="pay-success-title">고객님의 주문이</div>
            <div class="pay-success-title">정상적으로 완료되었습니다.</div>

            <div class="pay-success-sub-title">화면을 닫으면 주문내역으로 이동합니다.</div>

            <div @click="$router.push({path: '/myInfo', query: {tab: 4} })" class="btn-move-order-list">주문 내역 화면으로 이동</div>
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
    this.selectItem()
  },
  methods: {
    async selectItem(){
       //오더 업데이트

       //포인트 지급

    }

  }
}
</script>
<style lang="scss" scoped>
.btn-move-order-list{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:20px;
    width: 200px;
    height: 50px;
    cursor: pointer;
    font-size: 18px;
    font-family: "score5";
    color: #fff;
    background-color: #9ad144;
    display: none;
}
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
@media (max-width: 720px) {
    .btn-move-order-list{
        display: flex;
    }
}
</style>