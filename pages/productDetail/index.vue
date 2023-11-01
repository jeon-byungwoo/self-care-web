<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="product-img-buy-group">
          <div class="product-img-group">


            <div class="product-img-swipe-area">
              <img
                class="product-img-swipe-left-arrow"
                src="@/assets/image/ic_product_swipe_prev.png"
                @click="arrowLeft()"
              />
              <div class="product-img-swipe-main-img-area">
                <img
                  class="product-img-swipe-main-img"
                  :src="`${curImage}`"
                />
              </div>
              <img
                class="product-img-swipe-right-arrow"
                src="@/assets/image/ic_product_swipe_next.png"
                @click="arrowRight()"
              />
            </div>
            <div class="product-img-list-group" v-if="product.i_list!=null">
              <div
                class="product-img-list-item"
                v-for="(item, i) in JSON.parse(product.i_list)"
                :key="i"
              >
                <img :src="`${hostUrl+item}`" class="product-img-list-img" @click="onSelectImage(`${hostUrl+item}`)"/>
              </div>
            </div>
          </div>
          <div class="product-buy-group">
            <div class="product-name">{{product.name}}</div>
            <div class="black-line"></div>
            <div class="product-price-sale-area">
              <div class="product-price-sale-basic-price">
                <s>{{product.p_discount}}</s>
                <div class="product-price-sale-basic-price-won"><s>원</s></div>
              </div>

              <div class="product-price-sale-sale-price">
                {{product.p_sell}}
                <div class="product-price-sale-basic-price-won">원</div>
              </div>
              <div class="product-price-sale-percent">{{product.p_discount_per}}%</div>
            </div>
            <div class="product-subcribe-price">
              <div class="product-subcribe-price-text">구독가</div>
              <div class="product-subcribe-price-price">
                {{product.p_subscribe}}
                <div class="product-subcribe-price-won">원</div>
              </div>
            </div>
            <div class="product-rating-review-area">
              <img
                class="product-rating-review-icon"
                src="@/assets/image/ic_star.png"
              />
              <div class="product-rating-review-regular-text">
                {{product.rating}}&nbsp;(후기&nbsp;
                <div class="product-rating-review-bold-text">{{product.review_cnt}}</div>
                )
              </div>
            </div>
            <div class="product-info-delivery-area">
              <div class="product-info-delivery-info-area">
                <!-- <div class="product-info-delivery-info-title">
                  제품소개 공간
                </div>
                <div class="product-info-delivery-info-contents">
                  칼슘 마그네슘 비타민D는 북대서양 해저에서 수확한 해조류를
                  사용한 영국산 해조분말에 비타민D와 마그네슘을 포함하여 우수한
                  품질관리를 통해 만들었습니다.
                </div> -->
              </div>
              <div class="product-info-delivery-info-area">
                <div class="product-info-delivery-info-title">
                  배송비
                </div>
                <div class="product-info-delivery-price-area">
                  <div class="product-info-delivery-price">
                    {{product.delivery_fee}}
                    <div class="product-info-delivery-price-won">원</div>
                  </div>
                  <div class="product-info-delivery-price-additional">
                    {{product.delivery_memo}}
                  </div>
                </div>
              </div>
            </div>
            <div class="product-unit-area">
              <div class="product-unit-plus-minus-area">
                <div class="product-unit-plus-minus" @click="onMinus()">
                  <img
                    class="product-unit-minus-img"
                    src="@/assets/image/ic_minus.png"
                  />
                </div>
                <div class="row-line"></div>
                <div class="product-unit-plus-minus-text">{{productCnt}}</div>
                <div class="row-line"></div>
                <div class="product-unit-plus-minus" @click="onPlus()">
                  <img
                    class="product-unit-plus-img"
                    src="@/assets/image/ic_plus.png"
                  />
                </div>
              </div>
              <div style="flex: 1"></div>
              <div class="product-unit-price">
                {{calPrice}}
                <div class="product-unit-price-won">원</div>
              </div>
            </div>
            <div class="product-buy-btn" @click="buyClick">구매하기</div>
          </div>
        </div>

        <div class="review-group">
          <div class="review-title-text">리뷰</div>
          <div class="black-line"></div>
          <div class="review-list-area">
            <div
              v-for="(item, i) in reviewList"
              :key="i"
              class="review-list-item"
            >
              <div class="review-list-item-name-rating-area">
                <div class="review-list-item-name">{{ item.name }}</div>
                <div style="flex: 1"></div>
                <div class="review-list-item-rating-area">
                  <img
                    class="review-list-item-rating-img"
                    :src="
                      item.rating >= 1
                        ? require('@/assets/image/ic_star.png')
                        : require('@/assets/image/ic_gray_star.png')
                    "
                  />
                  <img
                    class="review-list-item-rating-img"
                    :src="
                      item.rating >= 2
                        ? require('@/assets/image/ic_star.png')
                        : require('@/assets/image/ic_gray_star.png')
                    "
                  />
                  <img
                    class="review-list-item-rating-img"
                    :src="
                      item.rating >= 3
                        ? require('@/assets/image/ic_star.png')
                        : require('@/assets/image/ic_gray_star.png')
                    "
                  />
                  <img
                    class="review-list-item-rating-img"
                    :src="
                      item.rating >= 4
                        ? require('@/assets/image/ic_star.png')
                        : require('@/assets/image/ic_gray_star.png')
                    "
                  />
                  <img
                    class="review-list-item-rating-img"
                    :src="
                      item.rating >= 5
                        ? require('@/assets/image/ic_star.png')
                        : require('@/assets/image/ic_gray_star.png')
                    "
                  />
                </div>
              </div>
              <img
                class="review-list-item-rep-img"
                src="@/assets/image/img_medicine_test.png"
              />
              <div class="review-list-item-contents">
                첫가입시 주는 쿠폰으로 구독을 시작했어요. 첫가입시 주는 쿠폰
                으로 구독을 시작했어요.
              </div>
            </div>
          </div>
        </div>

        <div class="product-detail-rep-image-group">
          <div class="product-detail-rep-image-title">제품 설명</div>
          <div class="black-line"></div>
          <div class="product-detail-rep-image-area" v-html="product.content">
            
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
      hostUrl: process.env.BASE_URL,
      navigationStatus: false,
      imgList: [
        { url: require('@/assets/image/img_medicine_test.png') },
        { url: require('@/assets/image/img_medicine_test.png') },
        { url: require('@/assets/image/img_medicine_test.png') },
      ],
      reviewList: [
        { name: '홍길동', rating: 1, url: '', contents: '' },
        { name: '김민우', rating: 5, url: '', contents: '' },
        { name: '우민김', rating: 3.6, url: '', contents: '' },
      ],
      product:{

      },
      curImage:null,
      calPrice:0,
      productCnt:1,
      imageIndex:0,
      cartList:[],
    }
  },
  mounted() {
    this.selectItem()
  },
  methods: {
    arrowLeft(){
        if(this.imageIndex!=0){
            this.imageIndex--
        }
        this.curImage = this.hostUrl+this.imgList[this.imageIndex]
    },
    arrowRight(){
        console.log(this.imageIndex)
        console.log(this.imgList)
        if(this.imageIndex<this.imgList.length-1){
            this.imageIndex++
        }
        this.curImage = this.hostUrl+this.imgList[this.imageIndex]
    },
    onPlus(){
      this.productCnt++
      this.calPrice = this.productCnt*this.product.p_sell
    },
    onMinus(){
      if(this.productCnt>0){
      this.productCnt--
      this.calPrice = this.productCnt*this.product.p_sell
      }
    },
    onSelectImage(src){
      this.curImage = src
    },
    async buyClick() {
      //이 회원번호로 되어있는 사람의 카트정보 가져오기
      await this.selectCart()
      let addObject = {
        cnt: this.productCnt,
        product: this.product
      }
      let itemList = []
      if(this.cartList.length==0){
            await this.insertCart(addObject)
            // itemList.push(addObject)
            // this.cartList.item_list = JSON.stringify(itemList)
            // this.updateCart()
      }else{
            itemList = JSON.parse(this.cartList.item_list)
            let isExist = false
            for(let item of itemList){
                if(item.product.no==addObject.product.no){
                    isExist = true
                    item.cnt = item.cnt+addObject.cnt
                }else{
                    
                }
            }

            if(!isExist){
                itemList.push(addObject)
            }
            this.cartList.item_list = JSON.stringify(itemList)
            this.updateCart()
      }

      this.$router.push({name: 'cart' });

    },
    onChildUpdate(newValue) {
      this.navigationStatus = newValue
    },
    async insertCart(addObject){
        let formBody = {
        table: 'cart',
        item_list: JSON.stringify([addObject]),
        u_no: JSON.parse(localStorage.getItem('userInfo')).no
      }
      try {
        await this.$axios.post('/api/insert', formBody).then((res) => {
            if (res.data.length > 0) {
                this.cartList = res.data[0]
            } 
          })
          .catch(function (error) { console.log('에러!!', error) })
      } catch (err) { console.log('err!! : ' + err) }
    },
    async updateCart(){
        let conditions = [{ q: '=', f: 'u_no', v: JSON.parse(localStorage.getItem('userInfo')).no}]
        let formBody = {
        table: 'cart',
        conditions: conditions,
        item_list: this.cartList.item_list,
        no:this.cartList.no
      }
      try {
        await this.$axios.post('/api/update', formBody).then((res) => {
            if (res.data.length > 0) {
                this.cartList = res.data[0]
            } 
          })
          .catch(function (error) { console.log('에러!!', error) })
      } catch (err) { console.log('err!! : ' + err) }
    },
    async selectCart(){
        let conditions = [{ q: '=', f: 'u_no', v: JSON.parse(localStorage.getItem('userInfo')).no }]
        let formBody = {
        table: 'cart',
        conditions: conditions,
      }
      try {
        await this.$axios.post('/api/select', formBody).then((res) => {
            if (res.data.length > 0) {
                this.cartList = res.data[0]
            }
          })
          .catch(function (error) { console.log('에러!!', error) })
      } catch (err) { console.log('err!! : ' + err) }
    },
    async selectItem(){

      let no = this.$route.query.no
      let conditions = [{ q: '=', f: 'no', v: no }]
      let formBody = {
        table: 'product',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.product = res.data[0]
                this.curImage = this.hostUrl+JSON.parse(this.product.i_list)[0]
                this.calPrice = this.product.p_sell
                this.imgList = JSON.parse(this.product.i_list)
            }

          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    }
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
    padding: 50px 0px;
    .black-line {
      width: 100%;
      height: 2px;
      background-color: #000;
    }
    .product-img-buy-group {
      display: flex;
      flex-wrap: wrap;
      gap: 160px;
      .product-img-group {
        flex: 1;
        min-width: 300px;
        .product-img-swipe-area {
          width: 100%;
          border: 1px solid #e6e6e6;
          background-color: #fff;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          .product-img-swipe-left-arrow {
            width: 17.81px;
            height: 32.66px;
            cursor: pointer;
            margin-left: 20px;
          }
          .product-img-swipe-right-arrow {
            width: 17.81px;
            height: 32.66px;
            cursor: pointer;
            margin-right: 20px;
          }
          .product-img-swipe-main-img-area {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .product-img-swipe-main-img {
              width: 271px;
              height: 350px;
            }
          }
        }
        .product-img-list-group {
          margin-top: 20px;
          width: 100%;
          height: 85px;
          display: flex;
          gap: 19px;
          .product-img-list-item {
            width: 85px;
            height: 100%;
            border: 1px solid #e6e6e6;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .product-img-list-img {
              width: 45px;
              height: 58px;
            }
          }
        }
      }
      .product-buy-group {
        flex: 1;
        min-width: 300px;
        .product-name {
          font-size: 30px;
          font-family: 'score6';
          color: #333;
          margin-bottom: 10px;
        }
        .product-price-sale-area {
          margin-top: 30px;
          gap: 10px;
          display: flex;
          .product-price-sale-basic-price {
            font-size: 18px;
            font-family: 'score4';
            color: #999;
            display: flex;
          }
          .product-price-sale-basic-price-won {
            font-size: 18px;
            font-family: 'score2';
            color: #999;
          }
          .product-price-sale-sale-price {
            font-size: 18px;
            font-family: 'score5';
            color: #333;
            display: flex;
          }
          .product-price-sale-percent {
            font-size: 18px;
            font-family: 'score5';
            color: #dc4c45;
          }
        }
        .product-subcribe-price {
          display: flex;
          align-items: center;
          margin-top: 20px;
          .product-subcribe-price-text {
            font-size: 16px;
            font-family: 'score2';
            color: #999;
          }
          .product-subcribe-price-price {
            margin-left: 14px;
            font-size: 30px;
            font-family: 'score5';
            color: #dc4c45;
            display: flex;
            align-items: baseline;
          }
          .product-subcribe-price-won {
            font-size: 18px;
            font-family: 'score2';
            color: #666;
          }
        }
        .product-rating-review-area {
          margin-top: 20px;
          display: flex;
          .product-rating-review-icon {
            width: 17.39px;
            height: 17.39px;
            margin-right: 4.6px;
          }
          .product-rating-review-regular-text {
            font-size: 16px;
            font-family: 'score2';
            color: #333;
            display: flex;
          }
          .product-rating-review-bold-text {
            font-size: 16px;
            font-family: 'score6';
            color: #333;
          }
        }
        .product-info-delivery-area {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
          gap: 20px;

          .product-info-delivery-info-area {
            display: flex;
            .product-info-delivery-info-title {
              flex: 0.3;
              font-size: 16px;
              font-family: 'score2';
              color: #999;
            }
            .product-info-delivery-info-contents {
              flex: 0.7;
              font-size: 16px;
              font-family: 'score2';
              color: #333;
              line-height: 1.4;
            }
            .product-info-delivery-price-area {
              flex: 0.7;
              .product-info-delivery-price {
                display: flex;
                font-size: 16px;
                font-family: 'score5';
                color: #333;
                .product-info-delivery-price-won {
                  display: flex;
                  font-size: 16px;
                  font-family: 'score2';
                  color: #333;
                }
              }
              .product-info-delivery-price-additional {
                margin-top: 10px;
                font-size: 16px;
                font-family: 'score2';
                color: #333;
              }
            }
          }
        }
        .product-unit-area {
          margin-top: 20px;
          background-color: #fafafa;
          padding: 34px 27px 25px 30px;
          display: flex;
          .product-unit-plus-minus-area {
            width: 138px;
            display: flex;
            border: 1px solid #e6e6e6;
            background-color: #fff;
            .product-unit-plus-minus {
              width: 38px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              .product-unit-minus-img {
                width: 13px;
                height: 1px;
              }
              .product-unit-plus-img {
                width: 15px;
                height: 15px;
              }
            }
            .product-unit-plus-minus-text {
              width: 60px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-family: 'score4';
              color: #000;
            }
            .row-line {
              width: 1px;
              height: 40px;
              background-color: #e6e6e6;
            }
          }
          .product-unit-price {
            font-size: 30px;
            font-family: 'score5';
            color: #333;
            display: flex;
            align-items: baseline;
            .product-unit-price-won {
              font-size: 18px;
              font-family: 'score2';
              color: #666;
            }
          }
        }
        .product-buy-btn {
          margin-top: 30px;
          width: 100%;
          height: 70px;
          background-color: #9ad144;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-family: 'score5';
          color: #fff;
          cursor: pointer;
        }
      }
    }

    .review-group {
      margin-top: 100px;
      .review-title-text {
        font-size: 24px;
        font-family: 'score6';
        color: #333;
        margin-bottom: 11px;
      }
      .review-list-area {
        display: flex;
        gap: 40px;
        margin-top: 40px;
        .review-list-item {
          border: 1px solid #ddd;
          background-color: #fff;
          padding: 20px 20px 30px 20px;
          max-width: 270px;
          .review-list-item-name-rating-area {
            display: flex;
            .review-list-item-name {
              font-size: 16px;
              font-family: 'score2';
              color: #999;
            }
            .review-list-item-rating-area {
              display: flex;
              gap: 2px;
              .review-list-item-rating-img {
                width: 20.62px;
                height: 20.62px;
              }
            }
          }
          .review-list-item-rep-img {
            margin-top: 20px;
            width: 228px;
            height: 180px;
          }
          .review-list-item-contents {
            margin-top: 30px;
            font-size: 16px;
            font-family: 'score2';
            color: #333;
            line-height: 1.4;
          }
        }
      }
    }

    .product-detail-rep-image-group {
      margin-top: 70px;
      .product-detail-rep-image-title {
        font-size: 24px;
        font-family: 'score6';
        color: #333;
        margin-bottom: 11px;
      }
      .product-detail-rep-image-area {
        max-width:1000px;
        margin: auto;
        margin-top: 20px;
      }
      .product-detail-rep-image-area ::v-deep img {
        max-width:1000px;
      }
    }
  }
}
@media (max-width: 720px) {
  .main {
    padding: 20px;
    margin-top: 0px;
    .body {
      width: 100%;
      margin: auto;
      padding: 0px 0px;
      .black-line {
        width: 100%;
        height: 2px;
        background-color: #000;
      }
      .product-img-buy-group {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        .product-img-group {
          flex: 1;
          min-width: 300px;
          .product-img-swipe-area {
            width: 100%;
            border: 1px solid #e6e6e6;
            background-color: #fff;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            .product-img-swipe-left-arrow {
              width: 17.81px;
              height: 32.66px;
              cursor: pointer;
              margin-left: 0px;
            }
            .product-img-swipe-right-arrow {
              width: 17.81px;
              height: 32.66px;
              cursor: pointer;
              margin-right: 0px;
            }
            .product-img-swipe-main-img-area {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              .product-img-swipe-main-img {
                width: 60%;
                height: auto;
              }
            }
          }
          .product-img-list-group {
            margin-top: 20px;
            width: 100%;
            height: 65px;
            display: flex;
            gap: 10px;
            .product-img-list-item {
              width: 65px;
              height: 100%;
              border: 1px solid #e6e6e6;
              background-color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              .product-img-list-img {
                width: 35px;
                height: auto;
              }
            }
          }
        }
        .product-buy-group {
          flex: 1;
          min-width: 300px;
          .product-name {
            font-size: 24x;
            font-family: 'score6';
            color: #333;
            margin-bottom: 10px;
          }
          .product-price-sale-area {
            margin-top: 30px;
            gap: 10px;
            display: flex;
            .product-price-sale-basic-price {
              font-size: 16px;
              font-family: 'score4';
              color: #999;
              display: flex;
            }
            .product-price-sale-basic-price-won {
              font-size: 16px;
              font-family: 'score2';
              color: #999;
            }
            .product-price-sale-sale-price {
              font-size: 16px;
              font-family: 'score5';
              color: #333;
              display: flex;
            }
            .product-price-sale-percent {
              font-size: 16px;
              font-family: 'score5';
              color: #dc4c45;
            }
          }
          .product-subcribe-price {
            display: flex;
            align-items: center;
            margin-top: 15px;
            .product-subcribe-price-text {
              font-size: 14px;
              font-family: 'score2';
              color: #999;
            }
            .product-subcribe-price-price {
              margin-left: 12px;
              font-size: 24px;
              font-family: 'score5';
              color: #dc4c45;
              display: flex;
              align-items: baseline;
            }
            .product-subcribe-price-won {
              font-size: 16px;
              font-family: 'score2';
              color: #666;
            }
          }
          .product-rating-review-area {
            margin-top: 15px;
            display: flex;
            .product-rating-review-icon {
              width: 17.39px;
              height: 17.39px;
              margin-right: 4.6px;
            }
            .product-rating-review-regular-text {
              font-size: 14px;
              font-family: 'score2';
              color: #333;
              display: flex;
            }
            .product-rating-review-bold-text {
              font-size: 14px;
              font-family: 'score6';
              color: #333;
            }
          }
          .product-info-delivery-area {
            display: flex;
            flex-direction: column;
            margin-top: 15px;
            gap: 15px;

            .product-info-delivery-info-area {
              display: flex;
              .product-info-delivery-info-title {
                flex: 0.3;
                font-size: 14px;
                font-family: 'score2';
                color: #999;
              }
              .product-info-delivery-info-contents {
                flex: 0.7;
                font-size: 14px;
                font-family: 'score2';
                color: #333;
                line-height: 1.4;
              }
              .product-info-delivery-price-area {
                flex: 0.7;
                .product-info-delivery-price {
                  display: flex;
                  font-size: 14px;
                  font-family: 'score5';
                  color: #333;
                  .product-info-delivery-price-won {
                    display: flex;
                    font-size: 14px;
                    font-family: 'score2';
                    color: #333;
                  }
                }
                .product-info-delivery-price-additional {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: 'score2';
                  color: #333;
                }
              }
            }
          }
          .product-unit-area {
            margin-top: 15px;
            background-color: #fafafa;
            padding: 20px;
            display: flex;
            width: 100%;
            .product-unit-plus-minus-area {
              width: 90px;
              height: 30px;
              display: flex;
              border: 1px solid #e6e6e6;
              background-color: #fff;
              .product-unit-plus-minus {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                .product-unit-minus-img {
                  width: 13px;
                  height: 1px;
                }
                .product-unit-plus-img {
                  width: 15px;
                  height: 15px;
                }
              }
              .product-unit-plus-minus-text {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-family: 'score4';
                color: #000;
              }
              .row-line {
                width: 1px;
                height: 30px;
                background-color: #e6e6e6;
              }
            }
            .product-unit-price {
              font-size: 24px;
              font-family: 'score5';
              color: #333;
              display: flex;
              align-items: baseline;
              .product-unit-price-won {
                font-size: 16px;
                font-family: 'score2';
                color: #666;
              }
            }
          }
          .product-buy-btn {
            margin-top: 30px;
            width: 100%;
            height: 60px;
            background-color: #9ad144;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-family: 'score5';
            color: #fff;
            cursor: pointer;
          }
        }
      }

      .review-group {
        margin-top: 30px;
        .review-title-text {
          font-size: 22px;
          font-family: 'score6';
          color: #333;
          margin-bottom: 11px;
        }
        .review-list-area {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
          .review-list-item {
            border: 1px solid #ddd;
            background-color: #fff;
            padding: 20px 10px;
            max-width: 300px;
            width: 48%;
            display: flex;
            align-items: center;
            flex-direction: column;
            .review-list-item-name-rating-area {
              display: flex;
              width: 100%;
              .review-list-item-name {
                font-size: 14px;
                font-family: 'score2';
                color: #999;
              }
              .review-list-item-rating-area {
                flex: 1;
                display: flex;
                gap: 2px;
                .review-list-item-rating-img {
                  width: 12.62px;
                  height: 12.62px;
                }
              }
            }
            .review-list-item-rep-img {
              margin-top: 20px;
              width: 70%;
              height: auto;
            }
            .review-list-item-contents {
              margin-top: 30px;
              font-size: 14px;
              font-family: 'score2';
              color: #333;
              line-height: 1.4;
            }
          }
        }
      }

      .product-detail-rep-image-group {
        margin-top: 40px;
        .product-detail-rep-image-title {
          font-size: 22px;
          font-family: 'score6';
          color: #333;
          margin-bottom: 11px;
        }
        .product-detail-rep-image-area {
            max-width:1000px;
            margin: auto;
            margin-top: 20px;
        }
        .product-detail-rep-image-area ::v-deep img {
          max-width:100%;
        }
      }
    }
  }
}
</style>
