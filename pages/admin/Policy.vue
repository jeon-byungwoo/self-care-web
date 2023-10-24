<template>
    <v-col class="ma-0 pa-0">
        <v-toolbar flat class="ma-0 pa-0"> 
            <v-toolbar-title>이용약관</v-toolbar-title>
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
    name: 'PolicyPage',
    data() {
        return {
            content: '',
        }
    },
    mounted() {
        this.$refs.editor.setContents(this.content, 'site')
    },
    methods: {
        async selectSite() {
            let conditions = []
            conditions.push({"q":"=","f":"alive","v":1})
            
            conditions.push({"q":"site","f":"no","o":"DESC"})
            let param = {table:"site", conditions: conditions}
            
            await this.$axios.post('/admin/select', param).then(res => {
                console.log("res.data : ", res.data)
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        savePolicy() {

        }
    }
}
</script>
<style scopted>
.tiptap {
    padding: 16px;
    min-height: 84vh;
    overflow-y: auto;
}
.editor_cover {
    width: 1220px;
    margin: auto;
}
</style>