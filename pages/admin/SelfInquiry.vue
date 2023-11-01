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
                        @click="addInquiry"
                        class="ml-4"
                    >
                        자가진단 추가
                    </v-btn>
                </v-row>
            </template>
            <template v-slot:[`item.survey`]="{item}">
                {{item.survey?.length}}
            </template>
        </v-data-table>
        <v-dialog
            v-model="inquiryPopup"
            max-width="1400"
            persistent
        >
            <InquiryEdit
                v-if="inquiryPopup"
                @click-close="closePopup"
                :obj="selectedInquiry"
            />
        </v-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import InquiryEdit from '@/pages/admin/notice/InquiryEdit'
export default {
    components: {InquiryEdit},
    layout: 'Admin',
    name: 'SelfInquiryPage',
    data() {
        return {
            items: [],
            headers: [
                {text:"No", value: "no", align: "center", width: '5%'},
                {text:"우선순위", value: "priority", align: "center"},
                {text:"문항 수", value: "survey", align: "center"},
                {text:"타이틀", value: "title", align: "center"},
                {text:"해설", value: "survey_comment", align: "center", width: '50%'},
                {text:"작성일자", value: "cd", align: "center"}
            ],
            inquiryPopup: false,
            selectedInquiry: null,
        }
    },
    mounted() {
        this.selectInquiry()
    },
    methods: {
        async selectInquiry() {
            let conditions = []
            conditions.push({"q":"=","f":"alive","v":1})
            conditions.push({"q":"test","f":"no","o":"DESC"})
            let param = {table:"test", conditions: conditions}
            
            await this.$axios.post('/admin/select', param).then(res => {
                res.data.filter(item => {
                    if (item.image != null && item.image != undefined) item.image = JSON.parse(item.image)
                    if (item.survey != null && item.survey != undefined) item.survey = JSON.parse(item.survey)
                    item.cd = moment(item.cd).format('YYYY-MM-DD')
                })
                this.items = res.data
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        addInquiry() {
            this.inquiryPopup = !this.inquiryPopup
        },
        closePopup(type) {
            this.selectedInquiry = null
            if (type == 'inquiry') {
                this.inquiryPopup = !this.inquiryPopup
                this.selectInquiry()
            }
        },
        clickRow(item) {
            this.selectedInquiry = item
            this.inquiryPopup = !this.inquiryPopup
        }
    }
}
</script>
<style scopted>
</style>