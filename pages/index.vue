<template>
  <div style="display: flex; flex-direction: column">
    <coalitionDialog
      v-if="coalitionDialogStatus"
      @closeAction="coalitionDialogClose"
      @sendData="coalitionDialogSendData"
    ></coalitionDialog>
    <!-- <navigationDialogVue v-if="navigationStatus"></navigationDialogVue> -->
    <Header @update="onChildUpdate"></Header>
    <rollingPage v-if="!navigationStatus"></rollingPage>
    <statistics v-if="!navigationStatus" />
    <survey v-if="!navigationStatus" />
    <div class="hot-item-group" v-if="!navigationStatus">
      <div class="title-group">
        <div class="title">셀프케어 선정 인기 제품</div>
        <div class="product-detail-group">
          <div class="product-detail" @click="$router.push( { name: 'store' } )">
            제품 전체보기 
          </div>
        </div>
      </div>
      <div class="item-group">
        <div v-for="(item, index) in itemList" :key="index" class="item-body" @click="$router.push({ name: 'productDetail', query: {no: item.no} })">
          <div class="item-img-group">
            <img
              class="item-img"
              :src="(`${hostUrl+JSON.parse(item.i_r)[0]}`)"
              draggable="false"
            />
          </div>

          <div class="item-title">{{ item.title }}</div>
          <div v-if="item.p_discount!= 0" class="item-basic-group">
            <div class="item-basic-price">
              <s>{{ item.p_discount }}</s>
            </div>
            <div class="item-basic-price-won">원</div>
          </div>

          <div class="item-total-group">
            <div v-if="item.p_discount_per!= 0" class="item-sale-group">
              <div class="item-sale">
                {{ item.p_discount_per }}
              </div>
              <div class="item-sale-percent">%</div>
            </div>

            <div class="item-total-price-group">
              <div class="item-total-price">{{ item.p_sell }}</div>
              <div class="item-total-price-won">원</div>
            </div>
          </div>
          <div v-if="item.rating!= 0" class="item-rating-review-group">
            <img
              class="item-rating-img"
              src="@/assets/image/ic_star.png"
              draggable="false"
            />
            <div class="item-rating-review">
              {{ item.rating + ' 후기 ' + item.review_cnt }}
            </div>
          </div>

          <div class="item-tag-group">
            <div
              v-for="(item1, index1) in JSON.parse(item.hashtag)"
              :key="index1"
              class="item-tag"
            >
              <div class="item-tag-text">{{ item1 }}</div>
            </div>
          </div>

          <div v-if="item.rating == 0" class="item-new-product">
            새로운 상품
          </div>
        </div>
      </div>

      <div
        class="mobile-hot-item-detail"
        @click="$router.push({ name: 'store' })"
      >
        더보기
      </div>
    </div>
    <div class="magazine-group" v-if="!navigationStatus">
      <div class="magazine-title">셀프케어 매거진</div>
      <div class="magazine-description-group">
        <div class="magazine-description">
          셀프케어에서 전달하는 건강 소식을 모아보세요.
        </div>
        <div style="flex: 1"></div>
        <div
          class="magazine-detail"
          @click="$router.push({ name: 'magazine' })"
        >
          제품 전체보기 >
        </div>
      </div>

      <div class="magazine-item-group">
        <div
          v-for="(item, index) in magazineList"
          :key="index"
          class="magazine-item"
        >
          <div class="magazine-item-image-group" :style="`backgroundImage:url('${hostUrl+JSON.parse(item.image)[0]}')`">
            
          </div>

          <div class="magazine-item-bottom-group">
            <div class="magazine-item-bottom-title">
              {{ item.title }}
            </div>
            <div class="magazine-item-bottom-description" v-html="item.content">
            </div>
            <div style="flex: 1"></div>
            <div class="magazine-item-bottom-share-explore-group">
              <div class="magazine-detail-btn" @click="onClickMagazine(item.no)">더보기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer v-if="!navigationStatus" @sendData="footerSendData"></Footer>
  </div>
</template>

<script>
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
import rollingPage from '../components/rolling.vue'
import statistics from '../components/statistics.vue'
import survey from '../components/survey.vue'
import subscribeReason from '../components/subscribeReason.vue'
import coalitionDialog from '~/components/coalitionDialog.vue'
import navigationDialogVue from '~/components/navigationDialog.vue'

export default {
  name: 'IndexPage',
  layout: 'default',
  hostUrl: process.env.BASE_URL,
  components: {
    Footer,
    Header,
    rollingPage,
    statistics,
    survey,
    subscribeReason,
    coalitionDialog,
    navigationDialogVue,
  },
  methods: {
    coalitionDialogClose() {
      console.log('action')
      this.coalitionDialogStatus = false
    },
    coalitionDialogSendData(nowPw, newPw, confirmPw) {
      console.log('nowPw: ' + nowPw)
    },
    footerSendData(status) {
      console.log(status)
      //status 1 - 브랜드 스토리, 2 - 제휴/입점 문의, 3 - 이용약관, 4 - 개인정보, 5 - 고객센터
      if (status == 1) {
        this.$router.push({name: 'brandStory'})
      } else if (status == 2) {
        this.coalitionDialogStatus = true
      } else if (status == 3) {
        this.$router.push({name: 'terms'})
      } else if (status == 4) {
        this.$router.push({name: 'policy'})
      } else if (status == 5) {
        this.$router.push({name: 'serviceCenter'})
      }
    },
    select(tableName, conditions, listObject) {
      let obj = {}
      obj['table'] = tableName
      if (conditions != null) {
        obj['conditions'] = conditions
      }
      if (listObject != null) {
        obj['join'] = listObject
      }
      return obj
    },
    //object
    select1(object, conditions) {
      let obj = {}
      obj['table'] = object
      if (conditions != null) {
        obj['conditions'] = conditions
      }
      return obj
    },
    join(t, p1, p2) {
      let o = {
        joinTable: t,
        param1: p1,
        param2: p2,
      }
      return o
    },
    onChildUpdate(newValue) {
      this.navigationStatus = newValue
    },
    
    productDetailClick(item) {
      //this.$router.push({ name: 'productDetail' })
        this.$router.push({name: 'productDetail', query: {no: item.no}});
    },
    async selectItem(){
      let conditions = [{ q: '=', f: '1', v: 1 },{ q: 'page', limit: '8', offset: 0 }]
      let formBody = {
        table: 'product',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            if (res.data.length > 0) {
                this.itemList = res.data
                
            } 
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
    onClickMagazine(no){
        this.$router.push({name: 'magazineDetail', query: {no: no}})
    },
    async selectMagazine(){
        let conditions = [{ q: '=', f: 'alive', v: 1 },{ q: 'page', limit: '3', offset: 0 },{ q: 'order', f: 'cd', o: "DESC" }]
        let formBody = {
        table: 'magazine',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.magazineList = res.data
                console.log(this.magazineList)
            } 
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
  },
  mounted() {
    this.hostUrl = process.env.BASE_URL
    if (typeof window !== undefined) {
      this.userInfo =
        localStorage != undefined
          ? JSON.parse(localStorage.getItem('userInfo'))
          : undefined
    }
    this.selectItem()
    this.selectMagazine()
  },
  data() {
    return {
      userInfo: '',
      coalitionDialogStatus: false,
      navigationStatus: false,
      scrollStatus: true,
      itemList: [],
      magazineList: [
        
      ],
    }
  },
}
</script>

<style lang="scss" scoped>

.magazine-detail-btn {
    border: 1px solid #ddd;
    background-color: #fff;
    width: 300px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 18px;
    font-family: 'score5';
    cursor: pointer;
}

.components-group {
  width: 100%;
  .header-margin {
    margin-top: 0px;
  }
}

.hot-item-group {
  width: 100%;
  margin: auto;
  max-width: 1200px;
  padding: 100px 20px 0px 20px;
}
.mobile-hot-item-detail {
  display: none;
}
.title-group {
  align-items: center;
  .title {
    font-size: 32px;
    color: #000000;
    font-family: 'score6';
  }
  .product-detail-group {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .product-detail {
    cursor: pointer;
    font-size: 14px;
    color: #666666;
    font-family: 'score5';
  }
}
.item-group {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 40px;
  .item-body {
    width: 260px;
    height: auto;
  }

  .item-img-group {
    background-color: #f6f6f6;
    width: 100%;
    height: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  .item-img {
    height: 166px;
  }
  .item-tag-group {
    display: flex;
    flex-direction: row;
    width: 100%;
    .item-tag {
      padding: 9px 12px 7px 12px;
      border-width: 1px;
      border-style: solid;
      border-color: #e5e5e5;
      border-radius: 20px;
      text-align: center;
      margin-right: 12px;
      margin-top: 10px;
    }
    .item-tag-text {
      font-size: 12px;
      font-family: 'score2';
      color: #666666;
    }
  }

  .item-new-product {
    width: 90px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 20px;
    padding: 9px 12px 7px 12px;
    text-align: center;
    font-size: 12px;
    font-family: 'score5';
    color: #ff6600;
    border-color: #ff6600;
  }

  .item-title {
    margin-top: 30px;
    font-size: 16px;
    font-family: 'score5';
    color: #333333;
  }
  .item-basic-group {
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
    .item-basic-price {
      font-size: 16px;
      font-family: 'score6';
      color: #999999;
    }
    .item-basic-price-won {
      font-size: 12px;
      font-family: 'score2';
      color: #999999;
    }
  }
  .item-total-group {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .item-sale-group {
      display: flex;
      align-items: flex-end;
      margin-right: 7px;
      .item-sale {
        font-size: 16px;
        font-family: 'score6';
        color: #ef2a23;
      }
      .item-sale-percent {
        font-size: 14px;
        font-family: 'score2';
        color: #ef2a23;
      }
    }

    .item-total-price-group {
      display: flex;
      align-items: flex-end;
      .item-total-price {
        font-size: 18px;
        font-family: 'score6';
        color: #333333;
      }
      .item-total-price-won {
        font-size: 14px;
        font-family: 'score2';
        color: #333333;
      }
    }
  }
  .item-rating-review-group {
    margin-top: 10px;
    display: flex;
    .item-rating-img {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
    .item-rating-review {
      font-size: 14px;
      font-family: 'score2';
      color: #333333;
    }
  }
}
.magazine-group {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 100px 20px 150px 20px;
  .magazine-title {
    font-size: 32px;
    font-family: 'score6';
    color: #000000;
  }
  .magazine-description-group {
    margin-top: 15px;
    display: flex;
    .magazine-description {
      font-size: 14px;
      font-family: 'score2';
      color: #666666;
    }
    .magazine-detail {
      font-size: 14px;
      font-family: 'score5';
      color: #666666;
      cursor: pointer;
    }
  }
  .magazine-item-group {
    margin-top: 20px;
    display: flex;
    gap: 60px;
    
  }
  .magazine-item {
    width: 58%;
    height: 477px;
  }
  .magazine-item-image-group {
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center;
    .magazine-item-image {
      width: 100%;
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      height: 300px;
    }
    .magazine-item-magazine-title {
      font-size: 20px;
      font-family: 'score6';
      color: #ffffff;
      position: relative;
      top: -54px;
      left: 0px;
      margin-left: 40px;
    }
  }
  .magazine-item-bottom-group {
    width: 100%;
    height: 177px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e5e5e5;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 20px 40px 26px 40px;
    display: flex;
    flex-direction: column;

  }

  .magazine-item-bottom-title {
    font-size: 18px;
    font-family: 'score2';
    color: #999999;
  }

  .magazine-item-bottom-description {
    font-size: 16px;
    font-family: 'score2';
    color: #333333;
    margin-top: 14px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2; 
    -webkit-box-orient: vertical;
  }

  .magazine-item-bottom-share-explore-group {
    display: flex;
    .magazine-item-bottom-share {
      font-size: 16px;
      font-family: Arial;
      color: #9ad144;
      cursor: pointer;
    }
    .magazine-item-bottom-explore {
      margin-left: 26px;
      font-size: 16px;
      font-family: Arial;
      color: #9ad144;
      cursor: pointer;
    }
  }
}
.footer-line {
  width: 100%;
  height: 1px;
  background: #707070;
}

@media (max-width: 720px) {
  .components-group {
    width: 100%;
    .header-margin {
      margin-top: 101px;
    }
  }
  .hot-item-group {
    width: 100%;
    margin: auto;
    padding: 40px 20px;
  }
  .mobile-hot-item-detail {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    background-color: #fff;
    margin-top: 20px;
    font-size: 16px;
    color: #333;
    font-family: 'score6';
    cursor: pointer;
  }
  .title-group {
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 24px;
      color: #000000;
      font-family: 'score6';
    }
    .product-detail-group {
      width: 100%;
      display: none;
      justify-content: flex-end;
    }
    .product-detail {
      cursor: pointer;
      font-size: 14px;
      color: #666666;
      font-family: 'score5';
    }
  }
  .item-group {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .item-body {
      width: 48%;
      height: auto;
    }

    .item-img-group {
      background-color: #f6f6f6;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      padding: 20px;
    }
    .item-img {
      width: 60%;
      height: auto;
    }
    .item-tag-group {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      width: 100%;
      .item-tag {
        padding: 9px 12px 7px 12px;
        border-width: 1px;
        border-style: solid;
        border-color: #e5e5e5;
        border-radius: 20px;
        text-align: center;
        margin-right: 6px;
        margin-top: 10px;
      }
      .item-tag-text {
        font-size: 10px;
        font-family: 'score2';
        color: #666666;
      }
    }

    .item-new-product {
      width: 90px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-width: 1px;
      border-style: solid;
      border-radius: 20px;
      padding: 9px 12px 7px 12px;
      text-align: center;
      font-size: 10px;
      font-family: 'score5';
      color: #ff6600;
      border-color: #ff6600;
    }

    .item-title {
      margin-top: 20px;
      font-size: 14px;
      font-family: 'score5';
      color: #333333;
    }
    .item-basic-group {
      margin-top: 8px;
      display: flex;
      align-items: flex-end;
      .item-basic-price {
        font-size: 14px;
        font-family: 'score6';
        color: #999999;
      }
      .item-basic-price-won {
        font-size: 10px;
        font-family: 'score2';
        color: #999999;
      }
    }
    .item-total-group {
      margin-top: 8px;
      display: flex;
      align-items: center;
      .item-sale-group {
        display: flex;
        align-items: flex-end;
        margin-right: 5px;
        .item-sale {
          font-size: 14px;
          font-family: 'score6';
          color: #ef2a23;
        }
        .item-sale-percent {
          font-size: 12px;
          font-family: 'score2';
          color: #ef2a23;
        }
      }

      .item-total-price-group {
        display: flex;
        align-items: flex-end;
        .item-total-price {
          font-size: 16px;
          font-family: 'score6';
          color: #333333;
        }
        .item-total-price-won {
          font-size: 12px;
          font-family: 'score2';
          color: #333333;
        }
      }
    }
    .item-rating-review-group {
      margin-top: 8px;
      display: flex;
      .item-rating-img {
        width: 14px;
        height: 14px;
        margin-right: 3px;
      }
      .item-rating-review {
        font-size: 12px;
        font-family: 'score2';
        color: #333333;
      }
    }
  }
  .magazine-group {
    width: 100%;
    margin: auto;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .magazine-title {
      font-size: 24px;
      font-family: 'score6';
      color: #000000;
    }
    .magazine-description-group {
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .magazine-description {
        font-size: 14px;
        font-family: 'score2';
        color: #666666;
      }
      .magazine-detail {
        font-size: 14px;
        font-family: 'score5';
        color: #666666;
        cursor: pointer;
        margin-top: 12px;
      }
    }
    .magazine-item-group {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      // grid-template-columns: minmax(300px, 570px) repeat(2, 1fr);
    }
    .magazine-item {
      width: 100%;
      height: auto;
    }
    .magazine-item-image-group {
      width: 100%;
      height: auto;
      .magazine-item-image {
        width: 100%;
        height: 100%;
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
      }
      .magazine-item-magazine-title {
        font-size: 16px;
        font-family: 'score6';
        color: #ffffff;
        position: relative;
        top: -54px;
        left: 0px;
        margin-left: 20px;
      }
    }
    .magazine-item-bottom-group {
      width: 100%;
      height: auto;
      border-left-width: 1px;
      border-right-width: 1px;
      border-bottom-width: 1px;
      border-style: solid;
      border-color: #e5e5e5;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      padding: 16px 36px;
      display: flex;
      flex-direction: column;
      margin-top: -25px;
    }

    .magazine-item-bottom-title {
      font-size: 16px;
      font-family: 'score2';
      color: #999999;
    }

    .magazine-item-bottom-description {
      font-size: 14px;
      font-family: 'score2';
      color: #333333;
      margin-top: 14px;
    }

    .magazine-item-bottom-share-explore-group {
      display: flex;
      margin-top: 20px;
      .magazine-item-bottom-share {
        font-size: 16px;
        font-family: Arial;
        color: #9ad144;
        cursor: pointer;
      }
      .magazine-item-bottom-explore {
        margin-left: 26px;
        font-size: 16px;
        font-family: Arial;
        color: #9ad144;
        cursor: pointer;
      }
    }
  }
}
</style>
