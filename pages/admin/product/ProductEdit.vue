<template>
    <v-card >
        <v-app-bar flat >
            <v-card-title class="ma-0 pa-0">상품정보 {{productObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="main_container ma-0 pa-5">
            <v-row class="ma-0 pa-0 align-center my-2" >
                <v-col cols="12" sm="2" md="2" class="ma-0 pa-0 ">
                    <v-row class="ma-0 pa-0 align-center ">
                        <h3>대표 이미지</h3>
                        <v-spacer />
                        <v-file-input
                            ref="multi_image_input"
                            class="ma-0 pa-0"
                            accept="image/*"
                            v-model="profileImage"
                            hide-spin-buttons 
                            hide-input 
                            hide-details
                            @change="fileInfo"
                            rounded
                            dense
                            prepend-icon="mdi-plus"
                        >
                        </v-file-input>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="10" md="10" class="ma-0 pa-0">
                    <v-row class="ma-0 pa-0 align-center ">
                        <h5 class="mr-3">제품 이미지</h5>
                        <v-file-input
                            multiple
                            placeholder="최대 10장의 이미지 등록 가능합니다"
                            counter
                            outlined
                            :show-size="1000"
                            v-model="files"
                            dense
                            hide-details
                            clearable
                            @change="fileAdded"
                            @click:clear="removeAllFiles"
                        >
                            <template v-slot:selection="{ index, text }">
                                <v-chip
                                    v-if="index < 2"
                                    color="deep-purple accent-4"
                                    dark
                                    label
                                    small
                                >
                                    {{ text }}
                                </v-chip>
                                <span
                                    v-else-if="index === 2"
                                    class="text-overline grey--text text--darken-3 mx-2"
                                >
                                    +{{ files.length - 2 }} File(s)
                                </span>
                            </template>
                        </v-file-input>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-center my-2" >
                <v-col cols="12" sm="2" md="2" class="ma-0 pa-0 ">
                    <v-img 
                        class="product_image"
                        contain
                        :src="productObj.i_r != null ? profileImageUrl(productObj.i_r) : ''"
                    >
                        <v-btn class="elevation-2" icon depressed @click="deleteProductImage(index)" style="backgroundColor:gray;" dark v-if="productObj.i_r != null">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-img>
                </v-col>
                <v-col cols="12" sm="10" md="10" class="ma-0 pa-0">
                    <div
                        class="scroll-container"
                    >
                        <v-img 
                            v-for="(obj, index) in filesUrls"
                            :key="index"
                            class="product_image"
                            :src="obj != null ? obj : ''"
                            @click="showImageDetails(index)"
                        >
                            <v-btn class="elevation-2" icon depressed @click.stop="deleteProductImage(index)" style="backgroundColor:gray;" dark>
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </v-img>
                    </div>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-center my-2" >
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
                    <h5>상품구분</h5>
                    <v-btn-toggle 
                        v-model="productObj.part"
                        mandatory
                        dense
                        rounded
                    >
                        <v-btn 
                            v-for="(obj, index) in partObj"
                            :key="index"
                            :color="color"
                            :value="obj.value"
                            :outlined="obj.value != productObj.part"
                            class="px-3"
                            :class="obj.value != productObj.part ? 'black--text' : 'white--text'"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
                    <h5>활성 상태</h5>
                    <v-btn-toggle 
                        v-model="productObj.status"
                        mandatory
                        dense
                        rounded
                    >
                        <v-btn 
                            v-for="(obj, index) in statusObj"
                            :key="index"
                            :color="color"
                            :value="obj.value"
                            :outlined="obj.value != productObj.status"
                            class="px-3"
                            :class="obj.value != productObj.status ? 'black--text' : 'white--text'"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end justify-space-between">
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
                    <h5>상품명</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="상품명"
                        v-model="productObj.name"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="5" class="ma-0 pa-0 ml-4">
                    <h5>해시태그</h5>
                    <v-combobox
                        v-model="productObj.hashtag"
                        :items="productObj.hashtag"
                        multiple
                        chips
                        closable-chips
                        clearable
                        dense
                        hide-details
                        outlined
                    />
                </v-col>
                <v-spacer />
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 pr-4">
                    <h5>할인 전 가격</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="할인 전 가격"
                        v-model="productObj.p_discount"
                        suffix="원"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 pr-4">
                    <h5>상품 판매가</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="상품 판매가"
                        v-model="productObj.p_sell"
                        suffix="원"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 pr-4">
                    <h5>구독 가격</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="구독 가격"
                        v-model="productObj.p_subscribe"
                        suffix="원"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 pr-4">
                    <h5>상품 할인율</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="상품 할인율"
                        v-model="productObj.p_discount_per"
                        suffix="%"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </v-col>
                <v-spacer/>
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
                    <h5>배송비</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="배송비"
                        v-model="productObj.delivery_fee"
                        suffix="원"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 ml-4">
                    <h5>배송 메모</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="배송 메모"
                        v-model="productObj.delivery_memo"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2" class="ma-0 pa-0 ml-4">
                    <h5>인큐텐 여부</h5>
                    <v-btn-toggle 
                        v-model="productObj.isIQT"
                        mandatory
                        dense
                        rounded
                    >
                        <v-btn 
                            v-for="(obj, index) in IQTObj"
                            :key="index"
                            :color="color"
                            :value="obj.value"
                            :outlined="obj.value != productObj.isIQT"
                            class="px-4"
                            :class="obj.value != productObj.isIQT ? 'black--text' : 'white--text'"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 my-2">
                <v-col cols="12" sm="5" md="5" class="ma-0 pa-0 mr-4">
                    <h5>카테고리</h5>
                    <v-combobox
                        v-model="productObj.category"
                        :items="categories"
                        multiple
                        chips
                        closable-chips
                        clearable
                        dense
                        hide-details
                        outlined
                    >
                    </v-combobox>
                </v-col>
                <v-col cols="12" sm="5" md="5" class="ma-0 pa-0">
                    <h5>카테고리 상세</h5>
                    <v-combobox
                        v-model="productObj.category_detail"
                        :items="category_detail"
                        multiple
                        chips
                        closable-chips
                        clearable
                        dense
                        hide-details
                        outlined
                    >
                    </v-combobox>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="6" md="6" class="ma-0 pa-0">
                    <h5>건강설문 추천 사항</h5>
                    <v-combobox
                        v-model="productObj.survey_recomand"
                        :items="questionsObj"
                        multiple
                        chips
                        closable-chips
                        clearable
                        dense
                        hide-details
                        outlined
                    >
                    </v-combobox>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
                    <h5>상품 상세 설명</h5>
                    <div class="product_detail elevation-2">
                        <Editor ref="editor" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-footer class="ma-0 pa-2 justify-end">
            <v-btn color="warning" @click="clickCancel">취소</v-btn>
            <v-btn class="ml-2" color="success" @click="clickDone">저장</v-btn>
        </v-footer>
        <v-dialog v-model="showDetailPopup" class="elevation-0" style="overflow:none;">
            <ImageDetail ref="imageDetail" :items="imageList" :currentIndex="currentIndex" @close-detail="closeDetail"/>
        </v-dialog>
    </v-card>
</template>
<script>

import Editor from '@/components/admin/Editor.vue'
import moment from 'moment'
import _ from 'lodash'
import ImageDetail from '@/components/admin/ImageDetail.vue'
export default {
    components: { Editor, ImageDetail },
    props: ['obj'],
    data() {
        return {
            productObj : {
                no: null,
                name: null,
                i_r: null,
                i_list: [],
                p_sell: null,
                p_discount: null,
                p_discount_per: null,
                p_subscribe: null,
                delivery_fee: null,
                delivery_memo: null,
                hashtag: [],
                category: [],
                category_detail: [],
                isIQT: null,
                survey_recomand: [],
                content: null,
                alive: 1,
                status: 1,
                part: 1
            },
            color: "primary",//this.$vuetify.theme.themes.light.basicColor,
            profileImage: null,
            files: [],
            filesUrls: [],
            prevFiles: [],
            currFiles: [],
            statusObj: [
                {text:"비활성", value: 2},
                {text:"판매중", value: 1},
                {text:"매진", value: 3},
            ],
            hashtags: [],
            categories: [
                "헬스케어",
                "퍼스널케어",
                "의료기기",
                "여성건강",
                "관절,뼈",
                "피로,활력",
                "간건강",
                "변비,장건강",
                "위,소화",
                "남성건강",
                "눈건강",
                "면역력",
                "유,소아건강",
                "다이어트",
                "노화,황산화",
                "모발,두피",
                "강아지",
                "고양이",
                "반려동물용품",
                "기타반려동물",
            ],
            category_detail: [
                "강아지사료",
                "강아지간식",
                "강아지영양제",
                "강아지위생용품",
                "강아지미용/패션용품",
                "고양이사료",
                "고양이간식",
                "고양이영양제",
                "고양이위생용품",
                "고양이미용/패션용품",
                "반려동물영양제",
                "장난감/훈련용품",
                "식기/급수기",
                "하우스/안전용품",
                "외출용품",
                "기타반려동물용품",
                "햄스터/토끼용품",
                "조류용품",
                "관상어용품",
                "곤충용품",
            ],
            IQTObj: [
                {text:"해당", value: 1},
                {text:"미해당", value: 2},
            ],
            questionsObj: [
                "면역",
                "순환",
                "소화",
                "장관",
                "뇌신경",
                "호르몬",
                "호흡",
                "비뇨",
                "골격",
                "피부모발",
            ],
            partObj: [
                {text:"일반 상품", value: 1},
                {text:"펫 상품", value: 2},
            ],
            content: '',
            hostUrl: process.env.BASE_URL,
            imageList: [],
            currentIndex: 0,
            showDetailPopup: false,
        }
    },
    mounted() {
        this.$refs.editor.setContents("", 'product')
        this.selectProduct()  
    },
    methods: {
        closeDetail() {
            this.showDetailPopup = !this.showDetailPopup
            this.imageList = []
            this.currentIndex = 0
        },
        showImageDetail() {
            this.currentIndex = 0
            this.imageList.push(this.productObj.i_r)
            this.showDetailPopup = !this.showDetailPopup
        },
        showImageDetails(index) {
            this.currentIndex = index
            this.imageList = this.productObj.i_list
            this.showDetailPopup = !this.showDetailPopup
        },
        async selectProduct() {
            if (this.obj != null) {
                let conditions = []
                conditions.push({"q":"=","f":"no","v":this.obj.no})
                conditions.push({"q":"order","f":"no","o":"ASC"})
                let param = {table:"product", conditions: conditions}
                await this.$axios.post('/admin/select', param).then(async res => {
                    if (res.data.length > 0) {
                        console.log(res.data)
                        res.data.filter(item => {
                            if (!this.validateVariableExist(item.i_r)) item.i_r = JSON.parse(item.i_r)
                            if (!this.validateVariableExist(item.i_list)) item.i_list = JSON.parse(item.i_list)
                            if (!this.validateVariableExist(item.hashtag)) item.hashtag = JSON.parse(item.hashtag)
                            else item.hashtag = null
                            if (!this.validateVariableExist(item.survey_recomand)) item.survey_recomand = JSON.parse(item.survey_recomand)
                            if (!this.validateVariableExist(item.category)) item.category = JSON.parse(item.category)
                            else item.category = null
                            if (!this.validateVariableExist(item.category_detail)) item.category_detail = JSON.parse(item.category_detail)
                            else item.category_detail = null
                        })
                        this.productObj = res.data[0]
                        console.log(this.productObj)
                        this.$refs.editor.setContents(this.productObj.content, 'product')
                        if (this.productObj.i_r?.length > 0) {
                            this.profileImage = await this.convertUrl(this.profileImageUrl(this.productObj.i_r[0]))
                        }
                        if (this.productObj.i_list?.length > 0) {
                            for (const i of this.productObj.i_list) {
                                let url = this.imgRequire(i)
                                let image = await this.convertUrl(url)
                                this.files.push(image)
                                this.filesUrls.push(url)
                            }
                            this.prevFiles = this.files
                        }
                    }
                }).catch(err => {
                    console.log("err : ", err)
                })
            }
        },
        async clickDone() {
            this.content = this.$refs.editor.editor.getHTML()
            
            if (this.productObj.no != null || this.productObj.no != undefined) {
                this.updateProduct()
            } else {
                this.insertProduct()
            }
            
        },
        clickCancel() {
            this.$emit('click-close', 'product')
        },
        deleteImg() {
            /// 이미지 삭제
            this.productObj.i_r = null
        },
        fileInfo() {
            this.productObj.i_r = URL.createObjectURL(this.profileImage)
        },
        profileImageUrl(url) {
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
        deleteProductImage(index) {
            this.files.splice(index, 1)
            this.filesUrls.splice(index, 1)
        },
        fileAdded() {
            Object.assign(this.currFiles, this.prevFiles)
            
            if (this.files.length + this.currFiles.length <= 10) {
                this.files.push(...this.currFiles)
                this.prevFiles = this.files
                this.currFiles = []
            }
            else {
                this.files = this.currFiles
                this.currFiles = []
            }
            this.filesUrls = []
            for (const file of this.files) {
                this.filesUrls.push(URL.createObjectURL(file))
            }
        },
        imgRequire(src) {
            if(src != null || src != undefined || src != '') {
                if (src.includes("http")) return url
                else return "https://self-care.kr/"+src
            }
            else return src
        },
        validateVariableExist(value) {
            return (value == null || value == undefined || value == '' || value == "[]" || value == [])
        },
        insertProduct () {
            let param = {
                name:this.productObj.name,
                p_sell:this.productObj.p_sell,
                p_discount:this.productObj.p_discount,
                p_discount_per:this.productObj.p_discount_per,
                p_subscribe: this.productObj.p_subscribe,
                delivery_fee:this.productObj.delivery_fee,
                delivery_memo:this.productObj.delivery_memo,
                hashtag:JSON.stringify(this.productObj.hashtag),
                category:JSON.stringify(this.productObj.category),
                category_detail:JSON.stringify(this.productObj.category_detail),
                isIQT:this.productObj.isIQT,
                survey_recomand:JSON.stringify(this.productObj.survey_recomand),
                content:this.content,
                part:this.productObj.part,
                table: 'product',
            }
            
            for (const [key, value] of Object.entries(param)) {
                if (this.validateVariableExist(value)) delete param[key]
            }
            this.$axios.post('/admin/insert', param).then(async res => {
                if (res.data.length > 0) {
                    this.productObj = _.cloneDeep(res.data[0])
                    if (!this.validateVariableExist(this.profileImage)) {
                        await this.updateImage(this.profileImage, 'i_r')
                    } 
                    if (!this.validateVariableExist(this.files)) {
                        await this.updateImage(this.files, 'i_list')
                    }
                    alert('저장되었습니다.')
                    this.clickCancel()
                }
            }).catch(err => {
                console.log("insert err : ", err)
            })
        },
        updateProduct() {
            let param = {
                no: this.productObj.no,
                name:this.productObj.name,
                p_sell:this.productObj.p_sell,
                p_discount:this.productObj.p_discount,
                p_discount_per:this.productObj.p_discount_per,
                p_subscribe: this.productObj.p_subscribe,
                delivery_fee:this.productObj.delivery_fee,
                delivery_memo:this.productObj.delivery_memo,
                hashtag:JSON.stringify(this.productObj.hashtag),
                category:JSON.stringify(this.productObj.category),
                category_detail:JSON.stringify(this.productObj.category_detail),
                isIQT:this.productObj.isIQT,
                survey_recomand:JSON.stringify(this.productObj.survey_recomand),
                content:this.content,
                part:this.productObj.part,
                table: 'product',
                conditions:[{q:"=",f:"no",v:this.productObj.no}]
            }
            console.log('isIQT ',this.productObj.isIQT)
            for (const [key, value] of Object.entries(param)) {    
                console.log(value)
                if (this.validateVariableExist(value)) delete param[key]
            }
            console.log(param.hashtag)
            this.$axios.post('/admin/update', param).then(async res => {
                if (!this.validateVariableExist(this.profileImage)) {
                    await this.updateImage(this.profileImage, 'i_r')
                } 
                if (!this.validateVariableExist(this.files)) {
                    await this.updateImage(this.files, 'i_list')
                }
                alert('저장되었습니다.')
                this.clickCancel()
            }).catch(err => {
                console.log("update err : ", err)
            })
        },
        async updateImage(obj, text) {
            let formData = new FormData()
            formData.append('imageParam', text)
            formData.append('no', this.productObj.no)
            formData.append('table', 'product')
            formData.append('conditions', JSON.stringify([{q:"=",f:"no",v:this.productObj.no}]))
            if (obj.length > 0) {
                for (const file of obj) 
                    formData.append('files', file)
            } else {
                formData.append('files', obj)
            }

            await this.$axios.post('/admin/updateMultipart', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => {
            }).catch(err => {
                console.log("multipart error : ", err);
            })
        },
        removeAllFiles() {
            this.files = []
            this.filesUrls = []
        },
        async convertUrl(url){
            const response =  await fetch(url);
            const data =  await response.blob();
            const ext = await url.split(".").pop();
            const filename = await url.split("/").pop()
            const metadata = { type: `image/${ext}` };
            return new File([data], filename, metadata);
        },
    }
}
</script>
<style scoped>
.main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
    
}
.product_image {
    width: 160px !important;
    height: 200px !important;
    background-size: cover;
    background-position: center;
    border: 1px solid #ccc !important;
    overflow: initial;
    flex:none;
    margin: 0px 16px 0px 0px;
}
div.scroll-container {
    overflow-y: hidden;
    overflow-x: auto;
    display:flex;
    flex-wrap: nowrap;
}
.product_detail {
    /* height: 200px; */
    width: 1000px;
}
div::v-deep .tiptap {
    overflow: auto ;
    min-height: 300px ;
    max-height: 300px ;
    padding: 16px;
}
</style>