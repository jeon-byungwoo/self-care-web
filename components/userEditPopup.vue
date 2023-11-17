<template>
    <v-app class="background">
        <div class="window">
            <v-card class="card">
                <v-app-bar flat >
                    <v-card-title class="ma-0 pa-0">내 정보</v-card-title>
                </v-app-bar>
                <v-container class="user_history_main_container ma-0 pa-5" >
                    <h5 >프로필 이미지</h5>
                    <v-row class="ma-0 pa-0 align-center">
                        <v-img 
                            :src="userObj?.profile_url ? profileImageUrl(userObj?.profile_url) : ''"
                            contain
                            class="manager-profile-image"
                        >
                        </v-img>
                        <v-file-input
                            id="imageUp"
                            accept="image/*"
                            v-model="profileImage"
                            hide-details
                            hide-label
                            @change="fileInfo"
                            label="파일 첨부"
                            style="max-width:220px;"
                            class="ml-8"
                        />
                        <v-btn class="ma-0 pa-0" icon @click="deleteImg" v-if="userObj?.profile_url" text>
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-row>
                    <v-col class="ma-0 pa-0 py-2">
                        <h5>이름</h5>
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="이름"
                            class="ma-0"
                            v-model="userObj.name"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col class="ma-0 pa-0 py-2">
                        <h5>연락처</h5>
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="연락처"
                            class="ma-0"
                            v-model="userObj.phone"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col class="ma-0 pa-0 py-2">
                        <h5>이메일</h5>
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="이메일"
                            class="ma-0"
                            v-model="userObj.email"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col class="ma-0 pa-0 py-2">
                        <h5>바이럴주소</h5>
                        <v-text-field
                            dense
                            hide-details
                            outlined
                            placeholder="바이럴주소"
                            class="ma-0"
                            v-model="userObj.viral_url"
                        >
                        </v-text-field>
                    </v-col>
                </v-container>
                <v-footer class="justify-end">
                    <v-spacer/>
                    <v-btn class="ml-2" color="warning" @click="clickCancel">취소</v-btn>
                    <v-btn class="ml-2" color="success" @click="clickDone">확인</v-btn>
                </v-footer>
            </v-card>
        </div>
    </v-app>
</template>
<script>
export default {
    props: ['obj', 'popup'],
    data() {
        return {
            profileImage: null,
            currentEmail: null,         /// 이메일 변경시 중복 검사를 위함
            hostUrl: process.env.BASE_URL,
            userObj: {
                name: null,
                email: null,
                phone: null,
                viral_url: null
            }
        }
    },
    mounted() {
        this.setupUserObj()
    },
    methods: {
        async setupUserObj() {
            if (this.obj) {
                this.userObj = this.obj
                if (!this.validateVariableExist(this.obj.profile_url)) 
                    this.userObj.profile_url = JSON.parse(this.obj.profile_url)?.length > 0 ? JSON.parse(this.obj.profile_url)[0] : null
                if (!this.validateVariableExist(this.userObj.profile_url))
                    this.profileImage = await this.convertUrl(this.profileImageUrl(this.userObj.profile_url))
                if (!this.validateVariableExist(this.userObj.email))
                    this.currentEmail = this.userObj.email
            }
        },
        fileInfo() {
            this.userObj.profile_url = URL.createObjectURL(this.profileImage)
        },
        clickCancel() {
            this.popup = false
            this.$emit('click-close', 'edit')
        },
        clickDone() {
            this.update()
        },
        validateVariableExist(value) {
            return (value == null || value == undefined || value == '[]' || ( value != null && typeof value == "object" && !Object.keys(value).length ))
        },
        profileImageUrl(url) {
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
        async convertUrl(url){
            const response =  await fetch(url);
            const data =  await response.blob();
            const ext = await url.split(".").pop();
            const filename = await url.split("/").pop()
            const metadata = { type: `image/${ext}` };
            return new File([data], filename, metadata);
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
                name: this.userObj.name,
                phone: this.userObj.phone, 
                viral_url: this.userObj.viral_url,
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
    }
}
</script>
<style scoped>
.user_history_main_container {
    overflow-y: auto;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
.window {
  position: relative;
  width: 100%;
  height: 100%;
}
.card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
}
.manager-profile-image {
    width: 120px;
    height: 120px;
    max-height: 120px;
    max-width: 120px;
    border: solid 1px #333;
    display:flex;
}
</style>