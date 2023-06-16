<template>
  <div style="display: flex">
    <div class="main">
      <div class="main-header">
        <div class="top-first">
          <button
            v-for="item in topFirstMenus"
            :key="item"
            class="top-first-menus"
          >
            {{ item }}
          </button>
        </div>

        <div class="top-second">
          <div style="display: flex; flex-direction: row; width: 100%">
            <img
              class="top-second-image"
              src="https://www.mypuzzle.co.kr/resources/images/logo/header_logo.svg"
              @click="logoClick"
            />
            <div style="flex: 1"></div>
            <div style="display: flex; flex-direction: column">
              <div style="display: flex; flex-direction: row" ref="div_menus">
                <div
                  v-for="(item, index) in topSecondMenus"
                  :key="item"
                  style="display: flex"
                  @mouseleave="divDragLeave()"
                >
                  <a
                    ref="item"
                    class="top-second-menus"
                    @click="oneClick(item)"
                    @mouseover="divDragOver($event, index)"
                  >
                    {{ item }}
                  </a>
                </div>
              </div>

              <div class="slider" ref="slider" :style="ingSlider">
                <div class="indicator"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-div"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      topFirstMenus: ['소식', '고객센터', '회원가입', '로그인', '장바구니'],
      topSecondMenus: [
        '브랜드스토리',
        '건강설문',
        '제품',
        '고객후기',
        '매거진 퍼즐',
        '이벤트',
        '섭취기록',
      ],
      indicatorX: 0,
      indicatorWidth: 0,
      indicatorHeight: 0,
      indicatorTop: 0,
    }
  },
  methods: {
    oneClick() {
      console.log(this.$refs.item.getBoundingClientRect().left)
    },
    divDragOver(e, i) {
      console.log(this.$refs.item[i].getBoundingClientRect())
      this.indicatorX = this.$refs.item[i].getBoundingClientRect().left
      this.indicatorWidth = this.$refs.item[i].getBoundingClientRect().width
      this.indicatorTop =
        this.$refs.item[i].getBoundingClientRect().y +
        this.$refs.item[i].getBoundingClientRect().height
      console.log(this.indicatorX)
    },
    divDragLeave() {
      this.indicatorWidth = 0
    },
    logoClick() {
      this.$router.push({ name: 'firstPage' })
    },
  },
  mounted() {
    console.log(this.$refs.item[0].getBoundingClientRect().left)
    this.indicatorX = this.$refs.item[0].getBoundingClientRect().left
    this.indicatorTop =
      this.$refs.item[0].getBoundingClientRect().y +
      this.$refs.item[0].getBoundingClientRect().height
  },
  computed: {
    ingSlider() {
      return `
          width: ${this.indicatorWidth}px;
          left: ${this.indicatorX}px;
          top: ${this.indicatorTop}px;
          `
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  .main-header {
    .top-first {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
    .top-second {
      align-items: flex-end;
      display: flex;
      flex: 1;
      padding-bottom: 10px;
    }
    .top-first-menus {
      margin-left: 20px;
      font-size: 13px;
      color: #000000;
    }
    .top-second-image {
      width: 195px;
      cursor: pointer;
    }
    .top-second-menus {
      margin-left: 25px;
      font-size: 18px;
      color: #000000;
      font-weight: bold;
      cursor: pointer;
    }
    .top-second-menus:hover {
      color: #5b1a7c;
    }
    .slider {
      position: absolute;
      background-color: aqua;
      z-index: 1;
      transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
    }
    .indicator {
      position: relative;
      width: 100px;
      max-width: 100%;
      margin: 0 auto;
      height: 4px;
      background: #5b1a7c;
      border-radius: 1px;
    }
    width: 75%;
    height: 98%;
    margin: auto;
    flex-direction: column;
    display: flex;
    max-width: 1080px;
    min-width: 980px;
  }
  .bottom-div {
    width: 100%;
    height: 1%;
    background-color: #d0d0d0;
  }
  width: 100%;
  margin: auto;
  height: 120px;
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: white;
  z-index: 2;
}
</style>
