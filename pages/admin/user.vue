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
                <div class="toolbar">
                    <div class="filter_wrapper">
                        <div class="filter_wrapper_row">
                            <v-text-field
                                v-model="searchedText"
                                hide-details
                                dense
                                placeholder="회원을 검색하세요."
                                outlined
                                min-width="400px"
                                class="filter_text_field"
                                @key.enter="searchUser"
                            >
                            </v-text-field>
                            <v-btn 
                                dense
                                color="#2D7DC8"
                                dark
                                @click="searchUser"
                                class="ml-4"
                            >
                                검색
                            </v-btn>
                        </div>
                        <div class="filter_wrapper_block">
                            <v-btn class="filter_btn" :class="isManager ? 'white--text' : 'black--text'" :color="isManager ? '#2D7DC8' : '#FFFFFF'" v-model="isManager" @click="isManager = !isManager">매니저</v-btn>
                            <v-btn :color="isNormal ? '#2D7DC8' : '#FFFFFF'" :class="isNormal ? 'white--text' : 'black--text'" v-model="isNormal" @click="isNormal = !isNormal">일반</v-btn>

                            <v-btn class="filter_btn_float_right" @click="editUser">매니저 추가</v-btn>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:[`item.status`]="{item}">
                <div class="text-center">{{item.status == 0 ? '비활성' : '활성'}}</div>
            </template>
            <template v-slot:[`item.is_manager`]="{item}">
                <div class="text-center">{{item.is_manager == 0 ? '일반' : '매니저'}}</div>
            </template>
            <template v-slot:[`item.temp_pw`]="{item}">
                <div class="text-center"><v-btn @click.stop="sendTempPw(item)">SEND</v-btn></div>
            </template>
            <template v-slot:[`item.manager_no`]="{item}">
                <div class="text-center">{{item.manager_no ? 'O' : 'X'}}</div>
            </template>
            <template v-slot:[`item.cd`]="{item}">
                <div class="text-center">{{item.cd.substr(0, 10)}}</div>
            </template>
            <template v-slot:[`item.progress_question`]="{item}">
                <div class="text-center"><v-btn @click.stop="showProgressQuestion(item)">설문진행</v-btn></div>
            </template>
            <template v-slot:[`item.buy`]="{item}">
                <div class="text-center"><v-btn @click.stop="sendBuyList(item)">구매내역</v-btn></div>
            </template>
        </v-data-table>
        <v-dialog
            v-model="userPopup"
            max-width="900"
            persistent
        >
            <UserEdit
                v-if="userPopup"
                @click-close="closePopup"
                :obj="selectedUser"
            />
        </v-dialog>
        <v-dialog
            v-model="historyPopup"
            max-width="1000"
            persistent
        >
            <UserHistoryPopup
                v-if="historyPopup"
                @click-close="closePopup"
                :obj="selectedUser"
                :type="historyType"
            />
        </v-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import UserEdit from '@/pages/admin/user/UserEdit'
import UserHistoryPopup from '@/pages/admin/user/UserHistoryPopup'
export default {
    components: { UserEdit, UserHistoryPopup },
    layout: 'Admin',
    name: 'IndexPage',
    data() {
        return {
            items: [],
            headers: [
                {text:"No", value: "no", align: "center"},
                {text:"활성여부", value: "status", align: "center"},
                {text:"회원구분", value: "is_manager", align: "center"},
                {text:"가입구분", value: "type", align: "center"},
                {text:"매니저명", value: "manager_no", align: "center"},
                {text:"토큰", value: "token", align: "center"},
                {text:"회원명", value: "name", align: "center"},
                {text:"연락처", value: "phone", align: "center"},
                {text:"이메일", value: "email", align: "center"},
                {text:"임시 비밀번호 전송", value: "temp_pw", align: "center"},
                {text:"설문 진행", value: "progress_question", align: "center"},
                {text:"구매", value: "buy", align: "center"},
                {text:"가입일", value: "cd", align: "center"},
            ],
            searchedText: null,
            isManager: true,
            isNormal: true,
            userPopup: false,
            selectedUser: null,
            historyType: null,
            historyPopup: false,
        }
    },
    mounted() {
        this.selectUser()
    },
    methods: {
        async selectUser() {
            let conditions = []
            conditions.push({"q":"=","f":"status","v":1})
            // conditions.push({"op":"AND", "q": "!=", "f": "is_admin", "v":1})
            if (this.searchedText) {
                conditions.push({"op":"AND", "q": "like", "f": "name", "str": this.searchedText})
            }
            if (this.isManager && !this.isNormal) {
                conditions.push({"op":"AND", "q": "=", "f": "is_manager", "v":1})
            } else if (!this.isManager && this.isNormal) {
                conditions.push({"op":"AND", "q": "=", "f": "is_manager", "v":0})
            }
            
            
            conditions.push({"q":"order","f":"no","o":"DESC"})
            let param = {table:"user", conditions: conditions}
            await this.$axios.post('/admin/select', param).then(res => {
                console.log("res.data : ", res.data)
                this.items = res.data
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        searchUser() {
            this.selectUser()
        },
        closePopup(type) {
            this.selectedUser = null
            if (type == 'user') {
                this.userPopup = !this.userPopup
            } else {
                this.historyPopup = !this.historyPopup
            }
            this.selectUser()
        },
        sendTempPw(item) {
            if (item.type != '이메일') return 
            if (!item.email || !item.no) return
            let param = {
                no: item.no,
                email: item.email
            }
            this.$axios.post('/api/findPW', param).then(res => {
                console.log("send Email : ", res)
            }).catch(err => {
                console.log("send Email err : ", err)
            })
        },
        editUser() {
            this.selectedUser = null
            this.userPopup = !this.userPopup
        },
        clickRow(value) {
            console.log("clickRow : ", value)
            if (value != null || value != undefined) {
                this.selectedUser = value
                this.userPopup = !this.userPopup
            }
        },
        showProgressQuestion(item) {
            if (item != null || item != undefined) {
                this.selectedUser = item
                this.historyType = "survey"
                this.historyPopup = !this.historyPopup
            }
        },
        sendBuyList(item) {
            if (item != null || item != undefined) {
                this.selectedUser = item
                this.historyType = "order"
                this.historyPopup = !this.historyPopup
            }
        }
    }
}
</script>
<style scoped>
.toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
}
.filter_wrapper {
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 4px;
}
.filter_wrapper_row {
    display: flex;
    flex-direction: row;
    margin: 0px;
    padding: 4px;
}
.filter_wrapper_block {
    display: inline-block;
    flex-direction: row;
    margin: 0px;
    padding: 4px;
    justify-content: space-between;
}
.filter_text_field {
    margin-right: 16px;
    min-width: 400px;
}
.filter_btn {
    margin-right: 16px;
}
.filter_btn_float_right {
    float:right
}

</style>
