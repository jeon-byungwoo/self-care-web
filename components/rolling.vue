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
          <!-- <div class="rolling-banner" :style="{'background-image':'url('+item.image+')'}" @click="onClickBanner(item)"></div> -->
          <!-- <div class="rolling-banner-m" :style="{'background-image': 'url('+item.m_image+')'}" @click="onClickBanner(item)"></div> -->
            <v-img  class="rolling-banner" 
                @click="onClickBanner(item)"
                :src="item.image"
                cover
            />
            <v-img  class="rolling-banner-m" 
                @click="onClickBanner(item)"
                :src="item.m_image"
                contain
            />
        </slide>
      </hooper>
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
      hostUrl: process.env.BASE_URL,
    }
  },
  mounted() {
    this.getBannerList()
  },
  methods: {
    onClickBanner(item){
        window.location.href = item.link
        
    },
    prevClick() {
      this.$refs.test.slidePrev()
    },
    nextClick() {
      this.$refs.test.slideNext()
    },
    getBannerList() {
      let obj = {}
      let conditions = [{ q: '=', f: 'status', v: '활성' },{ q: 'order', f: 'priority', o: 'ASC' }]
      obj = { table: 'banner', conditions: conditions }

      try {
        this.$axios
          .post('/api/select', obj)
          .then((res) => {
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                let linkTo = ''
                if(res.data[i].type=='전화'){
                    linkTo='tel:'+res.data[i].content
                }else if(res.data[i].type=='링크'){
                    linkTo=res.data[i].content
                }
                let bannerObj = {
                  no: res.data[i].no,
                  image: process.env.BASE_URL + JSON.parse(res.data[i].image)[0],
                  m_image: process.env.BASE_URL + JSON.parse(res.data[i].m_image)[0],
                  type: res.data[i].type,
                  priority: res.data[i].priority,
                  content: res.data[i].content,
                  link:linkTo
                }
                this.bannerList.push(bannerObj)
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
      background-position: center;
      background-size: cover;
      display: block;
      width: 100%;
      height: 100%;
    }
    .rolling-banner-m {
      display: none;
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
        display: none;
      }
      .rolling-banner-m {
        background-position: center;
        background-size: cover;
        display: block;
        width: 100%;
        height: auto;
        min-height: 200px;
        
      }
    }
  }
}
</style>
