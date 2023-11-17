<template>
    <v-card >
        <v-app-bar flat >
            <v-card-title class="ma-0 pa-0">고객 후기 수정</v-card-title>
        </v-app-bar>
        <v-container class="ma-0 pa-5 review_main_container">
            <v-row class="ma-0 pa-0 my-4" >
                <v-col class="ma-0 pa-0">
                    <h3>별점을 선택해주세요.</h3>
                    <v-rating
                        empty-icon="mdi-star-outline"
                        full-icon="mdi-star"
                        half-icon="mdi-star-half-full"
                        hover
                        length="5"
                        size="48"
                        background-color="orange lighten-3"
                        color="orange"
                        v-model="reviewObj.score"
                    ></v-rating>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
                    <h3>리뷰 내용을 작성해주세요.</h3>
                    <div class="elevation-1">
                        <v-textarea 
                            v-model="reviewObj.content"
                            hide-details
                            outlined
                            dense
                            no-resize
                        >
                        </v-textarea>
                    </div>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-center" >
                <v-col cols="12" sm="12" md="12" class="ma-0 pa-0 ">
                    <v-row class="ma-0 pa-0 align-center">
                        <h3>상품과 관련된 사진을 업로드 해주세요.</h3>
                        <v-spacer />
                        <v-file-input
                            multiple
                            class="ma-0 pa-0"
                            accept="image/*"
                            v-model="files"
                            hide-spin-buttons 
                            hide-details
                            rounded
                            dense
                            prepend-icon="mdi-plus"
                            @change="fileAdded"
                            label="이미지 추가"
                            outlined
                        >
                        </v-file-input>
                    </v-row>
                    <div
                        class="scroll-container"
                    >
                        <v-img 
                            v-for="(obj, index) in filesUrls"
                            :key="index"
                            class="review_image"
                            contain
                            :src="obj != null ? obj : ''"
                            @click="showImageDetails(index)"
                        >
                            <v-btn class="elevation-2" icon depressed @click.stop="deleteProductImage(index)" style="backgroundColor:gray;" dark>
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                            <!-- <template v-slot:item.actions="{item}">
                                <v-btn class="elevation-2" icon depressed @click.stop="deleteProductImage(index)" style="backgroundColor:gray;" dark>
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </template> -->
                        </v-img>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-footer class="ma-0 pa-2 justify-end">
            <v-btn color="error" @click="clickDelete" v-if="reviewObj.no != null">삭제</v-btn>
            <v-btn class="ml-2" color="warning" @click="clickCancel">취소</v-btn>
            <v-btn class="ml-2" color="success" @click="clickDone">저장</v-btn>
        </v-footer>
        <v-dialog v-model="showDetailPopup" class="elevation-0" style="overflow:none;">
            <ImageDetail ref="imageDetail" :items="imageList" :currentIndex="currentIndex" @close-detail="closeDetail"/>
        </v-dialog>
    </v-card>
</template>
<script>

import _ from 'lodash'
import moment from 'moment'
import ImageDetail from '@/components/admin/ImageDetail.vue'
export default {
    components: { ImageDetail },
    props: ['obj'],
    data() {
        return {
            reviewObj : {
                no: null,
                u_name: null,
                u_no: null,
                p_name: null,
                p_no: null,
                i_list: [],
                content: null,
                score: null,
                cd: null,
                ed: null
            },
            color: this.$vuetify.theme.themes.light.basicColor,
            hostUrl: process.env.BASE_URL,
            files: [],
            filesUrls: [],
            prevFiles: [],
            currFiles: [],
            imageList: [],
            currentIndex: 0,
            showDetailPopup: false,
        }
    },
    mounted() {
        this.selectReview()  
    },
    methods: {
        async selectReview() {
            if (this.obj != null) {
                let conditions = []
                conditions.push({"q":"=","f":"no","v":this.obj.no})
                conditions.push({"q":"order","f":"no","o":"ASC"})
                let param = {table:"review", conditions: conditions}
                await this.$axios.post('/admin/select', param).then(async res => {
                    if (res.data.length > 0) {
                        res.data.filter(item => {
                            if (!this.validateVariableExist(item.i_list)) item.i_list = JSON.parse(item.i_list)
                        })
                        this.reviewObj = res.data[0]
                        if (this.reviewObj.i_list?.length > 0) {
                            for (const i of this.reviewObj.i_list) {
                                let url = this.profileImageUrl(i)
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
            } else {
                alert('해당 리뷰의 key 값이 없습니다.')
                this.clickCancel()
            }
        },
        async clickDone() {
            if (this.reviewObj.no != null || this.reviewObj.no != undefined) {
                this.update()
            } 
        },
        clickCancel() {
            this.$emit('click-close', 'review')
        },
        deleteProductImage(index) {
            this.files.splice(index, 1)
            this.filesUrls.splice(index, 1)
        },
        profileImageUrl(url) {
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
        
        fileAdded() {
            Object.assign(this.currFiles, this.prevFiles)

            if (this.files.length + this.currFiles.length <= 4) {
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
        closeDetail() {
            this.showDetailPopup = !this.showDetailPopup
            this.imageList = []
            this.currentIndex = 0
        },
        showImageDetails(index) {
            this.currentIndex = index
            this.imageList = this.reviewObj.i_list
            this.showDetailPopup = !this.showDetailPopup
        },
        deleteMagazineImage(index) {
            this.profileImage = null
            this.reviewObjObj.image = null
        },
        validateVariableExist(value) {
            return (value == null || value == undefined || value == '[]' || ( value != null && typeof value == "object" && !Object.keys(value).length ))
        },
        update() {
            let param = {
                no: this.reviewObj.no,
                score:Number(this.reviewObj.score),
                content:this.reviewObj.content,
                table: 'review',
                conditions:[{q:"=",f:"no",v:this.reviewObj.no}]
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            this.$axios.post('/admin/update', param).then(async res => {
                if (!this.validateVariableExist(this.files)) {
                    await this.updateImage(this.files, 'i_list')
                }
                alert('저장되었습니다.')
                this.clickCancel()
                
            }).catch(err => {
                console.log("update err : ", err)
            })
        },
        clickDelete() {
            let param = {
                no: this.reviewObj.no,
                alive: 0,
                table: 'review',
                conditions:[{q:"=",f:"no",v:this.reviewObj.no}]
            }
            this.$axios.post('/admin/update', param).then(res => {
                alert('삭제되었습니다')
                this.clickCancel()
            }).catch(err => {
                console.log("update err : ", err)
            })
        },
        async updateImage(obj, text) {
            let formData = new FormData()
            formData.append('imageParam', text)
            formData.append('no', this.reviewObj.no)
            formData.append('table', 'review')
            formData.append('conditions', JSON.stringify([{q:"=",f:"no",v:this.reviewObj.no}]))
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
.review_main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
    padding: 10px;
}
.review_image {
    width: 160px !important;
    height: 160px !important;
    background-size: cover;
    background-position: center;
    border: 1px solid #ccc !important;
    overflow: initial;
    flex:none;
    margin: 0px 16px 0px 0px;
}

div::v-deep .tiptap {
    height: fit-content ;
    min-height: 290px ;
    max-height: 290px ;
    padding: 16px;
    overflow: auto ;
}
div.scroll-container {
    overflow-y: hidden;
    overflow-x: auto;
    display:flex;
    flex-wrap: nowrap;
}
</style>