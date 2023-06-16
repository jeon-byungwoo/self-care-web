<template>
  <div class="main-warp">
    Hello

    <div class="btn-test width-test" @click="oneClick()">button</div>

    <div v-if="visibleParam == true">visibleParam = true</div>
    <div v-else>visibleParam = false</div>

    <div v-if="visibleParam2 == true">visibleParam = true</div>
    <div v-else>visibleParam = false</div>

    <div v-for="item in list" :key="item.val">{{ item.text }}</div>

    <div></div>
  </div>
</template>

<script>
export default {
  layout: 'Admin',
  name: 'IndexPage',

  //layout
  //component
  //name

  data() {
    return {
      visibleParam: false,
      visibleParam2: true,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      list: [
        { val: 1, text: 1 },
        { val: 2, text: 2 },
        { val: 3, text: 3 },
        { val: 4, text: 4 },
      ],
    }
  },

  mounted() {
    this.oneClick()
  },
  methods: {
    oneClick() {
      console.log('clk one')
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-test {
  cursor: pointer;
}
.main-warp {
  div {
    background-color: #d0d0d0;
  }
  .btn-test {
    background-color: #ff0000;
  }
}

.width-test {
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px;
  margin: 10px 10px 10px 10px;
}

.btn-test:hover {
  background-color: aqua;
}
</style>
