<template>
    <div>
        <v-data-iterator
            :items="items"
            :items-per-page="10"
            class="flex-column mh-100 overflow-hidden"
        >
            <template v-slot:header>
                <v-row class="ma-0 pa-2 d-flex align-center justify-end" >
                    <v-toolbar-title>매거진 관리</v-toolbar-title>
                    <v-divider class="mx-5" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn 
                        dense
                        color="#2D7DC8"
                        dark
                        @click="addMagazine"
                        class="ml-4"
                    >
                        매거진 추가
                    </v-btn>
                </v-row>
            </template>
            <template v-slot:default="{items}">
                <v-row class="ma-0 pa-0 overflow-auto justify-space-evenly" id="container">
                    <v-col
                        v-for="(item, index) in items"
                        :key="index"
                        cols="12"
                        sm="2"
                        md="2"
                        class="ma-2 pa-2 align-center justify-center"
                        style="display:grid;"
                        @click="clickRow(item)"
                    > 
                        <v-card class="card ">
                            <v-img 
                                class="fill-height ma-0 pa-0 align-end"
                                aspect-ratio="1/1"
                                :src="item.image != null ? profileImageUrl(item.image[0]) : ''"
                                cover
                            >
                                <template v-slot:default >
                                    <v-chip-group >
                                        <v-chip 
                                            v-for="(obj, index) in item.hashtag"
                                            :key="index"
                                            dense
                                            color="#2D7DC8"
                                            dark
                                            class="mx-1"
                                        >
                                            {{obj}}
                                        </v-chip>
                                    </v-chip-group>
                                </template>
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular
                                        color="grey-lighten-4"
                                        indeterminate
                                        ></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                        </v-card>
                        <h4 class="ma-0 pa-2">{{item.title}}</h4>
                    </v-col>
                </v-row>
            </template>
            
        </v-data-iterator>
        <v-dialog
            v-model="magazinePopup"
            max-width="1400"
            persistent
        >
            <MagazineEdit
                v-if="magazinePopup"
                @click-close="closePopup"
                :obj="selectedMagazine"
            />
        </v-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import MagazineEdit from '@/pages/admin/notice/MagazineEdit'
export default {
    components: {MagazineEdit},
    layout: 'Admin',
    name: 'MagazineManagePage',
    data() {
        return {
            items: [],
            magazinePopup: false,
            selectedMagazine: null,
            rowsPerPageArray: [3, 4, 6],
            rpp: 2,
            cols: 5,
            page: 1,
            busy: false,
            hostUrl: process.env.BASE_URL,
        }
    },
    mounted() {
        this.selectMagazine()
        // this.setListener()
    },
    computed: {
        numberOfPages () {
            return Math.ceil(this.items.length / this.ipp)
        },
        rowsPerPage () {
            return this.rpp
        },
        itemsPerRow () {
            return parseInt(this.cols)
        },
        ipp () {
            // return Math.ceil(this.rowsPerPage * this.itemsPerRow)
            return 10
        },
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage () {
            if (this.page - 1 >= 1) this.page -= 1
        },
        calcRowsPerPage () {
            let container = document.getElementById('container')
            let minItemHeight = 500
            let minItemWidth = 400
            if (container) {
                let containerHeight = parseInt(container.clientHeight, 0)
                let containerWidth = parseInt(container.clientWidth, 0)
                console.log(containerWidth)
                this.rpp = Math.floor(Math.max(containerHeight,minItemHeight)/minItemHeight)
                this.cols = Math.floor(Math.max(containerWidth,minItemWidth)/minItemWidth)
                console.log('cols',this.cols)
            }
            else {
                this.rpp = 3
                this.cols = 4
            }
        },
    },
    methods: {
        setListener() {
            window.addEventListener('resize', () => {
                console.log("resize")
                //debounce
                if (!this.busy) {
                    this.busy = true
                    setTimeout(()=>{
                        this.calcRowsPerPage()
                        this.busy = false
                    }, 300)
                }
            })
        },
        async selectMagazine() {
            let conditions = []
            conditions.push({"q":"=","f":"alive","v":1})
            conditions.push({"q":"magazine","f":"no","o":"DESC"})
            let param = {table:"magazine", conditions: conditions}
            
            await this.$axios.post('/admin/select', param).then(res => {
                console.log(res.data)
                if (res.data.length > 0) {
                    res.data.filter(item => {
                        if (item.image != null && item.image != undefined) item.image = JSON.parse(item.image)
                        if (item.hashtag != null && item.hashtag != undefined && item.hashtag != '') item.hashtag = JSON.parse(item.hashtag)
                        item.cd = moment(item.cd).format('YYYY-MM-DD')
                    })
                    this.items = res.data
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                    // this.items.push(...res.data)
                }
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        clickRow(item) {
            this.selectedMagazine = item
            this.magazinePopup = !this.magazinePopup
        },
        addMagazine() {
            this.magazinePopup = !this.magazinePopup
        },
        closePopup(type) {
            this.selectedMagazine = null
            if (type == 'magazine') {
                this.magazinePopup = !this.magazinePopup
                this.selectMagazine()
            }
        },
        profileImageUrl(url) {
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
    }
}
</script>
<style scopted>
.mh-100 {
    min-height: 100vh;
    max-height: 100vh;
    height: 100vh;
}
.overflow-hidden {
    overflow: hidden;
}
.card {
    height: 300px;
    width: 300px;
    /* height: fit-content;
    width: fit-content; */
}
</style>