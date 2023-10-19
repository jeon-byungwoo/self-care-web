<template>
    <v-card class="main_card">
        <v-app-bar flat class="app_bar">
            <v-card-title class="app_bar_title">상품정보 {{productObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="main_container">
            <div class="product_image_row">
                <div class="product_title_row">
                    <div class="product_main_iamge_title">
                        <h3>대표 이미지</h3>
                    </div>
                    <div class="product_image_row ml-6">
                        <h5>제품 이미지</h5>
                        <v-file-input
                            multiple
                            placeholder="최대 10장의 이미지 등록 가능합니다"
                            counter
                            outlined
                            :show-size="1000"
                            v-model="files"
                            dense
                            hide-details
                            style="width: 600px;"
                            @change="fileAdded"
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
                    </div>
                </div>
                
            </div>
            <div class="product_image_row">
                <div class="product_title_component">
                    <div
                        class="product_image"
                        :style="productObj.i_r != null ? {backgroundImage: 'url('+profileImageUrl(productObj.i_r)+')'} : ''"
                    >
                        <v-file-input
                            ref="multi_image_input"
                            class="profile_image"
                            id="imageUp"
                            accept="image/*"
                            v-model="profileImage"
                            hide-spin-buttons 
                            hide-input 
                            hide-details
                            @change="fileInfo"
                            dark
                            style="width:46px; height: 46px;"
                        />
                    </div>
                </div>
                <div
                    class="scroll-container ml-4"
                >
                    <div
                        v-for="(obj, index) in files"
                        :key="index"
                        class="product_image"
                        :style="obj != null ? {backgroundImage: 'url('+createFileUrl(obj)+')'} : ''"
                    >
                        <v-btn icon large depressed @click="deleteProductImage(index)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="product_row">
                <div class="product_title_with_contents">
                    <v-btn-toggle 
                        v-model="productObj.status"
                        mandatory
                        dense
                        rounded
                        class="basic-text-field"
                    >
                        <v-btn 
                            v-for="(obj, index) in statusObj"
                            :key="index"
                            :color="color"
                            :value="obj.value"
                            :outlined="obj.value != productObj.status"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </div>
                <div class="product_title_with_contents">
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
                </div>
                <div class="product_title_with_contents">
                    <h5>해시태그</h5>
                    <v-autocomplete
                        chips
                        closable-chips 
                        dense
                        hide-details
                        outlined
                        placeholder="해시태그"
                        clearable
                        class="autocomplete_hashtag"
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
                </div>
            </div>
            <div class="product_row">
                <div class="product_title_with_contents">
                    <h5>상품 판매가</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="상품 판매가"
                        class="basic-text-field"
                        v-model="productObj.p_sell"
                        suffix="원"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </div>
                <div class="product_title_with_contents">
                    <h5>상품 할인가</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="상품 할인가"
                        class="basic-text-field"
                        v-model="productObj.p_discount"
                        suffix="원"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </div>
                <div class="product_title_with_contents">
                    <h5>상품 할인율</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="상품 할인율"
                        class="basic-text-field"
                        v-model="productObj.p_discount_per"
                        suffix="%"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="product_row">
                <div class="product_title_with_contents">
                    <h5>배송비</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="배송비"
                        class="basic-text-field"
                        v-model="productObj.delivery_fee"
                        suffix="원"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                </div>
                <div class="product_title_with_contents">
                    <h5>배송 메모</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="배송 메모"
                        class="basic-text-field"
                        v-model="productObj.delivery_memo"
                    >
                    </v-text-field>
                </div>
                <div class="product_title_with_contents">
                    <h5>카테고리</h5>
                    <v-select 
                        dense
                        hide-details
                        outlined
                        class="basic-text-field"
                        v-model="productObj.category"
                        :items="categories"
                    >
                    </v-select>
                </div>
                <div class="product_title_with_contents">
                    <h5>인큐텐 여부</h5>
                    <v-btn-toggle 
                        v-model="productObj.isIQT"
                        mandatory
                        dense
                        rounded
                        class="basic-text-field"
                    >
                        <v-btn 
                            v-for="(obj, index) in IQTObj"
                            :key="index"
                            :color="color"
                            :value="obj.value"
                            :outlined="obj.value != productObj.isIQT"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </div>
            </div>
            <div class="product_row">
                <div class="product_title_with_contents">
                    <h5>건강설문 추천 사항</h5>
                    <v-combobox
                        v-model="productObj.survay_recomand"
                        :items="questionsObj"
                        multiple
                        chips
                        closable-chips
                        class="autocomplete_hashtag"
                        clearable
                        dense
                        hide-details
                        outlined
                    >
                    </v-combobox>
                </div>
            </div>
            <div class="product_row">
                <div class="product_title_with_contents">
                    <h5>상품 상세 설명</h5>
                    <div class="product_detail">
                        <Editor ref="editor" 
                        />
                    </div>
                </div>
            </div>
        </v-container>
        <v-footer class="footer">
            <v-btn color="warning" @click="clickCancel">취소</v-btn>
            <v-btn class="btn_done" color="success" @click="clickDone">저장</v-btn>
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
            content: null,
            
        }
    },
    mounted() {
        // selectProduct = () => {
        //     this.$axios.post('/admin/select', {
        //         table: 'product',
        //         conditions: [{"q":"=", "f":"no", "v":obj.no}]
        //     })
        // }
        this.selectProduct()  
    },
    methods: {
        selectProduct() {
            if (this.obj != null) {
                Object.assign(this.productObj, this.obj)
                this.$refs.editor.setContent(this.productObj.content)
                this.profileImage = this.productObj.i_r
            }
        },
        async clickDone() {
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
        createFileUrl(file) {
            let url = URL.createObjectURL(file)
            return this.profileImageUrl(url)
        },
        profileImageUrl(url) {
            if(url.includes('http://')) return url
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
        },
        imgRequire(src) {
            if(!this.$isEmpty(src)) return "https://self-care.kr/"+src
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
                content:this.$refs.editor.content,
                part:this.productObj.part,
                table: 'product',
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            console.log(param)
            this.$axios.post('/admin/insert', param).then(res => {
                console.log("insert res : ", res.data)
                if (res.data.length > 0) {
                    this.productObj = _.cloneDeep(res.data[0])
                    console.log("this.productObj : ", this.productObj)
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
                content:this.$refs.editor.content,
                part:this.productObj.part,
                table: 'product',
                conditions:[{q:"=",f:"no",v:this.productObj.no}]
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            console.log("update param : ", param)
            this.$axios.post('/admin/update', param).then(res => {
                console.log("update res : ", res)
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
            if (obj.length > 0) {
                for (const file of obj) 
                    formData.append('files', file)
            } else {
                formData.append('files', obj)
            }
            
            formData.append('conditions', JSON.stringify([{q:"=",f:"no",v:this.productObj.no}]))

            await this.$axios.post('/admin/updateMultipart', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => {
                console.log("multipart response : ", res);
            }).catch(err => {
                console.log("multipart error : ", err);
            })
        },
    }
}
</script>
<style lang="scss">
.main_card {
    margin: 0px;
    padding: 0px;
}
.app_bar {
    margin: 0px;
    padding: 0px;
}
.app_bar_title {
    margin: 0px;
    padding: 0px;
}
.main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
    margin: 0px;
    padding: 20px;
    max-width: none;
}
.footer {
    margin: 0px;
    padding: 16px;
    flex:1;
    justify-content: end;
}
.btn_done {
    margin-left: 8px;
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
    width: 860px;
}
.tiptap-vuetify-editor__content {
    .ProseMirror {
        height: 300px;
        max-height: 300px;
    }
}
// .tiptap-vuetify-editor__content .ProseMirror {
    
// }
</style>