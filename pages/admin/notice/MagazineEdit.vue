<template>
    <v-card >
        <v-app-bar flat >
            <v-card-title class="ma-0 pa-0">매거진 {{magazineObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="main_container ma-0 pa-5">
            <v-row class="ma-0 pa-0 align-center my-2" >
                <v-col cols="12" sm="2" md="2" class="ma-0 pa-0 ">
                    <h3>대표 이미지</h3>
                </v-col>
                <v-col cols="12" sm="9" md="9" class="ma-0 pa-0">
                    <h3>타이틀</h3>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-start my-2" >
                <v-col cols="12" sm="2" md="2" class="ma-0 pa-0 ">
                    <div
                        class="magazine_image"
                        :style="magazineObj.image != null ? {backgroundImage: 'url('+profileImageUrl(magazineObj.image)+')'} : ''"
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
                            <v-btn icon large depressed @click="deleteMagazineImage(index)" style="backgroundColor:gray;" dark v-if="magazineObj.image != null">
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" sm="9" md="9" class="ma-0 pa-0">
                    <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
                        <v-text-field 
                            dense
                            hide-details
                            outlined
                            placeholder="타이틀"
                            class="basic-text-field"
                            v-model="magazineObj.title"
                        >
                        </v-text-field>
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
            hashtags: []
        }
    },
    mounted() {
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
                console.log(this.obj)
                Object.assign(this.magazineObj, this.obj)
                this.$refs.editor.setContents(this.magazineObj.content, 'magazine')
                this.profileImage = this.magazineObj.image
                this.hashtags = this.magazineObj.hashtag
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
            console.log(index, "삭제")
        },
        validateVariableExist(value) {
            return (value == null || value == undefined || value == '' || value == '[]')
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
            console.log(param)
            this.$axios.post('/admin/insert', param).then(res => {
                console.log(res.data)
                if (res.data.length > 0) {
                    this.magazineObj.no = res.data[0].no
                    if (!this.validateVariableExist(this.profileImage)) {
                        this.updateImage(this.profileImage, 'image')
                    }
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
            console.log(param)
            this.$axios.post('/admin/update', param).then(res => {
                console.log(res.data)
                if (!this.validateVariableExist(this.profileImage)) {
                    this.updateImage(this.profileImage, 'image')
                }
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
            }).then(res => {
                console.log("multipart response : ", res);
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
<style lang="scss">
.main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
}
.magazine_image_row {
    flex-direction: row; 
    display:flex;
    align-items: center;
}
.magazine_row {
    flex-direction: row; 
    display:flex;
    align-items: flex-end;
    margin-top: 16px;
    margin-bottom: 16px;
    width: 100%;
}
.magazine_title_row {
    flex-direction: row; 
    display:inline-flex;
    align-items: center;
    height: 54px;
}
.magazine_main_iamge_title {
    width: 160px;
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
.magazine_title_component {
    flex-direction: column;
    align-items: center;
}
div.scroll-container {
    overflow-y: hidden;
    overflow-x: auto;
    display:flex;
    flex-wrap: nowrap;
}
.magazine_title_with_contents {
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
.magazine_detail {
    /* height: 200px; */
    width: 1360px;
}
.tiptap {
    height: fit-content;
    min-height: 200px;
    max-height: 200px;
    padding: 16px;
}
.selection_text_field {
    max-width: 68px;
}
.header_line {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-left: 0.5px solid #ccc;
    border-right: 0.5px solid #ccc;
}
</style>