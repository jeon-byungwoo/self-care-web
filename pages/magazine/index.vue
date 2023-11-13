<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="banner-group">
        <div class="title">셀프케어 매거진</div>
        <div class="title-sub">
          셀프케어에서 제공하는 유용한 정보를 한눈에 확인 해보세요.
        </div>
      </div>

      <div class="scroll-group">
        <div class="scroll-header-group">
          <div class="tab-group">
            <div
              :class="tabStatus == 1 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="onClickTab(1)"
            >
              전체보기
            </div>
            <div
              :class="tabStatus == 2 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="onClickTab(2)"
            >
              라이프
            </div>
            <div
              :class="tabStatus == 3 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="onClickTab(3)"
            >
              영양성분
            </div>
            <div
              :class="tabStatus == 4 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="onClickTab(4)"
            >
              후기
            </div>
          </div>
        </div>

        <div class="magazine-group">
          <div class="magazine-item-group">
            <div
              v-for="(item, index) in magazineList"
              :key="index"
              class="magazine-item"
            >
              <div class="magazine-item-image-group"
                style="background-size:cover;"
                :style="`backgroundImage:url('${hostUrl+JSON.parse(item.image)[0]}')`"
              >

                <div class="magazine-item-magazine-title">
                </div>
              </div>

              <div class="magazine-item-bottom-group">
                <div class="magazine-item-bottom-title">
                  {{ item.title }}
                </div>
                <div class="magazine-item-bottom-description" v-html="item.content">
                </div>
                <div style="flex: 1"></div>
                <div class="magazine-item-bottom-share-explore-group">
                  <div class="magazine-detail-btn" @click="onClickItem(item.no)">더보기</div>
                </div>
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
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
  },
  mounted() {
    this.hostUrl = process.env.BASE_URL
    this.selectItem()
  },
  methods: {
    onClickItem(no){
        console.log(no)
        this.$router.push({name: 'magazineDetail', query: {no: no}})
    },
    onClickTab(idx){
        this.tabStatus = idx
        this.selectItem()
    },
    async selectItem(){
        let conditions = [{ q: '=', f: 'alive', v: 1 },{ q: 'order', f: 'cd', o: "DESC" }]
        if(this.tabStatus!=1){
            //1=라이프 2=영양성분 3=후기
            if(this.tabStatus==2) conditions.push({ op:'AND', q: '=', f: 'category', v: 1 })
            if(this.tabStatus==3) conditions.push({ op:'AND', q: '=', f: 'category', v: 2 })
            if(this.tabStatus==4) conditions.push({ op:'AND', q: '=', f: 'category', v: 3 })
        }
        let formBody = {
        table: 'magazine',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.magazineList = res.data
            } 
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
    detailClick() {
      console.log('click')
      this.$router.push({ name: 'magazineDetail' })
    },
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
  },
  data() {
    return {
        hostUrl: process.env.BASE_URL,
        tabStatus: 1, //1 전체보기, 2 라이프, 3 영양성분, 4 후기
        navigationStatus: false,
        magazineList: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  margin-top: 197px;

  .banner-group {
    width: 100%;
    height: 400px;
    top: 197px;
    position: fixed;
    background-image: url('@/assets/image/img_magazine_rep.png');
    background-size: 100% 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
      color: #fff;
      font-size: 36px;
      font-family: 'score7';
    }
    .title-sub {
      margin-top: 20px;
      color: #fff;
      font-size: 16px;
      font-family: 'score2';
    }
  }
    .magazine-detail-btn {
        border: 1px solid #ddd;
        background-color: #fff;
        width: 300px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 18px;
        font-family: 'score5';
        cursor: pointer;
    }
  .scroll-group {
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-top: 400px;
    margin-bottom: 100px;
    padding: 0px 20px;
    .scroll-header-group {
      max-width: 1200px;
      margin: auto;
      width: 100%;
      position: sticky;
      top: 197px;
      z-index: 10;
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
    }
    .magazine-group {
      width: 100%;
      margin: auto;
      max-width: 1200px;
      padding-bottom: 100px;

      .magazine-item-group {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        // grid-template-columns: minmax(300px, 570px) repeat(2, 1fr);
        gap: 60px;
      }
      .magazine-detail-btn-area {
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        
      }

      .magazine-item {
        width: 47%;
        height: 500px;
      }
      .magazine-item-image-group {
        width: 100%;
        height: 300px;
        .magazine-item-image {
          width: 100%;
          border-top-right-radius: 12px;
          border-top-left-radius: 12px;
          height: 300px;
        }
        .magazine-item-magazine-title {
          font-size: 20px;
          font-family: 'score6';
          color: #ffffff;
          position: relative;
          top: -54px;
          left: 40px;
        }
      }
      .magazine-item-bottom-group {
        width: 100%;
        height: 208px;
        border-left-width: 1px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #e5e5e5;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        padding: 20px 40px 26px 40px;
        display: flex;
        flex-direction: column;
      }

      .magazine-item-bottom-title {
        font-size: 18px;
        font-family: 'score2';
        color: #999999;
      }

      .magazine-item-bottom-description {
        width:100%;
        font-size: 16px;
        font-family: 'score2';
        color: #333333;
        margin-top: 14px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* number of lines to show */
          line-clamp: 2; 
          -webkit-box-orient: vertical;      }

      .magazine-item-bottom-share-explore-group {
        display: flex;
        align-content: center;
        justify-content: center;
        .magazine-item-bottom-share {
          font-size: 16px;
          font-family: Arial;
          color: #9ad144;
          cursor: pointer;
        }
        .magazine-item-bottom-explore {
          margin-left: 26px;
          font-size: 16px;
          font-family: Arial;
          color: #9ad144;
          cursor: pointer;
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .main {
    width: 100%;
    margin-top: 0px;

    .banner-group {
      width: 100%;
      height: 250px;
      top: 76px;
      left: 0px;
      position: fixed;
      background-image: url('@/assets/image/img_magazine_rep.png') 0 0px /
        contain;
      background-size: 100% 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title {
        color: #fff;
        font-size: 30px;
        font-family: 'score7';
      }
      .title-sub {
        margin-top: 20px;
        color: #fff;
        font-size: 12px;
        font-family: 'score2';
      }
    }
    .magazine-detail-btn {
    border: 1px solid #ddd;
    background-color: #fff;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 18px;
    font-family: 'score5';
    cursor: pointer;
    }
    .scroll-group {
      position: relative;
      width: 100%;
      background-color: #fff;
      margin-top: 250px;
      margin-bottom: 20px;
      .scroll-header-group {
        width: 100%;
        position: sticky;
        top: 76px;
        z-index: 10;
        .tab-group::-webkit-scrollbar {
          display: none;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
        }
        .tab-group {
          width: 100%;
          display: flex;
          overflow: auto;
          white-space: nowrap;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
          flex-direction: row;
          padding: 20px 20px;
          .selected-tab-btn-area {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: 'score6';
            color: #fff;
            background-color: #333;
            cursor: pointer;
            padding: 12px 20px 12px 20px;
            border-radius: 25px;
          }
          .tab-btn-area {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: 'score2';
            color: #333;
            background-color: #fff;
            cursor: pointer;
            padding: 12px 20px 12px 20px;
            border-radius: 25px;
          }
        }
      }
      .magazine-group {
        width: 100%;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        .magazine-item-group {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          // grid-template-columns: minmax(300px, 570px) repeat(2, 1fr);
          gap: 40;
          .magazine-item {
            width: 100%;
            height: auto;
            margin-top: 0px;
            .magazine-item-image-group {
              width: 100%;
              min-height: 300px;
              .magazine-item-image {
                width: 100%;
                height: auto;
                border-top-right-radius: 12px;
                border-top-left-radius: 12px;
              }
              .magazine-item-magazine-title {
                font-size: 16px;
                font-family: 'score6';
                color: #ffffff;
                position: relative;
                top: -54px;
                left: 0px;
                margin-left: 20px;
              }
            }
            .magazine-item-bottom-group {
              width: 100%;
              border-left-width: 1px;
              border-right-width: 1px;
              border-bottom-width: 1px;
              border-style: solid;
              border-color: #e5e5e5;
              border-bottom-left-radius: 12px;
              border-bottom-right-radius: 12px;
              padding: 16px 36px;
              display: flex;
              flex-direction: column;
            }

            .magazine-item-bottom-title {
              font-size: 16px;
              font-family: 'score2';
              color: #999999;
            }

            .magazine-item-bottom-description {
              font-size: 14px;
              font-family: 'score2';
              color: #333333;
              margin-top: 14px;
            }

            .magazine-item-bottom-share-explore-group {
              display: flex;
              align-content: center;
              justify-content: center;
              .magazine-item-bottom-share {
                font-size: 16px;
                font-family: Arial;
                color: #9ad144;
                cursor: pointer;
              }
              .magazine-item-bottom-explore {
                margin-left: 26px;
                font-size: 16px;
                font-family: Arial;
                color: #9ad144;
                cursor: pointer;
              }
            }
            .magazine-detail-btn-area {
              margin-top: 30px;
              display: flex;
              align-items: center;
              justify-content: center;

            }
          }
        }
      }
    }
  }
}
</style>
