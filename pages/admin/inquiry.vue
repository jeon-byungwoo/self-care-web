<template>
    <v-data-table
        :headers="headers"
        :items="itemList"
        class="elevation-1"
        style="width:100%;"
        @click:row="editItem"
    >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>문의 관리</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1000px" style="overflow:hidden;">
                <v-card style="overflow:hidden;">
                    <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
                    <v-row>
                        <v-col>
                            <v-card-text>
                                <v-row cols="12" sm="6" md="4">
                                    <v-col>
                                        <v-autocomplete
                                        v-model="editedItem.status"
                                        label="접수상황"
                                        :items="['접수', '대응 완료', '보류']"
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn v-if="editedIndex != -1" color="blue darken-1" text @click="dialogDelete = true">Delete</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
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
                { text: "문의번호", align: "start", value: "no" },
                { text: "유저번호", value: "u_no" },
                { text: "이름", value: "u_name" },
                { text: "이메일", value: "u_email" },
                { text: "전화번호", value: "u_phone" },
                { text: "문의내용", value: "content" },
                { text: "상태", value: "status" },
                { text: "생성일", value: "cd" },
                { text: "편집일", value: "ed" },
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
        document.body.setAttribute('data-app', true)
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