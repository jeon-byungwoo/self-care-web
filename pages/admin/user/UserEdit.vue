<template>
    <v-card >
        <v-app-bar flat >
            <v-card-title class="ma-0 pa-0">{{userObj.is_manager == 1 ? '매니저' : '회원'}}정보 {{userObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="main_container ma-0 pa-5">
            <v-row class="ma-0 pa-0 justify-center">
                <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                    <h5 >프로필 이미지</h5>
                    <v-row class="ma-0 pa-0 align-center justify-center" >
                        <v-avatar width="150" height="150" style="border: 1px solid #000">
                            <v-img 
                                :src="userObj.profile_url != null ? profileImageUrl(userObj.profile_url) : ''"
                                contain
                                height="150"
                                width="150"
                            >
                            </v-img>
                        </v-avatar>
                    </v-row>
                    <v-row class="ma-2 pa-0 align-center">
                        <v-file-input
                            id="imageUp"
                            accept="image/*"
                            v-model="profileImage"
                            hide-details
                            hide-label
                            @change="fileInfo"
                            label="파일 첨부"
                            style="max-width:220px;"
                        />
                        <v-btn class="ma-0 pa-0" icon @click="deleteImg" v-if="userObj.profile_url" text>
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-row>
                    <v-row class="ma-2 pa-0">
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="이름"
                            label="이름"
                            class="ma-0"
                            v-model="userObj.name"
                        >
                        </v-text-field>
                    </v-row>
                    <v-row class="ma-2 pa-0">
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="연락처"
                            label="연락처"
                            class="ma-0"
                            v-model="userObj.phone"
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                            inputmode="numeric"
                        >
                        </v-text-field>
                    </v-row>
                    <v-row class="ma-2 pa-0">
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="이메일"
                            label="이메일"
                            class="ma-0"
                            v-model="userObj.email"
                        >
                        </v-text-field>
                    </v-row>
                    <v-row class="ma-2 pa-0" v-if="userObj.type == '이메일'">
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="비밀번호"
                            label="비밀번호"
                            class="ma-0"
                            v-model="pw"
                            :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="pwShow ? 'text' : 'password'"
                            @click:append="pwShow = !pwShow"
                        >
                        </v-text-field>
                    </v-row>
                    <v-row class="ma-2 pa-0" v-if="userObj.type == '이메일'">
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="비밀번호 확인"
                            label="비밀번호 확인"
                            class="ma-0"
                            v-model="pwConfirm"
                            :append-icon="pwConfirmShow ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="pwConfirmShow ? 'text' : 'password'"
                            @click:append="pwConfirmShow = !pwConfirmShow"
                        >
                        </v-text-field>
                    </v-row>
                    <v-row class="ma-2 pa-0">
                        <v-select
                            dense
                            hide-details
                            outlined
                            label="출생년도"
                            class="ma-0"
                            v-model="userObj.birth"
                            :items="birthList"
                        >
                        </v-select>
                    </v-row>
                    <v-row class="ma-2 pa-0" >
                    <v-btn-toggle
                        class="ma-0"
                        v-model="userObj.gender"
                        mandatory
                        dense
                        rounded
                        
                    >
                        <v-btn 
                            v-for="(obj, index) in genderObj"
                            :key="index"
                            color="primary"
                            :value="obj.value"
                            :outlined="obj.value != userObj.gender"
                            class="px-4"
                            :class="obj.value != userObj.gender ? 'black--text' : 'white--text'"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                    </v-row>
                    <v-row class="ma-2 pa-0" >
                        <v-btn-toggle 
                            class="ma-0"
                            v-model="userObj.type"
                            mandatory
                            dense
                            rounded
                        >
                            <v-btn 
                                v-for="(obj, index) in signUpTypeObj" 
                                :key="index"
                                color="primary"
                                :value="obj.value"
                                :outlined="obj.value != userObj.type"
                                :disabled="userObj.no != null"
                                class="px-2"
                                :class="obj.value != userObj.type ? 'black--text' : 'white--text'"
                            >
                                {{obj.text}}
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                </v-col>
                <v-divider vertical class="mx-4" />
                <v-col class="ma-0 pa-0" cols="12" sm="7" md="7">
                    <v-row class="ma-2 pa-0 align-center">
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <div >활성 상태</div>
                        </v-col>
                        <v-btn-toggle
                            class="basic_btn_toggle"
                            v-model="userObj.alive"
                            mandatory
                            dense
                            rounded
                        >
                            <v-btn 
                                v-for="(obj, index) in activeObj"
                                :key="index"
                                color="primary"
                                :value="obj.value"
                                :outlined="obj.value != userObj.alive"
                                class="px-4"
                                :class="obj.value != userObj.alive ? 'black--text' : 'white--text'"
                            >
                                {{obj.text}}
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                    <v-row class="ma-2 pa-0 align-center">
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <div >상담 권한</div>
                        </v-col>
                        <v-btn-toggle
                            class="basic_btn_toggle"
                            v-model="userObj.is_counsel"
                            mandatory
                            dense
                            rounded
                        >
                            <v-btn 
                                v-for="(obj, index) in counselObj"
                                :key="index"
                                color="primary"
                                :value="obj.value"
                                :outlined="obj.value != userObj.is_counsel"
                                class="px-4"
                                :class="obj.value != userObj.is_counsel ? 'black--text' : 'white--text'"
                            >
                                {{obj.text}}
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                    <v-row class="ma-2 pa-0 align-center">
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <div >매니저 권한</div>
                        </v-col>
                        <v-btn-toggle
                            class="basic_btn_toggle"
                            dense
                            rounded
                            mandatory
                            v-model="userObj.is_manager"
                        >
                            <v-btn 
                                v-for="(obj, index) in managerObj"
                                :key="index"
                                color="primary"
                                :value="obj.value"
                                :outlined="obj.value != userObj.is_manager"
                                class="px-4"
                                :class="obj.value != userObj.is_manager ? 'black--text' : 'white--text'"
                            >
                                {{obj.text}}
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                    <v-row class="ma-2 pa-0 align-center">
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <div >인큐텐 여부</div>
                        </v-col>
                        <v-btn-toggle
                            class="basic_btn_toggle"
                            v-model="userObj.is_inqten"
                            mandatory
                            dense
                            rounded
                        >
                            <v-btn 
                                v-for="(obj, index) in isInqtenObj"
                                :key="index"
                                color="primary"
                                :value="obj.value"
                                :outlined="obj.value != userObj.is_inqten"
                                class="px-4"
                                :class="obj.value != userObj.is_inqten ? 'black--text' : 'white--text'"
                            >
                                {{obj.text}}
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                    <v-row class="ma-2 pa-0 align-center">
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <div >오토쉽 여부</div>
                        </v-col>
                        <v-btn-toggle
                            class="basic_btn_toggle"
                            v-model="userObj.is_autoship"
                            mandatory
                            dense
                            rounded
                        >
                            <v-btn 
                                v-for="(obj, index) in autoshipObj"
                                :key="index"
                                color="primary"
                                :value="obj.value"
                                :outlined="obj.value != userObj.is_autoship"
                                class="px-4"
                                :class="obj.value != userObj.is_autoship ? 'black--text' : 'white--text'"
                            >
                                {{obj.text}}
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                    <v-row class="ma-2 pa-0 align-center">
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <div >셀프케어 소개링크</div>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12" sm="5" md="5">
                            <v-text-field
                                dense
                                hide-details
                                outlined
                                placeholder=""
                                label=""
                                v-model="userObj.url"
                                class="px-2"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12" sm="1" md="1">
                            <v-btn class="ml-2" @click="copyUrl">복사</v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="ma-2 pa-0 align-center">
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <div >바이럴 주소</div>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12" sm="6" md="6">
                            <v-text-field
                                dense
                                hide-details
                                outlined
                                placeholder=""
                                label=""
                                v-model="userObj.viral_url"
                                class="px-2"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="ma-2 pa-0 align-center" >
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <div >거주지역</div>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4">
                            <v-select 
                                v-model="userObj.city"
                                :items="cities"
                                hide-details
                                dense
                                item-text="ko"
                                item-value="no"
                                outlined
                                label="시/도"
                                class="mx-2"
                                @change="selectTown(userObj.city)"
                            >
                            </v-select>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12" sm="4" md="4" v-if="userObj.city != null">
                            <v-select 
                                v-model="userObj.town"
                                :items="towns"
                                hide-details
                                dense
                                item-text="ko"
                                item-value="no"
                                outlined
                                label="군/구"
                                class="mx-2"
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-footer class="footer">
            <v-btn color="warning" @click="clickCancel">취소</v-btn>
            <v-btn class="btn_done" color="success" @click="clickDone">저장</v-btn>
        </v-footer>
    </v-card>
</template>
<script>
import moment from 'moment'
import _ from 'lodash'
export default {
    props: ['obj'],
    data() {
        return {
            signUpTypeObj: [
                {text:"카카오", value:"카카오"},
                {text:"네이버", value:"네이버"},
                {text:"이메일", value:"이메일"},
            ],
            activeObj : [
                {text:"활성", value: 1},
                {text:"비활성", value: 0},
            ],
            counselObj: [
                {text:"있음", value: 1},
                {text:"없음", value: 0},
            ],
            managerObj: [
                {text:"있음", value: 1},
                {text:"없음", value: 0},
            ],
            isInqtenObj: [
                {text:"있음", value: 1},
                {text:"없음", value: 0},
            ],
            autoshipObj: [
                {text:"있음", value: 1},
                {text:"없음", value: 0},
            ],
            genderObj: [
                {text:"남", value: 0},
                {text:"여", value: 1},
            ],
            color: this.$vuetify.theme.themes.light.basicColor,
            userObj: {
                no: null,
                manager_no:null,
                email: null,
                pw:null,
                type:"이메일",
                gender: 0, // 0 : 남, 1 : 여
                profile_url: null,
                token: null,
                name: null,
                phone: null,
                is_manager: 1, 
                is_admin: 0,
                is_counsel: 0,
                is_inqten: 0, 
                is_autoship: 0, 
                city: null,
                town: null,
                birth: null,
                last_test: null,
                point: null,
                status: null,
                viral_url: null,
                memo: null,
                auth: null,
                cart: null,
                url: null,
            },
            profileImage: [],
            pwShow: false,
            pwConfirmShow: false,
            cities:[],
            towns:[],
            pw: null,
            pwConfirm: null,
            birthList: [],
            hostUrl: process.env.BASE_URL,
            currentEmail: null,         /// 이메일 변경시 중복 검사를 위함
        }
    },
    created() {
        this.selectCity()
        let year = Number(moment().format('YYYY'))
        for (let i = year; i > 1919; i--) {
            this.birthList.push('' + i)
        }
    },
    mounted() {
        if (this.obj != null) 
            this.selcetUser()
    },
    methods: {
        async selcetUser() {
            if (this.obj != null) {
                let conditions = []
                conditions.push({"q":"=","f":"no","v":this.obj.no})
                conditions.push({"q":"order","f":"no","o":"ASC"})
                let param = {table:"user", conditions: conditions}
                await this.$axios.post('/admin/select', param).then(async res => {
                    if (res.data.length > 0) {
                        res.data.filter(item => {
                            if (!this.validateVariableExist(item.profile_url)) 
                                item.profile_url = JSON.parse(item.profile_url)?.length > 0 ? JSON.parse(item.profile_url)[0] : null
                        })
                        this.userObj = res.data[0]
                        if (!this.validateVariableExist(this.userObj.profile_url))
                            this.profileImage = await this.convertUrl(this.profileImageUrl(this.userObj.profile_url))
                        this.pw = this.userObj.pw
                        if (this.userObj.city != null) {
                            this.selectTown(this.userObj.city)
                        }
                        this.currentEmail = this.userObj.email
                    }
                }).catch(err => {
                    console.log("err : ", err)
                })
            } 
        },
        setupUserObj() {
            if (this.userObj.type != '이메일') {
                delete this.userObj.pw
            }
        },
        async selectCity() {
            let conditions = []
            conditions.push({"q":"=","f":"country_no","v":1})
            conditions.push({"q":"order","f":"no","o":"ASC"})
            let param = {table:"city", conditions: conditions}
            await this.$axios.post('/admin/select', param).then(res => {
                this.cities = res.data
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        async selectTown(no) {
            let conditions = []
            conditions.push({"q":"=","f":"city_no","v":no})
            conditions.push({"q":"order","f":"no","o":"DESC"})
            let param = {table:"town", conditions: conditions}
            await this.$axios.post('/admin/select', param).then(res => {
                this.towns = res.data
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        clickDone() {
            if (this.userObj.type == '이메일') {
                if (this.userObj.pw != this.pw) {
                    if (this.pw != this.pwConfirm) {
                        alert("비밀번호를 확인해주세요.") 
                        return
                    }
                }
                
            }
            if (this.userObj.no != null || this.userObj.no != undefined) {
                this.update()
            } else {
                this.insert()
            }
        },
        clickCancel() {
            this.$emit('click-close', 'user')
        },
        deleteImg() {
            /// 이미지 삭제
            this.userObj.profile_url = null
        },
        fileInfo() {
            this.userObj.profile_url = URL.createObjectURL(this.profileImage)
        },
        profileImageUrl(url) {
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
        validateVariableExist(value) {
             return (value == null || value == undefined || value == '[]')
        },
        async insert() {
            let isOverlap = await this.isOverlapEmail()
            
            if (isOverlap) {
                alert('이미 사용 중인 이메일 입니다.')
                return
            }
            let param = {
                email: this.userObj.email,
                pw:this.pw,
                type:this.userObj.type,
                gender: this.userObj?.gender ?? 0, // 0 : 남, 1 : 여
                token: this.userObj.token,
                name: this.userObj.name,
                phone: this.userObj.phone,
                is_manager: this.userObj.is_manager, 
                is_admin: this.userObj.is_admin,
                is_counsel: this.userObj.is_counsel,
                is_inqten: this.userObj.is_inqten, 
                is_autoship: this.userObj.is_autoship, 
                city: this.userObj.city,
                town: this.userObj.town,
                birth: this.userObj.birth,
                viral_url: this.userObj.viral_url,
                url: this.userObj.url,
                table: 'user',
            }
            /// 가입 타입에 따른 pw 삭제
            this.setupUserObj()
            for (const [key, value] of Object.entries(param)) {    
                if (this.validateVariableExist(value)) delete param[key]
            }
            this.$axios.post('/admin/insert', param).then(async res => {
                if (res.data.length > 0) {
                    this.userObj = _.cloneDeep(res.data[0])
                    if (this.profileImage != null) {
                        await this.updateImage(this.profileImage, 'profile_url')
                    } 
                    alert('저장되었습니다.')
                    this.clickCancel()
                }
            }).catch(err => {
                console.log("insert err : ", err)
            })
        },
        async update() {
            //// 수정 팝업이 열렸을 때 받아온 이메일과 작성된 이메일이 다른 경우 이메일 중복 검사
            if (this.currentEmail != this.userObj.email) {
                let isOverlap = await this.isOverlapEmail()
                if (isOverlap) {
                    alert('이미 사용 중인 이메일 입니다.')
                    return
                }
            }

            let param = {
                email: this.userObj.email,
                pw:this.pw,
                type:this.userObj.type,
                gender: this.userObj?.gender ?? 0, // 0 : 남, 1 : 여
                token: this.userObj.token,
                name: this.userObj.name,
                phone: this.userObj.phone,
                is_manager: this.userObj.is_manager, 
                is_admin: this.userObj.is_admin,
                is_counsel: this.userObj.is_counsel,
                is_inqten: this.userObj.is_inqten, 
                is_autoship: this.userObj.is_autoship, 
                city: this.userObj.city,
                town: this.userObj.town,
                birth: this.userObj.birth,
                last_test: this.userObj.last_test,
                point: this.userObj?.point,
                status: this.userObj?.status,
                viral_url: this.userObj.viral_url,
                memo: this.userObj?.memo ?? null,
                auth: this.userObj?.auth,
                cart: this.userObj?.cart,
                url: this.userObj?.url,
                table: 'user',
                conditions:[{q:"=",f:"no",v:this.userObj.no}]
            }
            for (const [key, value] of Object.entries(param)) {   
                if (this.validateVariableExist(value)) delete param[key]
            }
            
            this.$axios.post('/admin/update', param).then(async res => {
                if (this.profileImage != null) {
                    await this.updateImage(this.profileImage, 'profile_url')
                } 
                alert('저장되었습니다.')
                this.clickCancel()
                
            }).catch(err => {
                console.log("update err : ", err)
            })
        },
        async updateImage(obj, text) {
            let formData = new FormData()
            formData.append('imageParam', text)
            formData.append('no', this.userObj.no)
            formData.append('table', 'user')
            formData.append('conditions', JSON.stringify([{q:"=",f:"no",v:this.userObj.no}]))
            if (obj.length > 0) {
                for (const file of obj) 
                    formData.append('files', file)
            } else {
                formData.append('files', obj)
            }

            await this.$axios.post('/admin/updateMultipart', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => {
            }).catch(err => {
                console.log("multipart error : ", err);
            })
        },
        async copyUrl() {
            if (this.userObj.url != null || this.userObj.url != '' || this.userObj.url != undefined) {
                let text = "www.self-care.co.kr/healthConsulting/" + this.userObj.url
                await window.navigator.clipboard.writeText(text).then(() => {
                    alert('복사되었습니다.')
                })
            }
        },
        isOverlapEmail() {
            let param = {
                table: 'user',
                conditions:[{q:"=",f:"email",v:this.userObj.email}]
            }
            return this.$axios.post('/admin/select', param).then(res => {
                return res.data.length > 0
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
<style scoped>
.main_container {
    overflow-y: auto;
    height: 74vh !important;
    min-height: 74vh !important;
    max-height: 74vh !important;
}
.profile_container {
    display: flex;
    flex-direction: row;
    padding: 8px;
}
.img_profile {
    width: 100px;
    height: 140px;
    cursor: pointer;
    margin: 8px;
}
.profile_info {
    display: flex;
    margin: 0px;
    padding: 0px;
    flex-direction: column;
    flex:auto;
}
.profile_inline {
    margin: 8px;
    display: inline-flex;
    align-items: center;
}
.profile_inline_url {
    display: inline-flex;
    align-items: center;
}
.profile_label {
    margin: 0px;
    padding: 0px;
    width: 200px;
}
.basic_btn_toggle {
    float: right;
    margin-left: 8px;
}
.footer {
    margin: 0px;
    padding: 16px;
    flex:1;
    justify-content: end;
}
.btn_done {
    margin-left: 8px;
}
</style>