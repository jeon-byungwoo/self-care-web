<template>
    <v-container class="ma-auto pa-0" >
        <v-row class="ma-0 pa-0 justify-end">
            <v-btn x-large icon dark @click="$emit('close-detail')">
                <v-icon x-large dark>mdi-close</v-icon>
            </v-btn>
        </v-row>
        <v-row class="ma-0 pa-0 align-center justify-center">
            <v-btn x-large icon dark @click="prev" class="ma-auto">
                <v-icon x-large dark>mdi-chevron-left</v-icon>
            </v-btn>
            <v-col cols="12" sm="11" md="11" >
                <v-img 
                    v-if="items.length > 0"
                    :src="profileImageUrl(items[currentIndex])"
                    contain
                    max-height="74vh"
                >
                </v-img>
            </v-col>
            <v-btn x-large icon dark @click="next" class="ma-auto">
                <v-icon x-large dark>mdi-chevron-right</v-icon>
            </v-btn>
        </v-row>
    </v-container>
</template>
<script>

export default {
    components: {},
    props:['items', 'currentIndex'],
	data() {
        return {
            hostUrl: process.env.BASE_URL,
        }
    },
    mounted() {
        
    },
    methods: {
        profileImageUrl(url) {
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
        prev() {
            if (this.currentIndex > 0) 
                this.currentIndex -= 1
            else this.currentIndex = 0
        }, 
        next() {
            if (this.currentIndex < this.items.length - 1) this.currentIndex += 1 
            else this.currentIndex = this.items.length - 1
        }
    }
}
</script>