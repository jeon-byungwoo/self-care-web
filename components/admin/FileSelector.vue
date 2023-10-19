<template>
  <div class="d-flex flex-column ">
    <v-file-input
        access="image/*"
        v-model="image"
        id="imageUp"
        hide-spin-buttons 
        hide-input 
        hide-details
        @change="selectImage"
    />
  </div>
</template>

<script>
  /**
   * Example of a custom Image selector
   * Key is to emit a select-file event when a file needs to be added
   */
  import { VImg } from 'vuetify/lib'
  export default {
    name: "FileSelector",
    components: { VImg },
    data() {
      // Some public domain images from wikimedia.
      return {
        table: null,
        image: null,
      };
    },
    methods: {
      async selectImage() {
        console.log("selectImage : ")
        let formData = new FormData()
        formData.append('files', this.image)
        formData.append('table', 'product')

        // await fetch('https://self-care.kr/admin/insertMultipart', 
        //     {
        //         method : 'POST',
        //         // headers: {'Content-Type': 'multipart/form-data'},
        //         body: formData
        //     }
        // ).then(res => {
        //     console.log("res.data : ", res)
        //     if (res.data.length > 0) {
        //         this.$emit('select-file', { src: this.createFileUrl(res.data[0]), alt: this.image.name });      
        //     }
        // }).catch(err => {
        //     console.log("insertMultipart Error ", err)
        // })
        const AXIOS = require('axios')

        await AXIOS.post('https://self-care.kr/admin/insertMultipart', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            console.log(res.data)
            if (res.data.length > 0) {
                this.$emit('select-file', { src: this.profileImageUrl(res.data[0]), alt: this.image.name });      
            }
        }).catch(err => {
            console.log("insertMultipart Error ", err)
        })
      },
      profileImageUrl(url) {
            if(url.includes('http://')) return url
            else return this.hostUrl+url
      },
      createFileUrl(file) {
            let url = URL.createObjectURL(file)
            console.log("url : ", url)
            return this.profileImageUrl(url)
      },
    }
  }
</script>

<style scoped>
  .selectable {
    cursor: pointer;
  }
  .custom-image {
    width: auto; height: 380px; display: flex; overflow:auto;
  }
</style>