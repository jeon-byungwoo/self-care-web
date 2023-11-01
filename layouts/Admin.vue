<template>
    <v-app v-show="$store.state.userModule.login" style="flex-direction: column;">
      <div >
        <SideMenu clss="main_sidebar"/>
      </div>
      <div class="main_view">
        <Nuxt />
      </div>
    </v-app>
</template>

<script>
import SideMenu from '@/components/admin/SideMenu'
export default {
  name: 'Admin',
  name: 'IndexPage',
  components: {SideMenu},
  data() {
    return {}
  },
  watch: {
    $route: {
        immediate: true,
            handler(to, from) {
                if (!this.$store.state.userModule.login) {
                    return this.$router.push({path: '/admin/login'});
                }
            }
        }
    },
    mounted() {
    }
}
</script>
<style >
.main_sidebar { 
    width: 56px; 
    height: 100%; 
    position: fixed;
    left: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.main_view { 
    height: 100vh;
    overflow-y: auto;
    margin-left: 56px;
}
</style>
