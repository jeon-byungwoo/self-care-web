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
                <v-row class="ma-0 pa-2 d-flex align-center justify-center" >
                    <v-col class="ma-0 pa-2 d-flex " cols="12" sm="4" md="4">
                        <v-text-field
                            v-model="searchedText"
                            hide-details
                            dense
                            placeholder="구매자명 또는 받는 주소를 검색하세요."
                            outlined
                            cols="12" sm="4" md="4"
                            @key.enter="selectReview"
                        >
                        </v-text-field>
                        <v-btn 
                            dense
                            color="#2D7DC8"
                            dark
                            @click="selectReview"
                            class="ml-4"
                        >
                            검색
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
            <template v-slot:[`item.score`]="{item}">
                <v-rating
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    half-icon="mdi-star-half-full"
                    hover
                    length="5"
                    size="24"
                    readonly
                    dense
                    background-color="orange lighten-3"
                    color="orange"
                    v-model="item.score"
                ></v-rating>
            </template>
            <template v-slot:[`item.i_list`]="{item}">
                <v-carousel 
                    height="150"
                    :continuous="false"
                    :cycle="cycle"
                    hide-delimiter-background
                    hide-delimiters
                >
                    <v-carousel-item 
                        v-for="(obj, index) in item.i_list"
                        :key="index"
                    >
                        <v-sheet
                            tile
                            height="100%"
                            class="d-flex align-center justify-center"
                        >
                            <v-img 
                                class="product_main_image"
                                contain
                                height="140"
                                width="200"
                                :src="imgRequire(obj)"
                            /> 
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </template>
        </v-data-table>
        <v-dialog
            v-model="reviewPopup"
            max-width="800"
            persistent
        >
            <ReviewEdit
                v-if="reviewPopup"
                @click-close="closePopup"
                :obj="selectedReview"
            />
        </v-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import ReviewEdit from '@/pages/admin/product/ReviewEdit'
export default {
    components: {ReviewEdit},
    layout: 'Admin',
    name: 'OrderPage',
    data() {
        return {
            items: [],
            headers: [
                {text:"No", value: "no", align: "center", width: '5%'},
                {text:"상품명", value: "p_name", align: "center"},
                {text:"작성자명", value: "u_name", align: "center"},
                {text:"이미지", value: "i_list", align: "center", width: '10%'},
                {text:"별점", value: "score", align: "center", width: '8%'},
                {text:"리뷰내용", value: "content", align: "center", width: '50%'},
                {text:"작성일시", value: "cd", align: "center"}
            ],
            searchedText: null,
            reviewPopup: false,
            selectedReview: null,
        }
    },
    mounted() {
        this.selectReview()
    },
    methods: {
        async selectReview() {
            let conditions = []
            // conditions.push({"q":"=","f":"alive","v":1})
            if (this.searchedText) {
                conditions.push({"op":"AND", "q": "like", "f": "b_name", "str": this.searchedText})
                conditions.push({"op":"OR", "q": "like", "f": "r_address", "str": this.searchedText})
                conditions.push({"op":"OR", "q": "like", "f": "r_address_detail", "str": this.searchedText})
            }
            
            conditions.push({"q":"review","f":"no","o":"DESC"})
            let param = {table:"review", conditions: conditions}
            
            await this.$axios.post('/admin/select', param).then(res => {
                console.log("res.data : ", res.data)
                res.data.filter(item => {
                    if (item.i_list != null && item.i_list != undefined) item.i_list = JSON.parse(item.i_list)
                    item.cd = moment(item.cd).format('YYYY-MM-DD')
                })
                this.items = res.data
                console.log(this.items)
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        clickRow(item) {
            if (item != null || item != undefined) {
                this.selectedReview = item
                this.reviewPopup = !this.reviewPopup
            }
        },
        closePopup(type) {
            this.selectedReview = null
            if (type == 'review') {
                this.reviewPopup = !this.reviewPopup
            }
            this.selectReview()
        },
        imgRequire(src) {
            if(src != null || src != undefined || src != '') return "https://self-care.kr/"+src
            else return src
        },
    }
}
</script>
<style scopted>
</style>