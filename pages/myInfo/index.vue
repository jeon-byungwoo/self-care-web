<template>
  <div>
    <PwChangeDialog
      v-if="pwChangedialogStatus"
      @closeAction="dialogClose"
      @sendData="pwChangeDialogSendData"
      :message="currentPwCheck"
    ></PwChangeDialog>
    <UserSurveyPopup
      v-if="historyPopup"
        @click-close="closePopup"
        :obj="selectedUser"
        :popup="historyPopup"
    ></UserSurveyPopup>
    <UserEditPopup
      v-if="userEditPopup"
        @click-close="closePopup"
        :obj="selectedUser"
        :popup="userEditPopup"
    ></UserEditPopup>
    <UserTestPopup
      v-if="testPopup"
        @click-close="closePopup"
        :obj="selectedTestResult"
        :popup="testPopup"
    ></UserTestPopup>
    <messageOneBtnDialog
      v-if="messageOneBtnDialogStatus"
      @closeAction="dialogClose"
      :message="dialogText"
    ></messageOneBtnDialog>
    <messageTwoBtnDialog
      v-if="messageTwoBtnDialogStatus"
      @closeAction="dialogClose"
      @sendData="sendDataDialog"
      :message="dialogText"
      :dialogType="twoBtnDialogType"
    ></messageTwoBtnDialog>
    <Header @update="onChildUpdate"> </Header>
    <div :class="navigationStatus == false ? 'main' : 'mobile-main'">
      <div class="body" v-if="!isManager">
        <div class="title">내 정보 관리</div>
        <div class="tab-group">
          <div
            :class="tabStatus == 1 ? 'selected-tab' : 'unselected-tab'"
            @click="tabStatus = 1"
          >
            기본정보
          </div>
          <div
            :class="tabStatus == 2 ? 'selected-tab' : 'unselected-tab'"
            @click="tabStatus = 2"
          >
            나의 AI 건강설문 결과
          </div>
          <div
            :class="tabStatus == 3 ? 'selected-tab' : 'unselected-tab'"
            @click="tabStatus = 3"
          >
            나의 자가진단
          </div>
          <div
            :class="tabStatus == 4 ? 'selected-tab' : 'unselected-tab'"
            @click="tabStatus = 4"
          >
            구매 내역
          </div>
          <div
            :class="tabStatus == 5 ? 'selected-tab' : 'unselected-tab'"
            @click="tabStatus = 5"
          >
            나의 리뷰
          </div>
        </div>

        <!-- 기본정보 -->
        <div v-if="tabStatus == 1">
          <div class="basic-info-group">
            <div class="info-area">
              <div class="title">계정 정보</div>
              <div class="input-btn-area">
                <div class="input-area">{{ userInfo.email }}</div>
                <div
                  class="btn"
                  v-if="loginType == 0"
                  @click="pwChangedialogStatus = true"
                >
                  비밀번호 변경
                </div>
              </div>
            </div>
            <div class="info-area">
              <div class="title">전화번호</div>
              <div class="input-btn-area">
                <input class="input-area" v-model="phone" />
                <div class="btn" @click="updateProfile(2)">수정</div>
              </div>
            </div>
            <div class="logout-area">
              <div class="logout-btn" @click="twoDialogClick('logout')">
                로그아웃
              </div>
            </div>

            <div class="staff-info-group" v-if="managerObj?.name">
              <div class="left-group">
                <div class="staff-info-text">담당자 정보</div>
                <div class="remains-info-text">이름&nbsp;:&nbsp;{{managerObj.name ?? ""}}</div>
                <div class="remains-info-text">연락처&nbsp;:&nbsp;{{managerObj.phone ?? ""}}</div>
                <div class="remains-info-text">이메일&nbsp;:&nbsp;{{managerObj.email ?? ""}}</div>
              </div>
              <div style="flex: 1"></div>
              <div class="call-btn" v-if="managerObj?.phone" @click="callToManager" >전화하기</div>
            </div>

            <div class="withless-area">
              <div class="withless-btn" @click="twoDialogClick('withless')">
                <u>회원탈퇴</u>
              </div>
            </div>
          </div>
        </div>

        <!-- 나의 AI 건강설문 결과 -->
        <div v-if="tabStatus == 2">
          <div class="consulting-list-group">
            <div class="consulting-list">
              <div
                v-for="(item, i) in healthCheckList"
                :key="i"
                class="consulting-list-item"
                @click="historyPopup=true"
              >
                <div class="consulting-title">{{ item.title }}</div>
                <div class="consulting-date">{{ item.cd }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 나의 자가진단 결과 -->
        <div v-if="tabStatus == 3">
          <div class="consulting-list-group">
            <div class="consulting-list">
              <div
                v-for="(item, i) in testList"
                :key="i"
                class="consulting-list-item"
                @click="onClickTestPop(item)"
              >
                <div class="consulting-title">{{ item.t_title }}</div>
                <div class="consulting-date">{{ item.cd }}</div>
              </div>
            </div>
            
          </div>
        </div>
        <!-- 구매 내역 -->
        <div v-if="tabStatus == 4">
          <div class="consulting-list-group">
            <div class="consulting-list">
              <div
                v-for="(item, i) in buyList"
                :key="i"
                class="consulting-list-item"
                @click="$router.push({ name: 'paymentHistoryDetail', query: {order_no: item.no} })"
              >
                <div class="consulting-title">{{ item.title }}</div>
                <div class="consulting-date">{{ item.cd }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 나의 리뷰 -->
        <div v-if="tabStatus == 5">
          <div class="review-group">
            <div class="review-list-item-area">
              <div
                v-for="(item, i) in reviewList"
                :key="i"
                class="review-list-item"
              >
                <div class="rep-img-area">
                  <img
                    :class="item.i_list == null ? 'rep-no-img' : 'rep-img'"
                    :src="
                      item.i_list== null
                        ? require('@/assets/image/img_review_no_picture.png')
                        : hostUrl+item.i_list[0]
                    "
                  />
                </div>
                <div class="mobile-area">
                  <div class="title-contents-area">
                    <div class="title">{{ item.content }}</div>
                    <div class="contents">{{ item.cd }}</div>
                  </div>
                  <div style="flex: 1"></div>
                  <v-rating
                    v-model="item.score"
                    half-increments
                    readonly
                    :color="'#FFC329'"
                    :background-color="'#FFC329'"
                    :length="5"
                    :size="32"
                  >
                  </v-rating>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="body" v-else>
        <div class="manager-container">
          <div class="manager-info-edit">
            <div class="manager-title">내 고객 관리</div>
            <div class="manager-profile-edit">
              <img :src="profileImage" class="manager-profile-image" />
              <!-- <input type="button" class="manager-profile-edit-button" value="내 정보 수정" @click="userEditPopup = false"/> -->
              <v-btn class="ma-0 pa-0 manager-profile-edit-button"  @click="userEditPopup = true">내 정보 수정</v-btn>
            </div>
            <div class="my-url-container" v-if="myUrl">
              <div>나의 URL</div>
              <div >{{myUrl ? myUrl : ''}}</div>
              <v-btn class="my-url-copy-button" @click="copyUrl">복사하기</v-btn>
            </div>
          </div>
          <v-divider inset vertical color="#333"/>
          <div class="manager-userlist" v-if="!selectUser">
            <input
              v-model="searchText"
              class="manager-userlist-searchbar"
              type="text"
              placeholder="환자를 검색해주세요"
              autocomplete="off"
              @change="searchUser"
            />
            <v-data-table 
              :items="searchedUserList"
              :headers="userListHeaders"
              disable-sort
              item-key="no"
              class="manager-table"
            >
              <template v-slot:item="{item}" >
                <tr>
                  <td class="ma-0 pa-0" style="width:40%">
                    <v-col class="ma-0 pa-0 manager-info">
                      <div class="name">{{item?.name}}</div>
                      <div class="email">{{item?.email}}</div>
                      <div class="phone">{{item?.phone}}</div>
                    </v-col>
                  </td>
                  <td style="width:40%">
                    {{item?.memo}}
                  </td>
                  <td class="align-center" style="width:20%">
                    <div class="list-buttons">
                      <input type="button"
                        @click="callToUser(item)"
                        class="list-call-button"
                        value="전화하기"
                      />
                      <input type="button"
                        class="list-show-info-button"
                        @click="showUserInfo(item)"
                        value="정보"
                      />
                    </div>
                  </td>
                </tr>
              </template>
              <!-- <template v-slot:[`item.userInfo`]="{item}">
                <v-col class="ma-0 pa-0 manager-info">
                  <div class="name">{{item?.name}}</div>
                  <div class="email">{{item?.email}}</div>
                  <div class="phone">{{item?.phone}}</div>
                </v-col>
              </template>
              <template v-slot:[`item.memo`]="{item}">
                <div>{{item?.memo}}</div>
              </template>
              <template v-slot:[`item.etc`]="{item}">
                <v-row class="ma-0 pa-0" >
                  <v-spacer/>
                  <v-btn 
                    @click="callToUser(item)"
                    class="list-call-button"
                  >
                    전화하기
                  </v-btn>
                  <v-btn 
                    class="list-show-info-button"
                    @click="showUserInfo(item)"
                  >
                    정보
                  </v-btn>
                </v-row>
              </template> -->
            </v-data-table>
          </div>
          <div v-else class="user-info-container">
            <div class="user-info-back-row-cover">
              <v-icon class="user-info-back-icon" @click="selectUser = null">mdi-keyboard-backspace</v-icon>
              <v-btn style="background-color: #4589c8; color:white;" @click="saveUserMemo">저장</v-btn>
            </div>
            <div class="user-info-row-cover">
              <div class="user-info-title">회원 명</div>
              <div class="user-info-content">{{selectUser?.name}}</div>
            </div>
            <div class="user-info-row-cover">
              <div class="user-info-title">나이/성별</div>
              <div class="user-info-content">{{selectUser?.age}}/{{selectUser?.gender == 0 ? '남' : '여'}}</div>
            </div>
            <div class="user-info-row-cover">
              <div class="user-info-title">가입일자</div>
              <div class="user-info-content">{{selectUser.cd}}</div>
            </div>
            <div class="user-info-row-cover">
              <div class="user-info-title">전화번호</div>
              <div class="user-info-content">{{selectUser.phone}}</div>
            </div>
            <div class="user-info-row-cover">
              <div class="user-info-title">이메일</div>
              <div class="user-info-content">{{selectUser.email}}</div>
            </div>
            <div class="user-info-divider"/>
            <div class="user-info-column-cover">
              <div class="user-info-title">회원 메모</div>
              <v-textarea 
                height="200"
                class="ma-0 pa-0"
                outlined
                hide-details
                no-resize
                dense
                v-model="selectUser.memo"
              />
            </div>
            <div class="user-info-divider"/>
            <div class="user-info-column-cover">
              <div class="user-info-title">설문내역({{surveyList?.length}})</div>
              <v-data-table :items="surveyList" disable-sort
                item-key="no" 
              >
                <template v-slot:item="{item}" >
                  <tr @click="historyPopup=true">
                      <div class="list-row" >{{item.title}}</div>
                  </tr>
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import PwChangeDialog from '../../components/passwordChangeDialog.vue'
import messageOneBtnDialog from '~/components/messageOneBtnDialog.vue'
import messageTwoBtnDialog from '~/components/messageTwoBtnDialog.vue'
import UserSurveyPopup from '@/components/userSurveyPopup'
import UserTestPopup from '@/components/userTestPopup'
import UserEditPopup from '@/components/userEditPopup'

import Moment from 'moment'
import _ from 'lodash'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
    PwChangeDialog,
    messageOneBtnDialog,
    messageTwoBtnDialog,
    UserSurveyPopup,
    UserTestPopup,
    UserEditPopup
  },
  created() {
    if (this.$route.params.tabs != undefined) {
      this.tabStatus = this.$route.params.tabs
    }
  },
  data() {
    return {
      userInfo: '',
      phone: '',
      navigationStatus: false,
      tabStatus: 1, //1 기본정보, 2 나의 AI 건강설문 결과, 3 테스트, 4 구매내역, 5 나의 리뷰
      pwChangedialogStatus: false,
      messageOneBtnDialogStatus: false,
      messageTwoBtnDialogStatus: false,
      twoBtnDialogType: '',
      dialogText: '',
      consultingCurrentPageNum: 1,
      consultingPagingNum: 0,
      consultingTotalPage: 0,
      showLimit: 10,
      consultingBlockNum: 0,
      tabsSelect: 0,
      loginType: 0,
      currentPwCheck: 0, // 0 - none & success, 1 - fail
      changePw: '',
      consultingList: [
        {
          title:
            'probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1',
          date: '23-09-21',
        },
        { title: 'probiotics2', date: '23-09-21' },
        { title: 'probiotics3', date: '23-09-21' },
        { title: 'probiotics4', date: '23-09-21' },
        { title: 'probiotics5', date: '23-09-21' },
        { title: 'probiotics6', date: '23-09-21' },
        { title: 'probiotics7', date: '23-09-21' },
        { title: 'probiotics8', date: '23-09-21' },
        { title: 'probiotics9', date: '23-09-21' },
        { title: 'probiotics10', date: '23-09-21' },
        { title: 'probiotics11', date: '23-09-21' },
        { title: 'probiotics12', date: '23-09-21' },
      ],
      filterConsultingList: [],

      paymentCurrentPageNum: 1,
      paymentPagingNum: 0,
      paymentTotalPage: 0,
      paymentBlockNum: 0,
      paymentList: [
        {
          title:
            'probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1probiotics1',
          date: '23-09-21',
        },
        { title: 'probiotics2', date: '23-09-21' },
        { title: 'probiotics3', date: '23-09-21' },
        { title: 'probiotics4', date: '23-09-21' },
        { title: 'probiotics5', date: '23-09-21' },
        { title: 'probiotics6', date: '23-09-21' },
        { title: 'probiotics7', date: '23-09-21' },
        { title: 'probiotics8', date: '23-09-21' },
        { title: 'probiotics9', date: '23-09-21' },
        { title: 'probiotics10', date: '23-09-21' },
        { title: 'probiotics11', date: '23-09-21' },
        { title: 'probiotics12', date: '23-09-21' },
        { title: 'probiotics13', date: '23-09-21' },
      ],
      filterPaymentList: [],

      reviewCurrentPageNum: 1,
      reviewPagingNum: 0,
      reviewTotalPage: 0,
      reviewShowLimit: 5,
      reviewBlockNum: 0,
      filterReviewList: [],
      buyList:[],
      healthCheckList:[],
      testList:[],
      reviewList:[],
      hostUrl:null,
      managerObj: {
        name: null,
        phone: null,
        email: null,
      },
      historyPopup: false,
      selectedUser:null,
      testPopup:false,
      selectedTestResult:null,

      userList: [],
      searchedUserList: [],
      isManager: false,
      profileImage: null,
      myUrl: null,
      userListHeaders: [
        {text:"회원정보",value:"userInfo", width:"30%"},
        {text:"메모",value:"memo", width:"40%"},
        {text:"기타",value:"etc", width:"30%"},
      ],
      searchText: null,
      selectUser: null,
      surveyList: [],
      selectSurvey: null,
      userEditPopup: false,
    }
  },
  mounted() {

    this.hostUrl = process.env.BASE_URL
    if (typeof window !== undefined) {
      this.userInfo =
        localStorage != undefined
          ? JSON.parse(localStorage.getItem('userInfo'))
          : undefined
      if (this.userInfo == '' || this.userInfo == undefined) {
        this.$router.replace('Login')
      } else {
        this.phone = this.userInfo.phone
        if (this.userInfo.type == '카카오' || this.userInfo.type == '네이버')
          this.loginType = 1
      }
    }
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.tabStatus = this.$route.query.tab
    this.selectItem()
    
    if (this.userInfo.manager_no != null || this.userInfo.manager_no != undefined) {
      this.selectManagerInfo(this.userInfo.manager_no)
    } else {
      this.selectUserInfo(this.userInfo.no)
    }
  },
  methods: {
    saveUserMemo() {
      if (!this.selectUser?.memo) {return}
      let param = {
        memo: this.selectUser?.memo,
        no: this.selectUser?.no,
        table: 'user',
        conditions:[{q:"=",f:"no",v:this.selectUser?.no}]
      }
      this.$axios.post('/api/update', param).then(async res => {
          alert('저장되었습니다.')
      }).catch(err => {
          console.log("update err : ", err)
      })
    },
    onClickTestPop(item){
        this.testPopup=true
        this.selectedTestResult = item
    },
    closePopup(type) {
        if (type == 'history')this.historyPopup = !this.historyPopup
        else if (type == 'edit') {this.userEditPopup = !this.userEditPopup; this.selectUserInfo(this.userInfo.no)}
        else this.testPopup = !this.testPopup
    },
    async copyUrl() {
        if (this.myUrl) {
            let text = this.myUrl
            await window.navigator.clipboard.writeText(text).then(() => {
                alert('복사되었습니다.')
            })
        }
    },
    async selectHealthCheckList() {
      let sConditions = [{ q: '=', f: 'u_no', v: this.selectUser.no },{ q: 'order', f: 'cd', o: 'DESC' }]
        let surveyFormBody = {
            table: 'survey_result',
            conditions: sConditions,
        }
        await this.$axios
        .post('/api/select', surveyFormBody)
        .then((res) => {
            if (res.data.length > 0) {
                this.surveyList = res.data
                for(let one of this.surveyList){
                    one.title = Moment(one.cd).format('YY년MM월DD일')+"의 건강설문 결과"
                    one.cd = Moment(one.cd).format('YY-MM-DD HH:mm')
                }
            } 
        })
        .catch(function (error) {
            console.log('에러!!', error)
        })
    },
    searchUser() {
      this.searchedUserList = _.filter(this.userList, item => {
        return item?.name?.includes(this.searchText)
      })
    },
    callToUser(item) {
      if (item?.phone)
        window.location.href=`tel:${item?.phone}`
    },
    showUserInfo(item) {
      this.selectUser = item
      if (this.selectUser.birth && Number(this.selectUser?.birth)) {
        const today = new Date();
        const birthDate = new Date(this.selectUser.birth, 7, 10); // 2000년 8월 10일

        this.selectUser.age = today.getFullYear() - birthDate.getFullYear() + 1;
      }
      this.selectUser.cd = Moment(this.selectUser.cd).format('YYYY-MM-DD HH:mm')
      this.selectedUser = item
      this.selectHealthCheckList()
    },
    callToManager(){
      if (managerObj?.phone)
        window.location.href=`tel:${managerObj?.phone}`
    },
    profileImageUrl(url) {
        if(url?.includes('http')) return url
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
    async selectUserInfo(no) {
      let conditions = []
      conditions.push({"q":"=","f":"no","v":no})
      let param = {
        table: 'user',
        conditions: conditions
      }
      await this.$axios.post('/api/select', param).then(async res => {
        if (res.data?.length > 0) {
            this.selectedUser = res.data[0]
            this.setLocalItem()
          if (res.data[0]?.manager_no) {
            this.selectManagerInfo(res.data[0]?.manager_no)
          }
          if (res.data[0]?.profile_url) {
            let profileUrl = JSON.parse(res.data[0]?.profile_url)?.length > 0 ? JSON.parse(res.data[0]?.profile_url)[0] : null
            
            this.selectedUser.profile_url = profileUrl
            this.profileImage = this.profileImageUrl(profileUrl)
          }
          if (res.data[0]?.url) {
            this.myUrl = res.data[0]?.url
          }
          if (res.data[0]?.is_manager == 1) {
            this.isManager = true
            this.selectManagedUserList(no)
          }
        }
      }).catch(err => {
        console.log("error : ", err)
      })
    },
    setLocalItem() {
      let userInfo = {
        no: this.selectedUser.no,
        type: this.selectedUser.type,
        email: this.selectedUser.email,
        gender: this.selectedUser.gender,
        token: this.selectedUser.token,
        name: this.selectedUser.name,
        phone: this.selectedUser.phone,
        email: this.selectedUser.email,
        status: this.selectedUser.status,
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    async selectManagedUserList(no) {
      let conditions = []
      conditions.push({"q":"=","f":"manager_no","v":no})
      conditions.push({ q: 'order', f: 'cd', o: 'DESC' })
      let param = {
        table: 'user',
        conditions: conditions
      }
      await this.$axios.post('/api/select', param).then(res => {
        if (res.data?.length > 0) {
          this.userList = res.data
          this.searchedUserList = this.userList
        }
      }).catch(err => {
        console.log("selectManagedUserList error : ", err)
      })
    },
    async selectManagerInfo(no) {
      let conditions = []
      conditions.push({"q":"=","f":"no","v":no})
      let param = {
        table: 'user',
        conditions: conditions
      }
      await this.$axios.post('/api/select', param).then(res => {
        if (res.data?.length > 0) {
          this.managerObj.name = res.data[0]?.name
          this.managerObj.phone = res.data[0]?.phone
          this.managerObj.email = res.data[0]?.email
        }
      }).catch(err => {
        console.log("error : ", err)
      })
    },
    async selectItem(){
        let conditions = [{ q: '=', f: 'b_no', v: this.userInfo.no },{ "op":"AND",q: '=', f: 'status', v: 7 },{ q: 'order', f: 'cd', o: 'DESC' }]
        let orderFormBody = {
            table: 'orders',
            conditions: conditions,
        }
        try {
            await this.$axios
            .post('/api/select', orderFormBody)
            .then((res) => {
                if (res.data.length > 0) {
                    this.buyList = res.data
                    for(let one of this.buyList){
                        let productList = JSON.parse(one.order_list)
                        if(productList.length>1){
                            one['title'] = JSON.parse(productList[0]).product.name + "외 "+(productList.length-1)+"건"
                        }else{
                            one['title'] = JSON.parse(productList[0]).product.name
                        }
                        one.cd = Moment(one.cd).format('YY-MM-DD HH:mm')
                    }
                } 
            })
            .catch(function (error) {
                console.log('에러!!', error)
            })
        } catch (err) {
            console.log('err!! : ' + err)
        }
        let sConditions = [{ q: '=', f: 'u_no', v: this.userInfo.no },{ q: 'order', f: 'cd', o: 'DESC' }]
        let surveyFormBody = {
            table: 'survey_result',
            conditions: sConditions,
        }
        try {
            await this.$axios
            .post('/api/select', surveyFormBody)
            .then((res) => {
                if (res.data.length > 0) {
                    this.healthCheckList = res.data
                    for(let one of this.healthCheckList){
                        one.title = Moment(one.cd).format('YY년MM월DD일')+"의 건강설문 결과"
                        one.cd = Moment(one.cd).format('YY-MM-DD HH:mm')
                    }
                } 
            })
            .catch(function (error) {
                console.log('에러!!', error)
            })
        } catch (err) {
            console.log('err!! : ' + err)
        }
        let tConditions = [{ q: '=', f: 'u_no', v: this.userInfo.no },{ q: 'order', f: 'cd', o: 'DESC' }]
        let testFormBody = {
            table: 'test_result',
            conditions: tConditions,
        }
        try {
            await this.$axios
            .post('/api/select', testFormBody)
            .then((res) => {
                if (res.data.length > 0) {
                    this.testList = res.data
                    for(let one of this.testList){
                        one.cd = Moment(one.cd).format('YY-MM-DD HH:mm')
                    }
                } 
            })
            .catch(function (error) {
                console.log('에러!!', error)
            })
        } catch (err) {
            console.log('err!! : ' + err)
        }
        let rConditions = [{ q: '=', f: 'u_no', v: this.userInfo.no },{ q: 'order', f: 'cd', o: 'ASC' }]
        let reviewFormBody = {
            table: 'review',
            conditions: rConditions,
        }
        try {
            await this.$axios
            .post('/api/select', reviewFormBody)
            .then((res) => {
                if (res.data.length > 0) {
                    this.reviewList = res.data
                    for(let one of this.reviewList){
                        
                        one.i_list = JSON.parse(one.i_list)
                        
                        one.cd = Moment(one.cd).format('YY-MM-DD HH:mm')
                    }
                } 
            })
            .catch(function (error) {
                console.log('에러!!', error)
            })
        } catch (err) {
            console.log('err!! : ' + err)
        }

    },
    onChildUpdate(newValue) {
      this.navigationStatus = newValue
    },
    dialogClose(dialogType) {
      if (dialogType == 'pw') {
        this.pwChangedialogStatus = false
      } else if (dialogType == 'messageDialog') {
        this.messageOneBtnDialogStatus = false
        if (this.dialogText == '회원탈퇴가 정상적으로 진행되었습니다.') {
          localStorage.clear()
          this.$router.replace({ name: 'login' })
        }
      } else if (dialogType == 'messageTwoDialog') {
        this.messageTwoBtnDialogStatus = false
      } else if(dialogType == 'surveyResult'){

      }
    },
    twoDialogClick(dialogType) {
      if (dialogType == 'logout') {
        this.dialogText = '로그아웃을 하시겠습니까?'
        this.twoBtnDialogType = 'logout'
        this.messageTwoBtnDialogStatus = true
      } else if (dialogType == 'withless') {
        this.dialogText = '회원탈퇴를 하시겠습니까?'
        this.messageTwoBtnDialogStatus = true
        this.twoBtnDialogType = 'withless'
      }
    },
    sendDataDialog(dialogType, type) {
      if (dialogType == 'messageTwoDialog') {
        if (type == 'logout') {
          this.logoutClick()
        } else if (type == 'withless') {
          this.withlessClick()
        }
      }
    },
    pwChangeDialogSendData(nowPw, newPw, confirmPw) {
      this.changePw = newPw
      this.checkPw(nowPw)
    },
    logoutClick() {
      this.messageTwoBtnDialogStatus = false
      localStorage.clear()
      this.$router.replace({ name: 'Login' })
    },
    withlessClick() {
      this.messageTwoBtnDialogStatus = false
      this.updateProfile(3)
    },
    async updateProfile(type) {
      let formBody = {}
      let obj = [{ table: 'user', col: 'no' }]
      if (type == 1) {
        // 1 - 비밀번호 변경, 2 - 전화번호 변경, 3 - 회원탈퇴
        let conditions = [
          { q: '=', f: 'no', v: this.userInfo.no },
          // { q: '=', f: 'pw', v: '' },
        ]
        formBody = {
          table: 'user',
          pw: this.changePw,
          no: this.userInfo.no,
          conditions: conditions,
        }
        this.dialogText = '비밀번호가 변경되었습니다.'
      } else if (type == 2) {
        let conditions = [
          { q: '=', f: 'no', v: this.userInfo.no },
          // { q: '=', f: 'phone', v: '"' + this.phone + '"' },
        ]
        formBody = {
          table: 'user',
          phone: this.phone,
          no: this.userInfo.no,
          conditions: conditions,
        }
        this.dialogText = '전화번호가 변경되었습니다.'
      } else if (type == 3) {
        let conditions = [
          { q: '=', f: 'no', v: this.userInfo.no },
          // { q: '=', f: 'status', v: 0 },
        ]
        formBody = {
          table: 'user',
          status: 0,
          no: this.userInfo.no,
          conditions: conditions,
        }
        this.dialogText = '회원탈퇴가 정상적으로 진행되었습니다.'
      }


      try {
        await this.$axios
          .post('/api/update', formBody)
          .then((res) => {
            if (res.data.length > 0) {
              if (type == 3) {
                this.messageOneBtnDialogStatus = true
              } else {
                localStorage.removeItem('userInfo')
                let userInfo = {
                  no: res.data[0].no,
                  type: res.data[0].type,
                  email: res.data[0].email,
                  gender: res.data[0].gender,
                  token: res.data[0].token,
                  name: res.data[0].name,
                  phone: res.data[0].phone,
                  email: res.data[0].email,
                  status: res.data[0].status,
                }
                localStorage.setItem('loginStatus', true)
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                this.messageOneBtnDialogStatus = true
              }
            }
          })
          .catch(function (error) {
            console.log('에러!!', err)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
    async checkPw(pw) {
      let formBody = {}
      let conditions = [
        { q: '=', f: 'no', v: this.userInfo.no },
        { op: 'AND', q: '=', f: 'pw', v: pw },
      ]
      formBody = {
        table: 'user',
        conditions: conditions,
      }

      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            if (res.data.length > 0) {
              this.currentPwCheck = 0
              this.pwChangedialogStatus = false
              this.updateProfile(1)
            } else {
              this.currentPwCheck = 1
              console.log('not found')
            }
          })
          .catch(function (error) {
            console.log('에러!!', err)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 0px;
  .body {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 40px 20px;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      font-size: 36px;
      font-family: 'score7';
    }
    .tab-group {
      min-width: 990px;
      margin-top: 70px;
      display: flex;
      * + * {
        margin-left: 13px;
      }
      .selected-tab {
        flex: 1;
        height: 60px;
        border-radius: 30px;
        background-color: #9ad144;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        font-family: 'score6';
        cursor: pointer;
      }
      .unselected-tab {
        flex: 1;
        height: 60px;
        border-radius: 30px;
        border: 1px solid #ddd;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
        font-size: 18px;
        font-family: 'score2';
        cursor: pointer;
      }
    }
    .basic-info-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      .info-area {
        width: 100%;
        margin-top: 50px;
        justify-content: flex-start;
        .title {
          color: #333;
          font-size: 16px;
          font-family: 'score5';
          display: flex;
          justify-content: flex-start;
        }
        .input-btn-area {
          width: 100%;
          display: flex;
          height: 60px;
          align-items: center;
          border-bottom: 1px solid #dddddd;
          .input-area {
            flex: 1;
            color: #333;
            font-size: 16px;
            font-family: 'score5';
            vertical-align: baseline;
            padding: 0px 0px;
            margin-top: 15px;
            outline: none;
          }
          .btn {
            width: 130px;
            height: 45px;
            background-color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 15px;
            font-family: 'score6';
            cursor: pointer;
          }
        }
      }
      .logout-area {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 70px;
        .logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 300px;
          height: 70px;
          cursor: pointer;
          font-size: 18px;
          font-family: 'score5';
          color: #fff;
          background-color: #333;
        }
      }
      .withless-area {
        width: 100%;
        margin-top: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        .withless-btn {
          cursor: pointer;
          color: #666;
          font-size: 16px;
          font-family: 'score2';
        }
      }
      .staff-info-group {
        margin-top: 70px;
        padding: 30px;
        display: flex;
        align-items: center;
        border: 1px solid #ddd;
        background-color: #f8f8f8;
        .left-group {
          .staff-info-text {
            margin-bottom: 5px;
            color: #333;
            font-size: 16px;
            font-family: 'score5';
          }
          .remains-info-text {
            margin-top: 10px;
            color: #666;
            font-size: 14px;
            font-family: 'score2';
          }
        }
        .call-btn {
          width: 130px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 15px;
          font-family: 'score6';
          background-color: #9ad144;
          cursor: pointer;
        }
      }
    }

    .consulting-list-group {
      margin-top: 51px;
      .consulting-list {
        border-top: 2px solid #333;

        .consulting-list-item {
          width: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          div {
            border-bottom: 1px solid #ddd;
            padding: 20px 2px;
          }
          .consulting-title {
            flex: 0.7;
            color: #333;
            font-size: 16px;
            font-family: 'score2';
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .consulting-date {
            flex: 0.3;
            color: #333;
            font-size: 16px;
            font-family: 'score2';
            display: flex;
            justify-content: flex-end;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
    .review-group {
      margin-top: 50px;
      .review-list-item-area {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .review-list-item {
          border: 1px solid #ddd;
          background-color: #fff;
          padding: 41px;
          display: flex;
          .rep-img-area {
            border: 1px solid #ddd;
            background-color: #fff;
            width: 120px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            .rep-no-img {
              width: 44px;
              height: 44px;
            }
            .rep-img {
              width: 120px;
              height: 100px;
            }
          }
          .mobile-area {
            width: 100%;
            display: flex;
          }
          .title-contents-area {
            display: block;
            margin-left: 30px;

            .title {
              color: #333;
              font-size: 18px;
              font-family: 'score6';

            }
            .contents {
              color: #666;
              font-size: 16px;
              font-family: 'score2';
              margin-top: 10px;
              line-height: 1.4;
            }
          }
          .rating-area {
            display: flex;
            margin-left: 20px;
            align-items: center;
            .rating {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
    .paging-group {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 42px;
      margin-top: 50px;
      * + * {
        margin-left: 6px;
      }
      .rectangle-area {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        background-color: #fff;
        cursor: pointer;
        .one-arrow {
          width: 6.36px;
          height: 9.54px;
        }

        .two-arrow {
          width: 12px;
          height: 9.54px;
        }
        .rotate-one-arrow {
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          -o-transform: rotate(180deg);
          transform: rotate(180deg);
          width: 6.36px;
          height: 9.54px;
        }
        .rotate-two-arrow {
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          -o-transform: rotate(180deg);
          transform: rotate(180deg);
          width: 12px;
          height: 9.54px;
        }
      }
      .rectangle-area:hover {
        border: 1px solid rgba(154, 209, 68, 1);
        //   filter: saturate(1%) brightness(150%) sepia(1%);
      }
      .paging-num-area {
        display: flex;
        .paging-num {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #666;
          font-size: 16px;
          font-family: 'score2';
        }
        .select-paging-num {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #9ad144;
          font-size: 16px;
          font-family: 'score2';
          text-decoration: underline;
        }
        .paging-num:hover {
          color: #9ad144;
        }
      }
    }
    .manager-container {
      display:flex;
      flex-direction: row;
      .manager-info-edit {
        flex-direction: column;
        display:flex;
        width: 25%;
        overflow-y: auto;
        .manager-title {
          display: flex;
          align-items: center;
          color: #333;
          font-size: 36px;
          font-family: 'score7';
        }
        .manager-profile-edit {
          padding:20px 0px;
          flex-direction: row;
          display:flex;
          .manager-profile-image {
            width: 120px;
            height: 120px;
            max-height: 120px;
            border: solid 1px #333;
          }
          .manager-profile-edit-button {
            align-items: center;
            justify-content: center;
            background-color: #4589c8;
            color: white;
            display: flex;
            margin: auto;
            padding: 8px;
            border-radius: 8px;
          }
        }
        .my-url-container {
          flex-direction: column;
          display: flex;
          .my-url-copy-button {
            align-items: center;
            background-color: #4589c8;
            color: white;
            display: flex;
            margin: 16px auto;
            padding: 8px;
            border-radius: 8px;
          }
        }
        .ask-admin-button {
            background-color: #4589c8;
            color: white;
            display: flex;
            margin: 16px auto;
            padding: 16px;
            border-radius: 8px;
        }
      }
      .manager-userlist {
        flex-direction: column;
        display: flex;
        width: 75%;
        padding: 0px 16px;
        .manager-userlist-searchbar {
          padding: 8px;
          height: 50px;
          border: 1px solid #dddddd;
          background-color: #fff;
          color: #999999;
          letter-spacing: -0.6px;
          border-radius: 1px;
          font-size: 16px;
          font-family: 'score2';
          padding: 12px;
          border-radius: 25px;
        }
        .manager-table {
          padding: 16px 16px;
        }
        .manager-info {
          align-items: center;
          color: #333;
          .name {
            font-size: 16px;
            font-family: 'score6';
          }
          .email {
            font-size: 14px;
            font-family: 'score4';
          }
          .phone {
            font-size: 14px;
            font-family: 'score4';
          }
        }
        .list-buttons {
          display:flex;
          flex-direction: row;
          .list-call-button {
            background-color: #35a74c;
            color:white;
            font-size: 14px;
            font-family: 'score4';
            padding: 8px 16px;
            border-radius: 8px;
          }
          .list-show-info-button {
            background-color: #4589c8;
            margin-left: 16px;
            color:white;
            font-size: 14px;
            font-family: 'score4';
            padding: 8px 16px;
            border-radius: 8px;
          }
        }
      }
      .user-info-container {
        width: 75%;
        padding: 0px 16px;
        display:flex;
        flex-direction: column;
        .user-info-back-row-cover {
          flex-direction: row;
          display:flex;
          margin: 12px 0px;
          align-items: center;
          justify-content: space-between;
        }
        .user-info-row-cover {
          flex-direction: row;
          display:flex;
          margin: 12px 0px;
          .user-info-back-icon {
            color: black;
            width: 50px;
            height: 50px;
          }
          .user-info-title {
            font-size: 17px;
            font-family: 'score5';
            width: 120px
          }
          .user-info-content {
            font-size: 17px;
            font-family: 'score4';
          }
        }
        .user-info-divider {
          height:0.5px;
          background-color:#adadad;
          margin: 16px 0px;
        }
        .user-info-column-cover {
          flex-direction: column;
          display:flex;
          margin: 12px 0px;

          .user-info-title {
            font-size: 17px;
            font-family: 'score5';
            margin-bottom: 16px;
          }
          .list-row{
              width: 100%;
              border-bottom: solid #d3d3d3 0.5px;
              height: 40px;
              display: flex;
              padding-left:20px;
              align-items: center;
              justify-content: flex-start;
          }
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .mobile-main {
    display: none;
  }
  .main {
    margin-top: 0px;
    .body {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 50px 20px;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 30px;
        font-family: 'score7';
      }
      .tab-group {
        min-width: 0px;
        width: 100%;
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        * + * {
          margin-left: 0px;
        }
        .selected-tab {
          width: 48%;
          flex: 0 0 auto;
          height: 50px;
          border-radius: 30px;
          background-color: #9ad144;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          font-family: 'score6';
          cursor: pointer;
        }
        .unselected-tab {
          flex: 0 0 auto;
          width: 48%;
          height: 50px;
          border-radius: 30px;
          border: 1px solid #ddd;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 14px;
          font-family: 'score2';
          cursor: pointer;
        }
      }
      .basic-info-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        .info-area {
          width: 100%;
          margin-top: 30px;
          justify-content: flex-start;
          .title {
            color: #333;
            font-size: 14px;
            font-family: 'score5';
            display: flex;
            justify-content: flex-start;
          }
          .input-btn-area {
            width: 100%;
            display: flex;
            height: 50px;
            align-items: center;
            border-bottom: 1px solid #dddddd;
            .input-area {
              flex: 1 0 70%;
              color: #333;
              font-size: 14px;
              font-family: 'score5';
              vertical-align: baseline;
              padding: 0px 0px;
              margin-top: 15px;
              outline: none;
            }
            .btn {
              width: 120px;
              height: 45px;
              background-color: #333;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              font-size: 13px;
              font-family: 'score6';
              cursor: pointer;
            }
          }
        }
        .logout-area {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 40px;
          .logout-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 60px;
            cursor: pointer;
            font-size: 16px;
            font-family: 'score5';
            color: #fff;
            background-color: #333;
          }
        }
        .withless-area {
          width: 100%;
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          .withless-btn {
            cursor: pointer;
            color: #666;
            font-size: 14px;
            font-family: 'score2';
          }
        }
        .staff-info-group {
          margin-top: 40px;
          padding: 20px;
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          background-color: #f8f8f8;
          .left-group {
            .staff-info-text {
              margin-bottom: 5px;
              color: #333;
              font-size: 14px;
              font-family: 'score5';
            }
            .remains-info-text {
              margin-top: 10px;
              color: #666;
              font-size: 12px;
              font-family: 'score2';
            }
          }
          .call-btn {
            width: 120px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 13px;
            font-family: 'score6';
            background-color: #9ad144;
            cursor: pointer;
          }
        }
      }

      .consulting-list-group {
        margin-top: 51px;
        .consulting-list {
          border-top: 2px solid #333;

          .consulting-list-item {
            width: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            div {
              border-bottom: 1px solid #ddd;
              padding: 20px 2px;
            }
            .consulting-title {
              flex: 0.7;
              display: block;
              color: #333;
              font-size: 14px;
              font-family: 'score2';
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .consulting-date {
              flex: 0.3;
              display: flex;
              justify-content: flex-end;
              color: #333;
              font-size: 14px;
              font-family: 'score2';
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
      .review-group {
        margin-top: 50px;
        .review-list-item-area {
          display: flex;
          flex-direction: column;
          gap: 20px;
          .review-list-item {
            border: 1px solid #ddd;
            background-color: #fff;
            padding: 20px;
            display: flex;
            flex-direction: column;
            .rep-img-area {
              border: 1px solid #ddd;
              background-color: #fff;
              width: 100%;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              .rep-no-img {
                width: 30%;
                height: auto;
              }
              .rep-img {
                width: 90%;
                height: auto;
              }
            }
            .mobile-area {
              width: 100%;
              display: flex;
              flex-direction: column;
            }
            .title-contents-area {
              margin-left: 20px;
              
              flex-direction: column;
              align-items: flex-start;
              .title {
                color: #333;
                font-size: 18px;
                font-family: 'score6';
              }
              .contents {
                color: #666;
                font-size: 16px;
                font-family: 'score2';
                margin-top: 10px;
                line-height: 1.4;
              }
            }
            .rating-area {
              display: flex;
              margin-left: 20px;
              margin-top: 20px;
              align-items: center;
              .rating {
                width: 14px;
                height: 14px;
              }
            }
          }
        }
      }
      .paging-group {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 42px;
        margin-top: 50px;
        * + * {
          margin-left: 6px;
        }
        .rectangle-area {
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ddd;
          background-color: #fff;
          cursor: pointer;
          .one-arrow {
            width: 6.36px;
            height: 9.54px;
          }

          .two-arrow {
            width: 12px;
            height: 9.54px;
          }
          .rotate-one-arrow {
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            transform: rotate(180deg);
            width: 6.36px;
            height: 9.54px;
          }
          .rotate-two-arrow {
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            transform: rotate(180deg);
            width: 12px;
            height: 9.54px;
          }
        }
        .rectangle-area:hover {
          border: 1px solid rgba(154, 209, 68, 1);
          //   filter: saturate(1%) brightness(150%) sepia(1%);
        }
        .paging-num-area {
          display: flex;
          align-items: center;
          .paging-num {
            width: 5vw;
            height: 10vw;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #666;
            font-size: 14px;
            font-family: 'score2';
          }
          .select-paging-num {
            width: 5vw;
            height: 10vw;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #9ad144;
            font-size: 14px;
            font-family: 'score2';
            text-decoration: underline;
          }
          .paging-num:hover {
            color: none;
          }
        }
      }
      .manager-container {
        display:flex;
        flex-direction: column;
        .manager-info-edit {
          flex-direction: column;
          display:flex;
          width: 100%;
          overflow-y: auto;
          .manager-title {
            display: flex;
            align-items: center;
            color: #333;
            font-size: 36px;
            font-family: 'score7';
          }
          .manager-profile-edit {
            padding:20px 0px;
            flex-direction: row;
            display:flex;
            .manager-profile-image {
              width: 120px;
              height: 120px;
              max-height: 120px;
              border: solid 1px #333;
            }
            .manager-profile-edit-button {
              align-items: center;
              justify-content: center;
              background-color: #4589c8;
              color: white;
              display: flex;
              margin: auto;
              padding: 8px;
              border-radius: 8px;
            }
          }
          .my-url-container {
            flex-direction: column;
            display: flex;
            margin:16px;
            .my-url-copy-button {
              align-items: center;
              background-color: #4589c8;
              color: white;
              display: flex;
              margin: auto;
              padding: 8px;
              border-radius: 8px;
            }
          }
          .ask-admin-button {
              background-color: #4589c8;
              color: white;
              display: flex;
              margin: 16px auto;
              padding: 16px;
              border-radius: 8px;
          }
        }
        .manager-userlist {
          flex-direction: column;
          display: flex;
          width: 100%;
          padding: 0px;
          .manager-userlist-searchbar {
            padding: 8px;
            height: 50px;
            border: 1px solid #dddddd;
            background-color: #fff;
            color: #999999;
            letter-spacing: -0.6px;
            border-radius: 1px;
            font-size: 16px;
            font-family: 'score2';
            padding: 12px;
            border-radius: 25px;
          }
          .manager-table {
            padding: 16px 0px;
          }
          .manager-info {
            align-items: center;
            color: #333;
            margin: 0px;
            padding: 4px;
            .name {
              font-size: 12px;
              font-family: 'score6';
            }
            .email {
              font-size: 10px;
              font-family: 'score4';
            }
            .phone {
              font-size: 10px;
              font-family: 'score4';
            }
          }
          .list-buttons {
            display:flex;
            flex-direction: column;
            .list-call-button {
              background-color: #35a74c;
              color:white;
              font-size: 10px;
              font-family: 'score4';
              padding: 4px 8px;
              border-radius: 4px;
            }
            .list-show-info-button {
              background-color: #4589c8;
              color:white;
              font-size: 10px;
              font-family: 'score4';
              padding: 4px 8px;
              margin: 4px 0px;
              border-radius: 4px;
            }
          }
        }
        .user-info-container {
          width: 100%;
          padding: 0px 16px;
          display:flex;
          flex-direction: column;
          .user-info-back-row-cover {
            flex-direction: row;
            display:flex;
            margin: 12px 0px;
            align-items: center;
            justify-content: space-between;
          }
          .user-info-row-cover {
            flex-direction: row;
            display:flex;
            margin: 12px 0px;
            .user-info-back-icon {
              color: black;
              width: 50px;
              height: 50px;
            }
            .user-info-title {
              font-size: 17px;
              font-family: 'score5';
              width: 120px
            }
            .user-info-content {
              font-size: 17px;
              font-family: 'score4';
            }
          }
          .user-info-divider {
            height:0.5px;
            background-color:#adadad;
            margin: 16px 0px;
          }
          .user-info-column-cover {
            flex-direction: column;
            display:flex;
            margin: 12px 0px;

            .user-info-title {
              font-size: 17px;
              font-family: 'score5';
              margin-bottom: 16px;
            }
            .list-row{
                width: 100%;
                border-bottom: solid #d3d3d3 0.5px;
                height: 40px;
                display: flex;
                padding-left:20px;
                align-items: center;
                justify-content: flex-start;
            }
          }
        }
      }
    }
  }
}
</style>
