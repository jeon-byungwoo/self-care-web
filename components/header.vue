<template>
  <div class="main-wrapper">
    <div class="main-header">
      <div class="menu-1step">
        <div class="div-logo" @click="logoClick">
          <img
            class="img-logo"
            src="../assets/image/ic_home_logo.png"
            draggable="false"
          />
        </div>
        <img
          class="img-talk"
          src="../assets/image/ic_home_talk.png"
          draggable="false"
          @click="hrefKakao()"
        />

        <img
          class="img-hamberger"
          :src="
            shadowNav == false
              ? require('../assets/image/ic_home_menu.png')
              : require('@/assets/image/ic_menu_close.png')
          "
          draggable="false"
          @click="update"
        />
      </div>
      <div class="menu-2step">
        <div
          :class="
            shadowNav == true
              ? 'menu-2step-area'
              : 'menu-2step-area-display-none'
          "
          ref="menus"
        >
          <div
            v-for="(item, index) in topMenus"
            :key="index"
            @click="firstMenuClick(index, item.routerName)"
          >
            <a
              ref="item"
              :class="
                item.text == selectedTopMenus
                  ? 'selected-top-first-menus'
                  : 'top-first-menus'
              "
            >
              {{ item.text }}
            </a>
            <!-- :style="index == 0 ? 'margin-left:0px' : 'margin-left:61px'" -->
          </div>
          <div class="flex-1"></div>
          <div class="top-second-menus">
            <img
              @click="myClick"
              class="img-my"
              src="../assets/image/ic_home_my.png"
              draggable="false"
            />
            <img
              @click="cartClick"
              class="img-cart"
              src="../assets/image/ic_home_cart.png"
              draggable="false"
            />
            <div class="mobile-top-first-menus" @click="myClick">내 정보</div>
            <div class="mobile-top-first-menus" @click="cartClick">
              장바구니
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="shadowNav == true ? 'line-display-none' : 'line'"></div>
  </div>
</template>

<script>
export default {
  name: 'pagerView',
  data() {
    return {
      topMenus: [
        { text: '건강설문', routerName: 'healthConsulting' },
        { text: '자가진단', routerName: 'healthConsulting' },
        { text: '스토어', routerName: 'store' },
        { text: '펫 전용관', routerName: 'petPrivate' },
        { text: '후기', routerName: 'review' },
        { text: '매거진', routerName: 'magazine' },
        { text: '소식', routerName: 'notification' },
      ],
      selectedTopMenus: 0, // 1-건강설문, 2-자가진단, 3-스토어, 4-펫전용관, 5-후기, 6-매거진, 7-소식
      indicatorX: 0,
      indicatorWidth: 0,
      indicatorHeight: 0,
      indicatorTop: 0,
      shadowNav: false,
    }
  },
  methods: {
    hrefKakao() {
      window.open('http://pf.kakao.com/_xfnvuG/chat')
    },
    firstMenuClick(i, routerName) {
      // this.indicatorX = this.$refs.item[i].getBoundingClientRect().left
      // this.indicatorWidth = this.$refs.item[i].getBoundingClientRect().width
      // this.indicatorTop =
      //   this.$refs.item[i].getBoundingClientRect().y +
      //   this.$refs.item[i].getBoundingClientRect().height
      console.log('click', routerName)
      this.selectedTopMenus = this.topMenus[i].text
      this.$router.push({ name: routerName })
    },
    divDragOver(e, i) {
      // console.log(this.$refs.item[i].getBoundingClientRect())
      // this.indicatorX = this.$refs.item[i].getBoundingClientRect().left
      // this.indicatorWidth = this.$refs.item[i].getBoundingClientRect().width
      // this.indicatorTop =
      //   this.$refs.item[i].getBoundingClientRect().y +
      //   this.$refs.item[i].getBoundingClientRect().height
      // console.log(this.indicatorX)
    },
    divDragLeave() {
      this.indicatorWidth = 0
    },
    logoClick() {
      this.$router.push({ name: 'index' })
    },
    myClick() {
      this.$router.push({ name: 'myInfo' })
      // this.$router.push({ name: 'login' })
    },
    cartClick() {
      this.$router.push({ name: 'cart' })
    },
    update() {
      this.shadowNav = this.shadowNav == false ? true : false
      this.$emit('update', this.shadowNav)
    },
    handleResize() {
      const vm = this
      //resize 실행마다 width, height 가져오기
      let width = window.innerWidth
      let height = window.innerHeight

      //브라우저 넓이에 따라서 보여질 카드 개수 표시
      if (width > 720) {
        this.shadowNav = false
        this.$emit('update', this.shadowNav)
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    //최초 한번 실행
    this.handleResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  fetchData() {},
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
.main-wrapper {
  display: flex;
  flex-direction: column;
  z-index: 999;
  width: 100%;
  background: white;
  top: 0px;
  left: 0px;
  position: sticky;
  .line {
    height: 1px;
    width: 100%;
    background: #dddddd;
    margin-top: 30px;
  }
  .line-display-none {
    height: 1px;
    width: 100%;
    background: #dddddd;
    margin-top: 30px;
  }
  .main-header {
    margin: auto;
    flex-direction: column;
    display: flex;
    max-width: 1200px;
    margin-top: 48px;
    width: 100%;
    .menu-1step {
      display: flex;
      align-items: center;
      .img-menu {
        display: none;
        width: 20px;
        height: 20px;
        margin-right: 28px;
        cursor: pointer;
      }
      .div-logo {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .img-logo {
        width: 94px;
        height: 38px;
        cursor: pointer;
      }
      .img-talk {
        width: 88px;
        height: 35px;
        cursor: pointer;
      }

      .img-hamberger {
        display: none;
        width: 88px;
        height: 35px;
        cursor: pointer;
      }
    }
    .menu-2step {
      align-items: center;
      display: flex;
      flex: 1;
      margin-top: 58px;
      .menu-2step-area {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 61px;
        .flex-1 {
          flex: 1;
        }
      }
      .menu-2step-area-display-none {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 61px;
        .flex-1 {
          flex: 1;
        }
      }
      .mobile-top-first-menus {
        display: none;
      }
      .top-first-menus {
        font-size: 17px;
        color: #333333;
        font-family: 'score5';
        cursor: pointer;
        text-decoration-line: none;
      }
      .selected-top-first-menus {
        font-size: 17px;
        color: #9ad144;
        font-family: 'score5';
        cursor: pointer;
        text-decoration-line: none;
      }
      .top-first-menus:hover {
        color: #9ad144;
      }
      .top-second-menus {
        display: flex;
        flex-direction: row;
      }
      .img-my {
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
      .img-cart {
        width: 22px;
        height: 22px;
        margin-left: 25px;
        cursor: pointer;
      }
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
  }
}
@media (max-width: 720px) {
  // html {
  //   overflow-x: hidden;
  //   width: 100%;
  // }
  // body {
  //   overflow-x: hidden;
  //   width: 100%;
  // }
  .main-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 76px;
    background: white;
    top: 0px;
    left: 0px;
    position: sticky;
    z-index: 999;
    .line {
      height: 1px;
      width: 100%;
      background: #dddddd;
      margin-top: 10px;
    }
    .line-display-none {
      display: none;
    }
    .main-header {
      margin: auto;
      flex-direction: column;
      display: flex;
      margin-top: 20px;
      width: 100%;
      padding: 0px 0px;
      .menu-1step {
        display: flex;
        align-items: center;
        padding: 0px 20px;
        .img-menu {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 28px;
          cursor: pointer;
        }
        .div-logo {
          display: flex;
          justify-content: flex-start;
          .img-logo {
            width: 21.25%;
            height: auto;
          }
        }
        .img-talk {
          width: 22%;
          height: auto;
        }

        .img-hamberger {
          display: block;
          width: 6.81%;
          height: auto;
          cursor: pointer;
          margin-left: 4.17%;
        }
      }
      .menu-2step {
        align-items: center;
        display: block;
        margin-top: 0px;
        justify-content: center;
        background-color: #fff;
        width: 100%;
        margin-top: 0px;
        .menu-2step-area {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          .flex-1 {
            display: none;
          }
        }
        .menu-2step-area-display-none {
          display: none;
          flex-direction: column;
          width: 100%;
          align-items: center;
          justify-content: center;
          margin-top: 0px;
          .flex-1 {
            flex: 1;
          }
        }
        .mobile-top-first-menus {
          display: block;
          font-size: 17px;
          color: #333333;
          font-family: 'score5';
          cursor: pointer;
          text-decoration-line: none;
        }
        .mobile-top-first-menus:hover {
          color: #9ad144;
        }
        .top-first-menus {
          font-size: 17px;
          color: #333333;
          font-family: 'score5';
          cursor: pointer;
          text-decoration-line: none;
        }
        .selected-top-first-menus {
          font-size: 17px;
          color: #9ad144;
          font-family: 'score5';
          cursor: pointer;
          text-decoration-line: none;
        }
        .top-first-menus:hover {
          color: #9ad144;
        }
        .top-second-menus {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 61px;
        }
        .img-my {
          display: none;
          width: 22px;
          height: 22px;
          cursor: pointer;
        }
        .img-cart {
          display: none;
          width: 22px;
          height: 22px;
          margin-left: 0px;
          cursor: pointer;
        }
        .top-first-menus {
          font-size: 17px;
          color: #333333;
          font-family: 'score5';
          cursor: pointer;
          text-decoration-line: none;
        }
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
    }
  }
}
</style>
