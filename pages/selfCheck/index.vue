<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="notification-title">건강설문</div>
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
                  {{ item.title }}
                </div>
              </div>

              <div class="magazine-item-bottom-group">
                <div class="magazine-item-bottom-description">
                  {{ item.description }}
                </div>
                <div class="magazine-item-bottom-share-explore-group">
                  <div class="magazine-item-bottom-share" @click="onClickCheck(index)">설문 진행하기</div>
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
  data() {
    return {
      navigationStatus: false,
      blockNum: 0,
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
          description: 'Whitsunday Island, Whitsunday IslandsWhitsunday Island, Whitsunday IslandsWhitsunday Island, Whitsunday IslandsWhitsunday Island, Whitsunday IslandsWhitsunday Island, Whitsunday IslandsWhitsunday Island, Whitsunday Islands',
        },
      ],
    }
  },
  mounted() {
    //나의 AI 건강설문 결과
  },
  methods: {
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
    onClickCheck(index){
        this.$router.push({name: 'doCheck', params: { id: index } })
    }

  },
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 0px;
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
        width: 47%;
        height: 477px;
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
          font-size: 30px;
          font-family: 'score6';
          color: #ffffff;
          position: relative;
          top: -54px;
          left: 40px;
        }
      }
      .magazine-item-bottom-group {
        width: 100%;
        height: 112px;
        border-left-width: 1px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #e5e5e5;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        padding: 10px;
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
        margin-top: 8px;
        overflow: hidden;
      }

      .magazine-item-bottom-share-explore-group {
        display: flex;
        justify-content: center;
        margin: 5px;
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
              height: auto;
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
              padding: 10px;
              display: flex;
              flex-direction: column;
              margin-top: -25px;
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
              margin-top: 6px;
              overflow: hidden;
            }

            .magazine-item-bottom-share-explore-group {
              display: flex;
              justify-content: center;
              margin: 5px;
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
            }
          }
        }
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
