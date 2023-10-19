<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div class="main" v-if="!navigationStatus">
      <div class="banner-group">
        <div class="title">셀프케어 스토어</div>
        <div class="title-sub">
          셀프케어에서 제공하는 건강식품을 만나보세요.
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
              건식카테고리1
            </div>
            <div
              :class="tabStatus == 3 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatus = 3"
            >
              건식카테고리2
            </div>
            <div
              :class="tabStatus == 4 ? 'selected-tab-btn-area' : 'tab-btn-area'"
              @click="tabStatus = 4"
            >
              건식카테고리3
            </div>
          </div>
          <div class="category-group">
            <div
              v-for="(item, index) in categories"
              :key="index"
              class="category-area"
            >
              <img class="category-img" :src="item.url" draggable="false" />
              <div class="category-text">{{ item.title }}</div>
            </div>
          </div>
        </div>

        <div class="item-group">
          <div
            v-for="(item, index) in productList"
            :key="index"
            class="item-body"
            @click="productDetailClick"
          >
            <div class="item-img-group">
              <img
                class="item-img"
                src="@/assets/image/img_medicine_test.png"
                draggable="false"
              />
            </div>

            <div class="item-title">{{ item.title }}</div>
            <div v-if="item.sale.length > 0" class="item-basic-group">
              <div class="item-basic-price">
                <s>{{ item.price }}</s>
              </div>
              <div class="item-basic-price-won">원</div>
            </div>

            <div class="item-total-group">
              <div v-if="item.sale.length > 0" class="item-sale-group">
                <div class="item-sale">
                  {{ item.sale }}
                </div>
                <div class="item-sale-percent">%</div>
              </div>

              <div class="item-total-price-group">
                <div class="item-total-price">{{ item.price }}</div>
                <div class="item-total-price-won">원</div>
              </div>
            </div>
            <div v-if="item.rating.length > 0" class="item-rating-review-group">
              <img
                class="item-rating-img"
                src="@/assets/image/ic_star.png"
                draggable="false"
              />
              <div class="item-rating-review">
                {{ item.rating + ' 후기 ' + item.reviewCnt }}
              </div>
            </div>

            <div class="item-tag-group">
              <div
                v-for="(item1, index1) in item.tags"
                :key="index1"
                class="item-tag"
              >
                <div class="item-tag-text">{{ item1 }}</div>
              </div>
            </div>

            <div v-if="item.rating.length == 0" class="item-new-product">
              새로운 상품
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
    productDetailClick() {
      console.log('click')
      this.$router.push({ name: 'productDetail' })
    },
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
  },
  data() {
    return {
      tabStatus: 1, //1 전체보기, 2 라이프, 3 영양성분, 4 후기
      navigationStatus: false,
      categories: [
        {
          title: '여성건강',
          url: require('@/assets/image/ic_store_category01.png'),
        },
        {
          title: '관절,뼈',
          url: require('@/assets/image/ic_store_category02.png'),
        },
        {
          title: '피로,활력',
          url: require('@/assets/image/ic_store_category03.png'),
        },
        {
          title: '간건강',
          url: require('@/assets/image/ic_store_category04.png'),
        },
        {
          title: '변비,장건강',
          url: require('@/assets/image/ic_store_category05.png'),
        },
        {
          title: '위,소화',
          url: require('@/assets/image/ic_store_category06.png'),
        },
        {
          title: '남성건강',
          url: require('@/assets/image/ic_store_category07.png'),
        },
        {
          title: '눈건강',
          url: require('@/assets/image/ic_store_category08.png'),
        },
        {
          title: '면역력',
          url: require('@/assets/image/ic_store_category09.png'),
        },
        {
          title: '유,소아건강',
          url: require('@/assets/image/ic_store_category10.png'),
        },
        {
          title: '다이어트',
          url: require('@/assets/image/ic_store_category11.png'),
        },
        {
          title: '노화,황산화',
          url: require('@/assets/image/ic_store_category12.png'),
        },
        {
          title: '모발,두피',
          url: require('@/assets/image/ic_store_category13.png'),
        },
      ],
      productList: [
        {
          uri: '',
          tags: ['# 제품 태그1', '태그2'],
          title: '비타민1',
          price: '50,000',
          sale: '10',
          rating: '',
          reviewCnt: '',
        },
        {
          uri: '',
          tags: [],
          title: '비타민2',
          price: '40,000',
          sale: '',
          rating: '',
          reviewCnt: '',
        },
        {
          uri: '',
          tags: ['태그1', '태그2'],
          title: '비타민3',
          price: '32,000',
          sale: '',
          rating: '4.4',
          reviewCnt: '6',
        },
        {
          uri: '',
          tags: ['태그1'],
          title: '비타민4',
          price: '2,100',
          sale: '15',
          rating: '4.6',
          reviewCnt: '7',
        },
        {
          uri: '',
          tags: [],
          title: '비타민5',
          price: '2,000',
          sale: '',
          rating: '4.8',
          reviewCnt: '8',
        },
        {
          uri: '',
          tags: ['# 제품 태그1', '태그2'],
          title: '비타민1',
          price: '50,000',
          sale: '10',
          rating: '',
          reviewCnt: '',
        },
        {
          uri: '',
          tags: [],
          title: '비타민2',
          price: '40,000',
          sale: '',
          rating: '',
          reviewCnt: '',
        },
        {
          uri: '',
          tags: ['태그1', '태그2'],
          title: '비타민3',
          price: '32,000',
          sale: '',
          rating: '4.4',
          reviewCnt: '6',
        },
        {
          uri: '',
          tags: ['태그1'],
          title: '비타민4',
          price: '2,100',
          sale: '15',
          rating: '4.6',
          reviewCnt: '7',
        },
        {
          uri: '',
          tags: [],
          title: '비타민5',
          price: '2,000',
          sale: '',
          rating: '4.8',
          reviewCnt: '8',
        },
        {
          uri: '',
          tags: ['# 제품 태그1', '태그2'],
          title: '비타민1',
          price: '50,000',
          sale: '10',
          rating: '',
          reviewCnt: '',
        },
        {
          uri: '',
          tags: [],
          title: '비타민2',
          price: '40,000',
          sale: '',
          rating: '',
          reviewCnt: '',
        },
        {
          uri: '',
          tags: ['태그1', '태그2'],
          title: '비타민3',
          price: '32,000',
          sale: '',
          rating: '4.4',
          reviewCnt: '6',
        },
        {
          uri: '',
          tags: ['태그1'],
          title: '비타민4',
          price: '2,100',
          sale: '15',
          rating: '4.6',
          reviewCnt: '7',
        },
        {
          uri: '',
          tags: [],
          title: '비타민5',
          price: '2,000',
          sale: '',
          rating: '4.8',
          reviewCnt: '8',
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
    background-image: url('@/assets/image/img_store_rep.png');
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
    padding: 0px 20px 100px 20px;
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
        padding: 50px 0px 30px 0px;
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
      .category-group {
        display: flex;
        gap: 13px;
        background-color: #fff;
        padding-bottom: 40px;
        .category-area {
          display: flex;
          flex-direction: column;
          width: 80px;
          align-items: center;
          cursor: pointer;
          .category-img {
            width: 80px;
            height: 80px;
          }
          .category-text {
            margin-top: 15px;
            font-size: 14px;
            font-family: 'score2';
            color: #333;
          }
        }
      }
    }
    .item-group {
      max-width: 1200px;
      margin: auto;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      .item-body {
        width: 270px;
        height: 446px;
        cursor: pointer;
      }

      .item-img-group {
        background-color: #f6f6f6;
        width: 100%;
        height: 270px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
      }
      .item-img {
        height: 166px;
      }
      .item-tag-group {
        display: flex;
        flex-direction: row;
        width: 100%;
        .item-tag {
          padding: 9px 12px 7px 12px;
          border-width: 1px;
          border-style: solid;
          border-color: #e5e5e5;
          border-radius: 20px;
          text-align: center;
          margin-right: 12px;
          margin-top: 10px;
        }
        .item-tag-text {
          font-size: 12px;
          font-family: 'score2';
          color: #666666;
        }
      }

      .item-new-product {
        width: 90px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-width: 1px;
        border-style: solid;
        border-radius: 20px;
        padding: 9px 12px 7px 12px;
        text-align: center;
        font-size: 12px;
        font-family: 'score5';
        color: #ff6600;
        border-color: #ff6600;
      }

      .item-title {
        margin-top: 30px;
        font-size: 16px;
        font-family: 'score5';
        color: #333333;
      }
      .item-basic-group {
        margin-top: 10px;
        display: flex;
        align-items: flex-end;
        .item-basic-price {
          font-size: 16px;
          font-family: 'score6';
          color: #999999;
        }
        .item-basic-price-won {
          font-size: 12px;
          font-family: 'score2';
          color: #999999;
        }
      }
      .item-total-group {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .item-sale-group {
          display: flex;
          align-items: flex-end;
          margin-right: 7px;
          .item-sale {
            font-size: 16px;
            font-family: 'score6';
            color: #ef2a23;
          }
          .item-sale-percent {
            font-size: 14px;
            font-family: 'score2';
            color: #ef2a23;
          }
        }

        .item-total-price-group {
          display: flex;
          align-items: flex-end;
          .item-total-price {
            font-size: 18px;
            font-family: 'score6';
            color: #333333;
          }
          .item-total-price-won {
            font-size: 14px;
            font-family: 'score2';
            color: #333333;
          }
        }
      }
      .item-rating-review-group {
        margin-top: 10px;
        display: flex;
        .item-rating-img {
          width: 16px;
          height: 16px;
          margin-right: 3px;
        }
        .item-rating-review {
          font-size: 14px;
          font-family: 'score2';
          color: #333333;
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
      background-image: url('@/assets/image/img_store_rep.png');
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

    .scroll-group {
      position: relative;
      width: 100%;
      background-color: #fff;
      margin-top: 250px;
      padding-bottom: 0px;
      .scroll-header-group {
        margin: auto;
        width: 100%;
        position: sticky;
        top: 76px;
        z-index: 10;
        padding: 20px 0px;
        background-color: #fff;
        margin-top: 0px;

        .tab-group::-webkit-scrollbar {
          display: none;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
        }
        .tab-group {
          width: 100%;
          display: flex;
          flex-direction: row;
          background-color: #fff;
          overflow: auto;
          white-space: nowrap;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
          padding: 0px 20px;
          margin-top: 0px;
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
        .category-group::-webkit-scrollbar {
          display: none;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
        }
        .category-group {
          display: flex;
          gap: 10px;
          background-color: #fff;
          padding-bottom: 0px;
          overflow: auto;
          white-space: nowrap;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
          padding: 0px 20px;
          margin-top: 10px;

          .category-area {
            display: flex;
            flex-direction: column;
            width: 15vw;
            align-items: center;
            cursor: pointer;
            margin-bottom: 10px;
            .category-img {
              width: 15vw;
              height: 15vw;
            }
            .category-text {
              margin-top: 15px;
              font-size: 14px;
              font-family: 'score2';
              color: #333;
            }
          }
        }
      }
      .item-group {
        margin: auto;
        margin-top: 0px;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        gap: 10px;
        padding: 0px 20px 20px 20px;
        .item-body {
          width: 48%;
          height: auto;
          cursor: pointer;
        }

        .item-img-group {
          background-color: #f6f6f6;
          width: 100%;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          padding: 20px;
        }
        .item-img {
          width: 60%;
          height: auto;
        }
        .item-tag-group {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          width: 100%;
          .item-tag {
            padding: 9px 12px 7px 12px;
            border-width: 1px;
            border-style: solid;
            border-color: #e5e5e5;
            border-radius: 20px;
            text-align: center;
            margin-right: 6px;
            margin-top: 10px;
          }
          .item-tag-text {
            font-size: 10px;
            font-family: 'score2';
            color: #666666;
          }
        }

        .item-new-product {
          width: 90px;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-width: 1px;
          border-style: solid;
          border-radius: 20px;
          padding: 9px 12px 7px 12px;
          text-align: center;
          font-size: 10px;
          font-family: 'score5';
          color: #ff6600;
          border-color: #ff6600;
        }

        .item-title {
          margin-top: 20px;
          font-size: 14px;
          font-family: 'score5';
          color: #333333;
        }
        .item-basic-group {
          margin-top: 8px;
          display: flex;
          align-items: flex-end;
          .item-basic-price {
            font-size: 14px;
            font-family: 'score6';
            color: #999999;
          }
          .item-basic-price-won {
            font-size: 10px;
            font-family: 'score2';
            color: #999999;
          }
        }
        .item-total-group {
          margin-top: 8px;
          display: flex;
          align-items: center;
          .item-sale-group {
            display: flex;
            align-items: flex-end;
            margin-right: 5px;
            .item-sale {
              font-size: 14px;
              font-family: 'score6';
              color: #ef2a23;
            }
            .item-sale-percent {
              font-size: 12px;
              font-family: 'score2';
              color: #ef2a23;
            }
          }

          .item-total-price-group {
            display: flex;
            align-items: flex-end;
            .item-total-price {
              font-size: 16px;
              font-family: 'score6';
              color: #333333;
            }
            .item-total-price-won {
              font-size: 12px;
              font-family: 'score2';
              color: #333333;
            }
          }
        }
        .item-rating-review-group {
          margin-top: 8px;
          display: flex;
          .item-rating-img {
            width: 14px;
            height: 14px;
            margin-right: 3px;
          }
          .item-rating-review {
            font-size: 12px;
            font-family: 'score2';
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
