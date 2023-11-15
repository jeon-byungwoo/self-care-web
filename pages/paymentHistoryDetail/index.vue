<template>
  <div>
    <ReviewWrite
      v-if="reviewWriteDialogStatus"
      @closeAction="writeDialogClose"
      @sendData="reviewDialogSendData"
      :item="selectedProduct"
    ></ReviewWrite>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="product-list-group">
          <div class="top-title-area">
            <div class="product-list-title-text">구매내역</div>
          </div>

          <div v-for="(item, i) in productList" :key="i">
            <div v-if="i != 0" class="spacing-line"></div>
            <div class="product-list-item">
              <img
                class="product-list-item-rep-image"
                :src="hostUrl+JSON.parse(item.product?.i_r)[0]"
              />
              <div class="right-group">
                <div class="product-list-item-rep-info-area">
                  <div class="product-list-item-rep-info-name">
                    {{ item.product.name }}
                  </div>
                  <div class="product-list-item-rep-info-tag-area">
                    <div
                      v-for="(item1, i1) in JSON.parse(item.product.hashtag)"
                      :key="i1"
                      class="product-list-item-rep-info-tag"
                    >
                      {{ item1 }}
                    </div>
                  </div>
                </div>
                <div style="flex: 1"></div>
                <div class="product-list-item-rep-price-area">
                  <div class="product-list-item-rep-price-text">제품 가격</div>
                  <div class="product-list-item-rep-price">
                    {{ item.product.p_sell }}
                    <div class="product-list-item-rep-price-won">원</div>
                  </div>
                </div>

                <div class="product-list-item-unit-area">
                  <div class="product-list-item-rep-price-text">제품 수량</div>
                  <div class="product-list-item-rep-price">{{item.cnt}}</div>
                </div>
                <div class="review-btn" @click="onClickReview(item,i)">
                    {{item.review==null?'리뷰 쓰기':'리뷰 수정'}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="final-price-group">
          <div class="final-price-group-left">
            <div class="final-price-product-price-area">
              <div class="final-price-product-price-text">총 상품 가격</div>
              <div class="final-price-product-price-price">
                {{this.totalPrice}}
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
                {{deliveryFee}}
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
                {{(totalPrice+deliveryFee)}}
                <div class="final-price-total-price-won">원</div>
              </div>
            </div>
          </div>

          <div class="final-price-group-right">
            <div class="final-price-right-area">
              <div class="final-price-right-area-title-text">결제 일시</div>
              <div class="final-price-right-area-object-text">
                {{cd}}
              </div>
            </div>

            <div class="final-price-right-area">
              <div class="final-price-right-area-title-text">결제 수단</div>
              <div class="final-price-right-area-object-text">신용카드</div>
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
import Moment from 'moment'
export default {
  name: 'IndexPage',
  layout: 'default',
  components: {
    Header,
    ReviewWrite,
  },
  data() {
    return {
      navigationStatus: false,
      reviewWriteDialogStatus: false,
      imgList: [
      ],
      hostUrl:process.env.BASE_URL,
      productList: [],
      orderNo:0,
      totalPrice:0,
      deliveryFee:0,
      cd:'',
      selectedProduct:123,
      productInfoArr:[],
      selectedIndex:0,
    }
  },
  mounted() {
    this.hostUrl = process.env.BASE_URL
    this.orderNo = this.$route.query.order_no
    this.selectItem()
  },
  methods: {

    async selectItem(){
        let conditions = [{ q: '=', f: 'no', v: this.orderNo },{ "op":"AND",q: '=', f: 'status', v: 7 },{ q: 'order', f: 'cd', o: 'ASC' }]
        let orderFormBody = {
            table: 'orders',
            conditions: conditions,
        }
        try {
            await this.$axios
            .post('/api/select', orderFormBody)
            .then((res) => {
                if (res.data.length > 0) {
                    this.totalPrice = 0
                    this.deliveryFee = 0
                    this.productInfoArr = JSON.parse(res.data[0].order_list)
                    for(let one of this.productInfoArr){
                        this.productList.push(JSON.parse(one))
                        let oneItem = JSON.parse(one)
                        this.totalPrice = this.totalPrice+(oneItem.cnt*oneItem.product.p_sell)
                        if(this.deliveryFee < oneItem.product.delivery_fee){
                            this.deliveryFee = oneItem.product.delivery_fee
                        }
                        if(this.totalPrice>50000){
                            this.deliveryFee = 0
                        }
                    }
                    this.cd = Moment(res.data[0].cd.cd).format('YYYY-MM-DD HH:mm')
                } 
            })
            .catch(function (error) {
                console.log('에러!!', error)
            })
        } catch (err) {
            console.log('err!! : ' + err)
        }
    },

    writeDialogClose() {
      this.reviewWriteDialogStatus = false
    },
    reviewDialogSendData(reviewInfo) {
        //update order-> product
        this.productList[this.selectedIndex]['review'] = reviewInfo.no
        this.updateOrderProduct()
        this.reviewWriteDialogStatus = false
    },

    onClickReview(item,i){
        this.selectedIndex = i
        this.selectedProduct = item
        this.reviewWriteDialogStatus = true
    },
    async updateOrderProduct(){
        let param = {  }
        let tempList = []
        for(let i of this.productList){
            tempList.push(JSON.stringify(i))
        }
        param['no']= this.orderNo
        param['table']="orders"
        param['order_list']=JSON.stringify(tempList)
        param['conditions'] = [{q:"=",f:"no",v:this.orderNo}]
        await this.$axios.post('/api/update', param).then((res) => {
        }).catch((err) => {
            console.log('에러!!', err)
        }) 
    },
    onChildUpdate(newValue) {
      this.navigationStatus = newValue
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
    padding: 40px 0px 100px 0px;

    .review-btn {
        margin-left: 10px;
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

      }

      .product-list-item {
        display: flex;
        align-items: center;
        .right-group {
          flex: 1;
          display: flex;
        }

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
      .final-price-group-left {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .final-price-group-right {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 80px;
        gap: 20px;
      }
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
      .final-price-right-area {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        .final-price-right-area-title-text {
          font-size: 14px;
          font-family: 'score2';
          color: #666;
        }
        .final-price-right-area-object-text {
          margin-top: 10px;
          display: flex;
          font-size: 20px;
          font-family: 'score6';
          color: #333;
          align-items: baseline;
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
  }
}
@media (max-width: 720px) {
  .main {
    margin-top: 0px;
    .body {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
      .review-btn {
        width: 100px;
        height: 45px;
        border-radius: 30px;
        border: 1px solid #ddd;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 13px;
        font-family: 'score5';
        cursor: pointer;
      }
      .product-list-group {
        border: 1px solid #ddd;
        background-color: #fff;
        padding: 20px;
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
            font-size: 18px;
            font-family: 'score6';
            color: #333;
          }

        }

        .product-list-item {
          display: flex;
          align-items: center;

          .right-group {
            flex: 1;
            display: block;
          }

          .product-list-item-rep-image {
            width: 30%;
            height: auto;
          }
          .product-list-item-rep-info-area {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            .product-list-item-rep-info-name {
              font-size: 14px;
              font-family: 'score5';
              color: #333;
            }
            .product-list-item-rep-info-tag-area {
              margin-top: 11.9px;
              display: flex;
              flex-wrap: wrap;
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
            margin-top: 10px;
            margin-left: 20px;
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
          }
          .product-list-item-unit-area {
            margin-top: 10px;
            margin-left: 20px;
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
          }

          .product-list-item-rep-price-text {
            font-size: 12px;
            font-family: 'score5';
            color: #999;
          }
          .product-list-item-rep-price {
            margin-top: 0px;
            font-size: 14px;
            font-family: 'score5';
            color: #333;
            display: flex;
            margin-left: 10px;
            .product-list-item-rep-price-won {
              font-size: 14px;
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
        padding: 20px;
        width: 100%;
        display: block;
        justify-content: center;
        align-items: center;
        .final-price-group-left {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .final-price-group-right {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 0px;
          margin-top: 20px;
        }
        .final-price-product-price-area {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .final-price-product-price-text {
            font-size: 12px;
            font-family: 'score2';
            color: #666;
          }
          .final-price-product-price-price {
            margin-top: 10px;
            display: flex;
            font-size: 16px;
            font-family: 'score6';
            color: #333;
            align-items: baseline;
            .final-price-product-price-won {
              font-size: 12px;
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
            font-size: 12px;
            font-family: 'score2';
            color: #666;
          }
          .final-price-delivery-price-price {
            margin-top: 10px;
            display: flex;
            font-size: 16px;
            font-family: 'score6';
            color: #333;
            align-items: baseline;
            .final-price-delivery-price-won {
              font-size: 12px;
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
            font-size: 12px;
            font-family: 'score2';
            color: #dc4c45;
          }
          .final-price-total-price-price {
            margin-top: 10px;
            display: flex;
            font-size: 16px;
            font-family: 'score6';
            color: #dc4c45;
            align-items: baseline;
            .final-price-total-price-won {
              font-size: 12px;
              font-family: 'score2';
              color: #dc4c45;
            }
          }
        }
        .final-price-right-area {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;
          .final-price-right-area-title-text {
            font-size: 12px;
            font-family: 'score2';
            color: #666;
          }
          .final-price-right-area-object-text {
            margin-top: 10px;
            display: flex;
            font-size: 16px;
            font-family: 'score6';
            color: #333;
            align-items: baseline;
          }
        }
        .price-plus-total-img-area {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 3%;
          margin-right: 3%;
          .price-plus-total-img {
            width: 28;
            height: 27.76px;
          }
        }
      }
    }
  }
}
</style>
