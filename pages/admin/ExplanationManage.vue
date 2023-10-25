<template>
    <div>
        <v-toolbar flat class="ma-0 pa-0"> 
            <v-toolbar-title>건강설문 해설 관리</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn 
                dense
                color="#2D7DC8"
                dark
                @click="save"
                class="ma-0 pa-0"
            >
                저장
            </v-btn>
        </v-toolbar>
        <v-col cols="12" sm="12" md="12" class="ma-0 pa-4">
            <h4>해설 항목</h4>
            <v-btn-toggle
                v-model="selectedValue" 
                mandatory
                color="#2D7DC8"
                @change="selectInquiry"
            >
                <v-btn 
                    v-for="(obj, index) in items"
                    :key="index"
                    :value="obj.value"
                    class="pa-6"
                    
                >
                    {{obj.text}}
                </v-btn>
            </v-btn-toggle>
        </v-col>
        <v-row class="ma-0 pa-4 align-center">
            <v-col cols="12" sm="1" md="1" class="ma-0 pa-0">
                <v-row class="ma-0 pa-0 pr-4">
                    <div class="mx-auto">양호</div>
                </v-row>
            </v-col>
            <v-col cols="12" sm="11" md="11" class="ma-0 pa-0">
                <div class="elevation-2">
                    <Editor ref="level_1"/>
                </div>
            </v-col>
        </v-row>
        <v-row class="ma-0 pa-4 align-center">
            <v-col cols="12" sm="1" md="1" class="ma-0 pa-0">
                <v-row class="ma-0 pa-0 pr-4 ">
                    <div class="mx-auto">보통</div>
                </v-row>
            </v-col>
            <v-col cols="12" sm="11" md="11" class="ma-0 pa-0">
                <div class="elevation-2">
                    <Editor ref="level_2"/>
                </div>
            </v-col>
        </v-row>
        <v-row class="ma-0 pa-4 align-center">
            <v-col cols="12" sm="1" md="1" class="ma-0 pa-0">
                <v-row class="ma-0 pa-0 pr-4">
                    <div class="mx-auto">경계</div>
                </v-row>
            </v-col>
            <v-col cols="12" sm="11" md="11" class="ma-0 pa-0">
                <div class="elevation-2">
                    <Editor ref="level_3"/>
                </div>
            </v-col>
        </v-row>
        <v-row class="ma-0 pa-4 align-center">
            <v-col cols="12" sm="1" md="1" class="ma-0 pa-0">
                <v-row class="ma-0 pa-0 pr-4">
                    <div class="mx-auto">주의</div>
                </v-row>
            </v-col>
            <v-col cols="12" sm="11" md="11" class="ma-0 pa-0">
                <div class="elevation-2">
                    <Editor ref="level_4"/>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import moment from 'moment'
import Editor from '@/components/admin/Editor.vue'
export default {
    components: {Editor},
    layout: 'Admin',
    name: 'ExplanationManagePage',
    data() {
        return {
            items: [
                {text:"면역", value:"면역"},
                {text:"순환", value:"순환"},
                {text:"소화", value:"소화"},
                {text:"장관", value:"장관"},
                {text:"뇌신경", value:"뇌신경"},
                {text:"호르몬", value:"호르몬"},
                {text:"호흡", value:"호흡"},
                {text:"비뇨", value:"비뇨"},
                {text:"골격", value:"골격"},
                {text:"피부,모발", value:"피부모발"},
            ],
            selectedValue: "면역",
            contentObjs: [],
        }
    },
    mounted() {
        this.selectInquiry()
    },
    methods: {
        async selectInquiry() {
            let conditions = []
            conditions.push({"q":"=", "f":"part", "v":this.selectedValue})
            conditions.push({"q":"survey_comment","f":"no","o":"DESC"})
            let param = {table:"survey_comment", conditions: conditions}
            await this.$axios.post('/admin/select', param).then(res => {
                this.contentObjs = res.data
                this.contentObjs.forEach(obj => {
                    if (obj.lv == '양호') this.$refs.level_1.setContents(obj.content, 'survey_comment')
                    if (obj.lv == '보통') this.$refs.level_2.setContents(obj.content, 'survey_comment')
                    if (obj.lv == '경계') this.$refs.level_3.setContents(obj.content, 'survey_comment')
                    if (obj.lv == '주의') this.$refs.level_4.setContents(obj.content, 'survey_comment')
                })
                
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        save() {
            for (const obj of this.contentObjs) {
                if (obj.lv == '양호') obj.content = this.$refs.level_1.editor.getHTML()
                if (obj.lv == '보통') obj.content = this.$refs.level_2.editor.getHTML()
                if (obj.lv == '경계') obj.content = this.$refs.level_3.editor.getHTML()
                if (obj.lv == '주의') obj.content = this.$refs.level_4.editor.getHTML()
                
                if (obj.content != "" || obj.content != null)
                    this.updateComment(obj)
            }
        },
        updateComment(obj) {
            let param = {
                no: obj.no,
                content: obj.content,
                table: 'survey_comment',
                conditions:[{q:"=",f:"no",v:obj.no}]
            }
            this.$axios.post('/admin/update', param).then(res => {
                
            }).catch(err => {
                console.log("update err : ", err)
            })
        }
    }
}
</script>
<style scopted>
.tiptap {
    padding: 16px;
    min-height: 200px;
    max-height: 200px;
    overflow-y: auto;
}
</style>