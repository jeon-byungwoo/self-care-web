<template>
    <v-card >
        <v-app-bar flat >
            <v-card-title class="ma-0 pa-0">매거진 {{magazineObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="ma-0 pa-5 magazine_main_container">
            <v-row class="ma-0 pa-0 align-center" >
                <v-col cols="12" sm="2" md="2" class="ma-0 pa-0 ">
                    <v-row class="ma-0 pa-0 align-center">
                        <h3>대표 이미지</h3>
                        <v-spacer/>
                        <v-file-input
                            ref="multi_image_input"
                            class="ma-0 pa-2"
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
                    <h3>타이틀</h3>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-start my-4" >
                <v-col cols="12" sm="2" md="2" class="ma-0 pa-0 ">
                    <v-img 
                        class="magazine_image"
                        contain
                        :src="magazineObj.image != null ? profileImageUrl(magazineObj.image) : ''"
                    >
                        <v-btn class="elevation-2" icon depressed @click="deleteMagazineImage(index)" style="backgroundColor:gray;" dark v-if="magazineObj.image != null">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-img>
                </v-col>
                <v-col cols="12" sm="10" md="10" class="ma-0 pa-0">
                    <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
                        <v-text-field 
                            dense
                            hide-details
                            outlined
                            placeholder="타이틀"
                            v-model="magazineObj.title"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
                    <v-btn-toggle 
                        mandatory
                        v-model="magazineObj.category"
                        dense
                    >
                        <v-btn
                            v-for="(obj, index) in stateObj"
                            :key="index"
                            color="#2D7DC8"
                            :value="obj.value"
                            :outlined="magazineObj.category != obj.value"
                            class="mx-3 px-3 elevation-1"
                            style="border-radius:30px;"
                            :style="magazineObj.category != obj.value ? 'color:#000;' : 'color:#fff;'"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                    <h4 class="my-2">해시태그</h4>
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
                        v-model="magazineObj.hashtag"
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
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
                    <div class="magazine_detail elevation-2">
                        <Editor ref="editor" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-footer class="ma-0 pa-2 justify-end">
            <v-btn color="error" @click="clickDelete" v-if="magazineObj.no != null">삭제</v-btn>
            <v-btn class="ml-2" color="warning" @click="clickCancel">취소</v-btn>
            <v-btn class="ml-2" color="success" @click="clickDone">저장</v-btn>
        </v-footer>
    </v-card>
</template>
<script>

import Editor from '@/components/admin/Editor.vue'
import _ from 'lodash'
import moment from 'moment'
export default {
    components: { Editor },
    props: ['obj'],
    data() {
        return {
            magazineObj : {
                no: null,
                title: null,
                hashtag: null,
                content: null,
                image: null,
                alive: 1,
                cd: null,
                ed: null
            },
            color: this.$vuetify.theme.themes.light.basicColor,
            profileImage: null,
            content: '',
            hostUrl: process.env.BASE_URL,
            hashtags: [],
            stateObj: [
                {text: "라이프", value: 1},
                {text: "영양성분", value: 2},
                {text: "후기", value: 3},
            ]
        }
    },
    mounted() {
        this.$refs.editor.setContents("", 'magazine')
        this.selectMagazine()  
    },
    methods: {
        addHashtag(event) {
            if (this.magazineObj.hashtag == null) this.magazineObj.hashtag = []
            if (!this.hashtags.includes(event.target.value)) {
                this.hashtags.push(event.target.value)
                this.magazineObj.hashtag.push(`${event.target.value}`)
            }
        },
        async selectMagazine() {
            if (this.obj != null) {
                let conditions = []
                conditions.push({"q":"=","f":"no","v":this.obj.no})
                conditions.push({"q":"order","f":"no","o":"ASC"})
                let param = {table:"magazine", conditions: conditions}
                await this.$axios.post('/admin/select', param).then(async res => {
                    if (res.data.length > 0) {
                        res.data.filter(item => {
                            if (!this.validateVariableExist(item.image)) item.image = JSON.parse(item.image)
                            if (!this.validateVariableExist(item.hashtag)) item.hashtag = JSON.parse(item.hashtag)
                        })
                        this.magazineObj = res.data[0]
                        this.$refs.editor.setContents(this.magazineObj.content, 'magazine')
                        if (this.magazineObj.image?.length > 0)
                            this.profileImage = await this.convertUrl(this.profileImageUrl(this.magazineObj.image[0]))
                        this.hashtags = this.magazineObj.hashtag
                    }
                }).catch(err => {
                    console.log("err : ", err)
                })
            }
        },
        async clickDone() {
            this.content = this.$refs.editor.editor.getHTML()
            
            if (this.magazineObj.no != null || this.magazineObj.no != undefined) {
                this.update()
            } else {
                this.insert()
            }
            
        },
        clickCancel() {
            this.$emit('click-close', 'magazine')
        },
        fileInfo() {
            this.magazineObj.image = URL.createObjectURL(this.profileImage)
        },
        profileImageUrl(url) {
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
        deleteMagazineImage(index) {
            this.profileImage = null
            this.magazineObj.image = null
        },
        validateVariableExist(value) {
             return (value == null || value == undefined || value == '[]')
        },
        insert () {
            let param = {
                title:this.magazineObj.title,
                hashtag:JSON.stringify(this.magazineObj.hashtag),
                content:this.content,
                alive:1,
                table: 'magazine',
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            this.$axios.post('/admin/insert', param).then(async res => {
                if (res.data.length > 0) {
                    this.magazineObj.no = res.data[0].no
                    if (!this.validateVariableExist(this.profileImage)) {
                        await this.updateImage(this.profileImage, 'image')
                    } 
                    alert('저장되었습니다.')
                    this.clickCancel()
                }
            }).catch(err => {
                console.log("insert err : ", err)
            })
        },
        update() {
            let param = {
                no: this.magazineObj.no,
                title:this.magazineObj.title,
                hashtag:JSON.stringify(this.magazineObj.hashtag),
                content:this.content,
                table: 'magazine',
                conditions:[{q:"=",f:"no",v:this.magazineObj.no}]
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            this.$axios.post('/admin/update', param).then(async res => {
                if (!this.validateVariableExist(this.profileImage)) {
                    await this.updateImage(this.profileImage, 'image')
                } 
                alert('저장되었습니다.')
                this.clickCancel()
            }).catch(err => {
                console.log("update err : ", err)
            })
        },
        clickDelete() {
            let param = {
                no: this.magazineObj.no,
                alive: 0,
                table: 'magazine',
                conditions:[{q:"=",f:"no",v:this.magazineObj.no}]
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
            formData.append('no', this.magazineObj.no)
            formData.append('table', 'magazine')
            formData.append('conditions', JSON.stringify([{q:"=",f:"no",v:this.magazineObj.no}]))
            if (obj.length > 0) {
                for (const file of obj) 
                    formData.append('files', file)
            } else {
                formData.append('files', obj)
            }

            await this.$axios.post('/admin/updateMultipart', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(async res => {
                // alert('저장되었습니다.'); 
                // this.clickCancel()
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
.magazine_main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
    padding: 10px;
}
.magazine_image {
    width: 160px !important;
    height: 200px !important;
    background-size: cover;
    background-position: center;
    border: 1px solid #ccc !important;
    overflow: initial;
    flex:none;
    margin: 0px 16px 0px 0px;
}

.magazine_detail {
    width: 1360px;
}
div::v-deep .tiptap {
    height: fit-content ;
    min-height: 290px ;
    max-height: 290px ;
    padding: 16px;
    overflow: auto ;
}
</style>