<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="banner-group">
        <div class="title">고객 후기</div>
        <div class="title-sub">
          셀프케어를 이용중인 고객님들의 후기를 확인해보세요.
        </div>
      </div>

      <div class="scroll-group">
        <div class="review-group">
          <div
            v-for="(item, i) in reviewList"
            :key="i"
            class="review-list-item"
          >
            <div class="review-list-item-top-name-area">
              <div class="reiview-list-item-top-user-name">
                {{ item.name }}
              </div>
              <div class="reiview-list-item-top-medicine-name">
                {{ item.medicineName }}
              </div>
            </div>
            <div class="rating-area">
              <img
                v-for="(item1, i1) in 5"
                :key="i1"
                class="rating-img"
                :src="
                  item1.score >= i1 + 1
                    ? require('@/assets/image/ic_star.png')
                    : require('@/assets/image/ic_gray_star.png')
                "
              />
            </div>
            <img class="rep-image" :src="item.repPath" />
            <div class="contents">{{ item.contents }}</div>
            <div class="detail-btn" @click="detailClick">더보기</div>
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
      this.$router.push({ name: 'review-detail-id', params: { id: 3 } })
    },
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
  },
  data() {
    return {
      navigationStatus: false,
      reviewList: [
        {
          no: '0',
          name: '김민우',
          medicineName: 'test',
          score: '3',
          repPath: require('@/assets/image/img_medicine_test.png'),
          contents: '첫 가입시 주는 쿠폰으로 구독을 시작....',
        },
        {
          no: '0',
          name: '김민우',
          medicineName: 'test',
          score: '3',
          repPath: require('@/assets/image/img_rolling_first.png'),
          contents: '첫 가입시 주는 쿠폰으로 구독을 시작....',
        },
        {
          no: '0',
          name: '김민우',
          medicineName: 'test',
          score: '3',
          repPath: require('@/assets/image/img_pet_bg.png'),
          contents: '첫 가입시 주는 쿠폰으로 구독을 시작....',
        },
        {
          no: '0',
          name: '김민우',
          medicineName: 'test',
          score: '3',
          repPath: require('@/assets/image/img_medicine_test.png'),
          contents: '첫 가입시 주는 쿠폰으로 구독을 시작....',
        },
        {
          no: '0',
          name: '김민우',
          medicineName: 'test',
          score: '3',
          repPath: require('@/assets/image/img_medicine_test.png'),
          contents: '첫 가입시 주는 쿠폰으로 구독을 시작....',
        },
        {
          no: '0',
          name: '김민우',
          medicineName: 'test',
          score: '3',
          repPath: require('@/assets/image/img_medicine_test.png'),
          contents: '첫 가입시 주는 쿠폰으로 구독을 시작....',
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
    // background-image: url('@/assets/image/img_pet_bg.png');
    // background-size: 100% 400px;
    background-color: #333;
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
    .insurance-area {
      margin-top: 40px;
      width: 280px;
      height: 60px;
      border: 1px solid #9ad144;
      background-color: #333;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-family: 'score6';
      cursor: pointer;
    }
  }

  .scroll-group {
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-top: 400px;

    .review-group {
      width: 100%;
      margin: auto;
      max-width: 1200px;
      padding: 40px 20px 100px 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      .review-list-item {
        border-radius: 20px;
        width: 570px;
        min-width: 300px;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 20px 0px;
        .review-list-item-top-name-area {
          padding: 0px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .reiview-list-item-top-user-name {
            color: #333;
            font-size: 18px;
            font-family: 'score6';
          }
          .reiview-list-item-top-medicine-name {
            color: #fff;
            font-size: 18px;
            font-family: 'score6';
            padding: 8px 12px;
            border-radius: 40px;
            background-color: #9ad144;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .rating-area {
          padding: 0px 20px;
          margin-top: 0px;
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
          margin-top: 10px;
          color: #333;
          font-size: 16px;
          font-family: 'score2';
        }
        .detail-btn {
          padding: 40px 20px 0px 20px;
          text-decoration: underline;
          color: #000;
          font-size: 16px;
          font-family: 'score2';
          cursor: pointer;
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .mobile-main {
    height: hidden;
  }
  .main {
    width: 100%;
    margin-top: 0px;

    .banner-group {
      width: 100%;
      height: 250px;
      top: 76px;
      position: fixed;
      // background-image: url('@/assets/image/img_pet_bg.png');
      background-size: 100% 250px;
      background-color: #333;
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
      .insurance-area {
        margin-top: 40px;
        width: 280px;
        height: 60px;
        border: 1px solid #9ad144;
        background-color: #333;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-family: 'score6';
        cursor: pointer;
      }
    }

    .scroll-group {
      position: relative;
      width: 100%;
      background-color: #fff;
      margin-top: 250px;

      .review-group {
        width: 100%;
        margin: auto;
        max-width: 1200px;
        padding: 40px 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        .review-list-item {
          border-radius: 20px;
          width: 100%;
          min-width: 100px;
          background-color: #fff;
          border: 1px solid #ddd;
          padding: 20px 20px;
          .review-list-item-top-name-area {
            padding: 0px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .reiview-list-item-top-user-name {
              color: #333;
              font-size: 16px;
              font-family: 'score6';
            }
            .reiview-list-item-top-medicine-name {
              color: #fff;
              font-size: 16px;
              font-family: 'score6';
              padding: 8px 12px;
              border-radius: 40px;
              background-color: #9ad144;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .rating-area {
            padding: 0px 0px;
            margin-top: 0px;
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
          .detail-btn {
            padding: 40px 0px 0px 0px;
            text-decoration: underline;
            color: #000;
            font-size: 16px;
            font-family: 'score2';
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
