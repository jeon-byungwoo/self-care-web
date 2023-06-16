<template>
  <div>
    <div><Header></Header></div>
    <div style="margin-top: 120px"><mainPagerView /></div>
    <howToView />
    <subscribeReason />
  </div>
</template>

<script>
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
import mainPagerView from '../components/mainPagerView.vue'
import howToView from '../components/howTo.vue'
import subscribeReason from '../components/subscribeReason.vue'
export default {
  name: 'IndexPage',
  layout: 'default',
  components: {
    Footer,
    Header,
    mainPagerView,
    howToView,
    subscribeReason,
  },
  data() {
    return {}
  },
}
</script>
