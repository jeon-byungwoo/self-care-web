<template>
    <v-data-table
        show-select
        v-model="selected"
        :headers="headers"
        :items="userList"
        item-key="user_no"
        :search="search"
        class="elevation-1"
        style="width:100%;"
        @click:row="editItem"
    >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>사용자 관리</v-toolbar-title>
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
                                        <v-text-field
                                            v-model="editedItem.name"
                                            label="* NAME"
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="editedItem.nickname"
                                            label="nickname"
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="editedItem.gender"
                                            label="gender"
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="editedItem.os"
                                            label="os"
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="editedItem.level"
                                            label="level"
                                            >
                                        </v-text-field>
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
                        <v-btn color="blue darken-1" text @click="closeDelete" >취소</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">삭제</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogCoupon" max-width="1200px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">쿠폰 발급</span>
                    </v-card-title>
                    <v-data-table
                        :headers="couponHeaders"
                        :items="couponList"
                        :single-select="true"
                        style="width:100%;"
                        v-model="selectedCoupon"
                        @click:row="DoCouponPublish"
                        
                    >
                        
                    </v-data-table>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="closePublich" >닫기</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogPush" max-width="800px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">푸시 전송</span>
                    </v-card-title>
                    <v-text-field
                        style="padding:10px;"
                        v-model="FCMMessage"
                        outlined
                        dense
                        hide-details
                        placeholder="[한국인] 푸시전송 할 메시지"
                    >
                    </v-text-field>
                    <v-text-field
                    style="padding:10px;"
                        v-model="FCMMessageJA"
                        outlined
                        dense
                        hide-details
                        placeholder="[일본국적] 푸시전송 할 메시지"
                    >
                    </v-text-field>
                    <v-text-field
                    style="padding:10px;"
                        v-model="FCMMessageEN"
                        outlined
                        dense
                        hide-details
                        placeholder="[기타외국인] 푸시전송 할 메시지"
                    >
                    </v-text-field>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="closeSendFCM" >취소</v-btn>
                        <v-btn color="blue darken-1" text @click="DoSendFCM">전송</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-card-title>
        User 검색
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-row>
            <v-spacer></v-spacer>
            <v-col>
               
            </v-col>
            <v-col>
                
            </v-col>
            <v-col>
    
            </v-col>
            <v-col>
                <v-btn
                @click="sendFCM()">
                    푸시 전송
                </v-btn>
                <v-btn
                @click="publishCoupon()">
                    쿠폰 발급
                </v-btn>
            </v-col>
            
        </v-row>
    </template>

  </v-data-table>
</template>
<script>
import Moment from 'moment'
export default {
    
    layout:'adminLayout',
    data() {
        return {
            radios:0,
            searchWord:'',
            editedIndex: -1,

            selected:[],
            search: '',
            editedItem: {
                user_no:"",
                auth_provider:"",
                name:"",
                nickname:"",
                phone:"",
                email:"",
                gender:"",
                os:"",
                level:"",
                c_dt:"",
            },
            defaultItem: {
                user_no:"",
                auth_provider:"",
                name:"",
                nickname:"",
                phone:"",
                email:"",
                gender:"",
                os:"",
                level:"",
                c_dt:"",
            },
            dialog: false,
            dialogDelete: false,
            dialogCoupon: false,
            dialogPush: false,
            FCMMessage:'',
            FCMMessageJA:'',
            FCMMessageEN:'',
            headers: [
                { text: "회원번호", align: "start", value: "user_no" },
                { text: "가입구분", value: "auth_provider" },
                { text: "상태", value: "status" },
                { text: "국적", value: "nationalityStr" },
                { text: "사용언어", value: "languageStr" },
                { text: "회원이름", value: "name" },
                { text: "닉네임", value: "nickname" },
                { text: "전화번호", value: "phone" },
                { text: "이메일", value: "email" },
                { text: "성별", value: "gender" },
                { text: "기종", value: "os" },
                { text: "회원등급", value: "level" },
                { text: "생성일", value: "c_dt" },
            ],
            couponHeaders:[
                { text: "NO", align: "start", value: "coupon_no" },
                { text: "name", value: "name" },
                { text: "description", value: "description" },
                { text: "type", value: "type" },
                { text: "price", value: "price" },
                { text: "currency", value: "currency" },
                { text: "expired date", value: "expired_dt" },
                { text: "start date", value: "start_dt" },
                { text: "publish", value: "publish" },
                { text: "using", value: "using" },
                { text: "create date", value: "c_dt" },
            ],
            couponList:[],
            selectedCoupon:[],
            userList: [],
            nationsList:[],
            langList:[],
            alive_flag:true,
        };
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New user' : 'Edit user'
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
        this.selectSettings()
        this.selecItem()//처음 데이터 조회
    },
    methods: {
        async selectSettings(){
            let param = {
                    conditions:[]
                }
            await this.$axios.post('/util/selectLanguage', param).then((res) => {
                if(Object.keys(res.data).length > 0) {
                    this.langList = res.data
                }
            }).catch((err) => {
                console.log('에러!!', err)
            })

            await this.$axios.post('/util/selectNation', param).then((res) => {
                if(Object.keys(res.data).length > 0) {
                    this.nationsList = res.data
                }
            }).catch((err) => {
                console.log('에러!!', err)
            })
        },
        async searchWordFunc(evt){
            if(evt.key=='Enter'){
                let param = {
                    conditions:[{q:"order",f:"c_dt",o:"DESC"}
                    ,{op:"OR",q:"like",f:"name",str:this.searchWord}
                    ,{op:"OR",q:"like",f:"phone",str:this.searchWord}
                    ,{op:"OR",q:"like",f:"nickname",str:this.searchWord}
                    ,{op:"OR",q:"like",f:"email",str:this.searchWord}]
                }
                await this.$axios.post('/admin/selectUser', param).then((res) => {
                    if(Object.keys(res.data).length > 0) {
                        this.userList = res.data
                        this.userList.forEach((data)=>{
                            if(data.os==1) data.os='안드로이드'
                            else if(data.os==2) data.os='아이폰'
                            else data.os='-'

                            if(data.gender==1) data.gender='남자'
                            else if(data.gender==2) data.gender='여자'
                            else data.gender='-'

                            if(data.status==1) data.status='활성'
                            else if(data.status==0) data.status='비활성'
                            else data.status='탈퇴'

                            data.c_dt = Moment(data.c_dt).format('YYYY-MM-DD hh:mm')
                            if(data.nationality!=null){
                                for(let oneNation of this.nationsList){
                                    if(data.nationality==oneNation.nation_no){
                                        data['nationalityStr'] = oneNation.ko
                                    }
                                }
                            }
                            if(data.language!=null){
                                for(let oneLang of this.langList){
                                    if(data.language==oneLang.language_no){
                                        data['languageStr'] = oneLang.ko
                                    }
                                }
                            }
                        })
                        
                    }
                }).catch((err) => {
                    console.log('에러!!', err)
                })
            }
        },
        editItem (item) {

            this.editedIndex = this.userList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        async deleteItemConfirm () {
            await this.deleteItem()
            if(this.searchWord!=''){
                await this.searchWordFunc({key:'Enter'})
            }else{
                await this.selecItem()
            }
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
                if(this.editedItem.name == '' ){
                    alert('필수항목을 입력하세요.')
                }
                else {
                    if (this.editedIndex > -1) {
                        await this.updateItem()
                    } else await this.insertItem()
                    if(this.searchWord!=''){
                        await this.searchWordFunc({key:'Enter'})
                    }else{
                        await this.selecItem()
                    }
                    this.close()
                }
            }
        },

        // select db
        async selecItem() {
            let param = {conditions:[{q:"order",f:"c_dt",o:"DESC"}]}
            await this.$axios.post('/admin/selectUser', param).then((res) => {
                if(Object.keys(res.data).length > 0) {
                    this.userList = res.data
                    this.userList.forEach((data)=>{
                        if(data.os==1) data.os='안드로이드'
                        else if(data.os==2) data.os='아이폰'
                        else data.os='-'

                        if(data.gender==1) data.gender='남자'
                        else if(data.gender==2) data.gender='여자'
                        else data.gender='-'

                        if(data.status==1) data.status='활성'
                        else if(data.status==0) data.status='비활성'
                        else data.status='탈퇴'


                        if(data.nationality!=null){
                            for(let oneNation of this.nationsList){
                                if(data.nationality==oneNation.nation_no){
                                    data['nationalityStr'] = oneNation.ko
                                }
                            }
                        }
                        if(data.language!=null){
                            for(let oneLang of this.langList){
                                if(data.language==oneLang.language_no){
                                    data['languageStr'] = oneLang.ko
                                }
                            }
                        }


                        data.c_dt = Moment(data.c_dt).format('YYYY-MM-DD hh:mm')
                    })
                    
                }
            }).catch((err) => {
                console.log('에러!!', err)
            })

        },

        // insert db
        async insertItem() {
            let param = { c_dt: new Date(), e_dt: new Date(), ...this.editedItem }
            await this.$axios.post('/user/InsertUser', param).then((res) => {
                console.log('인서트 결과값: ', res.data)
            }).catch((err) => {
                console.log('에러!!', err)
            })
        },

        // update db
        async updateItem() {
            //param setting
            
            let param = {gender:1, os:1, level:1, user_no:0}
            this.editedItem.gender=='남자'?param.gender=1:param.gender=2
            this.editedItem.os=='안드로이드'?param.os=1:param.os=2
            param.level = Number(this.editedItem.level)
            if(this.editedItem.nickname!=null){
                param['nickname'] = "'"+this.editedItem.nickname+"'"
            }
            if(this.editedItem.name!=null){
                param['name'] = "'"+this.editedItem.name+"'"
            }
            
            param.user_no = this.editedItem.user_no
            await this.$axios.post('/user/UpdateUser', param).then((res) => {
                console.log('업데이트 결과값: ', res.data)
            }).catch((err) => {
                console.log('에러!!', err)
            }) 
        },

        // delete db
        async deleteItem() {
            let param = {  }
            param['user_no']=this.editedItem.user_no
            param['status']=0
            await this.$axios.post('/user/UpdateUser', param).then((res) => {
                console.log('삭제 결과값: ', res.data)
            }).catch((err) => {
                console.log('에러!!', err)
            }) 
        },


        async sendFCM(){
            this.dialogPush = true
        },
        async publishCoupon(){
            console.log("publishCoupon")
            this.dialogCoupon = true
            let param = {conditions:[{q:"order",f:"c_dt",o:"DESC"},
            {op:"AND", q:">", f:"expired_dt", v:"'"+Moment(new Date()).format('YYYY-MM-DD hh:mm')+"'"}]}
            await this.$axios.post('/admin/SelectCoupon', param).then((res) => {
                if(Object.keys(res.data).length > 0) {
                    this.couponList = res.data
                    this.couponList.forEach((data)=>{
                        data.c_dt = Moment(data.c_dt).format('YYYY-MM-DD hh:mm')
                        data.start_dt = Moment(data.start_dt).format('YYYY-MM-DD hh:mm')
                        data.expired_dt = Moment(data.expired_dt).format('YYYY-MM-DD hh:mm')
                    })
                }
            }).catch((err) => {
                console.log('에러!!', err)
            })
            
        },
        closePublich () {
            this.dialogCoupon = false
        },

        closeSendFCM () {
            this.dialogPush = false
        },

        async DoCouponPublish (item) {
            for (let user of this.selected) {
                let param = {user_no:user.user_no,coupon_no:item.coupon_no}
                await this.$axios.post('/aCoupon/MakeUserCouponAndEnroll', param).then(() => {
                }).catch((err) => {
                    console.log('에러!!', err)
                })
            }
            alert('쿠폰 발급이 완료되었습니다.')
            //this.dialogCoupon = false
        },

        async DoSendFCM () {
            if(this.FCMMessage!=''&&this.FCMMessageJA!=''&&this.FCMMessageEN!=''){
                for (let user of this.selected) {
                    let message = ''
                    if(user.nationality==1){//ko
                        message = this.FCMMessage
                    }else if(user.nationality==2){//ja
                        message = this.FCMMessageJA
                    }else{
                        message = this.FCMMessageEN
                    }

                    let param = {user_no:user.user_no,nickname:user.nickname,fcm_token:user.fcm_token,title:"Budify",body:message,channel:"admin","no":-1}
                    
                    await this.$axios.post('/fcm/sendFcm', param).then(() => {
                    }).catch((err) => {
                        console.log('에러!!', err)
                    })
                }
                alert('푸시 전송이 완료되었습니다.')
                this.dialogPush = false
            }else{
                alert('모든 항목을 입력해야 푸시 전송이 가능합니다.')
            }

        },
    }
};
</script>