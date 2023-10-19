<template>
    <v-app >
      <div >
        <SideMenu />
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
}
</script>
<style >
.main_sidebar { width: 56px; height: 100vh; }
.main_view { 
    margin-left: 56px;
}
</style>
