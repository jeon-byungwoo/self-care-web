<template>
  <div>
    <Header @update="onChildUpdate"> </Header>
    <div v-if="item!=null" class="do-check-wrap">
        <div class="title-wrap">
            <div class="title-text">{{item.title}}</div>
            <div class="title-image" :style="{'background-image': 'url('+hostUrl+JSON.parse(item.image)[0]+')'}"></div>
        </div>
        <div class="content-wrap" v-html="item.content">
            
        </div>
        <div class="survey-wrap">
            <div class="survey-list-item" v-for="(i, index) in survey" :key="index">
                <div class="survey-item-row">
                    <div class="survey-item-title">{{i.content}}</div>
                    <div v-if="i.selection1.text" class="survey-item-selection" @click="onSelect(i,1)" :style=" 'background-color: ' + (i.selection1.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection1.selected == 1 ? '#fff' : '#333')">
                        <div class="survey-item-text">{{i.selection1.text}}</div>
                        <div class="survey-item-value">{{i.selection1.value}}</div>
                    </div>
                    <div v-if="i.selection2.text" class="survey-item-selection" @click="onSelect(i,2)" :style=" 'background-color: ' + (i.selection2.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection2.selected == 1 ? '#fff' : '#333')">
                        <div class="survey-item-text">{{i.selection2.text}}</div>
                        <div class="survey-item-value">{{i.selection2.value}}</div>
                    </div>
                    <div v-if="i.selection3.text" class="survey-item-selection" @click="onSelect(i,3)" :style=" 'background-color: ' + (i.selection3.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection3.selected == 1 ? '#fff' : '#333')">
                        <div class="survey-item-text">{{i.selection3.text}}</div>
                        <div class="survey-item-value">{{i.selection3.value}}</div>
                    </div>
                    <div v-if="i.selection4.text" class="survey-item-selection" @click="onSelect(i,4)" :style=" 'background-color: ' + (i.selection4.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection4.selected == 1 ? '#fff' : '#333')">
                        <div class="survey-item-text">{{i.selection4.text}}</div>
                        <div class="survey-item-value">{{i.selection4.value}}</div>
                    </div>
                    <div v-if="i.selection5.text" class="survey-item-selection" @click="onSelect(i,5)" :style=" 'background-color: ' + (i.selection5.selected == 1 ? '#9AD144;' : '#fff;') + 'color: ' + (i.selection5.selected == 1 ? '#fff' : '#333')">
                        <div class="survey-item-text">{{i.selection5.text}}</div>
                        <div class="survey-item-value">{{i.selection5.value}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="summary">
            합산 점수는 {{score}}점 입니다.
        </div>
        <div class="survey-comment-wrap" v-html="item.survey_comment">

        </div>

        <div v-if="saveFlag" class="btn-save" @click="btnSave()">검사 결과 저장</div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
export default {
  data() {
    return {
        itemList:null,
        item:null,
        hostUrl:process.env.BASE_URL,
        score:0,
        survey:[],
        saveFlag:false,
    }
  },
  components: {
    Header,
  },
  mounted() {
    this.selectItem()
    this.hostUrl = process.env.BASE_URL
    if(localStorage.getItem('userInfo')!=null){
        this.saveFlag = true
    }
  },
  methods: {
    btnSave(){
        console.log(this.survey)
        console.log(this.score)
        this.insertTestResult()
        alert('검사 결과가 저장되었습니다. 저장 된 내용은 마미페이지에서 확인 가능합니다.')
    },
    async insertTestResult(){
        let formBody = {
            table: 'test_result',
            u_no:JSON.parse(localStorage.getItem('userInfo')).no,
            t_no:this.$route.query.no,
            t_title:this.item.title,
            result:JSON.stringify(this.survey),
            score:this.score
        }
      try {
        await this.$axios
          .post('/api/insert', formBody)
          .then((res) => {
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
    onSelect(_question,qNo){
        this.score=0
        for(let question of this.survey){
            if(question.no==_question.no){
                question.selection1.selected = 0
                question.selection2.selected = 0
                question.selection3.selected = 0
                question.selection4.selected = 0
                question.selection5.selected = 0
                if(qNo==1){question.selection1.selected = 1
                question.score = _question.selection1.value}
                else if(qNo==2){question.selection2.selected = 1
                question.score = _question.selection2.value}
                else if(qNo==3){question.selection3.selected = 1
                question.score = _question.selection3.value}
                else if(qNo==4){question.selection4.selected = 1
                question.score = _question.selection4.value}
                else if(qNo==5){question.selection5.selected = 1
                question.score = _question.selection5.value} 
            }
            this.score = Number(this.score)+Number(question.score)
        }
        this.$forceUpdate()
    },
    onChildUpdate(newValue) {
      this.navigationStatus = newValue
    },
    async selectItem(){
        let no = this.$route.query.no
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
                this.itemList = res.data
                this.item = this.itemList[0]
                this.survey = JSON.parse(this.item.survey)
                this.socre = 0
                for(let question of this.survey){
                    question['score']=0
                    question.selection1['selected']=0
                    question.selection2['selected']=0
                    question.selection3['selected']=0
                    question.selection4['selected']=0
                    question.selection5['selected']=0
                }
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
<style lang="scss">
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
    max-width: 1200px;
    margin: auto;
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
            flex: 1;
            background-position: center;
            background-size: cover;
            display: flex;
            width: 100%;
            height: auto;
            min-height: 200px;
            max-height: 500px;
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
</style>