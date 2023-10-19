<template>
    <div>
        <v-data-table 
            :headers="headers"
            :items="items"
            class="elevation-1"
            disable-sort
            item-key="no"
            @click:row="clickRow"
        >
            <template v-slot:top>
                <div class="product_toolbar">
                    <div class="product_filter_wrapper">
                        <div class="product_filter_wrapper_row">
                            <v-text-field
                                v-model="searchedText"
                                hide-details
                                dense
                                placeholder="상품을 검색하세요."
                                outlined
                                class="product_filter_text_field"
                                @key.enter="searchProduct"
                            >
                            </v-text-field>
                            <v-btn 
                                dense
                                color="#2D7DC8"
                                dark
                                @click="searchProduct"
                                class="ml-4"
                            >
                                검색
                            </v-btn>
                            <v-btn class="product_filter_btn_float_right" @click="editProduct">상품 추가</v-btn>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:[`item.alive`]="{item}">
                <div class="text-center">{{item.alive == 0 ? '비활성' : '활성'}}</div>
            </template>
            <template v-slot:[`item.i_r`]="{item}">
                <img 
                    v-if="item.i_r.length > 0"
                    class="product_main_image"
                    :src="imgRequire(item.i_r[0])"
                />
                <!-- {{item.i_r.length}} -->
            </template>
        </v-data-table>
        <v-dialog
            v-model="productPopup"
            max-width="900"
            persistent
        >
            <ProductEdit
                v-if="productPopup"
                @click-close="closePopup"
                :obj="selectedProduct"
            />
        </v-dialog>
    </div>
</template>
<script>
import ProductEdit from '@/pages/admin/product/ProductEdit'
import moment from 'moment'
export default {
    components: {ProductEdit},
    layout: 'Admin',
    name: 'ProductPage',
    data() {
        return {
            items: [],
            headers: [
                {text:"No", value: "no", align: "center"},
                {text:"상태", value: "alive", align: "center"},
                {text:"대표이미지", value: "i_r", align: "center"},
                {text:"해시태그", value: "hashtag", align: "center"},
                {text:"상품명", value: "name", align: "center"},
                {text:"상품 판매가", value: "p_sell", align: "center"},
                {text:"상품 할인가", value: "p_discount", align: "center"},
                {text:"상품 할인율", value: "p_discount_per", align: "center"},
                {text:"배송비", value: "delivery_fee", align: "center"},
                {text:"배송비 정보", value: "delivery_memo", align: "center"},
                {text:"상품 생성일", value: "cd", align: "center"},
            ],
            searchedText: null,
            productPopup: false,
            selectedProduct: null
        }
    },
    mounted() {
        this.selectProduct()
    },
    methods: {
        async selectProduct() {
            let conditions = []
            conditions.push({"q":"=","f":"alive","v":1})
            if (this.searchedText) {
                conditions.push({"op":"AND", "q": "like", "f": "name", "str": this.searchedText})
            }
            if (this.isManager && !this.isNormal) {
                conditions.push({"op":"AND", "q": "=", "f": "is_manager", "v":1})
            } else if (!this.isManager && this.isNormal) {
                conditions.push({"op":"AND", "q": "=", "f": "is_manager", "v":0})
            }
            
            conditions.push({"q":"order","f":"no","o":"DESC"})
            let param = {table:"product", conditions: conditions}
            
            await this.$axios.post('/admin/select', param).then(res => {
                console.log("res.data : ", res.data)
                res.data.filter(item => {
                    item.i_r = JSON.parse(item.i_r)
                    item.i_list = JSON.parse(item.i_list)
                })
                this.items = res.data
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        searchProduct () {
            
        },
        clickRow(item) {
            console.log("clickRow : ", item)
            this.selectedProduct = item
            this.productPopup = !this.productPopup
            
        },
        closePopup(type) {
            if (type == 'product') {
                this.productPopup = !this.productPopup
                this.selectProduct()
            }
        },
        editProduct() {
            this.productPopup = !this.productPopup

        },
        imgRequire(src) {
            console.log("src : ", src)
            if(src != null || src != undefined || src != '') return "https://self-care.kr/"+src
            else return src
        },
    }
}
</script>
<style lang="scss">
.product_toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
}
.product_filter_wrapper {
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 4px;
}
.product_filter_wrapper_row {
    display: flex;
    flex-direction: row;
    margin: 0px;
    padding: 4px;
    align-items: center;
}
.product_filter_btn_float_right {
    float:right;
    margin-left: 32px;
}
.product_filter_text_field {
    margin-right: 16px;
    min-width: 400px;
}
.product_main_image {
    width: 150px ;
    height: 150px ;
    background-size: cover;
    background-position: center;
    border: none ;
}
// .product_custom-dialog.v-dialog:not(.v-dialog--fullscreen) {
//   max-height: 100%;
// }
</style>