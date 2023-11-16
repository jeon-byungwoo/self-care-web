<template>
    <v-app class="background">
        <div class="window">
            <v-card class="card">
                <v-app-bar flat >
                    <v-card-title class="ma-0 pa-0">설문내역</v-card-title>
                </v-app-bar>
                <v-container class="user_history_main_container ma-0 pa-5" >
                    <v-data-table 
                        :items="items"
                        :items-per-page="10"
                        disable-sort
                        style="cursor: pointer;"
                    >
                        <template v-slot:item="{item}" >
                            <tr @click="clickRow(item)" :style="item.no == selectedItem?.no ? 'background-color: #dedede;' : 'background-color: #ffffff;'">
                                <div class="list-row" >{{item.title}}</div>
                            </tr>
                        </template>
                    </v-data-table>
                    <v-stepper 
                        v-if="selectedItem"
                        v-model="step"
                        class="ma-0 pa-0"
                    >
                        <v-stepper-header>
                            <v-stepper-step
                                :complete="step > 0"
                                step="0"
                                class="ma-0 pa-4"
                            >
                                step1
                            </v-stepper-step>
                            <v-stepper-step
                                step="1"
                                :complete="step > 1"
                                class="ma-0 pa-4"
                            >
                                step2
                            </v-stepper-step>
                            <v-stepper-step
                                step="2"
                                :complete="step > 2"
                                class="ma-0 pa-4"
                            >
                                step3
                            </v-stepper-step>
                            <v-stepper-step
                                step="3"
                                :complete="step > 3"
                                class="ma-0 pa-4"
                            >
                                step4
                            </v-stepper-step>
                            <v-stepper-step
                                step="4"
                                :complete="step > 4"
                                class="ma-0 pa-4"
                            >
                                step5
                            </v-stepper-step>
                            <v-stepper-step
                                step="5"
                                :complete="step > 5"
                                class="ma-0 pa-4"
                            >
                                결과
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items class="ma-0 pa-0 mt-1">
                            <v-stepper-content 
                                class="ma-0 pa-0"
                                v-for="(obj, i) in stepList"
                                :key="i"
                                :step="i"
                            >
                                <v-card
                                    class="ma-0 pa-4"
                                    v-if="i < 5"
                                >
                                    <v-row class="survey-text ma-0 pa-0 my-2 align-center" v-for="(listItem, index) in obj.stepList" :key="index">
                                        <v-row >{{listItem.text}}</v-row>
                                        
                                        <v-spacer />
                                        <v-row class="ma-0 pa-0 survey-button-wrap">
                                            <v-btn :color="surveyResults[i]?.result[index] == 1 ? 'primary' : 'lightGray'">그렇다</v-btn>
                                            <v-btn :color="surveyResults[i]?.result[index] == 2 ? 'primary' : 'lightGray'" class="ml-2" >아니다</v-btn>
                                        </v-row>
                                        <v-row class="ma-0 pa-0 survey-button-wrap-mobile">
                                            <v-btn :color="surveyResults[i]?.result[index] == 1 ? 'primary' : ''" class="ml-2" >{{surveyResults[i]?.result[index]==1?'그렇다':'아니다'}}</v-btn>
                                        </v-row>
                                    </v-row>
                                </v-card>
                                <v-card v-else class="ma-0 pa-4 overflow-auto" >
                                    <v-row class="ma-0 pa-0 align-center">
                                        <h4>{{userObj?.name}}</h4>님의 라이프스타일 결과입니다.
                                    </v-row>
                                    <v-divider class="ma-0 pa-0 mt-4" style="border-color:black; border-width: 2px 0 0 0;"/>
                                    <v-row class="ma-0 pa-0 align-center" style="height:56px">
                                        <v-col sd="2" md="2" class="align-center text-center" style="background-color:#fbfbfd;"><h4>이름</h4></v-col>
                                        <v-col sd="4" md="4" class="align-center" >{{userObj?.name}}</v-col>
                                        <v-col sd="2" md="2" class="align-center text-center" style="background-color:#fbfbfd;"><h4>나이</h4></v-col>
                                        <v-col sd="4" md="4" class="align-center" >{{selectedItem?.age}}</v-col>
                                    </v-row>
                                    <v-divider class="ma-0 pa-0"/>
                                    <v-row class="ma-0 pa-0 align-center" style="height:56px">
                                        <v-col sd="2" md="2" class="align-center text-center" style="background-color:#fbfbfd;"><h4>BMI</h4></v-col>
                                        <v-col sd="4" md="4" class="align-center d-flex justify-space-between" >{{(selectedItem?.weight / ((selectedItem?.tall/100.0)*(selectedItem?.tall/100.0)))?.toFixed(2)}}
                                            <div class="bmi-text" style="font-size:13px;" >
                                                BMI = {체중 (kg)} / {키(m)제곱}
                                            </div>
                                        </v-col>
                                        <v-col sd="2" md="2" class="align-center text-center" style="background-color:#fbfbfd;"><h4>성별</h4></v-col>
                                        <v-col sd="4" md="4" class="align-center" >{{userObj.gender == '1' ? '여성' : '남성'}}</v-col>
                                    </v-row>
                                    <v-divider class="ma-0 pa-0 mb-4"/>
                                    <v-divider class="ma-0 pa-0 mt-4" style="border-color:black; border-width: 2px 0 0 0;"/>
                                    <v-row class="result-summary ma-0 pa-0 align-center" style="height:56px; background-color:#fbfbfd;">
                                        <v-col class="text-center" v-for="(obj, i) in itemList" :key="i">
                                            <h4>{{obj.text}}</h4>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="ma-0 pa-0"/>
                                    <v-row class="result-summary ma-0 pa-0 align-center" style="height:56px;">
                                        <v-col class="text-center" v-for="(obj, i) in itemList" :key="i">
                                            <div class="ma-0 pa-0" v-if="obj.score == 0" style="border: 1px solid #9ad144; color: #9ad144; background-color: #fff; border-radius: 20px; height;40px">양호</div>
                                            <div class="ma-0 pa-0" v-if="obj.score == 1" style="border: 1px solid #6289f2; color: #6289f2; background-color: #fff; border-radius: 20px; height;40px">보통</div>
                                            <div class="ma-0 pa-0" v-if="obj.score == 2" style="border: 1px solid #f39818; color: #f39818; background-color: #fff; border-radius: 20px; height;40px">경계</div>
                                            <div class="ma-0 pa-0" v-if="obj.score == 3" style="border: 1px solid #ff4c40; color: #ff4c40; background-color: #fff; border-radius: 20px; height;40px">불량</div>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="ma-0 pa-0 mb-4"/>
                                    <v-col class="ma-0 pa-0" style="background-color:#fbfbfd;"  v-for="(obj, i) in itemList" :key="i">
                                        <v-divider :class="i == 0 ? 'ma-0 pa-0' : 'ma-0 pa-0 mx-4'"/>
                                        <v-row class="ma-0 pa-0 align-center">
                                            <v-col sm="2" md="2" class="survey-result-icon-area ma-0 pa-4">
                                                <v-row class="ma-0 pa-0 align-center">
                                                    <v-img :src="require(`@/assets/image/${obj.image}`)" max-height="22" max-width="20" contain class="mr-4"/>
                                                    <h4>{{obj.text}}</h4>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="1" md="1" class="survey-result-label-area text-center ma-0 pa-0 " >
                                                <div class="ma-0 pa-0" v-if="obj.score == 0" style="border: 1px solid #9ad144; color: #9ad144; background-color: #fff; border-radius: 20px; height;40px">양호</div>
                                                <div class="ma-0 pa-0" v-if="obj.score == 1" style="border: 1px solid #6289f2; color: #6289f2; background-color: #fff; border-radius: 20px; height;40px">보통</div>
                                                <div class="ma-0 pa-0" v-if="obj.score == 2" style="border: 1px solid #f39818; color: #f39818; background-color: #fff; border-radius: 20px; height;40px">경계</div>
                                                <div class="ma-0 pa-0" v-if="obj.score == 3" style="border: 1px solid #ff4c40; color: #ff4c40; background-color: #fff; border-radius: 20px; height;40px">불량</div>
                                            </v-col>
                                            <v-col class="survey-result-comment-area ma-0 pa-4 pb-0 align-center">
                                                <div v-if="surveyComment?.length > 0" v-html="obj.comment" ></div>
                                            </v-col>
                                        </v-row>
                                        <v-row class="survey-result-comment-area-mobile">
                                            <v-col class="ma-0 pa-4 pb-0 align-center d-flex">
                                                <div v-if="surveyComment?.length > 0" v-html="obj.comment" ></div>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-divider class="ma-0 pa-0 mb-4"/>
                                </v-card>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-container>
                
                <v-footer class="">
                    <v-btn text @click="clickPrev" :disable="step == 0">
                        이전
                    </v-btn>
                    <v-btn
                        class="ml-2"
                        color="primary"
                        text
                        @click="clickNext"
                        :disable="step == 5"
                    >
                        다음
                    </v-btn>
                    <v-btn class="ml-auto" color="success" @click="clickCancel">확인</v-btn>
                </v-footer>
            </v-card>
        </div>
    </v-app>    
</template>
<script>
import Moment from 'moment'
export default {
    props: ['obj', 'popup'],
    data() {
        return {
            items: [],
            userObj: null,
            surveyHeaders: [
                
            ],
            stepList: [
                {
                    stepList: [
                        { text: '평상시 쉽게 피로감을 느껴 활력이 필요하다.', selected: 0 },
                        { text: '1년 2회 이상 자주 아프다.', selected: 0 },
                        { text: '구취 또는 체취가 심하다.', selected: 0 },
                        { text: '특정음식에 대한 소화불량 현상이 있다.', selected: 0 },
                        { text: '주 2회이상 육류 섭취 한다.', selected: 0 },
                        { text: '생리통, 생리불순, 월경전 중후군이 있다.', selected: 0 },
                        { text: '약물이나 항생제 사용이 빈번하다.', selected: 0 },
                        { text: '음주 또는 과음이 많다.', selected: 0 },
                        { text: '평상시 감정기복이 심하다.', selected: 0 },
                        { text: '특정음식 알레르기가 있다.', selected: 0 },
                    ],
                },
                {
                    stepList: [
                        { text: '눈가에 붓기나 눈 밑에 다크서클이 있다.', selected: 0 },
                        { text: '흡연 및 간접흡연에 노출되어 있다.', selected: 0 },
                        { text: '기억력저하 또는 집중력이 부족하다.', selected: 0 },
                        { text: '질병 저항력감소', selected: 0 },
                        { text: '식사 후에 트림, 소화불량 가스발생이 잦다.', selected: 0 },
                        { text: '평상시 스트레스가 많은 편이다.', selected: 0 },
                        { text: '피부, 안색이 좋지 않다고 느낀다.', selected: 0 },
                        { text: '가공식품이나 단 것을 좋아한다.', selected: 0 },
                        { text: '우유, 치즈, 버터 등 유제품 자주 섭취', selected: 0 },
                        { text: '우울증이나 기분이 저조함이 있다.', selected: 0 },
                    ],
                },
                {
                    stepList: [
                        { text: '불면증 또는 선잠을 잔다.', selected: 0 },
                        { text: '폐경기 문제가 있다.', selected: 0 },
                        { text: '잦은소변 습관이나 시원하게 못 본다.', selected: 0 },
                        { text: '평상시 머리카락이 잘 빠진다.', selected: 0 },
                        { text: '관절이 약하거나 관절통증이 느낀다.', selected: 0 },
                        { text: '정상체중 유지가 힘들다.', selected: 0 },
                        { text: '지구력이 약화됨을 느낀다.', selected: 0 },
                        { text: '평상시 식습관이 좋지 않다.', selected: 0 },
                        { text: '질병 후 회복력이 떨어진다.', selected: 0 },
                        { text: '변비나 불규칙한 배변습관이 있다.', selected: 0 },
                    ],
                },
                {
                    stepList: [
                        { text: '식욕부진을 느낀다.', selected: 0 },
                        { text: '성욕이 감퇴를 느낀다.', selected: 0 },
                        { text: '손톱이 약하거나 쉽게 잘 부러진다.', selected: 0 },
                        { text: '모발이 건조하거나 손상되어 있다.', selected: 0 },
                        { text: '지방과 콜레스테롤의 섭취가 보통 이상이다.', selected: 0 },
                        { text: '불안감, 중압감, 공포감을 느낀다.', selected: 0 },
                        { text: '섬유질섭취가 (1일기준 25g)로 부족한 편이다.', selected: 0 },
                        { text: '자주 근육통이나 경련이 있다.', selected: 0 },
                        { text: '오염된 환경에 노출되어 있다.', selected: 0 },
                        { text: '커피, 콜라 등 카페인과다 섭취 (1일 기준 2잔 이상)', selected: 0 },
                    ],
                },
                {
                    stepList: [
                        { text: '자제력이 부족하다.', selected: 0 },
                        { text: '음식, 화학약품에 과민반응 한다.', selected: 0 },
                        { text: '무좀이나 부인과 염증이 있다.', selected: 0 },
                        { text: '뼈가 약한 편이다.', selected: 0 },
                        { text: '심한 걱정근심을 자주한다.', selected: 0 },
                        { text: '분노나 짜증을 쉽게 표출한다.', selected: 0 },
                        { text: '운동부족을 느낀다.', selected: 0 },
                        { text: '코막힘 또는 과다한 거래분비', selected: 0 },
                        { text: '피부가 건조하거나 민감하고 주름이 많이 생긴다.', selected: 0 },
                        { text: '얼굴 모공이 넓거나 번들거리고 잡티가 많이 생긴다.', selected: 0 },
                    ],
                },
                {}
            ],
            step: 5,
            surveyResults: [],
            selectedItem: null,
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
        }
    },
    mounted() {
        this.selcetUser()
        this.selectSurveyComment()
    },
    methods: {
        async selcetUser() {
            if (this.obj != null) {
                let conditions = []
                conditions.push({"q":"=","f":"no","v":this.obj.no})
                conditions.push({"q":"order","f":"no","o":"DESC"})
                let param = {table:"user", conditions: conditions}
                await this.$axios.post('/admin/select', param).then(async res => {
                    if (res.data.length > 0) {
                        this.userObj = res.data[0]
                        this.selectSurveyList()
                    }
                }).catch(err => {
                    console.log("err : ", err)
                })
            } 
        },
        async selectSurveyList() {
            let sConditions = [{ q: '=', f: 'u_no', v: this.userObj?.no },{ q: 'order', f: 'cd', o: 'DESC' }]
            let surveyFormBody = {
                table: 'survey_result',
                conditions: sConditions,
            }
            this.$axios.post('/admin/select', surveyFormBody).then(res => {
                
                if (res.data.length > 0) {
                    this.items = res.data
                    console.log(this.items)
                    for(let one of this.items){
                        one.title = Moment(one.cd).format('YY년MM월DD일')+"의 건강설문 결과"
                        one.cd = Moment(one.cd).format('YYYY-MM-DD HH:mm')
                        const today = new Date();
                        const birthDate = new Date(one.birth, 7, 10); // 2000년 8월 10일

                        one.age = today.getFullYear() - birthDate.getFullYear() + 1;
                    }
                    this.$forceUpdate()
                }
            }).catch(err => {
                console.log("err : ", err)
            })
        },
        async selectSurveyComment(){
            let conditions = [{ q: '=', f: '1', v: 1 }]
            let formBody = {
                table: 'survey_comment',
                conditions: conditions,
            }
            await this.$axios
            .post('/api/select', formBody)
            .then((res) => {
                if (res.data.length > 0) {
                    this.surveyComment = res.data
                } 
            })
            .catch(function (error) {
                console.log('에러!!', error)
            })
        },
        clickCancel() {
            this.popup = false
            this.$emit('click-close', 'history')
        },
        clickNext() {
            if (this.step < 5) this.step += 1
            else this.step = 5
        },
        clickPrev() {
            if (this.step == 0) this.step = 0
            else this.step -= 1
        },
        clickRow(item) {
            console.log("clickrow : ", item)
            this.selectedItem = item
            
            this.surveyResults = []
            this.itemList = [
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
            ]
            let temp = JSON.parse(this.selectedItem.result)
                this.surveyResults.push({result: temp.slice(0, 10)})
                this.surveyResults.push({result: temp.slice(10, 20)})
                this.surveyResults.push({result: temp.slice(20, 30)})
                this.surveyResults.push({result: temp.slice(30, 40)})
                this.surveyResults.push({result: temp.slice(40, 50)})

            for(let i = 0; i < item.result.length; i++) {
                if( item.result[i]==1 ){
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
            this.$forceUpdate()
        }
    }
}
</script>
<style scoped>
.user_history_main_container {
    overflow-y: auto;
    max-height: 74vh !important;
    margin: 0px;
    max-width: none;
}
.selected_history {
    background-color: #dedede;
}
.none_selected_history {
    background-color: #fff;
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
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

  /* 임시 지정 */
  width: 1000px;
  /* height: 450px; */
  
  border-radius: 30px;
}
.card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
}
.list-row{
    width: 100%;
    border-bottom: solid #d3d3d3 0.5px;
    height: 40px;
    display: flex;
    padding-left:20px;
    align-items: center;
    justify-content: flex-start;
}
.bmi-text{
    display: block;
}
.result-summary{
    display: flex;
}
.survey-result-comment-area{
    display: flex;
}
.survey-result-comment-area-mobile{
    display: none;
}
.survey-text{
    font-size: 16px;
}
.survey-button-wrap{
    display: flex;
    justify-content: flex-end;
}
.survey-button-wrap-mobile{
    display: none;
}
@media (max-width: 720px) {
.user_history_main_container {
    overflow-y: auto;
    max-height: 86vh !important;
    margin-top: 0px;
    max-width: none;
}
.list-row{
    width: 100%;
    border-bottom: solid #d3d3d3 0.5px;
    height: 40px;
    display: flex;
    padding-left:20px;
    align-items: center;
    justify-content: flex-start;
}
.bmi-text{
    display: none;
}
.result-summary{
    display: none;
}
.survey-result-comment-area{
    display: none;
}
.survey-result-comment-area-mobile{
    display: flex;
}
.survey-text{
    font-size: 14px;
}
.survey-button-wrap{
    display: none;
}
.survey-button-wrap-mobile{
    display: flex;
    justify-content: flex-end;
}
}

</style>