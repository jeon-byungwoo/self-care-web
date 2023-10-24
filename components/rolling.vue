<template>
  <div class="main-warper">
    <div class="pager-group">
      <hooper
        :infiniteScroll="true"
        :progress="true"
        :autoPlay="true"
        :playSpeed="5000"
        :wheelControl="false"
        ref="test"
        class="hooper"
      >
        <slide v-for="(item, i) in bannerList" :key="i">
          <img class="rolling-banner" :src="item.image" />
        </slide>
        <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination> -->
        <!-- <hooper-progress slot="hooper-addons"></hooper-progress> -->
      </hooper>

      <!-- <div class="arrow-group">
        <img
          class="prev-img"
          src="@/assets/image/btn_prev.png"
          @click="prevClick"
          draggable="false"
        />
        <div class="arrow-empty"></div>
        <img
          class="next-img"
          src="@/assets/image/btn_next.png"
          @click="nextClick"
          draggable="false"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation,
} from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  name: 'pagerView',
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation,
  },
  data() {
    return {
      bannerList: [],
    }
  },
  mounted() {
    this.getBannerList()
  },
  methods: {
    prevClick() {
      this.$refs.test.slidePrev()
    },
    nextClick() {
      this.$refs.test.slideNext()
    },
    getBannerList() {
      let obj = {}
      let conditions = [{ q: '=', f: 'status', v: '활성' }]
      obj = { table: 'banner', conditions: conditions }

      try {
        this.$axios
          .post('/api/select', obj)
          .then((res) => {
            console.log('인서트 결과값:: ', JSON.stringify(res.data))
            console.log(res.data.length)
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                let bannerObj = {
                  no: res.data[i].no,
                  image: process.env.BASE_URL + res.data[i].image,
                  type: res.data[i].type,
                  priority: res.data[i].priority,
                  content: res.data[i].content,
                }
                this.bannerList.push(bannerObj)
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
  },
}
</script>

<style lang="scss" scoped>
.main-warper {
  width: 100%;
  height: 600px;
  .pager-group {
    width: 100%;
    height: 100%;
    .hooper {
      position: relative;
      height: 100%;
    }
    .rolling-banner {
      width: 100%;
      height: 100%;
    }
    .arrow-group {
      width: 100%;
      max-width: 1200px;
      height: auto;
      position: absolute;
      top: 40%;
      display: flex;
    }
    .prev-img {
      width: 40px;
      height: 40px;
      flex: 0;
    }
    .arrow-empty {
      flex: 1;
    }
    .next-img {
      width: 40px;
      height: 40px;
      flex: 0;
    }
    .rolling-group {
      display: flex;
      flex-direction: row;
      padding: 40px 60px 0px 60px;
      .rolling-text-group {
        margin-top: 69px;
      }
      .rolling-text-header {
        font-size: 18px;
        color: #333333;
        font-family: 'score2';
      }
      .rolling-text-header2-group {
        display: flex;
        flex-direction: row;
      }
      .rolling-text-header2 {
        font-size: 18px;
        color: #333333;
        font-family: 'score6';
      }
      .rolling-text-middle {
        font-size: 40px;
        font-family: 'score9';
        color: #333333;
        margin-top: 23px;
      }
      .rolling-text-footer {
        font-size: 55px;
        font-weight: 900;
        font-family: 'score9';
        color: #32b783;
      }
      .rolling-empty {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
      .rolling-img-first {
        width: 382px;
        height: 342px;
      }
      .rolling-img-second {
        width: 374px;
        height: 353px;
      }
      .rolling-img-third {
        width: 335px;
        height: 362px;
      }
    }
    .rolling-ai-btn-group {
      position: relative;
      margin-top: 0px;
      width: 100%;
      display: flex;
      justify-content: center;
      cursor: pointer;
      .rolling-ai-btn {
        border-style: solid;
        border-width: 1px;
        border-color: #32b783;
        width: 300px;
        height: 70px;
        background: white;
        font-family: 'score5';
        font-size: 18px;
        color: #32b783;
        align-items: center;
        justify-content: center;
        display: flex;
      }
    }
  }
}
@media (max-width: 720px) {
  .main-warper {
    width: 100%;
    height: auto;

    .pager-group {
      width: 100%;
      height: 100%;
      .hooper {
        width: 100%;
        position: relative;
        height: 100%;
      }
      .rolling-banner {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
