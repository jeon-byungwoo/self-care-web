<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="product-list-group">
          <div class="product-list-title-text">장바구니</div>
          <div v-for="(item, i) in itemList" :key="i">
            <div v-if="i != 0" class="spacing-line"></div>
            <div class="product-list-item">
              <input 
                type="checkbox" 
                :id="i" 
                value=""
                v-model="item.selected"
                @change="selected($event)"                
              />
              <label :for="i"></label>
              <img
                class="product-list-item-rep-image"
                 :src="`${hostUrl+JSON.parse(item.product.i_r)[0]}`"
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
                  <div class="product-list-item-rep-price-text">제품가격</div>
                  <div class="product-list-item-rep-price">
                    {{ item.product.p_sell }}
                    <div class="product-list-item-rep-price-won">원</div>
                  </div>
                </div>
                <div class="product-list-item-rep-unit-area">
                  <div class="product-list-item-rep-unit-info-text">
                    제품 수량
                  </div>
                  <div class="product-list-item-rep-unit-minus" @click="onClickMinus(i)">
                    <img
                      class="product-list-item-rep-unit-minus-img"
                      src="@/assets/image/ic_minus.png"
                    />
                  </div>
                  <div class="product-list-item-rep-unit-text">{{item.cnt}}</div>
                  <div class="product-list-item-rep-unit-plus" @click="onClickPlus(i)">
                    <img
                      class="product-list-item-rep-unit-plus-img"
                      src="@/assets/image/ic_cart_plus_btn.png"
                    />
                  </div>
                </div>
                <div class="product-list-item-rep-delete" @click="onClickDel(i)">삭제</div>
              </div>
            </div>
          </div>
        </div>

        <div class="store-move-area">
          <div class="store-move-btn" @click="moveToStore()">상품 더 담기</div>
        </div>

        <div class="product-all-select-area">
          <input type="checkbox" id="allCheck" v-model="allChecked" @click="checkedAll($event.target.checked)"/>
          <label for="allCheck"></label>
          <div class="product-all-select-text">전체 선택</div>
        </div>

        <div class="final-price-group">
          <div class="final-price-product-price-area">
            <div class="final-price-product-price-text">총 상품 가격</div>
            <div class="final-price-product-price-price">
              {{totalPrice}}
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
              {{d_fee}}
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
              {{totalPrice+d_fee}}
              <div class="final-price-total-price-won">원</div>
            </div>
          </div>
        </div>

        <div class="buy-move-area">
          <div class="buy-move-btn" @click="paymentInfoClick">구매하기</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import _ from 'lodash'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
  },
  data() {
    return {
      hostUrl:process.env.BASE_URL,
      navigationStatus: false,
      imgList: [
        { url: require('@/assets/image/img_medicine_test.png') },
        { url: require('@/assets/image/img_medicine_test.png') },
        { url: require('@/assets/image/img_medicine_test.png') },
      ],
      itemList: [],
      userInfo:[],
      checkedItemList: [],
      allChecked: true,
      totalPrice:0,
      d_fee:0,
      confirmList:[],
      cartNo:0,
      updateList:[],

    }
  },
  mounted() {
    this.selectItem()
    this.hostUrl = process.env.BASE_URL
    
  },
  methods: {
    onClickMinus(index){
        if(this.itemList[index].cnt>1){
            this.itemList[index].cnt--
        }
        this.totalPrice = 0
        for(let item of this.itemList){
            if(item.selected){
                this.totalPrice = this.totalPrice + (item.cnt*item.product.p_sell)
                if(item.product.delivery_fee!=null){
                    if(this.d_fee < item.product.delivery_fee){
                        this.d_fee = item.product.delivery_fee
                    }
                }
                
            }
        }
        if(this.totalPrice >=  50000){
            this.d_fee = 0
        }
    },
    onClickPlus(index){
        this.itemList[index].cnt++
        this.totalPrice = 0
        for(let item of this.itemList){
            if(item.selected){
                this.totalPrice = this.totalPrice + (item.cnt*item.product.p_sell)
                if(item.product.delivery_fee!=null){
                    if(this.d_fee < item.product.delivery_fee){
                        this.d_fee = item.product.delivery_fee
                    }
                }
                
            }
        }
        if(this.totalPrice >=  50000){
            this.d_fee = 0
        }
    },
    async updateCart(){
        let conditions = [{ q: '=', f: 'u_no', v: JSON.parse(localStorage.getItem('userInfo')).no}]
        let formBody = {
            table: 'cart',
            conditions: conditions,
            item_list: JSON.stringify(this.updateList),
            no:this.cartNo
        }
        try {
            await this.$axios.post('/api/update', formBody).then((res) => {
                if (res.data.length > 0) {
                    
                } 
            })
            .catch(function (error) { console.log('에러!!', error) })
        } catch (err) { console.log('err!! : ' + err) }
    },
    onClickDel(index){
        this.itemList.splice(index,1)
        this.updateList = _.cloneDeep(this.itemList)
        for(let item of this.updateList){
            delete item['selected']
        }
        this.updateCart()
    },
    checkedAll(checked) {
        this.allChecked = checked
        for (let i in this.itemList) {
            this.itemList[i].selected = this.allChecked;
        }
        this.totalPrice = 0
        for(let item of this.itemList){
            if(item.selected){
                this.totalPrice = this.totalPrice + (item.cnt*item.product.p_sell)
                if(item.product.delivery_fee!=null){
                    if(this.d_fee < item.product.delivery_fee){
                        this.d_fee = item.product.delivery_fee
                    }
                }
                
            }
        }
        if(this.totalPrice >=  50000){
            this.d_fee = 0
        }
    },
    selected (e) {
        this.totalPrice = 0
        for (let i in this.itemList) {
            if(! this.itemList[i].selected) {
                this.allChecked = false;
            } else {
                this.allChecked = true;
            }
        }
        for(let item of this.itemList){
            if(item.selected){
                this.totalPrice = this.totalPrice + (item.cnt*item.product.p_sell)
                if(item.product.delivery_fee!=null){
                    if(this.d_fee < item.product.delivery_fee){
                        this.d_fee = item.product.delivery_fee
                    }
                }
                
            }
        }
        if(this.totalPrice >=  50000){
            this.d_fee = 0
        }
    },
    moveToStore(){
        this.$router.push({name: 'store'})
    },
      async selectItem(){
        let conditions = [{ q: '=', f: 'u_no', v: JSON.parse(localStorage.getItem('userInfo')).no }]
        let formBody = {
        table: 'cart',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            if (res.data.length > 0) {
                this.itemList = JSON.parse(res.data[0].item_list)
                this.cartNo = res.data[0].no
                for (let i in this.itemList) {
                    this.itemList[i]['selected'] = true
                }

                this.totalPrice = 0
                for(let item of this.itemList){
                    if(item.selected){
                        this.totalPrice = this.totalPrice + (item.cnt*item.product.p_sell)
                        if(item.product.delivery_fee!=null){
                            if(this.d_fee < item.product.delivery_fee){
                                this.d_fee = item.product.delivery_fee
                            }
                        }
                        
                    }
                }
                if(this.totalPrice >=  50000){
                    this.d_fee = 0
                }

            } 
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
    paymentInfoClick() {
        this.confirmList = []
        for(let i of this.itemList){
            if(i.selected){
                this.confirmList.push(i)
            }
        }
        localStorage.removeItem('orderList')
        localStorage.setItem('orderList', JSON.stringify(this.confirmList))
        this.$router.push({ name: 'paymentInfo' })
    },
    onChildUpdate(newValue) {
      console.log('index', newValue)
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
    padding: 40px 20px 100px 20px;
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
      .product-list-title-text {
        font-size: 20px;
        font-family: 'score6';
        color: #333;
        margin-bottom: 29.74px;
      }
      .product-list-item {
        display: flex;
        align-items: center;

        input[type='checkbox'] + label {
          display: block;
          cursor: pointer;
          width: 26px;
          height: 26px;
          border: 1px solid #ddd;
          background: none;
        }

        input[type='checkbox']:checked + label {
          background: url('@/assets/image/ic_cart_check.png') no-repeat 0 0px /
            contain;
          background-size: 14.32px 10.45px;
          background-position: center;
        }

        input[type='checkbox'] {
          display: none;
        }

        .product-list-item-rep-image {
          margin-left: 20px;
          width: 120px;
          height: 100px;
        }
        .right-group {
          flex: 1;
          display: flex;
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
        }
        .product-list-item-rep-unit-area {
          display: flex;
          margin-left: 20px;
          align-items: center;
          justify-content: center;

          .product-list-item-rep-unit-info-text {
            display: none;
            font-size: 14px;
            font-family: 'score5';
            color: #999;
          }
          .product-list-item-rep-unit-minus {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: #f2f4f6;
            width: 19px;
            height: 19px;
            .product-list-item-rep-unit-minus-img {
              width: 7px;
              height: 1px;
            }
          }
          .product-list-item-rep-unit-text {
            margin-left: 10px;
            margin-right: 10px;
            font-size: 16px;
            font-family: 'score5';
            color: #333;
          }
          .product-list-item-rep-unit-plus {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: #f2f4f6;
            width: 19px;
            height: 19px;
            .product-list-item-rep-unit-plus-img {
              width: 7px;
              height: 7px;
            }
          }
        }

        .product-list-item-rep-delete {
          margin-left: 114px;
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
    .store-move-area {
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .store-move-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 70px;
        cursor: pointer;
        font-size: 18px;
        font-family: 'score5';
        color: #333;
        border: 1px solid #333;
        background-color: #fff;
      }
    }
    .product-all-select-area {
      margin-top: 50px;
      width: 100%;
      display: flex;
      align-items: center;

      input[type='checkbox'] + label {
        display: block;
        cursor: pointer;
        width: 26px;
        height: 26px;
        border: 1px solid #ddd;
        background: none;
      }

      input[type='checkbox']:checked + label {
        background: url('@/assets/image/ic_cart_white_check.png') no-repeat 0
          0px / contain;
        background-size: 14.32px 10.45px;
        background-position: center;
        background-color: #9ad144;
      }

      input[type='checkbox'] {
        display: none;
      }
      .product-all-select-text {
        margin-left: 10px;
        font-size: 18px;
        font-family: 'score5';
        color: #333;
      }
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
@media (max-width: 720px) {
  .main {
    padding: 20px;
    margin-top: 0px;
    .body {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 0px;
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
        .product-list-title-text {
          font-size: 18px;
          font-family: 'score6';
          color: #333;
          margin-bottom: 20px;
        }
        .product-list-item {
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;

          input[type='checkbox'] + label {
            display: block;
            cursor: pointer;
            width: 26px;
            height: 26px;
            border: 1px solid #ddd;
            background: none;
          }

          input[type='checkbox']:checked + label {
            background: url('@/assets/image/ic_cart_check.png') no-repeat 0 0px /
              contain;
            background-size: 14.32px 10.45px;
            background-position: center;
          }

          input[type='checkbox'] {
            display: none;
          }

          .product-list-item-rep-image {
            margin-left: 10px;
            width: 20%;
            height: auto;
          }
          .right-group {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 10px;
          }
          .product-list-item-rep-info-area {
            margin-left: 10px;
            display: flex;
            .product-list-item-rep-info-name {
              font-size: 16px;
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
                font-size: 10px;
                font-family: 'score2';
                color: #666;
              }
            }
          }
          .product-list-item-rep-price-area {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            margin-top: 10px;
            margin-left: 10px;

            .product-list-item-rep-price-text {
              font-size: 14px;
              font-family: 'score5';
              color: #999;
            }
            .product-list-item-rep-price {
              margin-top: 0px;
              margin-left: 10px;
              font-size: 14px;
              font-family: 'score5';
              color: #333;
              display: flex;
              .product-list-item-rep-price-won {
                font-size: 12px;
                font-family: 'score5';
                color: #999;
              }
            }
          }
          .product-list-item-rep-unit-area {
            display: flex;
            margin-left: 10px;
            margin-top: 10px;
            align-items: center;
            justify-content: center;

            .product-list-item-rep-unit-info-text {
              display: block;
              font-size: 14px;
              font-family: 'score5';
              color: #999;
            }

            .product-list-item-rep-unit-minus {
              margin-left: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              background-color: #f2f4f6;
              width: 19px;
              height: 19px;
              .product-list-item-rep-unit-minus-img {
                width: 7px;
                height: 1px;
              }
            }
            .product-list-item-rep-unit-text {
              margin-left: 8px;
              margin-right: 8px;
              font-size: 16px;
              font-family: 'score5';
              color: #333;
            }
            .product-list-item-rep-unit-plus {
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              background-color: #f2f4f6;
              width: 19px;
              height: 19px;
              .product-list-item-rep-unit-plus-img {
                width: 7px;
                height: 7px;
              }
            }
          }

          .product-list-item-rep-delete {
            margin-left: 10px;
            margin-top: 10px;
            width: 60px;
            height: 34.6px;
            border: 1px solid #ddd;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-family: 'score5';
            color: #333;
            cursor: pointer;
          }
        }
      }
      .store-move-area {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        .store-move-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 60px;
          cursor: pointer;
          font-size: 16px;
          font-family: 'score5';
          color: #333;
          border: 1px solid #333;
          background-color: #fff;
        }
      }
      .product-all-select-area {
        margin-top: 50px;
        width: 100%;
        display: flex;
        align-items: center;

        input[type='checkbox'] + label {
          display: block;
          cursor: pointer;
          width: 26px;
          height: 26px;
          border: 1px solid #ddd;
          background: none;
        }

        input[type='checkbox']:checked + label {
          background: url('@/assets/image/ic_cart_white_check.png') no-repeat 0
            0px / contain;
          background-size: 14.32px 10.45px;
          background-position: center;
          background-color: #9ad144;
        }

        input[type='checkbox'] {
          display: none;
        }
        .product-all-select-text {
          margin-left: 10px;
          font-size: 16px;
          font-family: 'score5';
          color: #333;
        }
      }
      .final-price-group {
        margin-top: 20px;
        border: 1px solid #ddd;
        background-color: #f8f8f8;
        padding: 20x 10px;
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
            font-size: 12px;
            font-family: 'score2';
            color: #666;
          }
          .final-price-product-price-price {
            margin-top: 10px;
            display: flex;
            font-size: 18px;
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
            font-size: 18px;
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
            font-size: 18px;
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
</style>
