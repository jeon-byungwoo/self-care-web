<template>
    <v-data-table
        :headers="headers"
        :items="itemList"
        class="elevation-1"
        @click:row="editItem"
        disable-sort
        item-key="no"
    >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>문의 관리</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1000px" style="overflow:hidden;">
                <v-card style="overflow:hidden;">
                    <v-app-bar flat>
                        <v-card-title>
                            {{ formTitle }}
                        </v-card-title>
                    </v-app-bar>
                    <v-col>
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete
                                    v-model="editedItem.status"
                                    label="접수상황"
                                    :items="['접수', '대응 완료', '보류']"
                                    hide-details
                                    outlined
                                    dense
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-btn
                                    dense
                                >답변 제출(메일 전송)</v-btn>
                            </v-col>
                        </v-row> 
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    v-model="editedItem.u_name"
                                    label="이름"
                                    hide-details
                                    outlined
                                    dense
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    v-model="editedItem.cd"
                                    label="생성일"
                                    hide-details
                                    outlined
                                    dense
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                    v-model="editedItem.u_email"
                                    label="이메일"
                                    hide-details
                                    outlined
                                    dense
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                    v-model="editedItem.u_phone"
                                    label="전화번호"
                                    hide-details
                                    outlined
                                    dense
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="12" md="12">
                                <v-textarea 
                                    v-model="editedItem.content"
                                    label="문의 내용"
                                    hide-details
                                    outlined
                                    dense
                                    disabled
                                    no-resize
                                >
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-footer class="ma-0 pa-2 justify-end">
                    <!-- <v-card-actions>
                        <v-spacer></v-spacer> -->
                        <v-btn v-if="editedIndex != -1" color="error" @click="dialogDelete = true">삭제</v-btn>
                        <v-btn class="ml-2" color="warning" @click="close">취소</v-btn>
                        <v-btn class="ml-2" color="success" @click="save">저장</v-btn>
                    <!-- </v-card-actions> -->
                    </v-footer>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">정말 삭제 하시겠습니까?</span>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="closeDelete" >Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-toolbar>
    </template>

  </v-data-table>
</template>
<script>
import Moment from 'moment'
export default {
    layout:'Admin',
    data() {
        return {
            searchWord:'',
            editedIndex: -1,
            editedItem: {
                no:"",
            },
            defaultItem: {
                no:"",
            },
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: "문의번호", value: "no", align: "center", width: "4%"},
                { text: "유저번호", value: "u_no", align: "center", width: "4%"},
                { text: "이름", value: "u_name", align: "center", width: "8%"},
                { text: "이메일", value: "u_email", align: "center", width: "16%"},
                { text: "전화번호", value: "u_phone", align: "center", width: "10%"},
                { text: "문의내용", value: "content", align: "center", width: "32%"},
                { text: "상태", value: "status", align: "center", width: "6%"},
                { text: "생성일", value: "cd", align: "center", width: "10%"},
                { text: "편집일", value: "ed", align: "center", width: "10%"},
            ],
            itemList: [],
        };
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New inquiry' : 'Edit inquiry'
        },
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },
    mounted() {
        // document.body.setAttribute('data-app', true)
        this.selecItem()//처음 데이터 조회
    },
    methods: {
        editItem (item) {
            this.editedIndex = this.itemList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        async deleteItemConfirm () {
            await this.deleteItem()
            await this.selecItem()
            this.closeDelete()
        },
        close () {
            this.dialog = false
            this.editedItem = { ...this.defaultItem }
            this.editedIndex = -1
        },
        closeDelete () {
            this.dialog = false
            this.dialogDelete = false
            this.editedItem = { ...this.defaultItem }
            this.editedIndex = -1
        },
        async save (){
            
            if (this.editedIndex > -1) {
                if (this.editedIndex > -1) {
                    await this.updateItem()
                } else {
                    //await this.insertItem()
                }
                await this.selecItem()
                this.close()
            }
        },

        // select db
        async selecItem() {
            this.itemList = []
            let param = {
                table:"inquiry",
                conditions:[
                    {q:"!=",f:"status",v:'삭제'},
                    {q:"order",f:"cd",o:"DESC"}
                    ]
                
                }
            await this.$axios.post('/admin/select', param).then((res) => {
                if(Object.keys(res.data).length > 0) {
                    this.itemList = res.data
                    this.itemList.forEach((data)=>{
                        data.cd = Moment(data.cd).format('YYYY-MM-DD hh:mm')
                        data.ed = Moment(data.ed).format('YYYY-MM-DD hh:mm')
                    })
                }
            }).catch((err) => {
                console.log('에러!!', err)
            })

        },

        // insert db
        async insertItem() {
            let param = { c_dt: new Date(), e_dt: new Date(), ...this.editedItem }
            await this.$axios.post('/admin/InsertInquiry', param).then((res) => {
                console.log('인서트 결과값: ', res.data)
            }).catch((err) => {
                console.log('에러!!', err)
            })
        },

        // update db
        async updateItem() {
            //param setting
            let param = {  }
            param['no']=this.editedItem.no
            param['table']="inquiry"
            param['status'] = this.editedItem.status
            param['conditions'] = [{q:"==",f:"no",v:this.editedItem.no}]
            await this.$axios.post('/admin/update', param).then((res) => {
                console.log('업데이트 결과값: ', res.data)
            }).catch((err) => {
                console.log('에러!!', err)
            }) 
        },

        // delete db
        async deleteItem() {
            console.log('tdsds')
            let param = {  }
            param['no']=this.editedItem.no
            param['table']="inquiry"
            param['status'] = "삭제"
            param['conditions'] = [{q:"==",f:"no",v:this.editedItem.no}]
            await this.$axios.post('/admin/update', param).then((res) => {
                console.log('업데이트 결과값: ', res.data)
            }).catch((err) => {
                console.log('에러!!', err)
            })
            
        },
    }
};
</script>