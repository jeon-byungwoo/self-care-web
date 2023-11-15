<template>
    <v-card >
        <v-app-bar flat >
            <v-card-title class="ma-0 pa-0">공지사항 {{boardObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="main_container ma-0 pa-5">
            <v-row class="ma-0 pa-0 py-2">
                <v-col cols="12" sm="8" md="8" class="ma-0 pa-0">
                    <h5>공지사항 타이틀</h5>
                    <v-text-field 
                        dense
                        hide-details
                        outlined
                        placeholder="공지사항 타이틀"
                        v-model="boardObj.title"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end py-2">
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0 pr-4">
                    <h5>우선순위</h5>
                    <v-select 
                        :items="priorityObj"
                        v-model="boardObj.priority"
                        dense
                        hide-details
                        outlined
                    >
                    </v-select>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="ma-0 pa-0">
                    <v-btn-toggle 
                        mandatory
                        v-model="boardObj.category"
                        dense
                    >
                        <v-btn
                            v-for="(obj, index) in stateObj"
                            :key="index"
                            color="#2D7DC8"
                            :value="obj.value"
                            :outlined="boardObj.category != obj.value"
                            class="mx-3 px-3 elevation-1"
                            style="border-radius:30px;"
                            :style="boardObj.category != obj.value ? 'color:#000;' : 'color:#fff;'"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 align-end py-2">
                <v-col cols="12" sm="12" md="12" class="ma-0 pa-0">
                    <div class="inquiry_detail elevation-2">
                        <Editor ref="editor" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-footer class="ma-0 pa-2 justify-end">
            <v-btn color="error" @click="clickDelete" v-if="boardObj.no != null">삭제</v-btn>
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
            boardObj : {
                no: null,
                category: null,
                title: null,
                content: null,
                priority: null,
                cd: null,
                ed: null
            },
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
            color: this.$vuetify.theme.themes.light.basicColor,
            content: '',
            hostUrl: process.env.BASE_URL,
            stateObj: [
                {text: "소식", value: 1},
                {text: "공지사항", value: 2},
                {text: "언론보도", value: 3},
            ]
        }
    },
    mounted() {
        this.$refs.editor.setContents("", 'board')
        this.selectBoard()  
    },
    methods: {
        async selectBoard() {
            if (this.obj != null) {
                let conditions = []
                conditions.push({"q":"=","f":"no","v":this.obj.no})
                conditions.push({"q":"order","f":"no","o":"ASC"})
                let param = {table:"board", conditions: conditions}
                await this.$axios.post('/admin/select', param).then(res => {
                    if (res.data.length > 0) {
                        this.boardObj = res.data[0]
                        this.$refs.editor.setContents(this.boardObj.content, 'board')
                    }
                }).catch(err => {
                    console.log("err : ", err)
                })
            }
        },
        async clickDone() {
            this.content = this.$refs.editor.editor.getHTML()
            
            if (this.boardObj.no != null || this.boardObj.no != undefined) {
                this.update()
            } else {
                this.insert()
            }
            
        },
        clickCancel() {
            this.$emit('click-close', 'board')
        },
        validateVariableExist(value) {
            return (value == null || value == undefined || value == '' || value == '[]')
        },
        insert () {
            let param = {
                title:this.boardObj.title,
                category:this.boardObj.category,
                priority: this.boardObj.priority,
                content:this.content,
                alive: 1,
                table: 'board',
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            console.log(param)
            this.$axios.post('/admin/insert', param).then(res => {
                console.log(res.data)
                if (res.data.length > 0) {
                    this.boardObj.no = res.data[0].no
                    this.clickCancel()
                    alert('저장되었습니다.')
                }
            }).catch(err => {
                console.log("insert err : ", err)
            })
        },
        update() {
            let param = {
                no: this.boardObj.no,
                title:this.boardObj.title,
                category:this.boardObj.category,
                priority: this.boardObj.priority,
                content:this.content,
                table: 'board',
                conditions:[{q:"=",f:"no",v:this.boardObj.no}]
            }
            
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            this.$axios.post('/admin/update', param).then(res => {
                console.log(res.data)
                this.clickCancel()
                alert('저장되었습니다.')
            }).catch(err => {
                console.log("update err : ", err)
            })
        },
        clickDelete() {
            let param = {
                no: this.boardObj.no,
                alive: 0,
                table: 'board',
                conditions:[{q:"=",f:"no",v:this.boardObj.no}]
            }
            this.$axios.post('/admin/update', param).then(res => {
                alert('삭제되었습니다')
                this.clickCancel()
            }).catch(err => {
                console.log("update err : ", err)
            })
        },
    }
}
</script>
<style scoped>
.board_main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
}
.inquiry_detail {
    /* height: 200px; */
    width: 1360px;
}
div::v-deep .tiptap {
    height: fit-content ;
    min-height: 395px ;
    max-height: 395px ;
    padding: 16px;
    overflow: auto;
}

</style>