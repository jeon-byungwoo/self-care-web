<template>
    <v-navigation-drawer
        class="sidemenu_st"
        v-model="drawer"
        width="260px"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant.sync="miniVariant"
        :right="right"
        :permanent="permanent"
        :src="bg"
        absolute
        dark
    >
        <vuescroll :ops="this.$store.state.vueScrollOpt">
            <v-list dense nav class="py-0">
                <v-list-item two-line :class="miniVariant && 'px-0'">
                    <v-list-item-avatar>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <!-- <v-list-item-title>{{this.$store.state.userModule.userInfo.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{this.$store.state.userModule.userInfo.email}}</v-list-item-subtitle> -->
                        <v-list-item-title>name</v-list-item-title>
                        <v-list-item-subtitle>email</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                <div v-for="(category , i) in categories" :key="i" >
                    <v-subheader v-if="!miniVariant && category.menuDataList.length>0">{{category.name}}</v-subheader>
                    <v-list-item
                        v-for="item in category.menuDataList"
                        :key="item.name"
                        :to="item.path"
                        link
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                </div>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-account-off</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title @click.stop="logout()">로그아웃</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </vuescroll>
    </v-navigation-drawer>
</template>
<script>
import vuescroll from 'vuescroll'
export default {
    components: {
        vuescroll
    },
    data() {
        return {
            drawer: true, 
            categories: [
                { no: 10, name: '회원관리', menuDataList:[]},
                { no: 20, name: '스토어 관리', menuDataList:[]},
                { no: 30, name: '게시물 관리', menuDataList:[]},
                { no: 40, name: '고객센터', menuDataList:[]},
                { no: 50, name: '통계', menuDataList:[]},
            ],
            menuDataList:[
                { no: 1, category: 10, name: '회원 관리', icon: 'mdi-account-multiple', path: "/admin/user" },
                { no: 2, category: 20, name: '상품 정보 관리', icon: 'mdi-account-cash', path:"/admin/productManage" },
                { no: 3, category: 20, name: '주문 정보 관리', icon: 'mdi-account-cash', path:"/admin/orderManage" },
                { no: 4, category: 20, name: '고객 후기 관리', icon: 'mdi-account-cash', path:"/admin/reviewManage" },
                { no: 5, category: 30, name: '매거진 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 6, category: 30, name: '이벤트 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 7, category: 30, name: '공지사항 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 8, category: 30, name: '자가진단 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 9, category: 30, name: '건강분석 해석 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 10, category: 40, name: '이용약관 관리', icon: 'mdi-alpha-c-circle-outline', path: "/admin/policy" },
                { no: 11, category: 40, name: '개인정보 처리방침 관리', icon: 'mdi-alpha-c-circle-outline', path: "/admin/policy" },
                { no: 12, category: 40, name: '자주묻는 질문 관리', icon: 'mdi-alpha-c-circle-outline', path: "/admin/curations" },
                { no: 13, category: 40, name: '1:1문의 관리', icon: 'mdi-alpha-c-circle-outline', path: "/admin/curations" },
                { no: 14, category: 50, name: '회원통계', icon: 'mdi-alpha-c-circle-outline', path: "/admin/curations" },
                { no: 15, category: 50, name: '판매통계', icon: 'mdi-alpha-c-circle-outline', path: "/admin/curations" },
            ],
            color: this.$vuetify.theme.themes.light.basicColor,
            colors: [
                'primary',
                'blue',
                'success',
                'red',
                'teal',
            ],
            right: false,
            permanent: true,
            miniVariant: true,
            expandOnHover: true,
            background: false,
            dialog: false,
            userMenu: []
        }
    },
    computed: {
        bg () {
            return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
        },
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.menuDataList = []

            this.menuDataList = [
                { no: 1, category: 10, name: '회원 관리', icon: 'mdi-account-multiple', path: "/admin/user" },
                { no: 2, category: 20, name: '상품 정보 관리', icon: 'mdi-account-cash', path:"/admin/productManage" },
                { no: 3, category: 20, name: '주문 정보 관리', icon: 'mdi-account-cash', path:"/admin/orderManage" },
                { no: 4, category: 20, name: '고객 후기 관리', icon: 'mdi-account-cash', path:"/admin/reviewManage" },
                { no: 5, category: 30, name: '매거진 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 6, category: 30, name: '이벤트 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 7, category: 30, name: '공지사항 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 8, category: 30, name: '자가진단 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 9, category: 30, name: '건강분석 해석 관리', icon: 'mdi-alpha-c-circle', path: "/admin/contents" },
                { no: 10, category: 40, name: '이용약관 관리', icon: 'mdi-alpha-c-circle-outline', path: "/admin/policy" },
                { no: 11, category: 40, name: '개인정보 처리방침 관리', icon: 'mdi-alpha-c-circle-outline', path: "/admin/policy" },
                { no: 12, category: 40, name: '자주묻는 질문 관리', icon: 'mdi-alpha-c-circle-outline', path: "/admin/curations" },
                { no: 13, category: 40, name: '1:1문의 관리', icon: 'mdi-alpha-c-circle-outline', path: "/admin/curations" },
                { no: 14, category: 50, name: '회원통계', icon: 'mdi-alpha-c-circle-outline', path: "/admin/curations" },
                { no: 15, category: 50, name: '판매통계', icon: 'mdi-alpha-c-circle-outline', path: "/admin/curations" },
            ]
            this.menuDataList.forEach((item)=>{
                if(item.category==10){ this.categories[0].menuDataList.push(item) }
                else if(item.category==20){ this.categories[1].menuDataList.push(item) }
                else if(item.category==30){ this.categories[2].menuDataList.push(item) }
                else if(item.category==40){ this.categories[3].menuDataList.push(item) }
                else if(item.category==50){ this.categories[4].menuDataList.push(item) }
                else { this.categories[5].menuDataList.push(item) }
            })
        },
        async logout() {
            /// 로그아웃 기능 적용
            this.$store.dispatch('userModule/logout')
        }
    }
}
</script>
<style lang="scss" scoped>
.sidemenu_st { z-index: 20; }
</style>