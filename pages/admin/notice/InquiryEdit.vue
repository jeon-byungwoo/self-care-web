<template>
    <v-card >
        <v-app-bar flat >
            <v-card-title class="ma-0 pa-0">자가진단 {{inquiryObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="inquiry_main_container ma-0 pa-5">
            <v-row class="ma-0 pa-0 align-center my-2" >
                <v-col cols="12" sm="10" md="10" class="ma-0 pa-0">
                    <h3>타이틀</h3>
                </v-col>
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
            </v-row>
            <v-row class="ma-0 pa-0 align-start my-2" >
                <v-col cols="12" sm="10" md="10" class="ma-0 pa-0">
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="타이틀"
                        class="mr-8"
                        v-model="inquiryObj.title"
                    >
                    </v-text-field>
                    <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 mt-5">
                        <h5>우선순위</h5>
                        <v-select 
                            dense
                            hide-details
                            outlined
                            v-model="inquiryObj.priority"
                            :items="priorityObj"
                        >
                        </v-select>
                    </v-col>
                </v-col>
                <v-col cols="12" sm="2" md="2" class="ma-0 pa-0 ">
                    <v-img 
                        class="inquiry_image"
                        contain
                        :src="inquiryObj.image != null ? profileImageUrl(inquiryObj.image) : ''"
                    >
                        <v-btn class="elevation-2" icon depressed @click="deleteInquiryImage(index)" style="backgroundColor:gray;" dark v-if="inquiryObj.image != null">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-img>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
                    <h5>설문 설명</h5>
                    <div class="inquiry_detail elevation-2">
                        <Editor ref="editor" />
                    </div>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
                    <v-row class="ma-0 pa-0 justify-space-between align-center my-2">
                        <h5>설문</h5>
                        <v-btn
                            dense
                            color="#2D7DC8"
                            dark
                            @click="addNew"
                            class="ml-4"
                        >
                            설문 항목 추가
                        </v-btn>
                    </v-row>
                    <v-simple-table
                        fixed-header
                        :hide-default-footer="true"
                        class="elevation-2"
                    >
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center header_line" style="width: 80px;">
                                        번호
                                    </th>
                                    <th class="text-center header_line" style="width: 250px;">
                                        문항
                                    </th>
                                    <th class="text-center header_line" >
                                        <v-col class="ma-0 pa-0">
                                            <v-row class="ma-0 pa-0 align-center justify-center">
                                                선택지1
                                            </v-row>
                                            <v-row class="ma-0 pa-0 align-center justify-space-around">
                                                <div>항목</div>
                                                <div>점수</div>
                                            </v-row>
                                        </v-col>
                                    </th>
                                    <th class="text-center header_line" >
                                        <v-col class="ma-0 pa-0">
                                            <v-row class="ma-0 pa-0 align-center justify-center">
                                                선택지2
                                            </v-row>
                                            <v-row class="ma-0 pa-0 align-center justify-space-around">
                                                <div>항목</div>
                                                <div>점수</div>
                                            </v-row>
                                        </v-col>
                                    </th>
                                    <th class="text-center header_line" >
                                        <v-col class="ma-0 pa-0">
                                            <v-row class="ma-0 pa-0 align-center justify-center">
                                                선택지3
                                            </v-row>
                                            <v-row class="ma-0 pa-0 align-center justify-space-around">
                                                <div>항목</div>
                                                <div>점수</div>
                                            </v-row>
                                        </v-col>
                                    </th>
                                    <th class="text-center header_line" >
                                        <v-col class="ma-0 pa-0">
                                            <v-row class="ma-0 pa-0 align-center justify-center">
                                                선택지4
                                            </v-row>
                                            <v-row class="ma-0 pa-0 align-center justify-space-around">
                                                <div>항목</div>
                                                <div>점수</div>
                                            </v-row>
                                        </v-col>
                                    </th>
                                    <th class="text-center header_line" >
                                        <v-col class="ma-0 pa-0">
                                            <v-row class="ma-0 pa-0 align-center justify-center">
                                                선택지5
                                            </v-row>
                                            <v-row class="ma-0 pa-0 align-center justify-space-around">
                                                <div>항목</div>
                                                <div>점수</div>
                                            </v-row>
                                        </v-col>
                                    </th>
                                    <th class="text-center header_line" style="width:105px;">
                                        비고
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="surveyList?.length == 0" class="header_line">
                                <tr>
                                    <th colspan="8" class="pa-0 text-center">
                                        설문 항목이 없습니다.
                                    </th>
                                </tr>
                            </tbody>
                            <tbody v-else >
                                <tr
                                    v-for="(item, index) in surveyList"
                                    :key="index"
                                >
                                    <td class="text-center" style="width: 80px;">
                                        <v-text-field 
                                            dense
                                            hide-details
                                            placeholder="번호"
                                            v-model="item.priority"
                                        >
                                        </v-text-field>
                                    </td>
                                    <td class="text-center">
                                        <v-text-field 
                                            dense
                                            hide-details
                                            placeholder="문항"
                                            v-model="item.content"
                                        >
                                        </v-text-field>
                                    </td>
                                    <td class="text-center ma-0 pa-0">
                                        <v-row class="ma-0 pa-0 align-center justify-space-around">
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="항목"
                                                v-model="item.selection1.text"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="점수"
                                                v-model="item.selection1.value"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                        </v-row>
                                    </td>
                                    <td class="text-center ma-0 pa-0">
                                        <v-row class="ma-0 pa-0 align-center justify-space-around">
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="항목"
                                                v-model="item.selection2.text"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="점수"
                                                v-model="item.selection2.value"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                        </v-row>
                                    </td>
                                    <td class="text-center ma-0 pa-0">
                                        <v-row class="ma-0 pa-0 align-center justify-space-around">
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="항목"
                                                v-model="item.selection3.text"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="점수"
                                                v-model="item.selection3.value"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                        </v-row>
                                    </td>
                                    <td class="text-center ma-0 pa-0">
                                        <v-row class="ma-0 pa-0 align-center justify-space-around">
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="항목"
                                                v-model="item.selection4.text"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="점수"
                                                v-model="item.selection4.value"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                        </v-row>
                                    </td>
                                    <td class="text-center ma-0 pa-0">
                                        <v-row class="ma-0 pa-0 align-center justify-space-around">
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="항목"
                                                v-model="item.selection5.text"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                            <v-text-field 
                                                dense
                                                hide-details
                                                placeholder="점수"
                                                v-model="item.selection5.value"
                                                class="mx-2 selection_text_field"
                                            >
                                            </v-text-field>
                                        </v-row>
                                    </td>
                                    <td class="text-center" style="width:105px;">
                                        <v-btn 
                                            color="error"
                                            class="ma-0 pa-0"
                                            dense
                                            dark
                                            @click="deleteSurvay(item)"
                                        >
                                            삭제
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end my-2">
                <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
                    <h5>설문 해설</h5>
                    <div class="inquiry_detail elevation-2">
                        <Editor ref="explanationEditor" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-footer class="ma-0 pa-2 justify-end">
            <v-btn color="error" @click="clickDelete" v-if="inquiryObj.no != null">삭제</v-btn>
            <v-btn class="ml-2" color="warning" @click="clickCancel">취소</v-btn>
            <v-btn class="ml-2" color="success" @click="clickDone">저장</v-btn>
        </v-footer>
    </v-card>
</template>
<script>
import moment from 'moment'
import Editor from '@/components/admin/Editor.vue'
import _ from 'lodash'
export default {
    components: { Editor },
    props: ['obj'],
    data() {
        return {
            inquiryObj : {
                no: null,
                title: null,
                priority: null,
                content: null,
                survey: [],
                survey_comment: null,
                image: null,
                alive: 1,
                cd: null,
                ed: null
            },
            color: this.$vuetify.theme.themes.light.basicColor,
            profileImage: null,
            content: '',
            explanationContent: '',
            hostUrl: process.env.BASE_URL,
            priorityObj: [
                {text: "1", value: 1},
                {text: "2", value: 2},
                {text: "3", value: 3},
                {text: "4", value: 4},
                {text: "5", value: 5},
                {text: "6", value: 6},
                {text: "7", value: 7},
                {text: "8", value: 8},
                {text: "9", value: 9},
                {text: "10", value: 10},
            ],
            surveyList: [],
            surveyObj: {
                no: null,
                priority: null,
                content: null,
                selection1: {
                    text:null,
                    value:null,
                },
                selection2: {
                    text:null,
                    value:null,
                },
                selection3: {
                    text:null,
                    value:null,
                },
                selection4: {
                    text:null,
                    value:null,
                },
                selection5: {
                    text:null,
                    value:null,
                }
            }
        }
    },
    mounted() {
        this.$refs.editor.setContents("", 'test')
        this.selectInquiry()  
    },
    methods: {
        deleteSurvay(obj) {
            this.surveyList = _.filter(this.surveyList, survey => { return survey.no != obj.no })
        },
        addNew() {
            let no = Math.max(...this.surveyList.map(survey => survey.no))
            let obj = _.cloneDeep(this.surveyObj)
            obj.no = this.surveyList.length > 0 ? no + 1 : 0
            this.surveyList.push(obj)
        },
        async selectInquiry() {
            if (this.obj != null) {
                let conditions = []
                conditions.push({"q":"=","f":"no","v":this.obj.no})
                conditions.push({"q":"order","f":"no","o":"ASC"})
                let param = {table:"test", conditions: conditions}
                await this.$axios.post('/admin/select', param).then(async res => {
                    
                    if (res.data.length > 0) {
                        res.data.filter(item => {
                            if (!this.validateVariableExist(item.image)) item.image = JSON.parse(item.image)
                            if (!this.validateVariableExist(item.survey)) item.survey = JSON.parse(item.survey)
                        })
                        this.inquiryObj = res.data[0]
                        
                        this.$refs.editor.setContents(this.inquiryObj.content, 'test')
                        this.$refs.explanationEditor.setContents(this.inquiryObj.survey_comment, 'test')
                        if (this.inquiryObj.image?.length > 0)
                            this.profileImage = await this.convertUrl(this.profileImageUrl(this.inquiryObj.image[0]))
                        
                        this.surveyList = this.inquiryObj.survey
                    }
                }).catch(err => {
                    console.log("err : ", err)
                })
            }
        },
        async clickDone() {
            this.content = this.$refs.editor.editor.getHTML()
            this.explanationContent = this.$refs.explanationEditor.editor.getHTML()
            
            if (this.inquiryObj.no != null || this.inquiryObj.no != undefined) {
                this.update()
            } else {
                this.insert()
            }
            
        },
        clickCancel() {
            this.$emit('click-close', 'inquiry')
        },
        fileInfo() {
            this.inquiryObj.image = URL.createObjectURL(this.profileImage)
        },
        profileImageUrl(url) {
            if(url.includes('http')) return url
            else return `${this.hostUrl}${url}`
        },
        deleteInquiryImage(index) {
            this.profileImage = null
            this.inquiryObj.image = null
        },
        validateVariableExist(value) {
            return (value == null || value == undefined || value == '[]')
        },
        insert () {
            let param = {
                title:this.inquiryObj.title,
                priority:this.inquiryObj.priority,
                content:this.content,
                survey:JSON.stringify(this.surveyList),
                survey_comment:this.explanationContent,
                alive:1,
                table: 'test',
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            this.$axios.post('/admin/insert', param).then(async res => {
                
                if (res.data.length > 0) {
                    this.inquiryObj.no = res.data[0].no
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
                no: this.inquiryObj.no,
                title:this.inquiryObj.title,
                priority:this.inquiryObj.priority,
                content:this.content,
                survey:JSON.stringify(this.surveyList),
                survey_comment:this.explanationContent,
                alive: this.inquiryObj.alive,
                table: 'test',
                conditions:[{q:"=",f:"no",v:this.inquiryObj.no}]
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            if (this.profileImage == null) {
                param.image = null
            }
            this.$axios.post('/admin/update', param).then(async res => {
                if (!this.validateVariableExist(this.profileImage)) {
                    await this.updateImage(this.profileImage, 'image')
                } 
                alert('저장되었습니다.'); this.clickCancel()
            }).catch(err => {
                console.log("update err : ", err)
            })
        },
        clickDelete() {
            let param = {
                no: this.inquiryObj.no,
                alive: 0,
                table: 'test',
                conditions:[{q:"=",f:"no",v:this.inquiryObj.no}]
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
            formData.append('no', this.inquiryObj.no)
            formData.append('table', 'test')
            formData.append('conditions', JSON.stringify([{q:"=",f:"no",v:this.inquiryObj.no}]))
            if (obj.length > 0) {
                for (const file of obj) 
                    formData.append('files', file)
            } else {
                formData.append('files', obj)
            }
            await this.$axios.post('/admin/updateMultipart', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(async res => {
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
.inquiry_main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
    .inquiry_image {
        width: 160px !important;
        height: 200px !important;
        background-size: contain;
        background-position: center;
        border: 1px solid #ccc !important;
        overflow: initial;
        flex:none;
        margin: 0px 16px 0px 0px;
    }
    .inquiry_detail {
        /* height: 200px; */
        width: 1360px;
        .tiptap {
            height: fit-content !important;
            min-height: 200px !important;
            max-height: 200px !important;
            padding: 16px;
            overflow: auto;
        }
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
}



</style>