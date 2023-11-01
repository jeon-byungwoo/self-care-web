<template>
    <v-col class="ma-0 pa-0">
        <v-toolbar flat class="ma-0 pa-0"> 
            <v-toolbar-title>개인정보 처리방침</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn 
                dense
                color="#2D7DC8"
                dark
                @click="savePolicy"
                class="ma-0 pa-0"
            >
                저장
            </v-btn>
        </v-toolbar>
        
        <div class="pa-4">
            <div class="elevation-2 editor_cover">
                <Editor ref="editor"/>
            </div>
        </div>
    </v-col>
</template>
<script>
import Editor from '@/components/admin/Editor.vue'
export default {
    components: {Editor},
    layout: 'Admin',
    name: 'PersonalPolicyPage',
    data() {
        return {
            content: '',
            policyObj: {
                no: null,
                term: null,
                policy: null
            }
        }
    },
    mounted() {
        this.selectSite()
        
    },
    methods: {
        async selectSite() {
            let param = {table:"site"}
            
            await this.$axios.post('/admin/select', param).then(res => {
                if (res.data.length > 0) {
                    this.policyObj = res.data[0]
                    this.$refs.editor.setContents(this.policyObj.policy, 'site')
                }
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        async savePolicy() {
            this.content = this.$refs.editor.editor.getHTML()
            
            if (this.content == null || this.content == '' || this.content == undefined) {
                alert("내용을 입력해주세요.")
                return
            }
            let url = '/admin/update'
            let param = {
                table: 'site',
                policy: this.content,
                conditions:[{q:"=",f:"no",v:this.policyObj.no}]
            }
            await this.$axios.post(url, param).then(res => {
                console.log("res : ", res)
                alert('저장되었습니다.')
            }).catch(err => {
                console.log("err : ", err)
            })
        }
    }
}
</script>
<style scoped>
div::v-deep .tiptap {
    padding: 16px;
    min-height: 84vh ;
    max-height: 84vh ;
    overflow-y: auto;
}
.editor_cover {
    width: 1220px;
    margin: auto;
}
</style>