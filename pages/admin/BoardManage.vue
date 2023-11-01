<template>
    <div>
        <v-data-table 
            :headers="headers"
            :items="items"
            class="elevation-1"
            disable-sort
            item-key="no"
            @click:row="clickRow"
        >
            <template v-slot:top>
                <v-row class="ma-0 pa-2 d-flex align-center justify-end" >
                    <v-btn 
                        dense
                        color="#2D7DC8"
                        dark
                        @click="addNotice"
                        class="ml-4"
                    >
                        게시글 추가
                    </v-btn>
                </v-row>
            </template>
            <template v-slot:[`item.category`]="{item}">
                {{item.category == 1 ? '공지사항' : '언론보도'}}
            </template>
        </v-data-table>
        <v-dialog
            v-model="boardPopup"
            max-width="1400"
            persistent
        >
            <BoardEdit
                v-if="boardPopup"
                @click-close="closePopup"
                :obj="selectedBoard"
            />
        </v-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import BoardEdit from '@/pages/admin/notice/BoardEdit'
export default {
    components: {BoardEdit},
    layout: 'Admin',
    name: 'NoticeManagePage',
    data() {
        return {
            items: [],
            headers: [
                {text:"No", value: "no", align: "center", width: '5%'},
                {text:"구분", value: "category", align: "center"},
                {text:"우선순위", value: "priority", align: "center"},
                {text:"타이틀", value: "title", align: "center", width: '50%'},
                {text:"작성일시", value: "cd", align: "center"}
            ],
            boardPopup: false,
            selectedBoard: null,
            stateObj: [
                {text: "공지사항", value: 1},
                {text: "언론보도", value: 2},
            ]
        }
    },
    mounted() {
        this.selectBoard()
    },
    methods: {
        async selectBoard() {
            let conditions = []
            conditions.push({"q":"=","f":"alive","v":1})
            conditions.push({"q":"board","f":"no","o":"DESC"})
            let param = {table:"board", conditions: conditions}
            
            await this.$axios.post('/admin/select', param).then(res => {
                res.data.filter(item => {
                    item.cd = moment(item.cd).format('YYYY-MM-DD')
                })
                this.items = res.data
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        clickRow(item) {
            this.selectedBoard = item
            this.boardPopup = !this.boardPopup
        },
        addNotice() {
            this.boardPopup = !this.boardPopup
        },
        closePopup(type) {
            this.selectedBoard = null
            if (type == 'board') {
                this.boardPopup = !this.boardPopup
                this.selectBoard()
            }
        },
    }
}
</script>
<style >
</style>