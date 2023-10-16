<template>
  <div>
    <Header> </Header>
    <div class="main">
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
              @click="tabStatus = 1"
            >
              전체보기
            </div>
            <div
              :class="tabStatus == 2 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatus = 2"
            >
              라이프
            </div>
            <div
              :class="tabStatus == 3 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatus = 3"
            >
              영양성분
            </div>
            <div
              :class="tabStatus == 4 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatus = 4"
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
              <div class="magazine-item-image-group">
                <img
                  class="magazine-item-image"
                  src="@/assets/image/img_magazine_test.png"
                  draggable="false"
                />
                <div class="magazine-item-magazine-title">
                  {{ item.magazineTitle }}
                </div>
              </div>

              <div class="magazine-item-bottom-group">
                <div class="magazine-item-bottom-title">
                  {{ item.title }}
                </div>
                <div class="magazine-item-bottom-description">
                  {{ item.description }}
                </div>
                <div style="flex: 1"></div>
                <div class="magazine-item-bottom-share-explore-group">
                  <div class="magazine-item-bottom-share">SHARE</div>
                  <div class="magazine-item-bottom-explore">EXPLORE</div>
                </div>
              </div>
              <div class="magazine-detail-btn-area">
                <div class="magazine-detail-btn">더보기</div>
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
  methods: {
    detailClick() {
      console.log('click')
      this.$router.push({ name: 'magazineDetail' })
    },
  },
  data() {
    return {
      tabStatus: 1, //1 전체보기, 2 라이프, 3 영양성분, 4 후기
      magazineList: [
        {
          magazineTitle: 'TOP 10 Australian beaches',
          title: 'Nomber 10',
          description: 'Whitehaven Beach',
        },
        {
          magazineTitle: 'TOP 5 Australian beaches',
          title: 'Nomber 10',
          description: 'Whitsunday Island, Whitsunday Islands',
        },
        {
          magazineTitle: 'TOP 10 Australian beaches',
          title: 'Nomber 10',
          description: 'Whitehaven Beach',
        },
        {
          magazineTitle: 'TOP 5 Australian beaches',
          title: 'Nomber 10',
          description: 'Whitsunday Island, Whitsunday Islands',
        },
      ],
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

  .scroll-group {
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-top: 400px;
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
      }

      .magazine-item {
        max-width: 570px;
        min-width: 370px;
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
        height: 177px;
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
        font-size: 16px;
        font-family: 'score2';
        color: #333333;
        margin-top: 14px;
      }

      .magazine-item-bottom-share-explore-group {
        display: flex;
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
    margin-top: 197px;

    .banner-group {
      width: 100%;
      height: 400px;
      margin-top: -400px;
      position: fixed;
      background-image: url('@/assets/image/img_magazine_rep.png');
      background-size: 100% 100px;
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

    .scroll-group {
      position: relative;
      width: 100%;
      background-color: #fff;
      margin-top: 593px;
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
        }

        .magazine-item {
          max-width: 570px;
          min-width: 370px;
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
          height: 177px;
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
          font-size: 16px;
          font-family: 'score2';
          color: #333333;
          margin-top: 14px;
        }

        .magazine-item-bottom-share-explore-group {
          display: flex;
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
}
</style>
