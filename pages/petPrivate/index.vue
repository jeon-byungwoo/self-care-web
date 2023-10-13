<template>
  <div>
    <petInsuranceDialog
      v-if="petInsuranceDialogStatus"
      @closeAction="insuranceDialogClose"
      @sendData="insuranceDialogSendData"
    ></petInsuranceDialog>
    <petReceiptDialog v-if="petReceiptDialogStatus"></petReceiptDialog>
    <Header> </Header>
    <div class="main">
      <div class="banner-group">
        <div class="title">셀프케어 펫 전용관</div>
        <div class="title-sub">우리 아이들의 건강을 챙겨보세요.</div>
        <div class="insurance-area" @click="petInsuranceDialogStatus = true">
          우리아이 보험 비교하기
        </div>
      </div>

      <div class="scroll-group">
        <div class="scroll-header-group">
          <div class="tab-group">
            <div class="select-area">
              <select>
                <option>강아지</option>
                <option>고양이</option>
              </select>
              <img class="right-arrow" src="@/assets/image/ic_down_arrow.png" />
            </div>

            <div class="select-area">
              <select>
                <option>사료</option>
                <option>간식</option>
              </select>
              <img class="right-arrow" src="@/assets/image/ic_down_arrow.png" />
            </div>

            <div style="flex: 1"></div>

            <input class="input-search" placeholder="검색" />
          </div>
        </div>

        <div class="magazine-group"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import petInsuranceDialog from '~/components/petInsuranceDialog.vue'
import petReceiptDialog from '~/components/petReceiptDialog.vue'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
    petInsuranceDialog,
    petReceiptDialog,
  },
  methods: {
    detailClick() {
      console.log('click')
      this.$router.push({ name: 'magazineDetail' })
    },
    insuranceDialogClose() {
      console.log('action')
      this.petInsuranceDialogStatus = false
    },
    insuranceDialogSendData() {
      console.log('nowPw: ')
    },
  },
  data() {
    return {
      petInsuranceDialogStatus: true,
      petReceiptDialogStatus: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  margin-top: 197px;

  .banner-group {
    width: 100%;
    height: 400px;
    margin-top: -400px;
    position: fixed;
    background-image: url('@/assets/image/img_pet_store_bg.png');
    background-size: 100% 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
      color: #fff;
      font-size: 36px;
      font-family: 'score7';
    }
    .title-sub {
      margin-top: 20px;
      color: #fff;
      font-size: 16px;
      font-family: 'score2';
    }
    .insurance-area {
      margin-top: 40px;
      width: 280px;
      height: 60px;
      border: 1px solid #9ad144;
      background-color: #333;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-family: 'score6';
      cursor: pointer;
    }
  }

  .scroll-group {
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-top: 593px;
    .scroll-header-group {
      max-width: 1200px;
      margin: auto;
      width: 100%;
      position: sticky;
      top: 197px;
      z-index: 10;
      .tab-group {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 50px 0px;
        background-color: #fff;
        * + * {
          margin-left: 20px;
        }
        .select-area {
          width: 200px;
          height: 60px;
          border: 1px solid #ddd;
          background-color: #fff;
          display: flex;
          align-items: center;
          position: relative;
          select {
            width: 100%;
            height: 100%;
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            font-family: 'score2';
            font-size: 16px;
            color: #000;
            background-color: #fff;
            outline: none;
            padding-left: 20px;
          }
          .right-arrow {
            position: absolute;
            width: 16.75px;
            height: 9.76px;
            right: 20px;
          }
        }
        .input-search {
          border: 1px solid #ddd;
          background-color: #fff;
          flex: 1;
          height: 60px;
          padding: 20px;
          color: #000;
          font-size: 16px;
          font-family: 'score2';
          outline: none;
        }
      }
    }
    .magazine-group {
      width: 100%;
      margin: auto;
      max-width: 1200px;
      padding-bottom: 100px;
    }
  }
}
</style>
