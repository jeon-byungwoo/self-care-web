<template>
  <div>
    <Header @update="onChildUpdate"></Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="title-area">
          <div class="bold-text">
            {{ name }}
            <span class="regular-text">님의</span>
            <div class="regular-text">라이프 스타일 결과 입니다.</div>
          </div>
        </div>
        <div class="first-box-group">
          <div class="black-line"></div>
          <div class="box-area">
            <div class="left-area">
              <div class="title">이름</div>
              <div class="object">{{name}}</div>
            </div>
            <div class="right-area">
              <div class="title">나이</div>
              <div class="object">{{age}}</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="box-area">
            <div class="left-area">
              <div class="title">BMI</div>
              <div class="bmi-text-object">
                {{bmi}}
                <div class="bmi-text">
                  BMI = {체중 (kg)} / {키(m)제곱}
                </div>
              </div>
            </div>
            <div class="right-area">
              <div class="title">성별</div>
              <div class="object">{{gender==1?'남성':'여성'}}</div>
            </div>
          </div>
          <div class="line"></div>
        </div>

        <div class="second-box-group">
          <div class="black-line"></div>
          <div class="one-group">
            <div
              class="one-list-item"
              v-for="(item, index) in itemList"
              :key="index"
            >
              <div class="title-area">{{ item.text }}</div>
              <div class="score-area">
                <div
                  :class="
                    item.score == 0
                      ? 'score-good'
                      : item.score == 1
                      ? 'score-basic'
                      : item.score == 2
                      ? 'score-bad'
                      : 'score-worst'
                  "
                >
                  {{
                    item.score == 0
                      ? '양호'
                      : item.score == 1
                      ? '보통'
                      : item.score == 2
                      ? '경계'
                      : '불량'
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="third-box-group" >
          <div class="one-row"  v-for="(item, index) in itemList" :key="index">
            <div class="left-icon-text-area">
                <img class="icon" :src="require(`@/assets/image/${item.image}`)" draggable="false"/>
                <div class="text">{{item.text}}</div>
            </div>
            <div class="middle-right-group">
                <div class="middle-score-area">
                <div :class="item.score == 0? 'score-good': item.score == 1? 'score-basic': item.score == 2? 'score-bad': 'score-worst'"> 
                    {{item.score == 0? '양호': item.score == 1? '보통': item.score == 2? '경계': '불량'}}
                </div>
                </div>
                <div class="right-info-area">
                <div v-if="surveyComment.length>0" class="info" v-html="item.comment">
                </div>
                </div>
            </div>
          </div>
        </div>

        <div class="recommend-group">
          <div class="title-area">
            <div class="bold-text">
              {{ name }}<span class="regular-text">님의 AI추천&nbsp;</span>
              <div class="regular-text">영양성분 결과</div>
            </div>
          </div>
          <div class="share-area" @click="onClickShare()">
            <img
              class="share-icon"
              src="@/assets/image/ic_share.png"
              draggable="false"
              
            />
            <div class="share-text">공유</div>
          </div>
        </div>
        <div class="product-area">
          <div class="product-item-area">
            <div class="product-img-area">
              <img
                class="product-img"
                src="@/assets/image/img_medicine_test.png"
                draggable="false"
              />
            </div>
            <div class="product-name">프로바이오틱스</div>
          </div>
          <div class="product-item-area">
            <div class="product-img-area">
              <img
                class="product-img"
                src="@/assets/image/img_medicine_test.png"
                draggable="false"
              />
            </div>
            <div class="product-name">프로바이오틱스</div>
          </div>
          <div class="product-item-area">
            <div class="product-img-area">
              <img
                class="product-img"
                src="@/assets/image/img_medicine_test.png"
                draggable="false"
              />
            </div>
            <div class="product-name">프로바이오틱스</div>
          </div>
          <div class="cart-btn">장바구니에 담기</div>
        </div>

        <div class="consulting-group">
          <div class="left-area">
            <div class="title-area">
              <div class="regular-text">
                {{
                  employeeStatus == true
                    ? '자세한 결과 분석은'
                    : '자세한 결과 분석을 원한다면'
                }}
              </div>
              <div class="bold-regular-area">
                <div class="bold-text">
                  {{
                    employeeStatus == true
                      ? '담당자를 통해 상담'
                      : '셀프케어에 상담'
                  }}
                </div>
                <div class="regular-text">&nbsp;해보세요.</div>
              </div>
            </div>
            <div :class="employeeStatus == true ? 'employee-area' : 'rep-area'">
              <img
                v-if="employeeStatus == true"
                src="@/assets/image/ic_employee.png"
                class="employee-img"
                draggable="false"
              />
              <img
                v-if="employeeStatus == false"
                src="@/assets/image/ic_logo_row.png"
                class="employee-img"
                draggable="false"
              />
              <div class="employee-name-area">
                <div v-if="employeeStatus == true" class="employee-name-bold">
                  담당자 이름
                </div>
                <div class="employee-name-regular">
                  &nbsp;{{ employeeStatus == true ? managerInfo.name : '대표번호' }}
                </div>
              </div>
              <div class="employee-phone-num">{{managerInfo.phone}}</div>
            </div>
            <div
              :class="
                employeeStatus == true ? 'employee-btn-group' : 'rep-btn-group'
              "
            >
              <div class="call-btn-area">
                <img
                  class="call-icon"
                  src="@/assets/image/ic_phone.png"
                  draggable="false"
                />
                <div class="call-text">전화하기</div>
              </div>
              <div v-if="employeeStatus == true && managerInfo.is_inqten==1" class="move-btn" @click="onClickViral()">
                인큐텐 바로가기
              </div>
            </div>
          </div>
          <div class="phone-img-area">
            <img
              src="@/assets/image/img_consulting_phone.png"
              class="phone-img"
              draggable="false"
            />
          </div>
        </div>
      </div>
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
      score: 2,
      employeeStatus: true,
      navigationStatus: false,
      itemList: [
        { text: '면역', image:'rs_1.png', cnt:0, score: 0 },
        { text: '순환', image:'rs_2.png', cnt:0, score: 1 },
        { text: '소화', image:'rs_3.png', cnt:0, score: 3 },
        { text: '장관', image:'rs_4.png', cnt:0, score: 2 },
        { text: '뇌신경', image:'rs_5.png', cnt:0, score: 1 },
        { text: '호르몬', image:'rs_6.png', cnt:0, score: 0 },
        { text: '호흡', image:'rs_7.png', cnt:0, score: 2 },
        { text: '비뇨', image:'rs_8.png', cnt:0, score: 3 },
        { text: '골격', image:'rs_9.png', cnt:0, score: 1 },
        { text: '피부,모발', image:'rs_10.png', cnt:0, score: 1 },
      ],
      name:'',
      bmi:'',
      age:'',
      gender:0,
      tall:1,
      weight:1,
      birth:1990,
      age:0,
      result:[],
      surveyComment:[],
      managerInfo:[],



    }
  },
  mounted() {
    this.selectSurveyComment()
    
  },
  methods: {
    onClickShare(){
        console.log('oncli')
        const shareObject = {
            title: this.name+'님의 검사 결과',
            text: 'self-care',
            url: window.location.href,
        };
        if (navigator.share) { // Navigator를 지원하는 경우만 실행
            navigator
            .share(shareObject)
            .then(() => {
                // 정상 동작할 경우 실행
            })
            .catch((error) => {
                alert('에러가 발생했습니다.')
            })
        } else { // navigator를 지원하지 않는 경우
            alert('페이지 공유를 지원하지 않습니다.')
        }
    },
    onChildUpdate(newValue) {
      this.navigationStatus = newValue
    },
    onClickViral(){
        window.location.href = this.managerInfo.viral_url
    },
    onClickPhone(){
        window.location.href = 'tel:'+this.managerInfo.phone
    },
    async selectCounselerInfo(){
        let conditions = [{ q: '=', f: 'is_manager', v: 1 }]
        let formBody = {
        table: 'user',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.managerInfo = res.data[0]
            } 
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
    async selectSurveyComment(){
        let conditions = [{ q: '=', f: '1', v: 1 }]
        let formBody = {
        table: 'survey_comment',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                this.surveyComment = res.data
                this.selectItem()
            } 
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
    async selectItem(){
        let no = this.$route.query.no
        let conditions = [{ q: '=', f: 'no', v: no}]
        let formBody = {
        table: 'survey_result',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            console.log('조회된 데이터:: ', (res.data))
            if (res.data.length > 0) {
                let item = res.data[0]
                if(item.u_no == JSON.parse(localStorage.getItem('userInfo')).no){
                    
                    this.birth = item.birth
                    this.result = item.result
                    this.u_no = item.u_no
                    this.tall = item.tall
                    this.weight = item.weight
                    this.gender = item.gender
                    this.name = JSON.parse(localStorage.getItem('userInfo')).name
                    this.bmi = (this.weight / ((this.tall/100.0)*(this.tall/100.0)))
                    this.bmi = this.bmi.toFixed(2)
                    const today = new Date();
                    const birthDate = new Date(this.birth, 7, 10); // 2000년 8월 10일

                    this.age = today.getFullYear()
                            - birthDate.getFullYear()
                            + 1;
                    this.result = item.result

                    //면역012 / 34 / 567 / 8
                    for(let i=0;i<this.result.length;i++){
                        if( this.result[i]==1 ){
                            if(i==0) this.itemList[0].cnt++, this.itemList[1].cnt++, this.itemList[2].cnt++, this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==1) this.itemList[0].cnt++, this.itemList[9].cnt++
                            if(i==2) this.itemList[2].cnt++, this.itemList[3].cnt++, this.itemList[6].cnt++, this.itemList[7].cnt++
                            if(i==3) this.itemList[0].cnt++, this.itemList[2].cnt++
                            if(i==4) this.itemList[1].cnt++, this.itemList[3].cnt++, this.itemList[6].cnt++
                            if(i==5) this.itemList[3].cnt++, this.itemList[5].cnt++, this.itemList[7].cnt++
                            if(i==6) this.itemList[0].cnt++, this.itemList[3].cnt++
                            if(i==7) this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==8) this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==9) this.itemList[0].cnt++, this.itemList[2].cnt++, this.itemList[6].cnt++, this.itemList[9].cnt++

                            if(i==10) this.itemList[1].cnt++, this.itemList[4].cnt++, this.itemList[7].cnt++, this.itemList[9].cnt++
                            if(i==11) this.itemList[1].cnt++, this.itemList[4].cnt++, this.itemList[6].cnt++, this.itemList[9].cnt++
                            if(i==12) this.itemList[1].cnt++, this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==13) this.itemList[0].cnt++, this.itemList[2].cnt++
                            if(i==14) this.itemList[0].cnt++, this.itemList[2].cnt++
                            if(i==15) this.itemList[0].cnt++, this.itemList[1].cnt++, this.itemList[4].cnt++, this.itemList[5].cnt++, this.itemList[9].cnt++
                            if(i==16) this.itemList[2].cnt++, this.itemList[3].cnt++, this.itemList[5].cnt++, this.itemList[7].cnt++, this.itemList[8].cnt++, this.itemList[9].cnt++
                            if(i==17) this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==18) this.itemList[3].cnt++, this.itemList[6].cnt++
                            if(i==19) this.itemList[3].cnt++, this.itemList[4].cnt++

                            if(i==20) this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==21) this.itemList[4].cnt++, this.itemList[5].cnt++, this.itemList[8].cnt++
                            if(i==22) this.itemList[7].cnt++
                            if(i==23) this.itemList[1].cnt++, this.itemList[4].cnt++, this.itemList[5].cnt++, this.itemList[8].cnt++
                            if(i==24) this.itemList[0].cnt++, this.itemList[1].cnt++, this.itemList[8].cnt++
                            if(i==25) this.itemList[0].cnt++, this.itemList[4].cnt++, this.itemList[5].cnt++, this.itemList[8].cnt++
                            if(i==26) this.itemList[1].cnt++, this.itemList[6].cnt++, this.itemList[8].cnt++
                            if(i==27) this.itemList[2].cnt++, this.itemList[3].cnt++, this.itemList[5].cnt++, this.itemList[9].cnt++
                            if(i==28) this.itemList[1].cnt++, this.itemList[3].cnt++, this.itemList[5].cnt++
                            if(i==29) this.itemList[2].cnt++, this.itemList[3].cnt++, this.itemList[4].cnt++, this.itemList[9].cnt++
                            
                            if(i==30) this.itemList[2].cnt++, this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==31) this.itemList[5].cnt++
                            if(i==32) this.itemList[2].cnt++, this.itemList[8].cnt++
                            if(i==33) this.itemList[2].cnt++, this.itemList[7].cnt++
                            if(i==34) this.itemList[1].cnt++, this.itemList[2].cnt++, this.itemList[3].cnt++
                            if(i==35) this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==36) this.itemList[1].cnt++, this.itemList[3].cnt++
                            if(i==37) this.itemList[4].cnt++, this.itemList[8].cnt++
                            if(i==38) this.itemList[0].cnt++, this.itemList[6].cnt++, this.itemList[9].cnt++
                            if(i==39) this.itemList[4].cnt++, this.itemList[5].cnt++, this.itemList[8].cnt++

                            if(i==40) this.itemList[0].cnt++, this.itemList[4].cnt++, this.itemList[8].cnt++
                            if(i==41) this.itemList[0].cnt++, this.itemList[2].cnt++, this.itemList[3].cnt++
                            if(i==42) this.itemList[0].cnt++, this.itemList[2].cnt++, this.itemList[3].cnt++
                            if(i==43) this.itemList[2].cnt++, this.itemList[7].cnt++, this.itemList[8].cnt++
                            if(i==44) this.itemList[2].cnt++, this.itemList[4].cnt++
                            if(i==45) this.itemList[3].cnt++, this.itemList[4].cnt++, this.itemList[5].cnt++
                            if(i==46) this.itemList[3].cnt++, this.itemList[4].cnt++, this.itemList[5].cnt++, this.itemList[8].cnt++
                            if(i==47) this.itemList[3].cnt++, this.itemList[6].cnt++
                            if(i==48) this.itemList[9].cnt++
                            if(i==49) this.itemList[9].cnt++
                        }
                        
                    }


                    for(let i=0;i<this.itemList.length;i++){
                        if(i==0) {//면역

                        console.log(this.surveyComment[0])
                        console.log(this.surveyComment[0].content)

                            if(this.itemList[i].cnt<=2) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[0].content
                            else if(this.itemList[i].cnt<=4) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[1].content
                            else if(this.itemList[i].cnt<=7) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[2].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[3].content
                        }
                        if(i==1) {//순환
                            if(this.itemList[i].cnt<=2) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[4].content
                            else if(this.itemList[i].cnt<=3) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[5].content
                            else if(this.itemList[i].cnt<=7) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[6].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[7].content
                        }
                        if(i==2) {//소화
                            if(this.itemList[i].cnt<=2) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[8].content
                            else if(this.itemList[i].cnt<=4) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[9].content
                            else if(this.itemList[i].cnt<=9) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[10].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[11].content
                        }
                        if(i==3) {//장관
                            if(this.itemList[i].cnt<=2) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[12].content
                            else if(this.itemList[i].cnt<=4) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[13].content
                            else if(this.itemList[i].cnt<=9) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[14].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[15].content
                        }
                        if(i==4) {//뇌신경
                            if(this.itemList[i].cnt<=2) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[16].content
                            else if(this.itemList[i].cnt<=5) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[17].content
                            else if(this.itemList[i].cnt<=10) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[18].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[19].content
                        }
                        if(i==5) {//호르몬
                            if(this.itemList[i].cnt<=2) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[20].content
                            else if(this.itemList[i].cnt<=3) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[21].content
                            else if(this.itemList[i].cnt<=10) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[22].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[23].content
                        }
                        if(i==6) {//호흡
                            if(this.itemList[i].cnt<=0) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[24].content
                            else if(this.itemList[i].cnt<=1) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[25].content
                            else if(this.itemList[i].cnt<=4) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[26].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[27].content
                        }
                        if(i==7) {//비뇨
                            if(this.itemList[i].cnt<=0) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[28].content
                            else if(this.itemList[i].cnt<=1) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[29].content
                            else if(this.itemList[i].cnt<=4) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[30].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[31].content
                        }
                        if(i==8) {//골격
                            if(this.itemList[i].cnt<=1) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[32].content
                            else if(this.itemList[i].cnt<=3) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[33].content
                            else if(this.itemList[i].cnt<=7) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[34].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[35].content
                        }
                        if(i==9) {//피부모발
                            if(this.itemList[i].cnt<=1) this.itemList[i].score=0, this.itemList[i]['comment'] = this.surveyComment[36].content
                            else if(this.itemList[i].cnt<=3) this.itemList[i].score=1, this.itemList[i]['comment'] = this.surveyComment[37].content
                            else if(this.itemList[i].cnt<=6) this.itemList[i].score=2, this.itemList[i]['comment'] = this.surveyComment[38].content
                            else this.itemList[i].score=3, this.itemList[i]['comment'] = this.surveyComment[39].content
                        }

                    }

                    //추천 상품 목록 만들기
                    //불량>경계>보통인 상품 순으로 항목 상품을 담기
                    //모든 파트가 양호인 경우 추천 상품을 하드코딩
                    //상품 파트 제작 완료 시 이 부분 개선 필요


                    //상담사 정보 가져오기
                    this.selectCounselerInfo()


                }else{
                    alert('잘못된 접근입니다.')
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
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  margin-top: 40px;
  .body {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 50px 0px;
    .title-area {
      display: flex;
    }
    .bold-text {
      color: #333333;
      font-size: 30px;
      font-family: 'score6';
      display: flex;
    }
    .regular-text {
      color: #333333;
      font-size: 30px;
      font-family: 'score2';
    }
    .black-line {
      width: 100%;
      height: 2px;
      background-color: #000;
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #ddd;
    }
    .score-good {
      width: 89px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: 'score5';
      color: #9ad144;
      border: 1px solid #9ad144;
      background-color: #fff;
    }
    .score-basic {
      width: 89px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: 'score5';
      color: #6289f2;
      border: 1px solid #6289f2;
      background-color: #fff;
    }
    .score-bad {
      width: 89px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: 'score5';
      color: #f39818;
      border: 1px solid #f39818;
      background-color: #fff;
    }
    .score-worst {
      width: 89px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: 'score5';
      color: #ff4c40;
      border: 1px solid #ff4c40;
      background-color: #fff;
    }
    .first-box-group {
      margin-top: 36px;
      .box-area {
        display: flex;
        width: 100%;
        height: 81px;
        .left-area {
          flex: 1;
          display: flex;
          .title {
            flex: 1;
            background-color: #fbfbfd;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333333;
            font-size: 18px;
            font-family: 'score5';
          }
          .object {
            flex: 2;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #333333;
            font-size: 18px;
            font-family: 'score2';
            .bmi-text {
              margin-left: 20px;
              color: #666666;
              font-size: 16px;
              font-family: 'score2';
            }
          }
          .bmi-text-object {
            flex: 2;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #333333;
            font-size: 18px;
            font-family: 'score2';
            .bmi-text {
              margin-left: 20px;
              color: #666666;
              font-size: 16px;
              font-family: 'score2';
            }
          }
        }
        .right-area {
          flex: 1;
          display: flex;
          .title {
            flex: 1;
            background-color: #fbfbfd;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333333;
            font-size: 18px;
            font-family: 'score5';
          }
          .object {
            flex: 2;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #333333;
            font-size: 18px;
            font-family: 'score2';
          }
        }
      }
    }

    .second-box-group {
      margin-top: 72px;
      .one-group {
        display: flex;
      }
      .one-list-item {
        flex: 1;
      }
      .title-area {
        height: 80px;
        background-color: #fbfbfd;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333333;
        font-size: 18px;
        font-family: 'score5';
        border-bottom: 1px solid #ddd;
      }

      .score-area {
        flex: 1;
        height: 80px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ddd;
      }
    }
    .third-box-group {
      margin-top: 70px;
      padding: 50px;
      background-color: #fbfbfd;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      flex-direction: column;
      .one-row{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0 5px 0px;
      }
      .left-icon-text-area {
        display: flex;
        flex: 0.2;
        .icon {
          width: 20px;
          height: 22px;
        }
        .text {
          margin-left: 10px;
          color: #333333;
          font-size: 18px;
          font-family: 'score5';
        }
      }
      .middle-right-group {
        display: flex;
        flex: 0.8;
        align-items: center;
      }
      .middle-score-area {
        width: 89px;
        height: 40px;
      }
      .right-info-area {
        margin-left: 20px;

        color: #666;
        font-size: 18px;
        font-family: 'score2';
      }
    }

    .recommend-group {
      margin-top: 70px;
      display: flex;
      .title-area {
        flex: 1;
      }
      .share-area {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        width: 100px;
        height: 40px;
        border: 1px solid #dddddd;
        background-color: #fff;
        cursor: pointer;
        .share-icon {
          width: 15px;
          height: 20px;
        }
        .share-text {
          margin-left: 10px;
          color: #333;
          font-size: 16px;
          font-family: 'score2';
        }
      }
    }
    .product-area {
      margin-top: 40px;
      display: flex;
      .product-item-area {
        width: 230px;
        height: 80px;
        border-radius: 40px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        margin-right: 13px;
        .product-img-area {
          width: 54px;
          height: 54px;
          border-radius: 27px;
          background-color: #efefef;
          display: flex;
          align-items: center;
          justify-content: center;
          .product-img {
            width: 23px;
            height: 28px;
          }
        }

        .product-name {
          margin-left: 17px;
          color: #333;
          font-size: 16px;
          font-family: 'score2';
        }
      }
      .cart-btn {
        width: 230px;
        height: 80px;
        border-radius: 40px;
        background-color: #9ad144;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        font-family: 'score6';
        cursor: pointer;
      }
    }
    .consulting-group {
      margin-top: 70px;
      padding: 48px 22px;
      border: 1px solid #ddd;
      background-color: #fff;
      display: flex;
      .left-area {
        flex: 1;
        padding: 12px 20px 16px 48px;
        .title-area {
          display: flex;
          flex-direction: column;
          .bold-regular-area {
            display: flex;
          }
          .bold-text {
            color: #000;
            font-size: 45px;
            font-family: 'score6';
          }
          .regular-text {
            color: #000;
            font-size: 45px;
            font-family: 'score2';
          }
        }
        .employee-area {
          margin-top: 30px;
          display: flex;
          align-items: center;
          .employee-img {
            width: 56px;
            height: 56px;
            border-radius: 28px;
          }
          .employee-name-area {
            margin-left: 15px;
            display: flex;
          }
          .employee-name-bold {
            color: #333;
            font-size: 24px;
            font-family: 'score6';
          }
          .employee-name-regular {
            color: #333;
            font-size: 24px;
            font-family: 'score2';
          }
          .employee-phone-num {
            margin-left: 20px;
            color: #88bb38;
            font-size: 24px;
            font-family: 'score7';
          }
        }
        .employee-btn-group {
          margin-top: 30px;
          display: flex;
          .call-btn-area {
            width: 200px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #333;
            .call-icon {
              width: 20px;
              height: 20px;
            }
            .call-text {
              margin-left: 7px;
              color: #fff;
              font-size: 18px;
              font-family: 'score5';
            }
          }
          .move-btn {
            width: 200px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border: 1px solid #333;
            margin-left: 10px;
            color: #333;
            font-size: 18px;
            font-family: 'score5';
          }
        }
        .rep-area {
          margin-top: 40px;
          display: flex;
          align-items: center;
          .employee-img {
            width: 78px;
            height: 32px;
          }
          .employee-name-area {
            margin-left: 20px;
            display: flex;
          }
          .employee-name-bold {
            color: #333;
            font-size: 24px;
            font-family: 'score6';
          }
          .employee-name-regular {
            color: #333;
            font-size: 24px;
            font-family: 'score2';
          }
          .employee-phone-num {
            margin-left: 20px;
            color: #88bb38;
            font-size: 24px;
            font-family: 'score7';
          }
        }
        .rep-btn-group {
          margin-top: 44px;
          display: flex;
          .call-btn-area {
            width: 200px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #333;
            .call-icon {
              width: 20px;
              height: 20px;
            }
            .call-text {
              margin-left: 7px;
              color: #fff;
              font-size: 18px;
              font-family: 'score5';
            }
          }
        }
      }
      .phone-img-area {
        width: 312px;
        height: 324px;
        .phone-img {
          width: 312px;
          height: 324px;
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .main {
    width: 100%;
    margin-top: 30px;
    .body {
      width: 100%;
      margin: auto;
      padding: 30px 20px;
      .title-area {
        display: flex;
      }
      .bold-text {
        color: #333333;
        font-size: 24px;
        font-family: 'score6';
        display: inline-block;
        line-height: 1.4;
      }
      .regular-text {
        color: #333333;
        font-size: 24px;
        font-family: 'score2';
      }
      .black-line {
        width: 100%;
        height: 2px;
        background-color: #000;
      }
      .line {
        width: 100%;
        height: 1px;
        background-color: #ddd;
      }
      .score-good {
        width: 18vw;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: 'score5';
        color: #9ad144;
        border: 1px solid #9ad144;
        background-color: #fff;
      }
      .score-basic {
        width: 18vw;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: 'score5';
        color: #6289f2;
        border: 1px solid #6289f2;
        background-color: #fff;
      }
      .score-bad {
        width: 18vw;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: 'score5';
        color: #f39818;
        border: 1px solid #f39818;
        background-color: #fff;
      }
      .score-worst {
        width: 18vw;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: 'score5';
        color: #ff4c40;
        border: 1px solid #ff4c40;
        background-color: #fff;
      }
      .first-box-group {
        margin-top: 36px;
        .box-area {
          display: block;
          width: 100%;
          height: auto;
          .left-area {
            flex: 1;
            display: flex;
            height: auto;
            .title {
              flex: 1;
              background-color: #fbfbfd;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333333;
              font-size: 16px;
              font-family: 'score5';
            }
            .object {
              flex: 2;
              background-color: #fff;
              display: flex;
              align-items: center;
              padding-left: 30px;
              color: #333333;
              font-size: 16px;
              font-family: 'score2';
              padding-top: 10px;
              padding-bottom: 10px;
              .bmi-text {
                margin-left: 20px;
                color: #666666;
                font-size: 14px;
                font-family: 'score2';
              }
            }
            .bmi-text-object {
              flex: 2;
              background-color: #fff;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              padding-left: 30px;
              color: #333333;
              font-size: 16px;
              font-family: 'score2';
              padding-top: 10px;
              padding-bottom: 10px;
              .bmi-text {
                margin-left: 0px;
                color: #666666;
                font-size: 14px;
                font-family: 'score2';
              }
            }
          }
          .right-area {
            flex: 1;
            display: flex;
            height: 40px;
            .title {
              flex: 1;
              background-color: #fbfbfd;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333333;
              font-size: 16px;
              font-family: 'score5';
            }
            .object {
              flex: 2;
              background-color: #fff;
              display: flex;
              align-items: center;
              padding-left: 30px;
              color: #333333;
              font-size: 16px;
              font-family: 'score2';
            }
          }
        }
      }

      .second-box-group {
        margin-top: 40px;
        width: 100%;
        .one-group {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
        .one-list-item {
          width: 92vw;
          display: flex;
        }
        .title-area {
          width: 20vw;
          height: 80px;
          background-color: #fbfbfd;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333333;
          font-size: 16px;
          font-family: 'score5';
          border-bottom: 1px solid #ddd;
        }

        .score-area {
          width: 20vw;
          height: 80px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #ddd;
        }
      }
      .third-box-group {
        margin-top: 40px;
        padding: 20px;
        background-color: #fbfbfd;
        border: 1px solid #ddd;
        display: block;
        align-items: center;
        flex-direction: column;
        .one-row{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px 0 5px 0px;
        }
        .left-icon-text-area {
          display: flex;
          flex: 0.2;
          .icon {
            width: 16px;
            height: 18px;
          }
          .text {
            margin-left: 4px;
            color: #333333;
            font-size: 16px;
            font-family: 'score5';
          }
        }
        .middle-right-group {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          margin-top: 6px;
          .middle-score-area {
            width: 89px;
            height: 40px;
          }
          .right-info-area {
            margin-left: 10px;
            color: #666;
            font-size: 16px;
            line-height: 1.4;
            font-family: 'score2';
          }
        }
      }

      .recommend-group {
        margin-top: 40px;
        display: flex;
        .title-area {
          flex: 1;
        }
        .share-area {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          width: 80px;
          height: 35px;
          border: 1px solid #dddddd;
          background-color: #fff;
          cursor: pointer;
          .share-icon {
            width: 13px;
            height: 18px;
          }
          .share-text {
            margin-left: 6px;
            color: #333;
            font-size: 14px;
            font-family: 'score2';
          }
        }
      }
      .product-area {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .product-item-area {
          width: 43vw;
          height: 60px;
          border-radius: 40px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ddd;
          margin-right: 0px;
          padding: 0px 5px;
          .product-img-area {
            width: 40px;
            height: 40px;
            border-radius: 27px;
            background-color: #efefef;
            display: flex;
            align-items: center;
            justify-content: center;
            .product-img {
              width: 20px;
              height: 25px;
            }
          }

          .product-name {
            margin-left: 6px;
            color: #333;
            font-size: 14px;
            font-family: 'score2';
          }
        }
        .cart-btn {
          margin-top: 30px;
          width: 100%;
          height: 60px;
          border-radius: 40px;
          background-color: #9ad144;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 18px;
          font-family: 'score6';
          cursor: pointer;
        }
      }
      .consulting-group {
        margin-top: 40px;
        padding: 20px;
        border: 1px solid #ddd;
        background-color: #fff;
        display: block;
        .left-area {
          flex: 1;
          padding: 10px 0px;
          .title-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .bold-regular-area {
              display: flex;
            }
            .bold-text {
              color: #000;
              font-size: 22px;
              font-family: 'score6';
            }
            .regular-text {
              color: #000;
              font-size: 22px;
              font-family: 'score2';
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .employee-area {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            .employee-img {
              width: 30px;
              height: 30px;
              border-radius: 28px;
            }
            .employee-name-area {
              margin-left: 10px;
              display: flex;
            }
            .employee-name-bold {
              color: #333;
              font-size: 16px;
              font-family: 'score6';
            }
            .employee-name-regular {
              color: #333;
              font-size: 16px;
              font-family: 'score2';
            }
            .employee-phone-num {
              margin-left: 10px;
              color: #88bb38;
              font-size: 16px;
              font-family: 'score7';
            }
          }
          .employee-btn-group {
            margin-top: 24px;
            display: flex;
            justify-content: center;
            .call-btn-area {
              width: 160px;
              height: 50px;
              border-radius: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #333;
              .call-icon {
                width: 20px;
                height: 20px;
              }
              .call-text {
                margin-left: 7px;
                color: #fff;
                font-size: 16px;
                font-family: 'score5';
              }
            }
            .move-btn {
              width: 160px;
              height: 50px;
              border-radius: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
              border: 1px solid #333;
              margin-left: 10px;
              color: #333;
              font-size: 16px;
              font-family: 'score5';
            }
          }
          .rep-area {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            .employee-img {
              width: 16%;
              height: auto;
            }
            .employee-name-area {
              margin-left: 10px;
              display: flex;
            }
            .employee-name-bold {
              color: #333;
              font-size: 16px;
              font-family: 'score6';
            }
            .employee-name-regular {
              color: #333;
              font-size: 16px;
              font-family: 'score2';
            }
            .employee-phone-num {
              margin-left: 10px;
              color: #88bb38;
              font-size: 16px;
              font-family: 'score7';
            }
          }
          .rep-btn-group {
            margin-top: 24px;
            display: flex;
            justify-content: center;
            .call-btn-area {
              width: 160px;
              height: 50px;
              border-radius: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #333;
              .call-icon {
                width: 20px;
                height: 20px;
              }
              .call-text {
                margin-left: 7px;
                color: #fff;
                font-size: 16px;
                font-family: 'score5';
              }
            }
          }
        }
        .phone-img-area {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          .phone-img {
            width: 60%;
            height: 62%;
            margin-left: 40px;
          }
        }
      }
    }
  }
}
</style>
