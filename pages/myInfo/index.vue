<template>
  <div>
    <PwChangeDialog
      v-if="pwChangedialogStatus"
      @closeAction="pwChangeDialogClose"
      @sendData="pwChangeDialogSendData"
    ></PwChangeDialog>
    <Header @update="onChildUpdate"> </Header>
    <div :class="navigationStatus == false ? 'main' : 'mobile-main'">
      <div class="body">
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
            구매 내역
          </div>
          <div
            :class="tabStatus == 4 ? 'selected-tab' : 'unselected-tab'"
            @click="tabStatus = 4"
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
                <div class="input-area">asdasd</div>
                <div class="btn">비밀번호 변경</div>
              </div>
            </div>
            <div class="info-area">
              <div class="title">전화번호</div>
              <div class="input-btn-area">
                <input class="input-area" value="asdasd" />
                <div class="btn">수정</div>
              </div>
            </div>

            <div class="withless-area">
              <div class="withless-btn"><u>회원탈퇴</u></div>
            </div>

            <div class="staff-info-group">
              <div class="left-group">
                <div class="staff-info-text">담당자 정보</div>
                <div class="remains-info-text">이름&nbsp;:&nbsp;{{}}</div>
                <div class="remains-info-text">연락처&nbsp;:&nbsp;{{}}</div>
                <div class="remains-info-text">이메일&nbsp;:&nbsp;{{}}</div>
              </div>
              <div style="flex: 1"></div>
              <div class="call-btn">전화하기</div>
            </div>
          </div>
        </div>

        <!-- 나의 AI 건강설문 결과 -->
        <div v-if="tabStatus == 2">
          <div class="consulting-list-group">
            <div class="consulting-list">
              <div
                v-for="(item, i) in filterConsultingList"
                :key="i"
                class="consulting-list-item"
              >
                <div class="consulting-title">{{ item.title }}</div>
                <div class="consulting-date">{{ item.date }}</div>
              </div>
            </div>
            <div class="paging-group">
              <div class="rectangle-area" @click="consultingPagingPrev(2)">
                <img
                  class="two-arrow"
                  src="@/assets/image/ic_paging_two_arrow.png"
                />
              </div>
              <div class="rectangle-area" @click="consultingPagingPrev(1)">
                <img
                  class="one-arrow"
                  src="@/assets/image/ic_paging_one_arrow.png"
                />
              </div>
              <div class="paging-num-area">
                <div
                  :class="
                    i1 + consultingBlockNum == consultingCurrentPageNum
                      ? 'select-paging-num'
                      : 'paging-num'
                  "
                  v-for="(item1, i1) in consultingPagingNum"
                  :key="i1"
                  @click="consultingPagingNumClick(i1 + consultingBlockNum)"
                >
                  {{ i1 + consultingBlockNum }}
                </div>
              </div>
              <div class="rectangle-area" @click="consultingPagingNext(1)">
                <img
                  class="rotate-one-arrow"
                  src="@/assets/image/ic_paging_one_arrow.png"
                />
              </div>

              <div class="rectangle-area" @click="consultingPagingNext(2)">
                <img
                  class="rotate-two-arrow"
                  src="@/assets/image/ic_paging_two_arrow.png"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 구매 내역 -->
        <div v-if="tabStatus == 3">
          <div class="consulting-list-group">
            <div class="consulting-list">
              <div
                v-for="(item, i) in filterPaymentList"
                :key="i"
                class="consulting-list-item"
                @click="$router.push({ name: 'paymentHistoryDetail' })"
              >
                <div class="consulting-title">{{ item.title }}</div>
                <div class="consulting-date">{{ item.date }}</div>
              </div>
            </div>
            <div class="paging-group">
              <div class="rectangle-area" @click="paymentPagingPrev(2)">
                <img
                  class="two-arrow"
                  src="@/assets/image/ic_paging_two_arrow.png"
                />
              </div>
              <div class="rectangle-area" @click="paymentPagingPrev(1)">
                <img
                  class="one-arrow"
                  src="@/assets/image/ic_paging_one_arrow.png"
                />
              </div>
              <div class="paging-num-area">
                <div
                  :class="
                    i1 + paymentBlockNum == paymentCurrentPageNum
                      ? 'select-paging-num'
                      : 'paging-num'
                  "
                  v-for="(item1, i1) in paymentPagingNum"
                  :key="i1"
                  @click="paymentPagingNumClick(i1 + paymentBlockNum)"
                >
                  {{ i1 + paymentBlockNum }}
                </div>
              </div>
              <div class="rectangle-area" @click="paymentPagingNext(1)">
                <img
                  class="rotate-one-arrow"
                  src="@/assets/image/ic_paging_one_arrow.png"
                />
              </div>

              <div class="rectangle-area" @click="paymentPagingNext(2)">
                <img
                  class="rotate-two-arrow"
                  src="@/assets/image/ic_paging_two_arrow.png"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 나의 리뷰 -->
        <div v-if="tabStatus == 4">
          <div class="review-group">
            <div class="review-list-item-area">
              <div
                v-for="(item, i) in filterReviewList"
                :key="i"
                class="review-list-item"
              >
                <div class="rep-img-area">
                  <img
                    :class="item.url.length == 0 ? 'rep-no-img' : 'rep-img'"
                    :src="
                      item.url.length == 0
                        ? require('@/assets/image/img_review_no_picture.png')
                        : item.url
                    "
                  />
                </div>
                <div class="mobile-area">
                  <div class="title-contents-area">
                    <div class="title">{{ item.title }}</div>
                    <div class="contents">{{ item.date }}</div>
                  </div>
                  <div style="flex: 1"></div>
                  <div class="rating-area">
                    <img
                      v-for="(item1, i1) in 5"
                      :key="i1"
                      class="rating"
                      :src="
                        item.rate > i1
                          ? require('@/assets/image/ic_star.png')
                          : require('@/assets/image/ic_gray_star.png')
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="paging-group">
              <div class="rectangle-area" @click="reviewPagingPrev(2)">
                <img
                  class="two-arrow"
                  src="@/assets/image/ic_paging_two_arrow.png"
                />
              </div>
              <div class="rectangle-area" @click="reviewPagingPrev(1)">
                <img
                  class="one-arrow"
                  src="@/assets/image/ic_paging_one_arrow.png"
                />
              </div>
              <div class="paging-num-area">
                <div
                  :class="
                    i1 + reviewBlockNum == reviewCurrentPageNum
                      ? 'select-paging-num'
                      : 'paging-num'
                  "
                  v-for="(item1, i1) in reviewPagingNum"
                  :key="i1"
                  @click="reviewPagingNumClick(i1 + reviewBlockNum)"
                >
                  {{ i1 + reviewBlockNum }}
                </div>
              </div>
              <div class="rectangle-area" @click="reviewPagingNext(1)">
                <img
                  class="rotate-one-arrow"
                  src="@/assets/image/ic_paging_one_arrow.png"
                />
              </div>

              <div class="rectangle-area" @click="reviewPagingNext(2)">
                <img
                  class="rotate-two-arrow"
                  src="@/assets/image/ic_paging_two_arrow.png"
                />
              </div>
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
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
    PwChangeDialog,
  },
  created() {
    console.log('tabs: ', this.$route.params.tabs)
    if (this.$route.params.tabs != undefined) {
      this.tabStatus = this.$route.params.tabs
    }
  },
  data() {
    return {
      navigationStatus: false,
      tabStatus: 1, //1 기본정보, 2 나의 AI 건강설문 결과, 3 구매내역, 4 나의 리뷰
      pwChangedialogStatus: false,
      consultingCurrentPageNum: 1,
      consultingPagingNum: 0,
      consultingTotalPage: 0,
      showLimit: 10,
      consultingBlockNum: 0,
      tabsSelect: 0,
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
        { title: 'probiotics13', date: '23-09-21' },
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
      reviewList: [
        {
          title: 'probiotics1',
          date: '23-09-21',
          url: require('@/assets/image/img_medicine_test.png'),
          rate: 1.2,
        },
        {
          title: 'probiotics2',
          date: '23-09-21',
          url: require('@/assets/image/img_medicine_test.png'),
          rate: 2.2,
        },
        {
          title: 'probiotics3',
          date: '23-09-21',
          url: require('@/assets/image/img_medicine_test.png'),
          rate: 3,
        },
        {
          title: 'probiotics4',
          date: '23-09-21',
          url: '',
          rate: 5,
        },
        {
          title: 'probiotics5',
          date: '23-09-21',
          url: require('@/assets/image/img_medicine_test.png'),
          rate: 4,
        },
        {
          title: 'probiotics6',
          date: '23-09-21',
          url: '',
          rate: 4.2,
        },
        {
          title: 'probiotics7',
          date: '23-09-21',
          url: '',
          rate: 1.2,
        },
        {
          title: 'probiotics8',
          date: '23-09-21',
          url: '',
          rate: 1.2,
        },
        {
          title: 'probiotics9',
          date: '23-09-21',
          url: '',
          rate: 1.2,
        },
        {
          title: 'probiotics10',
          date: '23-09-21',
          url: '',
          rate: 1.2,
        },
        {
          title: 'probiotics11',
          date: '23-09-21',
          url: '',
          rate: 1.2,
        },
        {
          title: 'probiotics12',
          date: '23-09-21',
          url: '',
          rate: 1.2,
        },
        {
          title: 'probiotics13',
          date: '23-09-21',
          url: '',
          rate: 1.2,
        },
      ],
      filterReviewList: [],
    }
  },
  mounted() {
    //나의 AI 건강설문 결과
    this.consultingListSlice()
    this.consultingTotalPage = Math.ceil(
      this.consultingList.length / this.showLimit
    )

    if (this.consultingTotalPage > 10) {
      this.consultingPagingNum = 10
    } else {
      this.consultingPagingNum = this.consultingTotalPage
    }

    if (this.consultingTotalPage > 10) {
      if (this.consultingTotalPage - this.consultingCurrentPageNum > 10) {
        this.consultingBlockNum = this.consultingCurrentPageNum
      } else {
        this.consultingBlockNum = this.consultingTotalPage - 9
      }
    } else {
      this.consultingBlockNum = 1
    }

    //구매 내역
    this.paymentListSlice()
    this.paymentTotalPage = Math.ceil(this.paymentList.length / this.showLimit)

    if (this.paymentTotalPage > 10) {
      this.paymentPagingNum = 10
    } else {
      this.paymentPagingNum = this.paymentTotalPage
    }

    if (this.paymentTotalPage > 10) {
      if (this.paymentTotalPage - this.paymentCurrentPageNum > 10) {
        this.paymentBlockNum = this.paymentCurrentPageNum
      } else {
        this.paymentBlockNum = this.paymentTotalPage - 9
      }
    } else {
      this.paymentBlockNum = 1
    }

    //나의 리뷰
    this.reviewListSlice()
    this.reviewTotalPage = Math.ceil(
      this.reviewList.length / this.reviewShowLimit
    )

    if (this.reviewTotalPage > 10) {
      this.reviewPagingNum = 10
    } else {
      this.reviewPagingNum = this.reviewTotalPage
    }

    if (this.reviewTotalPage > 10) {
      if (this.reviewTotalPage - this.reviewCurrentPageNum > 10) {
        this.reviewBlockNum = this.reviewCurrentPageNum
      } else {
        this.reviewBlockNum = this.reviewTotalPage - 9
      }
    } else {
      this.reviewBlockNum = 1
    }
  },
  methods: {
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
    pwChangeDialogClose() {
      console.log('action')
      this.pwChangedialogStatus = false
    },
    pwChangeDialogSendData(nowPw, newPw, confirmPw) {
      console.log('nowPw: ' + nowPw)
      console.log(newPw)
      console.log(confirmPw)
    },
    consultingListSlice() {
      //showLimit 만큼 보여주기
      let result = this.consultingList.filter(
        (item, index) =>
          index >= (this.consultingCurrentPageNum - 1) * this.showLimit &&
          index < this.consultingCurrentPageNum * this.showLimit
      )
      this.filterConsultingList = result
    },
    paymentListSlice() {
      let result = this.paymentList.filter(
        (item, index) =>
          index >= (this.paymentCurrentPageNum - 1) * this.showLimit &&
          index < this.paymentCurrentPageNum * this.showLimit
      )
      this.filterPaymentList = result
    },
    reviewListSlice() {
      let result = this.reviewList.filter(
        (item, index) =>
          index >= (this.reviewCurrentPageNum - 1) * this.reviewShowLimit &&
          index < this.reviewCurrentPageNum * this.reviewShowLimit
      )
      this.filterReviewList = result
    },
    consultingPagingNumClick(num) {
      //페이징 번호 클릭 시 처리
      if (this.consultingCurrentPageNum < num) {
        if (this.consultingTotalPage - num >= 10) {
          if (num + 9 > this.consultingTotalPage) {
            this.consultingBlockNum = this.consultingTotalPage - 9
          } else {
            if (this.consultingTotalPage > 10) {
              this.consultingBlockNum = num
            } else {
              this.consultingBlockNum = 1
            }
          }
        } else {
          if (this.consultingTotalPage > 10) {
            this.consultingBlockNum = this.consultingTotalPage - 9
          } else {
            this.consultingBlockNum = 1
          }
        }
      } else {
        if (num - 10 > 1) {
          if (num + 9 > this.consultingTotalPage) {
            this.consultingBlockNum = this.consultingTotalPage - 9
          } else {
            if (this.consultingTotalPage > 10) {
              this.consultingBlockNum = num
            } else {
              this.consultingBlockNum = 1
            }
          }
        } else {
          this.consultingBlockNum = 1
        }
      }

      this.consultingCurrentPageNum = num

      this.consultingListSlice()
    },
    paymentPagingNumClick(num) {
      if (this.paymentCurrentPageNum < num) {
        if (this.paymentTotalPage - num >= 10) {
          if (num + 9 > this.paymentTotalPage) {
            this.paymentBlockNum = this.paymentTotalPage - 9
          } else {
            if (this.paymentTotalPage > 10) {
              this.paymentBlockNum = num
            } else {
              this.paymentBlockNum = 1
            }
          }
        } else {
          if (this.paymentTotalPage > 10) {
            this.paymentBlockNum = this.paymentTotalPage - 9
          } else {
            this.paymentBlockNum = 1
          }
        }
      } else {
        if (num - 10 > 1) {
          if (num + 9 > this.paymentTotalPage) {
            this.paymentBlockNum = this.paymentTotalPage - 9
          } else {
            if (this.paymentTotalPage > 10) {
              this.paymentBlockNum = num
            } else {
              this.paymentBlockNum = 1
            }
          }
        } else {
          this.paymentBlockNum = 1
        }
      }

      this.paymentCurrentPageNum = num

      this.paymentListSlice()
    },

    reviewPagingNumClick(num) {
      if (this.reviewCurrentPageNum < num) {
        if (this.reviewTotalPage - num >= 10) {
          if (num + 9 > this.reviewTotalPage) {
            this.reviewBlockNum = this.reviewTotalPage - 9
          } else {
            if (this.reviewTotalPage > 10) {
              this.reviewBlockNum = num
            } else {
              this.reviewBlockNum = 1
            }
          }
        } else {
          if (this.reviewTotalPage > 10) {
            this.reviewBlockNum = this.reviewTotalPage - 9
          } else {
            this.reviewBlockNum = 1
          }
        }
      } else {
        if (num - 10 > 1) {
          if (num + 9 > this.reviewTotalPage) {
            this.reviewBlockNum = this.reviewTotalPage - 9
          } else {
            if (this.reviewTotalPage > 10) {
              this.reviewBlockNum = num
            } else {
              this.reviewBlockNum = 1
            }
          }
        } else {
          this.reviewBlockNum = 1
        }
      }

      this.reviewCurrentPageNum = num

      this.reviewListSlice()
    },

    consultingPagingNext(status) {
      //status 1 - 한번이동 2 - 끝까지이동
      if (status == 1) {
        if (this.consultingCurrentPageNum < this.consultingTotalPage) {
          if (this.consultingCurrentPageNum == this.consultingBlockNum) {
            if (this.consultingTotalPage > 10) {
              if (
                this.consultingTotalPage - this.consultingCurrentPageNum >
                10
              ) {
                this.consultingBlockNum += 1
              } else {
                this.consultingBlockNum = this.consultingTotalPage - 9
              }
            }
          }
          this.consultingCurrentPageNum += 1
        }
      } else {
        if (this.consultingTotalPage > 10) {
          this.consultingBlockNum = this.consultingTotalPage - 9
        }
        this.consultingCurrentPageNum = this.consultingTotalPage
      }
      this.consultingListSlice()
    },
    paymentPagingNext(status) {
      //status 1 - 한번이동 2 - 끝까지이동
      if (status == 1) {
        if (this.paymentCurrentPageNum < this.paymentTotalPage) {
          if (this.paymentCurrentPageNum == this.paymentBlockNum) {
            if (this.paymentTotalPage > 10) {
              if (this.paymentTotalPage - this.paymentCurrentPageNum > 10) {
                this.paymentBlockNum += 1
              } else {
                this.paymentBlockNum = this.paymentTotalPage - 9
              }
            }
          }
          this.paymentCurrentPageNum += 1
        }
      } else {
        if (this.paymentTotalPage > 10) {
          this.paymentBlockNum = this.paymentTotalPage - 9
        }
        this.paymentCurrentPageNum = this.paymentTotalPage
      }
      this.paymentListSlice()
    },
    reviewPagingNext(status) {
      //status 1 - 한번이동 2 - 끝까지이동
      if (status == 1) {
        if (this.reviewCurrentPageNum < this.reviewTotalPage) {
          if (this.reviewCurrentPageNum == this.reviewBlockNum) {
            if (this.reviewTotalPage > 10) {
              if (this.reviewTotalPage - this.reviewCurrentPageNum > 10) {
                this.reviewBlockNum += 1
              } else {
                this.reviewBlockNum = this.reviewTotalPage - 9
              }
            }
          }
          this.reviewCurrentPageNum += 1
        }
      } else {
        if (this.reviewTotalPage > 10) {
          this.reviewBlockNum = this.reviewTotalPage - 9
        }
        this.reviewCurrentPageNum = this.reviewTotalPage
      }
      this.reviewListSlice()
    },
    consultingPagingPrev(status) {
      //status 1 - 한번이동 2 - 끝까지이동
      if (status == 1) {
        if (this.consultingCurrentPageNum > 1) {
          if (this.consultingCurrentPageNum == this.consultingBlockNum) {
            this.consultingBlockNum -= 1
          }
          this.consultingCurrentPageNum -= 1
        }
      } else {
        this.consultingBlockNum = 1
        this.consultingCurrentPageNum = 1
      }
      this.consultingListSlice()
    },
    paymentPagingPrev(status) {
      if (status == 1) {
        if (this.paymentCurrentPageNum > 1) {
          if (this.paymentCurrentPageNum == this.paymentBlockNum) {
            this.paymentBlockNum -= 1
          }
          this.paymentCurrentPageNum -= 1
        }
      } else {
        this.paymentBlockNum = 1
        this.paymentCurrentPageNum = 1
      }
      this.paymentListSlice()
    },
    reviewPagingPrev(status) {
      if (status == 1) {
        if (this.reviewCurrentPageNum > 1) {
          if (this.reviewCurrentPageNum == this.reviewBlockNum) {
            this.reviewBlockNum -= 1
          }
          this.reviewCurrentPageNum -= 1
        }
      } else {
        this.reviewBlockNum = 1
        this.reviewCurrentPageNum = 1
      }
      this.reviewListSlice()
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
    padding: 40px 0px;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      font-size: 36px;
      font-family: 'score7';
    }
    .tab-group {
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
  }
}
@media (max-width: 720px) {
  .mobile-main {
    height: 100%;
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
            .rep-img-area {
              border: 1px solid #ddd;
              background-color: #fff;
              width: 30%;
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
              display: flex;
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
    }
  }
}
</style>
