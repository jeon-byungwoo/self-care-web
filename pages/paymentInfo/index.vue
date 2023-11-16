<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="box">
          <div class="buyer-title-text">구매자 정보</div>
          <div class="text-input-group">
            <div class="text-group">
              <div class="text-area">이름</div>
              <div class="text-area">연락처</div>
              <div class="text-area">이메일</div>
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
                {{oPrice}}
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
                {{dPrice}}
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
                {{dPrice+oPrice}}
                <div class="final-price-total-price-won">원</div>
              </div>
            </div>
          </div>

          <div class="buy-move-area">
            <div class="buy-move-btn" @click="buy()">구매하기</div>
          </div>
        </div>
      </div>
    </div>
        <iframe id='shop-page' style="display:none;">
            <h1>주문관련 페이지</h1>

        </iframe>
  </div>
</template>
<script>
import Header from '../../components/header.vue'
export default {
    head: {
        script: [
            { src: 'https://stdpay.inicis.com/stdjs/INIStdPay.js',
            //   src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js' 
              },
            //{ src: 'https://stdpay.inicis.com/stdjs/INIStdPay.js' },
        ]
    },
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
      userInfo:[],
      hostUrl:'',
      oPrice:0,
      dPrice:0,
      orders:[],
      orderNumber:null,
      inicisFormStatus:null,
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
  mounted() {
    this.hostUrl = process.env.BASE_URL
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.buyerPhone = this.userInfo.phone
    this.buyerEmail = this.userInfo.email
    this.buyerName = this.userInfo.name
    this.orders = JSON.parse(localStorage.getItem('orderList'))
    this.dPrice = 0
    this.oPrice = 0
    for(let item of this.orders){
        if(this.dPrice < item.product.delivery_fee) this.dPrice = item.product.delivery_fee
        this.oPrice = this.oPrice + (item.cnt * item.product.p_sell)
    }

    
  },
  methods: {
    async buy(){
        this.onOrderRequest()
    },

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

    onOrderRequest(){
        if(this.receiptName!=''&&this.receiptPhone!=''&&this.Postcode!=''&&this.roadAddress!=''&&this.receiptDetailAddress!=''){
            if (this.isMobile()) return this.mobileOrder();
            else return this.webOrder();
        }else{
            alert('받는 사람 정보를 모두 기입해주세요.')
        }
    },
    newOrder(){
        let formBody={
            user_info: this.userInfo,
            order_info: this.orders,
            r_name: this.receiptName,
            r_phone: this.receiptPhone,
            r_address: this.roadAddress,
            r_address_detail: this.receiptDetailAddress,
            d_demand: this.receiptDescript,
            total_price: (this.dPrice+this.oPrice),
            delivery_fee: this.dPrice
        }
        //새로운 주문 생성 (주문이 성공되기 전 단계에서 주문을 생성함)
        return this.$axios.get('/inicis/new/order', {params:formBody}).then((res) => {
            return res
        })
    },
    async webOrder(){
        let info = await this.newOrder()
        const data = info.data.data
        const status = info.data.status
        if (status === 'success') {
            this.orderNumber = data;
            try {
                await this.$axios.get('/inicis/request/form', { params: { orderId: data } }).then(resolve => {
                    const { data: info } = resolve
                    const { status, data } = info
                    if (status === 'success') {
                        const form = document.createElement('form')
                        form.method = 'post'
                        form.acceptCharset = 'UTF-8'
                        form.hidden = true
                        form.id = 'pay_form'

                        for (let o in data) {
                            const input = document.createElement('input');
                            input.name = o
                            input.value = data[o]
                            input.hidden = true
                            form.appendChild(input)
                        }
                        document.querySelector('#shop-page').appendChild(form);
                        window.INIStdPay.pay('pay_form')
                        this.inicisFormStatus = setInterval(this.checkInicisFormStatus, 1000);
                    } else {
                        alert('요청 실패')
                    }
                })
            } catch (err) { console.log('err!! : ' + err) }
        } else {
            alert('요청 실패');
        }
    },
    async mobileOrder(){
        const { data: info } = await newOrder();
        const { status, data } = info;
        if (status === 'success') {
            this.orderNumber = data;
            await this.$axios.get('/inicis/m/request/form', { params: { orderId: data } }).then(resolve => {
                const { data: info } = resolve;
                const { status, data } = info;

                if (status === 'success') {
                    const form = document.createElement('form');
                    form.method = 'post';
                    form.acceptCharset = 'UTF-8';
                    form.hidden = true;
                    form.id = 'pay_form';
                    form.action = 'https://mobile.inicis.com/smart/payment/';

                    for (let o in data) {
                        const input = document.createElement('input');
                        input.name = o;
                        input.value = data[o];
                        input.hidden = true;
                        form.appendChild(input);
                    }

                    document.querySelector('#shop-page').appendChild(form);
                    form.submit();
                } else {
                    alert('요청 실패');
                }
            });
        }
    },
    isMobile(){
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
                navigator.userAgent,
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                navigator.userAgent.substr(0, 4),
            )
        ) {
            return true;
        }

        return false;
    },


    checkInicisFormStatus(){
        const node = document.querySelector('.inipay_modal-backdrop');
        if (node) return true;
        else {
            const form_node = document.querySelector('#pay_form');
            if (form_node) form_node.remove();

            this.fetchOrderInfo();
            return false;
        }
    },

    // async updateCart(){
    //     let conditions = [{ q: '=', f: 'u_no', v: JSON.parse(localStorage.getItem('userInfo')).no}]
    //     let formBody = {
    //         table: 'cart',
    //         conditions: conditions,
    //         item_list: JSON.stringify([]),
    //         no:this.cartNo
    //     }
    //     try {
    //         await this.$axios.post('/api/update', formBody).then((res) => {
    //             if (res.data.length > 0) {
                    
    //             } 
    //         })
    //         .catch(function (error) { console.log('에러!!', error) })
    //     } catch (err) { console.log('err!! : ' + err) }
    // },
    async fetchOrderInfo(){
        clearInterval(this.inicisFormStatus);
        console.log('fetch')
        //주문된 상품으로 넘길지를 여기서 결정
        let conditions = [{ q: '=', f: 'o_id', v: this.orderNumber }]
        let formBody = {
            table: 'orders',
            conditions: conditions,
        }
        try {
            await this.$axios
            .post('/api/select', formBody).then((res) => {
                console.log('조회된 데이터:: ', (res.data))
                if (res.data.length > 0) {
                    let orderPay = res.data[0]
                    if(orderPay.status==7){
                        //장바구니 비우기
                        // this.updateCart()
                        //구매내역 화면으로 넘기기
                        this.$router.push({path: '/myInfo', query: {tab: 4} })
                    }else{
                        let param = {  }
                        param['no']=orderPay.no
                        param['table']="orders"
                        param['status'] = 6
                        param['conditions'] = [{q:"=",f:"no",v:orderPay.no}]
                        console.log(param)
                        this.$axios.post('/admin/update', param).then((res) => {
                            console.log('업데이트 결과값: ', res.data)
                        }).catch((err) => {
                            console.log('에러!!', err)
                        }) 
                    }
                }else{
                    console.log(res.data.length)
                }
            })
            .catch(function (error) {
                console.log('에러!!', error)
            })
        } catch (err) {
            console.log('err!! : ' + err)
        }




        //생성된 주문의 결제 정보가 존재한다면 주문 완료 화면으로 이동

        //주문 취소, 팝업 닫기 등의 행위로 완전히 결제를 하지 않았다면 그냥 아무것도 하지 않음

        // if (!this.orderNumber) return this.$router.push({name: '/payment/failed' })
        // else this.$router.push({name: `/payment/result/${this.orderNumber}` })
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
