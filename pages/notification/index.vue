<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="notification-title">소식</div>
        <div class="tab-group">
          <div
            :class="tabStatus == 1 ? 'selected-tab-btn-area' : 'tab-btn-area'"
            @click="tabStatusChange(1)"
          >
            전체보기
          </div>
          <div
            :class="tabStatus == 2 ? 'selected-tab-btn-area' : 'tab-btn-area'"
            @click="tabStatusChange(2)"
          >
            셀프케어 소식
          </div>
          <div
            :class="tabStatus == 3 ? 'selected-tab-btn-area' : 'tab-btn-area'"
            @click="tabStatusChange(3)"
          >
            공지 사항
          </div>
          <div
            :class="tabStatus == 4 ? 'selected-tab-btn-area' : 'tab-btn-area'"
            @click="tabStatusChange(4)"
          >
            언론 보도
          </div>
        </div>

          <div class="consulting-list-group">
            <div class="consulting-list">
              <div
                v-for="(item, i) in filterList"
                :key="i"
                class="consulting-list-item"
                @click="onClickRowItem(item.no)"
              >
                <div class="consulting-title">{{ item.title }}</div>
                <div class="consulting-date">{{ item.cd }}</div>
              </div>
            </div>
            <div class="paging-group">
              <div class="rectangle-area" @click="pagingPrev(2)">
                <img
                  class="two-arrow"
                  src="@/assets/image/ic_paging_two_arrow.png"
                />
              </div>
              <div class="rectangle-area" @click="pagingPrev(1)">
                <img
                  class="one-arrow"
                  src="@/assets/image/ic_paging_one_arrow.png"
                />
              </div>
              <div class="paging-num-area">
                <div
                  :class="
                    i1 + blockNum == currentPageNum
                      ? 'select-paging-num'
                      : 'paging-num'
                  "
                  v-for="(item1, i1) in pagingNum"
                  :key="i1"
                  @click="pagingNumClick(i1 + blockNum)"
                >
                  {{ i1 + blockNum }}
                </div>
              </div>
              <div class="rectangle-area" @click="pagingNext(1)">
                <img
                  class="rotate-one-arrow"
                  src="@/assets/image/ic_paging_one_arrow.png"
                />
              </div>

              <div class="rectangle-area" @click="pagingNext(2)">
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
</template>

<script>
import Header from '../../components/header.vue'
import Moment from 'moment'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
  },
  data() {
    return {
      navigationStatus: false,
      tabStatus: 1,
      currentPageNum: 1,
      pagingNum: 0,
      totalPage: 0,
      showLimit: 10,
      blockNum: 0,
      listData: [
        { title: 'probiotics1', date: '23-09-21' },
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
      filterList: [],
    }
  },
  mounted() {
    //나의 AI 건강설문 결과
    this.selectItem()

  },
  methods: {
    tabStatusChange(tabVal){
        this.tabStatus = tabVal
        this.selectItem()
    },
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
    onClickRowItem(no){
        this.$router.push({name: 'notificationDetail', query: {no: no}})
    },
    async selectItem(){
        this.listData = []
        this.filterList = []
        let conditions = [{ q: '=', f: 'alive', v: 1 },{ q: 'order', f: 'cd', o: 'desc' }]
        if(this.tabStatus!=1){
            //1=소식 2=공지사항 3=언론보도
            if(this.tabStatus==2) conditions.push({ op:'AND', q: '=', f: 'category', v: 1 })
            if(this.tabStatus==3) conditions.push({ op:'AND', q: '=', f: 'category', v: 2 })
            if(this.tabStatus==4) conditions.push({ op:'AND', q: '=', f: 'category', v: 3 })
        }
        let formBody = {
        table: 'board',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.listData = res.data
                for(let i of this.listData){
                    i.cd = Moment(i.cd).format('YYYY년MM월DD일')
                }
                this.listSlice()
                this.totalPage = Math.ceil(this.listData.length / this.showLimit)
                if (this.totalPage > 10) {
                    this.pagingNum = 10
                } else {
                    this.pagingNum = this.totalPage
                }
                if (this.totalPage > 10) {
                if (this.totalPage - this.currentPageNum > 10) {
                    this.blockNum = this.currentPageNum
                } else {
                    this.blockNum = this.totalPage - 9
                }
                } else {
                this.blockNum = 1
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
    listSlice() {
      //showLimit 만큼 보여주기
      let result = this.listData.filter(
        (item, index) =>
          index >= (this.currentPageNum - 1) * this.showLimit &&
          index < this.currentPageNum * this.showLimit
      )
      this.filterList = result
    },
    pagingNumClick(num) {
      //페이징 번호 클릭 시 처리
      if (this.currentPageNum < num) {
        if (this.totalPage - num >= 10) {
          if (num + 9 > this.totalPage) {
            this.blockNum = this.totalPage - 9
          } else {
            if (this.totalPage > 10) {
              this.blockNum = num
            } else {
              this.blockNum = 1
            }
          }
        } else {
          if (this.totalPage > 10) {
            this.blockNum = this.totalPage - 9
          } else {
            this.blockNum = 1
          }
        }
      } else {
        if (num - 10 > 1) {
          if (num + 9 > this.totalPage) {
            this.blockNum = this.totalPage - 9
          } else {
            if (this.totalPage > 10) {
              this.blockNum = num
            } else {
              this.blockNum = 1
            }
          }
        } else {
          this.blockNum = 1
        }
      }

      this.currentPageNum = num

      this.listSlice()
    },
    pagingNext(status) {
      //status 1 - 한번이동 2 - 끝까지이동
      if (status == 1) {
        if (this.currentPageNum < this.totalPage) {
          if (this.currentPageNum == this.blockNum) {
            if (this.totalPage > 10) {
              if (this.totalPage - this.currentPageNum > 10) {
                this.blockNum += 1
              } else {
                this.blockNum = this.totalPage - 9
              }
            }
          }
          this.currentPageNum += 1
        }
      } else {
        if (this.totalPage > 10) {
          this.blockNum = this.totalPage - 9
        }
        this.currentPageNum = this.totalPage
      }
      this.listSlice()
    },
    pagingPrev(status) {
      //status 1 - 한번이동 2 - 끝까지이동
      if (status == 1) {
        if (this.currentPageNum > 1) {
          if (this.currentPageNum == this.blockNum) {
            this.blockNum -= 1
          }
          this.currentPageNum -= 1
        }
      } else {
        this.blockNum = 1
        this.currentPageNum = 1
      }
      this.listSlice()
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
    padding: 40px 20px 100px 20px;
    .notification-title {
      color: #333;
      font-size: 36px;
      font-family: 'score6';
    }
    .tab-group {
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 50px 0px;
      background-color: #fff;
      .selected-tab-btn-area {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: 'score6';
        color: #fff;
        background-color: #333;
        cursor: pointer;
        padding: 16px 49px 15px 49px;
        border-radius: 25px;
      }
      .tab-btn-area {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: 'score2';
        color: #333;
        background-color: #fff;
        cursor: pointer;
        padding: 16px 49px 15px 49px;
        border-radius: 25px;
      }
    }
    .consulting-list-group {
      margin-top: 20px;
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
            flex: 1;
            color: #333;
            font-size: 16px;
            font-family: 'score2';
          }
          .consulting-date {
            color: #333;
            font-size: 16px;
            font-family: 'score2';
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
  .main {
    margin-top: 0px;
    .body {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
      .notification-title {
        color: #333;
        font-size: 30px;
        font-family: 'score6';
      }
      .tab-group::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none;
      }
      .tab-group {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 30px 0px;
        overflow: auto;
        white-space: nowrap;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none;
        background-color: #fff;
        .selected-tab-btn-area {
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-family: 'score6';
          color: #fff;
          background-color: #333;
          cursor: pointer;
          padding: 16px 20px 15px 20px;
          border-radius: 25px;
        }
        .tab-btn-area {
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-family: 'score2';
          color: #333;
          background-color: #fff;
          cursor: pointer;
          padding: 16px 20px 15px 20px;
          border-radius: 25px;
        }
      }
      .consulting-list-group {
        margin-top: 10px;
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
      .paging-group {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 42px;
        margin-top: 50px;
        * + * {
          margin-left: 8px;
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
