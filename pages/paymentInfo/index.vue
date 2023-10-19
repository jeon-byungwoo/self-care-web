<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="box">
          <div class="buyer-title-text">구매자 정보</div>
          <div class="text-input-group">
            <div class="text-group">
              <div class="text-area">주문자 이름</div>
              <div class="text-area">주문자 연락처</div>
              <div class="text-area">주문자 이메일</div>
            </div>
            <div class="input-group">
              <input
                class="input-area"
                :value="buyerName"
                @input="buyerName = $event.target.value"
              />
              <input
                class="input-area"
                :value="buyerPhone"
                @input="buyerPhone = $event.target.value"
              />
              <input
                class="input-area"
                :value="buyerEmail"
                @input="buyerEmail = $event.target.value"
              />
            </div>
          </div>
          <div class="mobile-text-inpit-group">
            <div class="text-area">주문자 이름</div>
            <input
              class="input-area"
              :value="buyerName"
              @input="buyerName = $event.target.value"
            />
            <div class="text-area">주문자 연락처</div>
            <input
              class="input-area"
              :value="buyerPhone"
              @input="buyerPhone = $event.target.value"
            />
            <div class="text-area">주문자 이메일</div>
            <input
              class="input-area"
              :value="buyerEmail"
              @input="buyerEmail = $event.target.value"
            />
          </div>
          <div class="recipient-title-text-checkbox-area">
            <div class="recipient-title-text">받는사람 정보</div>
            <div class="recipient-checkbox-area">
              <input
                type="checkbox"
                id="same"
                :value="sameCheck"
                v-model="sameCheck"
              />
              <label for="same"></label>
              <div class="recipient-checkbox-label">주문자와 동일합니다.</div>
            </div>
          </div>
          <!-- <div class="mobile-recipient-title-text-checkbox-area">
            <div class="recipient-title-text">받는사람 정보</div>
            <div class="recipient-checkbox-area">
              <input type="checkbox" id="mobile-same" value="" />
              <label for="mobile-same"></label>
              <div class="recipient-checkbox-label">주문자와 동일합니다.</div>
            </div>
          </div> -->
          <div class="text-input-group">
            <div class="text-group">
              <div class="text-area">이름</div>
              <div class="text-area">연락처</div>
              <div class="text-area">우편번호</div>
              <div class="text-area">주소</div>
              <div class="text-area">상세 주소</div>
              <div class="text-area">배송 요청사항</div>
            </div>
            <div class="input-group">
              <input class="input-area" v-model="receiptName" />
              <input class="input-area" v-model="receiptPhone" />
              <div class="input-address-area">
                <div class="input-area-address">{{ zoneCode }}</div>
                <div class="address-search-btn" @click="addressOpen">
                  주소찾기
                </div>
              </div>
              <div class="input-area">{{ roadAddress }}</div>
              <input class="input-area" v-model="receiptDetailAddress" />
              <input class="input-area" v-model="receiptDescript" />
            </div>
          </div>
          <div class="mobile-text-inpit-group">
            <div class="text-area">이름</div>
            <input class="input-area" v-model="receiptName" />
            <div class="text-area">연락처</div>
            <input class="input-area" v-model="receiptPhone" />
            <div class="text-area">우편번호</div>
            <div class="input-address-area">
              <div class="input-area-address">{{ zoneCode }}</div>
              <div class="address-search-btn" @click="addressOpen">
                주소찾기
              </div>
            </div>
            <div class="text-area">주소</div>
            <div class="input-area">{{ roadAddress }}</div>
            <div class="text-area">상세 주소</div>
            <input class="input-area" v-model="receiptDetailAddress" />
            <div class="text-area">배송 요청사항</div>
            <input class="input-area" v-model="receiptDescript" />
          </div>
          <div class="payment-info-title-text">결제 정보</div>
          <div class="final-price-group">
            <div class="final-price-product-price-area">
              <div class="final-price-product-price-text">총 상품 가격</div>
              <div class="final-price-product-price-price">
                41,000
                <div class="final-price-product-price-won">원</div>
              </div>
            </div>
            <div class="price-plus-total-img-area">
              <img
                class="price-plus-total-img"
                src="@/assets/image/ic_cart_final_price_plus.png"
              />
            </div>

            <div class="final-price-delivery-price-area">
              <div class="final-price-delivery-price-text">총 배송비</div>
              <div class="final-price-delivery-price-price">
                3,000
                <div class="final-price-delivery-price-won">원</div>
              </div>
            </div>
            <div class="price-plus-total-img-area">
              <img
                class="price-plus-total-img"
                src="@/assets/image/ic_cart_final_price_result.png"
              />
            </div>

            <div class="final-price-total-price-area">
              <div class="final-price-total-price-text">총 주문금액</div>
              <div class="final-price-total-price-price">
                44,000
                <div class="final-price-total-price-won">원</div>
              </div>
            </div>
          </div>

          <div class="buy-move-area">
            <div class="buy-move-btn">구매하기</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../../components/header.vue'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
  },
  data() {
    return {
      navigationStatus: false,
      buyerName: '',
      buyerPhone: '',
      buyerEmail: '',
      receiptName: '',
      receiptPhone: '',
      zoneCode: '',
      roadAddress: '',
      detailAddress: '',
      receiptDetailAddress: '',
      receiptDescript: '',
      sameCheck: false,
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
  watch: {
    sameCheck(value) {
      // console.log(value)
      if (value == true) {
        this.receiptName = this.buyerName
        this.receiptPhone = this.buyerPhone
      }
    },
    buyerName(value) {
      if (this.sameCheck == true) {
        this.receiptName = value
      }
    },
    buyerPhone(value) {
      if (this.sameCheck == true) {
        this.receiptPhone = value
      }
    },
  },
  methods: {
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
    addressOpen() {
      new daum.Postcode({
        oncomplete: (data) => {
          console.log(data)
          this.zoneCode = data.zonecode
          this.roadAddress = data.roadAddress
        },
      }).open()
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 40px;
  .body {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 40px 20px 100px 20px;
    .box {
      border: 1px solid #ddd;
      background-color: #fff;
      padding: 41px 42px 41px 39px;
      .buyer-title-text {
        font-size: 20px;
        font-family: 'score6';
        color: #333;
        margin-bottom: 15px;
      }
      .mobile-recipient-title-text-checkbox-area {
        display: none;
      }
      .recipient-title-text-checkbox-area {
        display: flex;
        margin-bottom: 15px;
        margin-top: 70px;
        align-items: center;
        .recipient-title-text {
          flex: 0.15 0 15%;
          font-size: 20px;
          font-family: 'score6';
          color: #333;
        }
        .recipient-checkbox-area {
          flex: 0.85 1 85%;
          display: flex;
          align-items: center;
          input[type='checkbox'] + label {
            display: block;
            cursor: pointer;
            width: 24px;
            height: 23.79px;
            border: 1px solid #ddd;
          }

          input[type='checkbox']:checked + label {
            background: url('@/assets/image/ic_cart_check.png') no-repeat 0 0px /
              contain;
            background-size: 13.22px 9.64px;
            background-position: center;
          }

          input[type='checkbox'] {
            display: none;
          }
          .recipient-checkbox-label {
            margin-left: 7px;
            font-size: 16px;
            font-family: 'score2';
            color: #666;
          }
        }
      }
      .mobile-text-inpit-group {
        display: none;
      }
      .text-input-group {
        display: flex;

        .text-group {
          flex: 0.15;

          .text-area {
            height: 45px;
            display: flex;
            align-items: center;
            margin-top: 15px;
            color: #666;
            font-size: 16px;
            font-family: 'score2';
          }
        }
        .input-group {
          flex: 0.85;
          .input-area {
            width: 100%;
            border: 1px solid #dddddd;
            background-color: #fff;
            display: flex;
            align-items: center;
            color: #333;
            font-size: 16px;
            font-family: 'score5';
            vertical-align: baseline;
            padding: 0px 20px;
            height: 45px;
            margin-top: 15px;
            outline: none;
          }
          .input-address-area {
            display: flex;
            align-items: center;
            .input-area-address {
              flex: 1;
              border: 1px solid #dddddd;
              background-color: #fff;
              color: #333;
              font-size: 16px;
              font-family: 'score5';
              vertical-align: baseline;
              display: flex;
              align-items: center;
              padding: 0px 20px;
              height: 45px;
              margin-top: 15px;
              outline: none;
            }
            .address-search-btn {
              width: 125px;
              height: 45px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #333;
              color: #fff;
              font-size: 15px;
              font-family: 'score5';
              margin-top: 15px;
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }
      }
      .payment-info-title-text {
        font-size: 20px;
        font-family: 'score6';
        color: #333;
        margin-top: 70px;
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
        .price-plus-total-img-area {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 5%;
          margin-right: 5%;
          .price-plus-total-img {
            width: 28;
            height: 27.76px;
          }
        }
      }
      .buy-move-area {
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        .buy-move-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 300px;
          height: 70px;
          cursor: pointer;
          font-size: 18px;
          font-family: 'score5';
          color: #fff;
          background-color: #9ad144;
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .main {
    margin-top: 0px;
    padding: 20px;
    .body {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 0px;
      .box {
        border: 1px solid #ddd;
        background-color: #fff;
        padding: 20px;
        .buyer-title-text {
          font-size: 18px;
          font-family: 'score6';
          color: #333;
          margin-bottom: 15px;
        }
        .mobile-recipient-title-text-checkbox-area {
          width: 100%;
          display: flex;
          margin-bottom: 15px;
          margin-top: 40px;
          align-items: center;
          .recipient-title-text {
            font-size: 18px;
            font-family: 'score6';
            color: #333;
          }
          .recipient-checkbox-area {
            margin-left: 10px;
            display: flex;
            align-items: center;

            input[type='checkbox'] + label {
              display: block;
              cursor: pointer;
              width: 24px;
              height: 23.79px;
              border: 1px solid #ddd;
              background: none;
            }

            input[type='checkbox']:checked + label {
              background: url('@/assets/image/ic_cart_check.png') no-repeat 0
                0px / contain;
              background-size: 13.22px 9.64px;
              background-position: center;
            }

            input[type='checkbox'] {
              display: none;
            }
            .recipient-checkbox-label {
              margin-left: 7px;
              font-size: 14px;
              font-family: 'score2';
              color: #666;
            }
          }
        }

        .recipient-title-text-checkbox-area {
          width: 100%;
          display: flex;
          margin-bottom: 15px;
          margin-top: 40px;
          align-items: center;
          .recipient-title-text {
            flex: 0.15 0 auto;
            font-size: 18px;
            font-family: 'score6';
            color: #333;
          }
          .recipient-checkbox-area {
            flex: 1 1 auto;
            display: flex;
            margin-left: 10px;
            align-items: center;
            input[type='checkbox'] + label {
              display: block;
              cursor: pointer;
              width: 24px;
              height: 23.79px;
              border: 1px solid #ddd;
              background: none;
            }

            input[type='checkbox']:checked + label {
              background: url('@/assets/image/ic_cart_check.png') no-repeat 0
                0px / contain;
              background-size: 13.22px 9.64px;
              background-position: center;
            }

            input[type='checkbox'] {
              display: none;
            }
            .recipient-checkbox-label {
              margin-left: 7px;
              font-size: 14px;
              font-family: 'score2';
              color: #666;
            }
          }
        }
        .mobile-text-inpit-group {
          display: flex;
          flex-direction: column;
          .text-area {
            height: 45px;
            display: flex;
            align-items: center;
            margin-top: 10px;
            color: #666;
            font-size: 14px;
            font-family: 'score2';
          }
          .input-area {
            width: 100%;
            border: 1px solid #dddddd;
            background-color: #fff;
            color: #333;
            font-size: 14px;
            font-family: 'score5';
            vertical-align: baseline;
            display: flex;
            align-items: center;
            padding: 0px 10px;
            height: 45px;
            margin-top: 5px;
            outline: none;
          }
          .input-address-area {
            display: flex;
            align-items: center;
            .input-area-address {
              width: 80%;
              border: 1px solid #dddddd;
              background-color: #fff;
              color: #333;
              font-size: 14px;
              display: flex;
              align-items: center;
              font-family: 'score5';
              vertical-align: baseline;
              padding: 0px 10px;
              height: 45px;
              margin-top: 5px;
              outline: none;
            }
            .address-search-btn {
              width: 20%;
              height: 45px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #333;
              color: #fff;
              font-size: 11px;
              font-family: 'score5';
              margin-top: 5px;
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }
        .text-input-group {
          display: none;
          .text-group {
            flex: 0.15;

            .text-area {
              height: 45px;
              display: flex;
              align-items: center;
              margin-top: 15px;
              color: #666;
              font-size: 16px;
              font-family: 'score2';
            }
          }
          .input-group {
            flex: 0.85;
            .input-area {
              width: 100%;
              border: 1px solid #dddddd;
              background-color: #fff;
              color: #333;
              font-size: 16px;
              font-family: 'score5';
              vertical-align: baseline;
              display: flex;
              align-items: center;
              padding: 0px 20px;
              height: 45px;
              margin-top: 15px;
              outline: none;
            }
            .input-address-area {
              display: flex;
              align-items: center;
              .input-area-address {
                flex: 1;
                border: 1px solid #dddddd;
                background-color: #fff;
                color: #333;
                font-size: 16px;
                font-family: 'score5';
                vertical-align: baseline;
                padding: 0px 20px;
                height: 45px;
                margin-top: 15px;
                outline: none;
              }
              .address-search-btn {
                width: 125px;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #333;
                color: #fff;
                font-size: 15px;
                font-family: 'score5';
                margin-top: 15px;
                margin-left: 10px;
                cursor: pointer;
              }
            }
          }
        }
        .payment-info-title-text {
          font-size: 20px;
          font-family: 'score6';
          color: #333;
          margin-top: 70px;
        }
        .final-price-group {
          margin-top: 20px;
          border: 1px solid #ddd;
          background-color: #f8f8f8;
          padding: 49px 10px;
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
              font-size: 11px;
              font-family: 'score2';
              color: #666;
            }
            .final-price-product-price-price {
              margin-top: 10px;
              display: flex;
              font-size: 17px;
              font-family: 'score6';
              color: #333;
              align-items: baseline;
              .final-price-product-price-won {
                font-size: 11px;
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
              font-size: 11px;
              font-family: 'score2';
              color: #666;
            }
            .final-price-delivery-price-price {
              margin-top: 10px;
              display: flex;
              font-size: 17px;
              font-family: 'score6';
              color: #333;
              align-items: baseline;
              .final-price-delivery-price-won {
                font-size: 11px;
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
              font-size: 11px;
              font-family: 'score2';
              color: #dc4c45;
            }
            .final-price-total-price-price {
              margin-top: 10px;
              display: flex;
              font-size: 17px;
              font-family: 'score6';
              color: #dc4c45;
              align-items: baseline;
              .final-price-total-price-won {
                font-size: 11px;
                font-family: 'score2';
                color: #dc4c45;
              }
            }
          }
          .price-plus-total-img-area {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 2%;
            margin-right: 2%;
            .price-plus-total-img {
              width: 25;
              height: 24.76px;
            }
          }
        }
        .buy-move-area {
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          .buy-move-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 60px;
            cursor: pointer;
            font-size: 16px;
            font-family: 'score5';
            color: #fff;
            background-color: #9ad144;
          }
        }
      }
    }
  }
}
</style>
