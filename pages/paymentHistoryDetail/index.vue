<template>
  <div>
    <ReviewWrite
      v-if="reviewWriteDialogStatus"
      @closeAction="writeDialogClose"
      @sendData="reciewDialogSendData"
    ></ReviewWrite>
    <Header></Header>
    <div class="main">
      <div class="body">
        <div class="product-list-group">
          <div class="top-title-area">
            <div class="product-list-title-text">구매내역</div>
            <div class="review-btn" @click="reviewWriteDialogStatus = true">
              리뷰 쓰기
            </div>
          </div>

          <div v-for="(item, i) in itemList" :key="i">
            <div v-if="i != 0" class="spacing-line"></div>
            <div class="product-list-item">
              <img
                class="product-list-item-rep-image"
                src="@/assets/image/img_medicine_test.png"
              />
              <div class="product-list-item-rep-info-area">
                <div class="product-list-item-rep-info-name">
                  {{ item.name }}
                </div>
                <div class="product-list-item-rep-info-tag-area">
                  <div
                    v-for="(item1, i1) in item.tags"
                    :key="i1"
                    class="product-list-item-rep-info-tag"
                  >
                    {{ item1.text }}
                  </div>
                </div>
              </div>
              <div style="flex: 1"></div>
              <div class="product-list-item-rep-price-area">
                <div class="product-list-item-rep-price-text">제품가격</div>
                <div class="product-list-item-rep-price">
                  {{ item.price }}
                  <div class="product-list-item-rep-price-won">원</div>
                </div>
              </div>

              <div class="product-list-item-unit-area">
                <div class="product-list-item-rep-price-text">제품 수량</div>
                <div class="product-list-item-rep-price">1</div>
              </div>
            </div>
          </div>
        </div>

        <div class="final-price-group">
          <div class="final-price-product-price-area">
            <div class="final-price-product-price-text">총 상품 가격</div>
            <div class="final-price-product-price-price">
              41,000
              <div class="final-price-product-price-won">원</div>
            </div>
          </div>
          <img
            class="price-plus-total-img"
            src="@/assets/image/ic_cart_final_price_plus.png"
          />
          <div class="final-price-delivery-price-area">
            <div class="final-price-delivery-price-text">총 배송비</div>
            <div class="final-price-delivery-price-price">
              3,000
              <div class="final-price-delivery-price-won">원</div>
            </div>
          </div>
          <img
            class="price-plus-total-img"
            src="@/assets/image/ic_cart_final_price_result.png"
          />
          <div class="final-price-total-price-area">
            <div class="final-price-total-price-text">총 주문금액</div>
            <div class="final-price-total-price-price">
              44,000
              <div class="final-price-total-price-won">원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import ReviewWrite from '../../components/reviewWriteDialog.vue'
export default {
  name: 'IndexPage',
  layout: 'default',
  components: {
    Header,
    ReviewWrite,
  },
  data() {
    return {
      reviewWriteDialogStatus: false,
      imgList: [
        { url: require('@/assets/image/img_medicine_test.png') },
        { url: require('@/assets/image/img_medicine_test.png') },
        { url: require('@/assets/image/img_medicine_test.png') },
      ],
      itemList: [
        {
          name: '홍길동',
          rating: 1,
          price: '13,000',
          tags: [{ text: '#제품태그' }, { text: '#좋아요' }],
        },
        {
          name: '김민우',
          rating: 5,
          price: '12,500',
          tags: [{ text: '#건강' }, { text: '#유산균' }],
        },
        { name: '우민김', rating: 3.6, price: '113,000', tags: [] },
      ],
    }
  },
  methods: {
    writeDialogClose() {
      console.log('action')
      this.reviewWriteDialogStatus = false
    },
    reciewDialogSendData(nowPw, newPw, confirmPw) {
      console.log('nowPw: ' + nowPw)
      console.log(newPw)
      console.log(confirmPw)
      this.$router.push({ name: 'myInfo', params: { tabs: 4 } })
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 197px;
  .body {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 40px 0px 100px 0px;
    .product-list-group {
      border: 1px solid #ddd;
      background-color: #fff;
      padding: 41px 42px 41px 39px;
      .spacing-line {
        width: 100%;
        height: 1px;
        background-color: #ddd;
        margin-top: 19.83px;
        margin-bottom: 19.83px;
      }
      .top-title-area {
        display: flex;
        align-items: center;
        margin-bottom: 29.74px;

        .product-list-title-text {
          flex: 1;
          font-size: 20px;
          font-family: 'score6';
          color: #333;
        }
        .review-btn {
          width: 110px;
          height: 45px;
          border-radius: 30px;
          border: 1px solid #ddd;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          font-size: 15px;
          font-family: 'score5';
          cursor: pointer;
        }
      }

      .product-list-item {
        display: flex;
        align-items: center;

        .product-list-item-rep-image {
          width: 120px;
          height: 100px;
        }
        .product-list-item-rep-info-area {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          .product-list-item-rep-info-name {
            font-size: 18px;
            font-family: 'score5';
            color: #333;
          }
          .product-list-item-rep-info-tag-area {
            margin-top: 11.9px;
            display: flex;
            gap: 10px;
            .product-list-item-rep-info-tag {
              border-radius: 20px;
              border: 1px solid #e5e5e5;
              background-color: #fff;
              padding: 8.92px 12px 6.94px 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-family: 'score2';
              color: #666;
            }
          }
        }
        .product-list-item-rep-price-area {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .product-list-item-unit-area {
          margin-left: 249px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .product-list-item-rep-price-text {
          font-size: 14px;
          font-family: 'score5';
          color: #999;
        }
        .product-list-item-rep-price {
          margin-top: 13.88px;
          font-size: 16px;
          font-family: 'score5';
          color: #333;
          display: flex;
          .product-list-item-rep-price-won {
            font-size: 16px;
            font-family: 'score5';
            color: #999;
          }
        }

        .product-list-item-rep-delete {
          margin-left: 249px;
          width: 100px;
          height: 44.6px;
          border: 1px solid #ddd;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-family: 'score5';
          color: #333;
          cursor: pointer;
        }
      }
    }

    .final-price-group {
      margin-top: 20px;
      border: 1px solid #ddd;
      background-color: #f8f8f8;
      padding: 49px 0px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .final-price-product-price-area {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .final-price-product-price-text {
          font-size: 14px;
          font-family: 'score2';
          color: #666;
        }
        .final-price-product-price-price {
          margin-top: 10px;
          display: flex;
          font-size: 20px;
          font-family: 'score6';
          color: #333;
          align-items: baseline;
          .final-price-product-price-won {
            font-size: 14px;
            font-family: 'score2';
            color: #666;
          }
        }
      }
      .final-price-delivery-price-area {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .final-price-delivery-price-text {
          font-size: 14px;
          font-family: 'score2';
          color: #666;
        }
        .final-price-delivery-price-price {
          margin-top: 10px;
          display: flex;
          font-size: 20px;
          font-family: 'score6';
          color: #333;
          align-items: baseline;
          .final-price-delivery-price-won {
            font-size: 14px;
            font-family: 'score2';
            color: #666;
          }
        }
      }
      .final-price-total-price-area {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .final-price-total-price-text {
          font-size: 14px;
          font-family: 'score2';
          color: #dc4c45;
        }
        .final-price-total-price-price {
          margin-top: 10px;
          display: flex;
          font-size: 20px;
          font-family: 'score6';
          color: #dc4c45;
          align-items: baseline;
          .final-price-total-price-won {
            font-size: 14px;
            font-family: 'score2';
            color: #dc4c45;
          }
        }
      }
      .price-plus-total-img {
        width: 28;
        height: 27.76px;
        margin-left: 87px;
        margin-right: 87px;
      }
    }
  }
}
</style>
