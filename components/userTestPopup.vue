<template>
    <v-app class="background">
        <div class="window">
            <v-card class="do-check-wrap">
                <v-app-bar flat >
                    <v-card-title class="ma-0 pa-0">{{item?.t_title}}</v-card-title>
                </v-app-bar>
                <div class="user_history_main_container">
                    <v-img class="title-image" contain max-height="300"
                    :src="hostUrl+test?.image"></v-img>
                    <div class="content-wrap" v-html="test?.content">
                
                    </div>
                    <div class="survey-wrap">
                        <div class="survey-list-item" v-for="(i, index) in survey" :key="index">
                            <div class="survey-item-row">
                                <div class="survey-item-title">{{i.content}}</div>
                                <div v-if="i.selection1.text" class="survey-item-selection" :style=" 'background-color: ' + (i.selection1.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection1.selected == 1 ? '#fff' : '#333')">
                                    <div class="survey-item-text">{{i.selection1.text}}</div>
                                    <div class="survey-item-value">{{i.selection1.value}}</div>
                                </div>
                                <div v-if="i.selection2.text" class="survey-item-selection" :style=" 'background-color: ' + (i.selection2.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection2.selected == 1 ? '#fff' : '#333')">
                                    <div class="survey-item-text">{{i.selection2.text}}</div>
                                    <div class="survey-item-value">{{i.selection2.value}}</div>
                                </div>
                                <div v-if="i.selection3.text" class="survey-item-selection" :style=" 'background-color: ' + (i.selection3.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection3.selected == 1 ? '#fff' : '#333')">
                                    <div class="survey-item-text">{{i.selection3.text}}</div>
                                    <div class="survey-item-value">{{i.selection3.value}}</div>
                                </div>
                                <div v-if="i.selection4.text" class="survey-item-selection" :style=" 'background-color: ' + (i.selection4.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection4.selected == 1 ? '#fff' : '#333')">
                                    <div class="survey-item-text">{{i.selection4.text}}</div>
                                    <div class="survey-item-value">{{i.selection4.value}}</div>
                                </div>
                                <div v-if="i.selection5.text" class="survey-item-selection" :style=" 'background-color: ' + (i.selection5.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection5.selected == 1 ? '#fff' : '#333')">
                                    <div class="survey-item-text">{{i.selection5.text}}</div>
                                    <div class="survey-item-value">{{i.selection5.value}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="summary">
                        합산 점수는 {{score}}점 입니다.
                    </div>
                    <div class="survey-comment-wrap" v-html="test?.survey_comment">

                    </div>
                </div>
                
                <v-footer class="">
                    <v-btn class="ml-auto" color="success" @click="clickCancel">확인</v-btn>
                </v-footer>
                <!-- <div v-if="saveFlag" class="btn-save" @click="btnSave()">검사 결과 저장</div> -->
            </v-card>
        </div>
    </v-app>
</template>

<script>
export default {
  data() {
    return {
        itemList:null,
        item:null,
        hostUrl:process.env.BASE_URL,
        score:0,
        survey:[],
        saveFlag:false,
        test:[],
    }
  },
  props:[
    'popup','obj'
  ],

  mounted() {
    this.hostUrl = process.env.BASE_URL
    if(this.obj){
        this.selectItem()
        
        if(localStorage.getItem('userInfo')!=null){
            this.saveFlag = true
        }
    }
    
  },
  methods: {
    async selectItem(){
        console.log('obj',this.obj)
        this.survey = JSON.parse(this.obj?.result)
        this.item = this.obj
        console.log(this.survey)
        this.score = this.obj?.score??0
        this.selectTest(this.item.t_no)

    },
    clickCancel() {
        this.popup = false
        this.$emit('click-close', 'test')
    },
    async selectTest(no){
        let conditions = [{ q: '=', f: 'no', v: no }]
        let formBody = {
        table: 'test',
        conditions: conditions,
        }
        try {
            await this.$axios
            .post('/api/select', formBody)
            .then((res) => {
                console.log('조회된 데이터:: ', (res.data))
                if (res.data.length > 0) {
                    this.test = res.data[0]
                    
                    this.test.image = JSON.parse(this.test.image)[0] ?? ""
                    console.log(this.test?.image)
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
<style scoped lang="scss">
.user_history_main_container {
    overflow-y: auto;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
.window {
  position: relative;
  width: 100%;
  height: 100%;
}
.card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
}
.btn-save{
    width: 130px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    font-family: "score6";
    background-color: #9ad144;
    cursor: pointer;
    float: right;
    margin-bottom: 40px;
}
.do-check-wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    .title-wrap{
        display: flex;
        padding: 30px 10px 30px 10px;
        .title-text{
            display: flex;
            flex: 2;
            font-size: 30px;
            justify-content: center;
            align-content: center;
            margin: auto;
        }
        .title-image{
            display: flex;
            width: 100%;
            height: auto;
            min-height: 200px;
            max-height: 300px;
        }
    }
    .content-wrap{
        padding: 10px;
    }
    .survey-wrap{
        display: flex;
        width:100%;
        padding: 10px;
        flex-direction: column;
        .survey-list-item{
            display: flex;
            width:100%;
            border: solid;
            border-width: 2px;
		    border-color: #9AD143;
            border-radius: 10px;
            padding: 5px;
            margin: 2px;
            .survey-item-row{
                display: flex;
                width:100%;
                .survey-item-title{
                    align-items: center;
                    display: flex;
                    flex: 3;
                }
                .survey-item-selection{
                    display: flex;
                    flex: 1;
                    border: solid;
                    border-width: 2px;
                    background: #33CD43;
                    border-color: #33CD43;
                    color:#FFFFFF;
                    border-radius: 10px;
                    padding: 2px;
                    margin: 2px;
                    .survey-item-text{
                        display: flex;
                        flex: 2;
                        justify-content: center;
                        align-content: center;
                    }
                    .survey-item-value{
                        display: flex;
                        flex: 1;
                        justify-content: center;
                        align-content: center;
                    }
                }
            }
        }
    }
    .summary{
        margin: 15px;
        font-size: 20px;
    }
    .survey-comment-wrap{
        margin: 10px;
    }
}
@media (max-width: 720px) {
.user_history_main_container {
    overflow-y: auto;
    max-height: 86vh !important;
    margin-top: 0px;
    max-width: none;
}
}
</style>