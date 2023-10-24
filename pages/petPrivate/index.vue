<template>
  <div>
    <petReceiptDialog
      v-if="petReceiptDialogStatus"
      @closeAction="receiptDialogClose"
    ></petReceiptDialog>
    <petInsuranceDialog
      v-if="petInsuranceDialogStatus"
      @closeAction="insuranceDialogClose"
      @sendData="insuranceDialogSendData"
    ></petInsuranceDialog>
    <Header @update="onChildUpdate"> </Header>
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

        <div class="item-group">
          <div
            v-for="(item, index) in productList"
            :key="index"
            class="item-body"
            @click="productDetailClick"
          >
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
      this.petInsuranceDialogStatus = false
      this.petReceiptDialogStatus = true
    },
    receiptDialogClose() {
      this.petReceiptDialogStatus = false
    },
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
      // if (newValue == true) {
      //   let test = document.getElementsByClassName('main')
      //   test[0].style['overflow-y=hidden']
      // }
    },
    productDetailClick() {
      console.log('click')
      this.$router.push({ name: 'productDetail' })
    },
  },
  data() {
    return {
      petInsuranceDialogStatus: false,
      petReceiptDialogStatus: false,
      navigationStatus: false,
      productList: [
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
    }
  },
}
</script>

<style lang="scss" scoped>
.mobile-main {
  display: inline-block;
  height: 100px;
  overflow-y: hidden;
}
.main {
  width: 100%;
  margin-top: 197px;
  .banner-group {
    width: 100%;
    height: 400px;
    top: 197px;
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
    margin-top: 400px;
    padding: 0px 20px;
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
    .item-group {
      max-width: 1200px;
      margin: auto;
      margin-top: 20px;
      margin-bottom: 40px;
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      .item-body {
        width: 270px;
        height: 446px;
        cursor: pointer;
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
  }
}
@media (max-width: 720px) {
  .mobile-main {
    width: 100%;
    height: 100%;
  }
  .main {
    width: 100%;
    margin-top: 0px;
    .banner-group {
      width: 100%;
      height: 250px;
      top: 76px;
      position: fixed;
      background-image: url('@/assets/image/img_pet_store_bg.png');
      background-size: 100% 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title {
        color: #fff;
        font-size: 30px;
        font-family: 'score7';
      }
      .title-sub {
        margin-top: 20px;
        color: #fff;
        font-size: 12px;
        font-family: 'score2';
      }
      .insurance-area {
        margin-top: 40px;
        width: 260px;
        height: 60px;
        border: 1px solid #9ad144;
        background-color: #333;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: 'score6';
        cursor: pointer;
      }
    }

    .scroll-group {
      position: relative;
      width: 100%;
      background-color: #fff;
      margin-top: 250px;
      .scroll-header-group {
        margin: auto;
        width: 100%;
        position: sticky;
        top: 76px;
        z-index: 10;
        background-color: #fff;
        .tab-group {
          width: 100%;
          display: flex;
          flex-direction: row;
          padding: 20px 20px;
          background-color: #fff;
          * + * {
            margin-left: 10px;
          }
          .select-area {
            width: 200px;
            height: 40px;
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
              font-size: 12px;
              color: #000;
              background-color: #fff;
              outline: none;
              padding-left: 10px;
            }
            .right-arrow {
              position: absolute;
              width: 13.75px;
              height: 6.76px;
              right: 10px;
            }
          }
          .input-search {
            border: 1px solid #ddd;
            background-color: #fff;
            max-width: 150px;
            flex: 0;
            height: 40px;
            padding: 10px;
            color: #000;
            font-size: 12px;
            font-family: 'score2';
            outline: none;
          }
        }
      }
      .item-group {
        margin: auto;
        margin-top: 0px;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        gap: 10px;
        padding: 0px 20px 20px 20px;
        .item-body {
          width: 48%;
          height: auto;
          cursor: pointer;
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
    }
  }
}
</style>
