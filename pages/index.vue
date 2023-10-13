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
        <div class="title">셀프케어 선정 인기 제품123456</div>
        <div class="product-detail-group">
          <div class="product-detail">제품 전체보기 ></div>
        </div>
      </div>
      <div class="item-group">
        <div v-for="(item, index) in itemList" :key="index" class="item-body">
          <div class="item-img-group">
            <img
              class="item-img"
              src="@/assets/image/img_medicine_test.png"
              draggable="false"
            />
          </div>

          <div class="item-title">{{ item.title }}</div>
          <div v-if="item.sale.length > 0" class="item-basic-group">
            <div class="item-basic-price">
              <s>{{ item.price }}</s>
            </div>
            <div class="item-basic-price-won">원</div>
          </div>

          <div class="item-total-group">
            <div v-if="item.sale.length > 0" class="item-sale-group">
              <div class="item-sale">
                {{ item.sale }}
              </div>
              <div class="item-sale-percent">%</div>
            </div>

            <div class="item-total-price-group">
              <div class="item-total-price">{{ item.price }}</div>
              <div class="item-total-price-won">원</div>
            </div>
          </div>
          <div v-if="item.rating.length > 0" class="item-rating-review-group">
            <img
              class="item-rating-img"
              src="@/assets/image/ic_star.png"
              draggable="false"
            />
            <div class="item-rating-review">
              {{ item.rating + ' 후기 ' + item.reviewCnt }}
            </div>
          </div>

          <div class="item-tag-group">
            <div
              v-for="(item1, index1) in item.tags"
              :key="index1"
              class="item-tag"
            >
              <div class="item-tag-text">{{ item1 }}</div>
            </div>
          </div>

          <div v-if="item.rating.length == 0" class="item-new-product">
            새로운 상품
          </div>
        </div>
      </div>

      <div class="mobile-hot-item-detail">더보기</div>
    </div>
    <div class="magazine-group" v-if="!navigationStatus">
      <div class="magazine-title">셀프케어 매거진</div>
      <div class="magazine-description-group">
        <div class="magazine-description">
          셀프케어에서 전달하는 건강 소식을 모아보세요.
        </div>
        <div style="flex: 1"></div>
        <div class="magazine-detail">제품 전체보기 ></div>
      </div>

      <div class="magazine-item-group">
        <div
          v-for="(item, index) in magazineList"
          :key="index"
          class="magazine-item"
        >
          <div class="magazine-item-image-group">
            <img
              class="magazine-item-image"
              src="@/assets/image/img_magazine_test.png"
              draggable="false"
            />
            <div class="magazine-item-magazine-title">
              {{ item.magazineTitle }}
            </div>
          </div>

          <div class="magazine-item-bottom-group">
            <div class="magazine-item-bottom-title">
              {{ item.title }}
            </div>
            <div class="magazine-item-bottom-description">
              {{ item.description }}
            </div>
            <div style="flex: 1"></div>
            <div class="magazine-item-bottom-share-explore-group">
              <div class="magazine-item-bottom-share">SHARE</div>
              <div class="magazine-item-bottom-explore">EXPLORE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer v-if="!navigationStatus"></Footer>
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
      console.log(newPw)
      console.log(confirmPw)
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
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
  },
  mounted() {
    var conditions = [
      { op: 'and', f: 'user_info.user_no', q: '=', v: '1' },
      { op: 'and', f: 'user_info.alive_flag', q: '=', v: '1' },
    ]
    let listObject = []
    var conditions1 = [
      { op: 'and', f: 'first_checkup.user_no', q: '=', v: 'user_info.user_no' },
      { op: 'and', f: 'first_checkup.alive_flag', q: '!=', v: 1 },
    ]
    listObject.push(this.select1('first_checkup', conditions1))
    listObject.push(this.select1('second_checkup', conditions1))
    // listObject.push(this.join('country', conditions))
    // var q = this.select(this.select1('city', conditions), conditions)
    var q = this.select('user_info', conditions, listObject)
    console.log(q)
    // try {
    //   this.$axios
    //     .post('http://192.168.0.26:8080/lab/select-test', q)
    //     .then((res) => {
    //       console.log('인서트 결과값:: ', JSON.stringify(res.data))
    //       if (res.data.result == true) {
    //         // this.$router.push("/roomPrev");
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log('에러!!', err)
    //     })
    // } catch (err) {
    //   console.log('err!! : ' + err)
    // }
  },
  beforeDestroy() {},
  created() {
    Header.fetchData()
    console.log(Header.data)
  },
  data() {
    return {
      coalitionDialogStatus: false,
      navigationStatus: false,
      scrollStatus: true,
      itemList: [
        {
          uri: '',
          tags: ['# 제품 태그1', '태그2'],
          title: '비타민1',
          price: '50,000',
          sale: '10',
          rating: '',
          reviewCnt: '',
        },
        {
          uri: '',
          tags: [],
          title: '비타민2',
          price: '40,000',
          sale: '',
          rating: '',
          reviewCnt: '',
        },
        {
          uri: '',
          tags: ['태그1', '태그2'],
          title: '비타민3',
          price: '32,000',
          sale: '',
          rating: '4.4',
          reviewCnt: '6',
        },
        {
          uri: '',
          tags: ['태그1'],
          title: '비타민4',
          price: '2,100',
          sale: '15',
          rating: '4.6',
          reviewCnt: '7',
        },
        {
          uri: '',
          tags: [],
          title: '비타민5',
          price: '2,000',
          sale: '',
          rating: '4.8',
          reviewCnt: '8',
        },
      ],
      magazineList: [
        {
          magazineTitle: 'TOP 10 Australian beaches',
          title: 'Nomber 10',
          description: 'Whitehaven Beach',
        },
        {
          magazineTitle: 'TOP 5 Australian beaches',
          title: 'Nomber 10',
          description: 'Whitsunday Island, Whitsunday Islands',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
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
  padding: 100px 0px 0px 0px;
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
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 40px;
  .item-body {
    width: 270px;
    height: 446px;
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
  padding: 20px 0px 150px 0px;
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
