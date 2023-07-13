<template>
  <div>
    <Header></Header>
    <div style="margin-top: 120px"><mainPagerView /></div>
    <healthQuestion />
    <subscribe />
    <aiConsulting />
    <div class="hot-item-group">
      <div class="title-group">
        <div class="title">셀프케어 선정 인기 제품</div>
        <div style="flex: 1"></div>
        <div class="product-detail">제품 전체보기 ></div>
      </div>
      <div class="item-group">
        <div v-for="(item, index) in itemList" :key="index">
          <img style="background-color: aqua; width: 100%; height: 200px" />
          <div class="item-tag-group">
            <div
              v-for="(item1, index1) in item.tags"
              :key="index1"
              class="item-tag"
            >
              {{ item1 }}
            </div>
          </div>
          <div class="item-title">{{ item.title }}</div>
          <div class="item-price">{{ item.price }}</div>
          <div class="item-rating-review">
            {{ item.rating + ' ( 후기 ' + item.reviewCnt + ' )' }}
          </div>
        </div>
      </div>
    </div>
    <div class="magazine-group">
      <div class="title-group">
        <div class="title">self-care Magazine</div>
        <div style="flex: 1"></div>
        <div class="product-detail">제품 전체보기 ></div>
      </div>
      <div class="description">
        셀프케어에서 전달하는 건강 소식을 모아보세요.
      </div>
      <div class="magazine-item-group">
        <div class="magazine-item">
          <img class="magazine-item-image" />
          <div class="magazine-item-title">매거진 타이틀 영역</div>
        </div>
        <div style="width: 20px"></div>
        <div class="magazine-item">
          <img class="magazine-item-image" />
          <div class="magazine-item-title">매거진 타이틀 영역</div>
        </div>
      </div>
    </div>
    <div class="footer-line"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
import mainPagerView from '../components/mainPagerView.vue'
import healthQuestion from '../components/healthQuestion.vue'
import subscribe from '../components/subscribe.vue'
import aiConsulting from '../components/aiConsulting.vue'
import subscribeReason from '../components/subscribeReason.vue'
export default {
  name: 'IndexPage',
  layout: 'default',
  components: {
    Footer,
    Header,
    mainPagerView,
    healthQuestion,
    subscribe,
    aiConsulting,
    subscribeReason,
  },
  data() {
    return {
      itemList: [
        {
          uri: '',
          tags: ['태그1', '태그2'],
          title: '비타민1',
          price: '50,000',
          sale: '',
          rating: '4',
          reviewCnt: '4',
        },
        {
          uri: '',
          tags: [],
          title: '비타민2',
          price: '40,000',
          sale: '',
          rating: '4.2',
          reviewCnt: '5',
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
          sale: '',
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
.hot-item-group {
  padding: 20px;
  width: 100%;
  margin: auto;
  max-width: 1080px;
}
.title-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  .title {
    font-size: 40px;
  }
  .product-detail {
    cursor: pointer;
  }
}
.item-group {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  .item-tag-group {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 20px;
  }
  .item-tag {
    padding: 4px 12px;
    background-color: aqua;
    border-radius: 20px;
    text-align: center;
    margin-right: 12px;
  }
  .item-title {
    margin-top: 12px;
  }
  .item-price {
    margin-top: 8px;
  }
  .item-rating-review {
    margin-top: 8px;
  }
}
.magazine-group {
  padding: 20px;
  width: 100%;
  margin: auto;
  max-width: 1080px;
  .description {
    font-size: 30px;
  }
  .magazine-item-group {
    margin-top: 20px;
    display: flex;
  }
  .magazine-item {
    flex: 1;
  }
  .magazine-item-image {
    width: 100%;
    background-color: antiquewhite;
    border-radius: 12px;
    height: 300px;
  }
  .magazine-item-title {
    font-size: 20px;
    margin-top: 20px;
  }
}
.footer-line {
  width: 100%;
  height: 1px;
  background: #707070;
}
</style>
