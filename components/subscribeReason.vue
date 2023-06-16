<template>
  <div>
    <div class="main-warper">
      <div class="main-warper-group">
        <div class="title-line"></div>
        <div class="title">지금 바로 구독해야 할 이유!</div>
        <div class="title-line"></div>
      </div>

      <slick
        ref="slick"
        :options="slickOptions"
        @afterChange="handleAfterChange"
        @beforeChange="handleBeforeChange"
        @breakpoint="handleBreakpoint"
        @destroy="handleDestroy"
        @edge="handleEdge"
        @init="handleInit"
        @reInit="handleReInit"
        @setPosition="handleSetPosition"
        @swipe="handleSwipe"
        @lazyLoaded="handleLazyLoaded"
        @lazyLoadError="handleLazyLoadError"
      >
        <div
          v-for="(item, index) in subscribeList"
          :key="index"
          style="width: 100%; height: 360px"
        >
          <a>
            <img :src="item.url" style="width: 100%; height: 360px" />
          </a>
        </div>
      </slick>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick'
import 'slick-carousel/slick/slick.css'
export default {
  name: 'subscribeSection',
  data() {
    return {
      subscribeList: [
        {
          url: 'https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_37670.jpg',
          color: '#DFD1FF',
        },
        {
          url: 'https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_59293.jpg',
          color: '#DFD1FF',
        },
        {
          url: 'https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_87197.jpg',
          color: '#DFD1FF',
        },
      ],
      slickOptions: {
        dots: true,
        slidesToShow: 1,
        infinite: true,
        sildesToScroll: 1,
        // Any other options that can be got from plugin documentation
      },
    }
  },
  methods: {
    next() {
      this.$refs.slick.next()
    },

    prev() {
      this.$refs.slick.prev()
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick()
      })
    },

    // Events listeners
    handleAfterChange(event, slick, currentSlide) {
      console.log('handleAfterChange', event, slick, currentSlide)
    },
    handleBeforeChange(event, slick, currentSlide, nextSlide) {
      console.log('handleBeforeChange', event, slick, currentSlide, nextSlide)
    },
    handleBreakpoint(event, slick, breakpoint) {
      console.log('handleBreakpoint', event, slick, breakpoint)
    },
    handleDestroy(event, slick) {
      console.log('handleDestroy', event, slick)
    },
    handleEdge(event, slick, direction) {
      console.log('handleEdge', event, slick, direction)
    },
    handleInit(event, slick) {
      console.log('handleInit', event, slick)
    },
    handleReInit(event, slick) {
      console.log('handleReInit', event, slick)
    },
    handleSetPosition(event, slick) {
      console.log('handleSetPosition', event, slick)
    },
    handleSwipe(event, slick, direction) {
      console.log('handleSwipe', event, slick, direction)
    },
    handleLazyLoaded(event, slick, image, imageSource) {
      console.log('handleLazyLoaded', event, slick, image, imageSource)
    },
    handleLazyLoadError(event, slick, image, imageSource) {
      console.log('handleLazeLoadError', event, slick, image, imageSource)
    },
  },
  components: {
    Slick,
  },
}
</script>

<style lang="scss" scoped>
.main-warper {
  width: 100%;
  max-width: 1080px;
  min-width: 980px;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 60px;
  .main-warper-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .title-line {
    flex: 1;
    height: 2px;
    background-color: #979797;
    border: 1px;
  }

  .title {
    font-size: 40px;
    font-weight: bold;
    margin-left: 78px;
    margin-right: 78px;
  }
  .slick-prev {
    background-color: aqua;
  }
}
</style>
