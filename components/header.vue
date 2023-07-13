<template>
  <div style="display: flex">
    <div class="main">
      <div class="main-header">
        <div class="top-menu">
          <div style="display: flex; flex-direction: row; width: 100%">
            <img
              class="top-first-image"
              src="https://www.mypuzzle.co.kr/resources/images/logo/header_logo.svg"
              @click="logoClick"
            />
            <div style="display: flex; flex-direction: column">
              <div style="display: flex; flex-direction: row" ref="div_menus">
                <div
                  v-for="(item, index) in topMenus"
                  :key="item"
                  style="display: flex"
                  @click="firstMenuClick(index, item.routerName)"
                  @mouseleave="divDragLeave()"
                >
                  <a
                    ref="item"
                    class="top-first-menus"
                    @mouseover="divDragOver($event, index)"
                  >
                    {{ item.text }}
                  </a>
                </div>
              </div>
              <div class="slider" ref="slider" :style="ingSlider">
                <div class="indicator"></div>
              </div>
            </div>
            <div style="flex: 1"></div>
            <div class="top-second-menus">
              <div class="kakao-consulting">톡상담</div>
              <div style="display: flex; flex-direction: row; margin-left: 8px">
                <div
                  class="login-saved"
                  @click="$router.push({ name: 'Login' })"
                >
                  로그인
                </div>
                <div style="margin-left: 4px; margin-right: 4px">·</div>
                <div class="login-saved">장바구니</div>
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
      topMenus: [
        { text: '브랜드스토리', routerName: 'brandStory' },
        { text: '매거진', routerName: 'magazine' },
        { text: '건강설문', routerName: 'healthConsulting' },
        { text: '고객후기', routerName: 'review' },
        { text: '스토어', routerName: 'store' },
        { text: '이벤트', routerName: 'event' },
        { text: '공지사항', routerName: 'notification' },
      ],
      indicatorX: 0,
      indicatorWidth: 0,
      indicatorHeight: 0,
      indicatorTop: 0,
    }
  },
  methods: {
    firstMenuClick(i, routerName) {
      this.indicatorX = this.$refs.item[i].getBoundingClientRect().left
      this.indicatorWidth = this.$refs.item[i].getBoundingClientRect().width
      this.indicatorTop =
        this.$refs.item[i].getBoundingClientRect().y +
        this.$refs.item[i].getBoundingClientRect().height
      console.log('click', routerName)
      this.$router.push({ name: routerName })
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
      this.$router.push({ name: 'index' })
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
    .top-menu {
      align-items: flex-end;
      display: flex;
      flex: 1;
      padding-bottom: 10px;
    }
    .top-first-image {
      width: 195px;
      cursor: pointer;
    }
    .top-first-menus {
      margin-left: 25px;
      font-size: 18px;
      color: #000000;
      font-weight: bold;
      cursor: pointer;
      text-decoration-line: none;
    }
    .top-first-menus:hover {
      color: #5b1a7c;
    }
    .top-second-menus {
      display: flex;
      flex-direction: row;
    }
    .login-saved {
      font-size: 12px;
      color: #505050;
      cursor: pointer;
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
  height: 60px;
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: white;
  z-index: 2;
}
</style>
