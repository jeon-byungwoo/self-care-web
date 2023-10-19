<template>
    <v-card class="main_card">
        <v-app-bar flat class="app_bar">
            <v-card-title class="app_bar_title">{{userObj.is_manager == 1 ? '매니저' : '회원'}}정보 {{userObj.no == null ? '등록' : '수정'}}</v-card-title>
        </v-app-bar>
        <v-container class="main_container">
            <div class="profile_container">
                <div class="profile_info">
                    <div class="profile_inline">
                        <div style="width: 150px; height: 150px; background-size: cover; background-position: center;">
                            <v-avatar width="150" height="150">
                                <div style="width: 150px; height: 150px; background-size: cover; background-position: center;"
                                    v-if="userObj.profile != null && userObj.profile != undefined"
                                    :style="{backgroundImage: 'url('+profileImageUrl(userObj.profile)+')'}"
                                >
                                </div>
                            </v-avatar>
                        </div>
                        <div class="profile_inline">
                            <v-file-input
                                class="profile_image"
                                id="imageUp"
                                accept="image/*"
                                v-model="profileImage"
                                hide-spin-buttons 
                                hide-input 
                                hide-details
                                @change="fileInfo"
                            />
                            <v-btn class="profile_image" @click="deleteImg" v-if="userObj.profile" text>
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <v-text-field
                        dense
                        hide-details
                        outlined
                        placeholder="이름"
                        label="이름"
                        class="basic-text-field"
                        v-model="userObj.name"
                    >
                    </v-text-field>
                    <v-text-field
                        dense
                        hide-details
                        outlined
                        placeholder="연락처"
                        label="연락처"
                        class="basic-text-field"
                        v-model="userObj.phone"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                    <v-text-field
                        dense
                        hide-details
                        outlined
                        placeholder="이메일"
                        label="이메일"
                        class="basic-text-field"
                        v-model="userObj.email"
                    >
                    </v-text-field>
                    <v-text-field
                        v-if="userObj.is_manager == 1"
                        dense
                        hide-details
                        outlined
                        placeholder="비밀번호"
                        label="비밀번호"
                        class="basic-text-field"
                        v-model="userObj.pw"
                        :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="pwShow ? 'text' : 'password'"
                        @click:append="pwShow = !pwShow"
                    >
                    </v-text-field>
                    <v-text-field
                        v-if="userObj.is_manager == 1"
                        dense
                        hide-details
                        outlined
                        placeholder="비밀번호 확인"
                        label="비밀번호 확인"
                        class="basic-text-field"
                        v-model="pwConfirm"
                        :append-icon="pwConfirmShow ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="pwConfirmShow ? 'text' : 'password'"
                        @click:append="pwConfirmShow = !pwConfirmShow"
                    >
                    </v-text-field>
                    <v-text-field
                        dense
                        hide-details
                        outlined
                        placeholder="생년월일"
                        label="생년월일"
                        class="basic-text-field"
                        v-model="userObj.birth"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2}).+/g, '$1');" 
                        inputmode="numeric"
                    >
                    </v-text-field>
                    <v-btn-toggle 
                        v-if="userObj.is_manager == 0"
                        class="ma-2"
                        v-model="userObj.type"
                        mandatory
                        dense
                        rounded
                    >
                        <v-btn 
                            v-for="(obj, index) in signUpTypeObj" 
                            :key="index"
                            :color="color"
                            :value="obj.value"
                            :outlined="obj.value != userObj.type"
                            disabled
                            class="px-2"
                        >
                            {{obj.text}}
                        </v-btn>
                    </v-btn-toggle>
                </div>
                <v-divider vertical class="mx-4"/>
                <div class="profile_info">
                    <div class="profile_inline">
                        <div class="profile_label">활성 상태</div>
                        <v-btn-toggle
                            class="basic_btn_toggle"
                            v-model="userObj.is_active"
                            mandatory
                            dense
                            rounded
                        >
                            <v-btn 
                                v-for="(obj, index) in activeObj"
                                :key="index"
                                :color="color"
                                :value="obj.value"
                                :outlined="obj.value != userObj.is_active"
                            >
                                {{obj.text}}
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                    <div class="profile_inline" v-if="userObj.is_manager == 1">
                        <div class="profile_label">상담 권한</div>
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
                                :color="color"
                                :value="obj.value"
                                :outlined="obj.value != userObj.is_counsel"
                            >
                                {{obj.text}}
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                    <div class="profile_inline" v-if="userObj.is_manager == 1">
                        <div class="profile_label">URL: www.self-care.co.kr/</div>
                        <div class="profile_inline_url">
                            <v-text-field
                                dense
                                hide-details
                                outlined
                                placeholder=""
                                label=""
                                class="basic-text-field"
                                v-model="userObj.url"
                            >
                            </v-text-field>
                            <v-btn class="ml-2">복사</v-btn>
                        </div>
                    </div>
                    <div class="profile_inline" v-if="userObj.is_manager == 1">
                        <div class="profile_label">바이럴 주소</div>
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder=""
                            label=""
                            class="basic-text-field"
                            v-model="userObj.viral"
                        >
                        </v-text-field>
                    </div>
                    <div class="profile_inline" >
                        <div class="profile_label">거주지역</div>
                        <v-select 
                            v-model="userObj.city"
                            :items="cities"
                            hide-details
                            dense
                            outlined
                            label="시/도"
                            class="basic-text-field"
                        >
                        </v-select>
                    </div>
                    <div class="profile_inline" >
                        <div class="profile_label"></div>
                        <v-select 
                            v-model="userObj.town"
                            :items="towns"
                            hide-details
                            dense
                            outlined
                            label="군/구"
                            class="basic-text-field"
                        >
                        </v-select>
                    </div>
                    <div class="profile_inline" >
                        <div class="profile_label">생년월일</div>
                        <v-menu
                            ref="birthMenu"
                            :color="color"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                        >  
                            <template v-slot:activator="{on, attrs}">
                                <v-text-field
                                    :color="color"
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    hide-details
                                    dense
                                    v-model="userObj.birth"
                                    class="basic-text-field"
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon v-on="on" v-bind="attrs">mdi-calendar</v-icon>
                                    </template>
                                </v-text-field>
                            </template>
                            <v-date-picker
                                :color="color"
                                v-model="userObj.birth"
                                @change="$refs.birthMenu.save(userObj.birth)"
                            />
                        </v-menu>
                    </div>
                </div>
            </div>
        </v-container>
        <v-footer class="footer">
            <v-btn color="warning" @click="clickCancel">취소</v-btn>
            <v-btn class="btn_done" color="success" @click="clickDone">저장</v-btn>
        </v-footer>
    </v-card>
</template>
<script>
export default {
    props: ['obj'],
    data() {
        return {
            signUpTypeObj: [
                {text:"카카오", value:"카카오"},
                {text:"네이버", value:"네이버"},
                {text:"이메일", value:"이메일"},
            ],
            isActive:true,
            activeObj : [
                {text:"활성", value: 1},
                {text:"비활성", value: 0},
            ],
            isCounsel: true,
            counselObj: [
                {text:"있음", value: 1},
                {text:"없음", value: 0},
            ],
            color: this.$vuetify.theme.themes.light.basicColor,
            userObj: {
                profile: null,
                name: null,
                phone: null,
                email: null,
                is_active: 0,
                is_counsel: 0,
                url: null,
                viral: null,
                no: null,
                birth: null,
                city: null,
                town: null,
                is_manager: 0, 
                is_admin: 0,
                type:"카카오"
            },
            profileImage: [],
            pwShow: false,
            pwConfirmShow: false,
        }
    },
    mounted() {
        Object.assign(this.userObj, this.obj)
        console.log(this.userObj)
        // selectUser = () => {
        //     this.$axios.post('/admin/select', {})
        // }
        
    },
    methods: {
        setProfile() {
            console.log("프로필 클릭")
        },
        clickDone() {
            console.log("this.userObj : ", this.userObj)
            let formData = new FormData();
            formData.append('user_name', this.userObj.name)
            formData.append('email', this.userObj.email)
            formData.append('phone', this.userObj.phone)
            formData.append('status', this.userObj.status ? 1 : 0)
            
            if (this.profileImage || this.profileImage != null || this.profileImage != undefined || this.profileImage != '' ) {
                if (this.profileImage.name) formData.append('profile_url', this.profileImage)
            }

            
            console.log("formData : ", formData)

            this.$emit('click-close', 'user')
        },
        clickCancel() {
            this.$emit('click-close', 'user')
        },
        deleteImg() {
            /// 이미지 삭제
            this.userObj.profile = null
        },
        fileInfo() {
            this.userObj.profile = URL.createObjectURL(this.profileImage)
        },
        profileImageUrl(url) {
            if(url.includes('http://')) return url
            else return this.hostUrl+url
        },
    }
}
</script>
<style scoped>
.main_card {
    margin: 0px;
    padding: 0px;
}
.app_bar {
    margin: 0px;
    padding: 0px;
}
.app_bar_title {
    margin: 0px;
    padding: 0px;
}
.main_container {
    overflow-y: auto;
    height: 84vh !important;
    min-height: 84vh !important;
    max-height: 84vh !important;
    margin: 0px;
    padding: 8px;
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
.profile_image {
    margin: 0px;
    padding: 0px;
}
.profile_info {
    display: flex;
    margin: 0px;
    padding: 0px;
    flex-direction: column;
    flex:auto;
}
.basic-text-field {
    margin: 8px;
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