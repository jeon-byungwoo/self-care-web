<template>
  <div>
    <Header> </Header>
    <div class="main-content-wrap">
        <div class="main-title-wrap">SlefCare Magazine</div>
            <div class="magazine-wrap">
                <div class="title-area" v-if="magazine.image!=null" >
                    <div class="item-tag-group"
                    :style="`backgroundImage:url('${hostUrl+magazine.image[0]}')`"
                    
                    >
                    <div class="abs-position">
                        <div
                            v-for="(h, index1) in JSON.parse(magazine.hashtag)"
                            :key="index1"
                            class="item-tag"
                        >
                            <div class="item-tag-text">{{ h }}</div>
                        </div>
                    </div>

                    
                    </div>
                    <div class="title-wrap">{{magazine.title}}</div>
                </div>
                <div class="content-wrap" v-html="magazine.content"></div>
            </div>
            <div class="btn-list" @click="onClickList()">목록으로</div>
        </div>
    </div>

</template>

<script>
import Header from '../../components/header.vue'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
  },
  data() {
    return {
        hostUrl: process.env.BASE_URL,
        magazine:[],


    }
  },
  mounted() {
    this.hostUrl = process.env.BASE_URL
    this.selectItem()
  },
  methods: {
    onClickList(){
        this.$router.push({name: 'magazine'})
    },
    async selectItem(){

      let no = this.$route.query.no
      let conditions = [{ q: '=', f: 'no', v: no }]
      let formBody = {
        table: 'magazine',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.magazine = res.data[0]
                this.magazine.image = JSON.parse(this.magazine.image)
                
                console.log(this.magazine.image[0])
            }

          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    }
  }

}
</script>

<style scoped>
.main-content-wrap{
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    align-items: center;
    justify-content: center;
    margin: auto;
}
.main-title-wrap{
    display: flex;
    align-items: center;
    justify-content: left;
    height: 100px;
    color: #333;
    font-size: 36px;
    font-family: 'score6';
}
.abs-position{
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 10px;
    display: flex;
}
.content-wrap{
    padding-top: 20px;
}
.hashtag-wrap{
    width: 100%;
    height: 100%;
}
.title-wrap{
    color: #333;
    font-size: 26px;
}
.btn-list{
    margin-top:50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    border: solid 1px;
    height: 50px;
}
.item-tag-group {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 400px;
    background-position: center;
    background-size: contain;
    justify-content: center;
    align-items: flex-end;
}
.item-tag {
    background: #333;
    padding: 9px 12px 7px 12px;
    border-width: 1px;
    border-style: solid;
    border-color: #e5e5e5;
    border-radius: 20px;
    text-align: center;
    margin-right: 12px;
    margin-top: 10px;
}
.item-tag-text {
    font-size: 12px;
    font-family: 'score2';
    color: #e5e5e5;
}
</style>
