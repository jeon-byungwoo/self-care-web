<template>
    <v-card >
        <v-app-bar flat >
            <v-card-title class="ma-0 pa-0">상품정보 {{productObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="main_container ma-0 pa-5">
            <v-row class="ma-0 pa-0 align-center my-2" >
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 ">
                    <h3>대표 이미지</h3>
                </v-col>
                <v-col cols="12" sm="9" md="9" class="ma-0 pa-0">
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
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 ">
                    <div
                        class="product_image"
                        :style="productObj.i_r != null ? {backgroundImage: 'url('+profileImageUrl(productObj.i_r)+')'} : ''"
                    >
                        <v-row class="ma-0 pa-0 ">
                            <v-file-input
                                ref="multi_image_input"
                                class="ma-0 pa-2"
                                id="imageUp"
                                accept="image/*"
                                v-model="profileImage"
                                hide-spin-buttons 
                                hide-input 
                                hide-details
                                @change="fileInfo"
                                dark
                                rounded
                                dense
                                prepend-icon="mdi-paperclip"
                                :center-affix="true"
                                style="width:44px; height: 44px; backgroundColor:gray;"
                            >
                            </v-file-input>
                            <v-btn icon large depressed @click="deleteProductImage(index)" style="backgroundColor:gray;" dark v-if="productObj.i_r != null">
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" sm="9" md="9" class="ma-0 pa-0">
                    <div
                        class="scroll-container"
                    >
                        <div
                            v-for="(obj, index) in filesUrls"
                            :key="index"
                            class="product_image"
                            :style="obj != null ? {backgroundImage: 'url('+obj+')'} : ''"
                        >
                            <v-btn icon large depressed @click="deleteProductImage(index)" style="backgroundColor:gray;" dark>
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end justify-space-between">
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
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
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 ml-4">
                    <h5>상품명</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="상품명"
                        class="basic-text-field"
                        v-model="productObj.name"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="5" class="ma-0 pa-0 ml-4">
                    <h5>해시태그</h5>
                    <v-autocomplete
                        chips
                        closable-chips 
                        dense
                        hide-details
                        outlined
                        placeholder="해시태그"
                        clearable
                        :items="hashtags"
                        multiple
                        @keyup.enter="addHashtag"
                        v-model="productObj.hashtag"
                        density="comfortable"
                    >
                        <template v-slot:item="{ item, on, attrs }">
                            <v-list-item v-on="on" v-bind="attrs" >
                                <v-list-item-content>
                                    <v-list-item-title>                      
                                        <v-chip dark color="blue"> {{ item }} </v-chip>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <template v-slot:chip="{ props, item }">
                            <v-chip
                                dark
                                color="blue"
                                dense
                                small
                                v-bind="props"
                            >{{item}}</v-chip>
                        </template>
                    </v-autocomplete>
                </v-col>
                <v-spacer />
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
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
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 ml-4">
                    <h5>상품 할인가</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="상품 할인가"
                        v-model="productObj.p_discount"
                        suffix="원"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 ml-4">
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
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 ml-4">
                    <h5>카테고리</h5>
                    <v-select 
                        dense
                        hide-details
                        outlined
                        v-model="productObj.category"
                        :items="categories"
                    >
                    </v-select>
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
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="6" md="6" class="ma-0 pa-0">
                    <h5>건강설문 추천 사항</h5>
                    <v-combobox
                        v-model="productObj.survay_recomand"
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
    </v-card>
</template>
<script>

import Editor from '@/components/admin/Editor.vue'
import _ from 'lodash'
export default {
    components: { Editor },
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
                delivery_fee: null,
                delivery_memo: null,
                hashtag: [],
                category: null,
                isIQT: null,
                survay_recomand: [],
                content: null,
                alive: 1,
                status: 1,
                part: null
            },
            color: this.$vuetify.theme.themes.light.basicColor,
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
                {text: "", value:null},
                {text: "비타민", value:"vitamin"},
                {text: "영양제", value:"nutrition"},
                {text: "개껌", value:"dogsgum"},
            ],
            IQTObj: [
                {text:"해당", value: 1},
                {text:"미해당", value: 0},
            ],
            questionsObj: [
                {text:"면역 - 양호 x", value:"면역 - 양호 x"},
                {text:"면역 - 경계 x", value:"면역 - 경계 x"},
            ],
            content: '',
            hostUrl: process.env.BASE_URL,
        }
    },
    mounted() {
        this.selectProduct()  
    },
    methods: {
        async selectProduct() {
            if (this.obj != null) {
                Object.assign(this.productObj, this.obj)
                this.$refs.editor.setContents(this.productObj.content, 'product')
                if (this.productObj.i_r.length > 0) {
                    this.profileImage = this.productObj.i_r[0]
                }
                if (this.productObj.i_list.length > 0) {
                    // this.files = this.productObj.i_list
                    for (const i of this.productObj.i_list) {
                        let url = this.imgRequire(i)
                        let image = await this.convertUrl(url)
                        this.files.push(image)
                        this.filesUrls.push(url)
                    }
                }
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
        addHashtag(event) {
            if (this.productObj.hashtag == null) this.productObj.hashtag = []
            if (!this.hashtags.includes(event.target.value)) {
                this.hashtags.push(event.target.value)
                this.productObj.hashtag.push(`${event.target.value}`)
            }
            
        },
        validateVariableExist(value) {
            return (value == null || value == undefined || value == '' || value == '[]')
        },
        insertProduct () {
            let param = {
                name:this.productObj.name,
                p_sell:this.productObj.p_sell,
                p_discount:this.productObj.p_discount,
                p_discount_per:this.productObj.p_discount_per,
                delivery_fee:this.productObj.delivery_fee,
                delivery_memo:this.productObj.delivery_memo,
                hashtag:JSON.stringify(this.productObj.hashtag),
                category:this.productObj.category,
                isIQT:this.productObj.isIQT,
                survay_recomand:JSON.stringify(this.productObj.survay_recomand),
                content:this.content,
                part:this.productObj.part,
                table: 'product',
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            this.$axios.post('/admin/insert', param).then(res => {
                if (res.data.length > 0) {
                    this.productObj = _.cloneDeep(res.data[0])
                    if (!this.validateVariableExist(this.profileImage)) {
                        this.updateImage(this.profileImage, 'i_r')
                    } 
                    if (!this.validateVariableExist(this.files)) {
                        this.updateImage(this.files, 'i_list')
                    }
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
                delivery_fee:this.productObj.delivery_fee,
                delivery_memo:this.productObj.delivery_memo,
                hashtag:JSON.stringify(this.productObj.hashtag),
                category:this.productObj.category,
                isIQT:this.productObj.isIQT,
                survay_recomand:JSON.stringify(this.productObj.survay_recomand),
                content:this.content,
                part:this.productObj.part,
                table: 'product',
                conditions:[{q:"=",f:"no",v:this.productObj.no}]
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }

            this.$axios.post('/admin/update', param).then(res => {
                if (!this.validateVariableExist(this.profileImage)) {
                    this.updateImage(this.profileImage, 'i_r')
                } 
                if (!this.validateVariableExist(this.files)) {
                    this.updateImage(this.files, 'i_list')
                }
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
                console.log("multipart response : ", res);
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
<style lang="scss">
.main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
}
.product_image_row {
    flex-direction: row; 
    display:flex;
    align-items: center;
}
.product_row {
    flex-direction: row; 
    display:flex;
    align-items: flex-end;
    margin-top: 16px;
    margin-bottom: 16px;
    width: 100%;
}
.product_title_row {
    flex-direction: row; 
    display:inline-flex;
    align-items: center;
    height: 54px;
}
.product_main_iamge_title {
    width: 160px;
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
.product_title_component {
    flex-direction: column;
    align-items: center;
}
div.scroll-container {
    overflow-y: hidden;
    overflow-x: auto;
    display:flex;
    flex-wrap: nowrap;
}
.product_title_with_contents {
    flex-direction: column;  
    display:flex;
    margin-right: 16px;
}
.basic-text-field {
    margin: 4px 8px 0px 8px;
    height: 40px;
}
.autocomplete_hashtag {
    margin: 4px 8px 0px 8px;
    width: 400px; 
    height: 40px;
}
.product_detail {
    /* height: 200px; */
    width: 1060px;
}
.tiptap {
    height: fit-content;
    min-height: 300px;
    padding: 16px;
}
</style>