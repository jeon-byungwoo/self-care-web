<template>
    <div>
        <v-data-table 
            :headers="headers"
            :items="items"
            class="elevation-1"
            disable-sort
            item-key="no"
        >
            <template v-slot:top>
                <v-row class="ma-0 pa-2 d-flex align-center justify-center" >
                    <v-col class="ma-0 pa-2 d-flex " cols="12" sm="4" md="4">
                        <v-text-field
                            v-model="searchedText"
                            hide-details
                            dense
                            placeholder="구매자명 또는 받는 주소를 검색하세요."
                            outlined
                            cols="12" sm="4" md="4"
                            @key.enter="selectOrder"
                        >
                        </v-text-field>
                        <v-btn 
                            dense
                            color="#2D7DC8"
                            dark
                            @click="selectOrder"
                            class="ml-4"
                        >
                            검색
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
            <template v-slot:[`item.status`]="{item}">
                <v-select 
                    :items="orderStateObj"
                    v-model="item.status"
                    dense
                    hide-details
                    outlined
                    @change="setState(item)"
                />
            </template>
        </v-data-table>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    components: {},
    layout: 'Admin',
    name: 'OrderPage',
    data() {
        return {
            items: [],
            headers: [
                {text:"No", value: "no", align: "center"},
                {text:"구매자명", value: "b_name", align: "center"},
                {text:"주문자 연락처", value: "b_phone", align: "center"},
                {text:"주문자 이메일", value: "b_email", align: "center"},
                {text:"받는사람", value: "r_name", align: "center"},
                {text:"받는사람 연락처", value: "r_phone", align: "center"},
                {text:"주소", value: "r_address", align: "center", width: '15%'},
                {text:"배송 요청사항", value: "d_demand", align: "center", width: '15%'},
                {text:"주문상태", value: "status", align: "center", width: '9%'},
                {text:"결제금액", value: "total_price", align: "center"},
                {text:"결제수단", value: "payment_info", align: "center"},
                {text:"주문일시", value: "cd", align: "center"},
            ],
            searchedText: null,
            productPopup: false,
            selectedProduct: null,
            orderStateObj: [
                {text: "주문대기", value: 1},
                {text: "주문취소", value: 2},
                {text: "상품준비중", value: 3},
                {text: "배송중", value: 4},
                {text: "배송완료", value: 5},
                {text: "결제도중취소", value: 6},
                {text: "결제완료", value: 7},
            ]
        }
    },
    mounted() {
        this.selectOrder()
    },
    methods: {
        async setState(item) {
            console.log("주문 상태 변경 : ", item.status)
            let param = {
                no: item.no,
                status: item.status,
                table: 'orders',
                conditions: [{q:"==",f:"no",v:item.no}]
            }
            await this.$axios.post('/admin/update', param).then((res) => {
                console.log('update status : ', res.data)
            }).catch((err) => {
                console.log('에러!!', err)
            }) 
        },
        async selectOrder() {
            let conditions = []
            // conditions.push({"q":"=","f":"alive","v":1})
            if (this.searchedText) {
                conditions.push({"op":"AND", "q": "like", "f": "b_name", "str": this.searchedText})
                conditions.push({"op":"OR", "q": "like", "f": "r_address", "str": this.searchedText})
                conditions.push({"op":"OR", "q": "like", "f": "r_address_detail", "str": this.searchedText})
            }
            
            conditions.push({"q":"order","f":"no","o":"DESC"})
            let param = {table:"orders", conditions: conditions}
            
            await this.$axios.post('/admin/select', param).then(res => {
                console.log("res.data : ", res.data)
                res.data.filter(item => {
                    if (item.i_r != null && item.i_r != undefined) item.i_r = JSON.parse(item.i_r)
                    if (item.i_list != null && item.i_list != undefined) item.i_list = JSON.parse(item.i_list)
                    if (item.hashtag != null && item.hashtag != undefined && item.hashtag != '') item.hashtag = JSON.parse(item.hashtag)
                    item.cd = moment(item.cd).format('YYYY-MM-DD')
                })
                this.items = res.data
            }).catch(err => {
                console.log("err : ", err)
            })
        },
    }
}
</script>
<style scopted>
</style>