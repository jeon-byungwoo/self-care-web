<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="review-detail-title-back-area">
          <div class="review-detail-title">고객 후기</div>
          <div class="review-detail-back" @click="$router.go(-1)">이전</div>
        </div>

        <div class="review-detail-content-group">
          <div class="review-detail-left-content">
            <div class="review-detail-top-name-area">
              <div class="reiview-detail-top-user-name">
                {{ name }}
              </div>
              <div class="review-detail-date">{{ date }}</div>
            </div>
            <div class="rating-area">
              <img
                v-for="(item1, i1) in 5"
                :key="i1"
                class="rating-img"
                :src="
                  score >= i1 + 1
                    ? require('@/assets/image/ic_star.png')
                    : require('@/assets/image/ic_gray_star.png')
                "
              />
            </div>
            <img class="rep-image" :src="repPath" />
            <div class="contents">{{ contents }}</div>
          </div>
          <div class="line"></div>
          <div class="review-detail-right-content">
            <div class="review-detail-right-title">김민우님의 맞춤 영양제</div>
            <div
              v-for="(item, i) in medicineList"
              :key="i"
              class="review-detail-medicine-list-item"
            >
              <img class="medicine-list-item-rep-image" :src="item.repPath" />
              <div class="medicine-list-item-name-tags-area">
                <div class="medicine-list-item-name">{{ item.name }}</div>
                <div class="medicine-list-item-tags-area">
                  <div
                    v-for="(item1, i1) in item.tags"
                    :key="i1"
                    class="medicine-list-item-tags"
                  >
                    {{ item1 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="review-list-move-area">
          <div class="review-list-move-btn" @click="$router.go(-1)">
            목록보기
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../../components/header.vue'
export default {
  components: {
    Header,
  },
  data() {
    return {
      navigationStatus: false,
      no: '0',
      name: '김민우',
      medicineName: 'test',
      score: '3',
      repPath: require('@/assets/image/img_medicine_test.png'),
      contents:
        '첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....첫 가입시 주는 쿠폰으로 구독을 시작....',
      date: '2023.09.26',
      medicineList: [
        {
          repPath: require('@/assets/image/img_medicine_test.png'),
          name: '제품이름',
          tags: ['#제품태그1', '#제품태그2'],
        },
        {
          repPath: require('@/assets/image/img_medicine_test.png'),
          name: '제품이름',
          tags: ['#제품태그1', '#제품태그2'],
        },
        {
          repPath: require('@/assets/image/img_medicine_test.png'),
          name: '제품이름',
          tags: ['#제품태그1', '#제품태그2'],
        },
      ],
    }
  },
  methods: {
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 197px;
  .body {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 40px 0px 100px 0px;
    .review-detail-title-back-area {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .review-detail-title {
        color: #333;
        font-size: 36px;
        font-family: 'score6';
      }
      .review-detail-back {
        width: 100px;
        height: 50px;
        border: 1px solid #ddd;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #333333;
        font-size: 16px;
        font-family: 'score6';
        border-radius: 25px;
      }
    }
    .review-detail-content-group {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
      .line {
        width: 10px;
        background-color: #f8f8f8;
        margin-left: 40px;
        margin-right: 10px;
      }

      .review-detail-left-content {
        flex: 0.65;
        .review-detail-top-name-area {
          padding: 0px 0px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .reiview-detail-top-user-name {
            color: #333;
            font-size: 18px;
            font-family: 'score6';
          }
          .review-detail-date {
            margin-right: 20px;
            color: #666;
            font-size: 16px;
            font-family: 'score2';
          }
        }
        .rating-area {
          padding: 0px 0px;
          margin-top: 10px;
          display: flex;

          // * + * {
          //   margin-left: 8px;
          // }

          .rating-img {
            width: 20px;
            height: 20px;
          }
        }
        .rep-image {
          width: 100%;
          height: 450px;
          margin-top: 20px;
        }
        .contents {
          padding: 0px 20px;
          max-lines: 3;
          margin-top: 30px;
          color: #333;
          font-size: 16px;
          font-family: 'score2';
        }
      }
      .review-detail-right-content {
        flex: 0.35;
        .review-detail-right-title {
          padding: 0px 0px;
          color: #333;
          font-size: 18px;
          font-family: 'score6';
        }
        .review-detail-medicine-list-item {
          width: 100%;
          margin-top: 30px;
          margin-left: 10px;
          display: flex;
          .medicine-list-item-rep-image {
            width: 100px;
            height: 100px;
          }
          .medicine-list-item-name-tags-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            .medicine-list-item-name {
              color: #333;
              font-size: 16px;
              font-family: 'score4';
            }
            .medicine-list-item-tags-area {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin-top: 10px;
              .medicine-list-item-tags {
                padding: 9px 12px 7px 12px;
                border-width: 1px;
                border-style: solid;
                border-color: #e5e5e5;
                border-radius: 20px;
                text-align: center;
                font-size: 12px;
                font-family: 'score2';
                color: #666666;
              }
            }
          }
        }
      }
    }
    .review-list-move-area {
      margin-top: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .review-list-move-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 70px;
        cursor: pointer;
        font-size: 18px;
        font-family: 'score5';
        color: #333;
        border: 1px solid #333;
        background-color: #fff;
      }
    }
  }
}
@media (max-width: 720px) {
  .main {
    margin-top: 40px;
    .body {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
      .review-detail-title-back-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .review-detail-title {
          color: #333;
          font-size: 30px;
          font-family: 'score6';
        }
        .review-detail-back {
          width: 60px;
          height: 35px;
          border: 1px solid #ddd;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333333;
          font-size: 14px;
          font-family: 'score6';
          border-radius: 25px;
        }
      }
      .review-detail-content-group {
        display: block;
        margin-top: 40px;
        .line {
          width: 10px;
          background-color: #f8f8f8;
          margin-left: 0px;
          margin-right: 0px;
        }

        .review-detail-left-content {
          flex: 0.65;
          .review-detail-top-name-area {
            padding: 0px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .reiview-detail-top-user-name {
              color: #333;
              font-size: 16px;
              font-family: 'score6';
            }
            .review-detail-date {
              margin-right: 0px;
              color: #666;
              font-size: 14px;
              font-family: 'score2';
            }
          }
          .rating-area {
            padding: 0px 0px;
            margin-top: 10px;
            display: flex;

            // * + * {
            //   margin-left: 8px;
            // }

            .rating-img {
              width: 16px;
              height: 16px;
            }
          }
          .rep-image {
            width: 100%;
            height: auto;
            margin-top: 20px;
          }
          .contents {
            padding: 0px 0px;
            max-lines: 3;
            margin-top: 30px;
            color: #333;
            font-size: 16px;
            font-family: 'score2';
          }
        }
        .review-detail-right-content {
          margin-top: 40px;
          flex: 0.35;
          .review-detail-right-title {
            padding: 0px 0px;
            color: #333;
            font-size: 16px;
            font-family: 'score6';
          }
          .review-detail-medicine-list-item {
            width: 100%;
            margin-top: 30px;
            margin-left: 10px;
            display: flex;
            .medicine-list-item-rep-image {
              width: 25%;
              height: auto;
            }
            .medicine-list-item-name-tags-area {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              margin-left: 20px;
              .medicine-list-item-name {
                color: #333;
                font-size: 14px;
                font-family: 'score4';
              }
              .medicine-list-item-tags-area {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
                .medicine-list-item-tags {
                  padding: 9px 12px 7px 12px;
                  border-width: 1px;
                  border-style: solid;
                  border-color: #e5e5e5;
                  border-radius: 20px;
                  text-align: center;
                  font-size: 10px;
                  font-family: 'score2';
                  color: #666666;
                }
              }
            }
          }
        }
      }
      .review-list-move-area {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        .review-list-move-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 60px;
          cursor: pointer;
          font-size: 16px;
          font-family: 'score5';
          color: #333;
          border: 1px solid #333;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
