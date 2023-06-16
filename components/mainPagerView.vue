<template>
  <div class="main-warper">
    <div class="pager-group">
      <div class="slider">
        <future-slider
          :items="images"
          :infinite="true"
          :autoplay="true"
          :autoplaySpped="2000"
        />

        <template slot="arrow-left">
          <div class="left-arrow">
            <a class="arrow-text">{{ '<' }}</a>
          </div>
        </template>
        <template slot="arrow-right">
          <div class="right-arrow">
            <a class="arrow-text">{{ '>' }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FutureSlider from 'vue-future-slider'
import 'vue-future-slider/dist/vue-future-slider.css'

Vue.use(FutureSlider)

export default {
  name: 'pagerView',
  data() {
    return {
      images: [
        // {
        //   image:
        //     'https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_87197.jpg',
        // },
        {
          image:
            'https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_37670.jpg',
          color: '#DFD1FF',
        },
        {
          image:
            'https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_59293.jpg',
          color: '#DFD1FF',
        },
        {
          image:
            'https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_87197.jpg',
          color: '#DFD1FF',
        },
        // {
        //   image:
        //     'https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_37670.jpg',
        // },
      ],
    }
  },
  methods: {
    preClick() {
      //   $slideUl.animate(
      //     { 'margin-left': '+=' + width },
      //     animationSpeed,
      //     function () {
      //       if (--currentSlide === 1) {
      //         currentSlide = $slides.length - 1
      //         $slideUl.css('margin-left', -($slides.length - 2) * width)
      //       } else {
      //       }
      //   for (var i = 0; i < $dots.length; i++) {
      //     $dots[i].style.background = ''
      //   }
      //   $dots[currentSlide - 2].style.background = 'white'
      // }
      //   )
    },
  },
}
</script>

<style lang="scss" scoped>
.main-warper {
  width: 100%;
  min-width: 1080px;
  margin: auto;
  height: 360px;
  background-color: #5f00b6;
  .pager-group {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1312px;
    overflow: hidden;
    margin-inline: auto;
    margin: auto;
    justify-content: center;
    align-items: center;
  }
  .slider {
    width: inherit;
    height: inherit;
  }
  .pager-img {
    width: 100%;
    max-width: 1200px;
    height: 360px;
    display: inline-block;
  }
  .left-arrow {
    position: absolute;
    width: 56px;
    height: 56px;
    left: 0;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
  .arrow-text {
    font-size: 40px;
    color: white;
    font-weight: bold;
  }
  .right-arrow {
    position: absolute;
    width: 56px;
    height: 56px;
    right: 0;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
}
</style>
