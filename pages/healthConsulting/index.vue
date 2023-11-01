<template>
  <div>
    <Header class="header-display" @update="onChildUpdate"></Header>
    <div v-if="!navigationStatus" class="main">
      <div v-if="aiConsultingMove" class="rolling-group">
        <div class="logo-area">
          <img
            src="@/assets/image/login-logo.png"
            class="logo-img"
            @click="logoClick"
          />
        </div>
        <div class="main-warper">
          <div class="pager-group">
            <hooper
              :infiniteScroll="true"
              :progress="true"
              :autoPlay="true"
              :playSpeed="5000"
              :wheelControl="false"
              ref="test"
              class="hooper"
              @slide="updateCarousel"
            >
              <slide>
                <div class="rolling-group">
                  <div class="rolling-text-group">
                    <div class="rolling-text-header">
                      건강설문과 전문가 상담으로
                    </div>
                    <div class="rolling-text-header2-group">
                      <div class="rolling-text-header">
                        내 몸에 꼭 필요한&nbsp;
                      </div>
                      <div class="rolling-text-header2">
                        영양성분을 추천 받으세요!
                      </div>
                    </div>
                    <div class="rolling-text-middle">단, 3분으로 진행하는</div>
                    <div class="rolling-text-footer">
                      AI 맞춤 영양성분 추천!
                    </div>
                  </div>
                  <div class="rolling-empty">
                    <img
                      class="rolling-img-first"
                      src="@/assets/image/img_rolling_first.png"
                      draggable="false"
                    />
                  </div>
                </div>
              </slide>
              <slide>
                <div class="rolling-group">
                  <div class="rolling-text-group">
                    <div class="rolling-text-header">
                      건강설문과 전문가 상담으로
                    </div>
                    <div class="rolling-text-header2-group">
                      <div class="rolling-text-header">
                        내 몸에 꼭 필요한&nbsp;
                      </div>
                      <div class="rolling-text-header2">
                        영양성분을 추천 받으세요!
                      </div>
                    </div>
                    <div class="rolling-text-middle">
                      내 건강에 필요한 성분 확인하기
                    </div>
                    <div class="rolling-text-footer">건강 설문 완료</div>
                  </div>
                  <div class="rolling-empty">
                    <img
                      class="rolling-img-second"
                      src="@/assets/image/img_rolling_second.png"
                      draggable="false"
                    />
                  </div>
                </div>
              </slide>
              <slide>
                <div class="rolling-group">
                  <div class="rolling-text-group">
                    <div class="rolling-text-header">
                      건강설문과 전문가 상담으로
                    </div>
                    <div class="rolling-text-header2-group">
                      <div class="rolling-text-header">
                        내 몸에 꼭 필요한&nbsp;
                      </div>
                      <div class="rolling-text-header2">
                        영양성분을 추천 받으세요!
                      </div>
                    </div>
                    <div class="rolling-text-middle">
                      셀프케어에서 추천하는<br />전문가와 영양제 조합
                    </div>
                    <div class="rolling-text-footer">전문가와 상담하기</div>
                  </div>
                  <div class="rolling-empty">
                    <img
                      class="rolling-img-third"
                      src="@/assets/image/img_rolling_third.png"
                      draggable="false"
                    />
                  </div>
                </div>
              </slide>
              <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation> -->
              <hooper-pagination slot="hooper-addons"></hooper-pagination>
              <!-- <hooper-progress slot="hooper-addons"></hooper-progress> -->
            </hooper>
            <div class="arrow-group">
              <img
                class="prev-img"
                src="@/assets/image/btn_prev.png"
                @click="prevClick"
                draggable="false"
              />
              <div class="arrow-empty"></div>
              <img
                class="next-img"
                src="@/assets/image/btn_next.png"
                @click="nextClick"
                draggable="false"
              />
            </div>

            <!-- <div class="rolling-pager-indicator-area">
              <div
                v-for="(item, index) in 3"
                :key="index"
                :class="
                  indicatorNum == index + 1
                    ? 'select-indicator'
                    : 'not-select-indicator'
                "
              ></div>
            </div> -->

            <div class="rolling-ai-btn-group">
              <div class="rolling-ai-btn" @click="aiConsultingMove = false">
                AI 건강설문 시작하기
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="aiConsultingMove == false">
        <Dialog v-if="dialogStatus"></Dialog>
        <div id="snackbar">빈 항목을 확인해 주세요.</div>

        <div class="header">
          <img
            class="logo-img"
            src="@/assets/image/ic_home_logo.png"
            draggable="false"
            @click="logoClick"
          />
          <div style="flex: 1"></div>
          <div
            class="back-btn"
            @click="stepNum == 0 ? $router.go(-1) : (stepNum -= 1)"
          >
            이전
          </div>
        </div>
        <div class="body">
          <div class="step-group">
            <div class="line-group">
              <div
                :class="stepNum >= 1 ? 'success-step-line' : 'step-line'"
              ></div>
              <div
                :class="stepNum >= 2 ? 'success-step-line' : 'step-line'"
              ></div>
              <div
                :class="stepNum >= 3 ? 'success-step-line' : 'step-line'"
              ></div>
              <div
                :class="stepNum >= 4 ? 'success-step-line' : 'step-line'"
              ></div>
              <div
                :class="stepNum >= 5 ? 'success-step-line' : 'step-line'"
              ></div>
            </div>
            <div class="circle-group">
              <div class="step-cicle-out-line">
                <div class="success-step-circle"></div>
              </div>
              <div style="flex: 1"></div>
              <div class="step-cicle-out-line">
                <div
                  :class="stepNum >= 1 ? 'success-step-circle' : 'step-circle'"
                ></div>
              </div>
              <div style="flex: 1"></div>
              <div class="step-cicle-out-line">
                <div
                  :class="stepNum >= 2 ? 'success-step-circle' : 'step-circle'"
                ></div>
              </div>
              <div style="flex: 1"></div>
              <div class="step-cicle-out-line">
                <div
                  :class="stepNum >= 3 ? 'success-step-circle' : 'step-circle'"
                ></div>
              </div>
              <div style="flex: 1"></div>
              <div class="step-cicle-out-line">
                <div
                  :class="stepNum >= 4 ? 'success-step-circle' : 'step-circle'"
                ></div>
              </div>
              <div style="flex: 1"></div>
              <div class="step-cicle-out-line">
                <div
                  :class="stepNum >= 5 ? 'success-step-circle' : 'step-circle'"
                ></div>
              </div>
            </div>
          </div>

          <div class="step-text-group">
            <div class="text-space">개인정보</div>
            <div class="empty-space"></div>
            <div class="text-space">STEP 1</div>
            <div class="empty-space"></div>
            <div class="text-space">STEP 2</div>
            <div class="empty-space"></div>
            <div class="text-space">STEP 3</div>
            <div class="empty-space"></div>
            <div class="text-space">STEP 4</div>
            <div class="empty-space"></div>
            <div class="text-space">STEP 5</div>
          </div>

          <div v-if="stepNum == 0" class="step1-body">
            <div class="title-area">
              <div class="bold-title">고객님</div>
              <div class="regular-title">을 어떻게 불러 드릴까요?</div>
            </div>
            <div class="info-text">
              서비스 제공 시 고객님의 본인 확인을 위한 정보입니다.
            </div>
            <div class="input-area">
              <input
                v-model="name"
                class="input"
                placeholder="이름 13자 이내 입력"
              />
            </div>
            <div class="radio-area">
              <div>
                <input
                  v-model="gender"
                  type="radio"
                  value="1"
                  name="gender"
                  id="man"
                />
                <label for="man">남성</label>
              </div>

              <div style="margin-left: 20px">
                <input
                  v-model="gender"
                  type="radio"
                  value="2"
                  name="gender"
                  id="woman"
                />
                <label for="woman">여성</label>
              </div>
            </div>
            <div class="input-area">
              <input
               type='number'
                v-model="birth"
                class="input"
                placeholder="출생년도 4자리 입력"
              />
              <div class="input-info">년</div>
            </div>
            <div class="input-area">
              <input v-model="tall" class="input" placeholder="키 입력"  type='number'/>
              <div class="input-info">cm</div>
            </div>
            <div class="input-area">
              <input v-model="weight" class="input" placeholder="몸무게 입력"  type='number'/>
              <div class="input-info">kg</div>
            </div>
            <div class="disease-area">
              <div class="name-text">
                {{ name }}
                <span class="remain-text"
                  >님 과거에 앓았거나 현재 앓고 있는 질병이 있으시면
                  알려주세요.</span
                >
              </div>
            </div>

            <div class="radio-area" :style="'flex-direction: column;'">
              <div>
                <input
                  v-model="diseaseCheck"
                  type="radio"
                  value="1"
                  name="disease"
                  id="yes"
                />
                <label for="yes">있음</label>
              </div>
              <div class="input-area">
                <input v-model="disease" class="input" placeholder="직접입력" />
              </div>
              <div class="radio-dicease-no">
                <input
                  v-model="diseaseCheck"
                  type="radio"
                  value="2"
                  name="disease"
                  id="no"
                />
                <label for="no">없음</label>
              </div>
            </div>

            <div class="done-group">
              <div class="btn-done" @click="doneClick">다음</div>
            </div>
          </div>

          <div class="step-body" v-if="stepNum > 0">
            <div class="title-area">
              <div class="title-text">라이프스타일 분석</div>
              <div style="flex: 1"></div>
              <div class="percent-area"></div>
            </div>
            <div class="sub-text">*다음 해당하는 항목을 선택해 주세요.</div>
            <div class="item-list-group">
              <div
                class="item-area"
                v-for="(item, i) in stepList[stepNum - 1].stepList"
                :key="i"
                :style="
                  'margin-top: ' +
                  (i == 0 ? '0px; ' : '20px; ') +
                  'background-color: ' +
                  (item.selected == 0 ? '#fff;' : '#f6f6f6;')
                "
              >
                <div class="text">{{ item.text }}</div>
                <div style="flex: 1"></div>
                <div class="radio-group">
                  <div
                    class="yes-area"
                    @click="yesClick(i)"
                    :style="
                      'background-color: ' +
                      (item.selected == 1 ? '#9AD144;' : '#fff;') +
                      'color: ' +
                      (item.selected == 1 ? '#fff' : '#333')
                    "
                  >
                    그렇다
                  </div>
                  <div
                    class="no-area"
                    @click="noClick(i)"
                    :style="
                      'background-color: ' +
                      (item.selected == 2 ? '#9AD144;' : '#fff;') +
                      'color: ' +
                      (item.selected == 2 ? '#fff' : '#333')
                    "
                  >
                    아니다
                  </div>
                </div>
              </div>

              <div class="done-group">
                <div class="btn-done" @click="doneClick">다음</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import Dialog from '../../components/oneBtnDialog.vue'
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation,
} from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
    Dialog,
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation,
  },
  data() {
    return {
      aiConsultingMove: true,
      dialogStatus: false,
      navigationStatus: false,
      stepNum: 0,
      name: '',
      gender: 0,
      birth: '',
      tall: '',
      weight: '',
      diseaseCheck: 0,
      disease: '',
      indicatorNum: -1,
      serializedData : [],
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
            {
              text: '섬유질섭취가 (1일기준 25g)로 부족한 편이다.',
              selected: 0,
            },
            { text: '자주 근육통이나 경련이 있다.', selected: 0 },
            { text: '오염된 환경에 노출되어 있다.', selected: 0 },
            {
              text: '커피, 콜라 등 카페인과다 섭취 (1일 기준 2잔 이상)',
              selected: 0,
            },
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
            {
              text: '피부가 건조하거나 민감하고 주름이 많이 생긴다.',
              selected: 0,
            },
            {
              text: '얼굴 모공이 넓거나 번들거리고 잡티가 많이 생긴다.',
              selected: 0,
            },
          ],
        },
      ],
    }
  },
  mounted() {
    this.name = ""
    let test = document.getElementsByClassName('hooper-indicator')
    test[0].style.width = '12px'
    test[0].style.height = '12px'
    test[0].style.borderRadius = '12px'
    test[0].style.border = '1px solid #32b783'
    test[0].style.background = '#fff'
    let test1 = document.getElementsByClassName('hooper-indicator is-active')
    test1[0].style.background = '#32b783'
    test[1].style.width = '12px'
    test[1].style.height = '12px'
    test[1].style.borderRadius = '12px'
    test[1].style.border = '1px solid #32b783'
    test[1].style.background = '#fff'
    test[2].style.width = '12px'
    test[2].style.height = '12px'
    test[2].style.borderRadius = '12px'
    test[2].style.border = '1px solid #32b783'
    test[2].style.background = '#fff'
  },
  watch: {
    indicatorNum() {},
  },
  methods: {
    checkNum(event) {
        if(event.key === '.' 
            || event.key === '-'
            || event.key >= 0 && event.key <= 9) {
            return true;
        }
        return false;
    },
    logoClick() {
      this.$router.push({ name: 'index' })
    },
    onChildUpdate(newValue) {
      this.navigationStatus = newValue
    },
    updateCarousel(payload) {
      console.log(payload.currentSlide)
      this.indicatorNum = payload.currentSlide
      let test = document.getElementsByClassName('hooper-indicator')
      test[0].style.background = '#fff'
      test[1].style.background = '#fff'
      test[2].style.background = '#fff'
      let test1 = document.getElementsByClassName('hooper-indicator is-active')
      test1[0].style.background = '#32b783'
    },
    prevClick() {
      this.$refs.test.slidePrev()
    },
    nextClick() {
      this.$refs.test.slideNext()
    },
    yesClick(index) {
      this.stepList[this.stepNum - 1].stepList[index].selected = 1
    },
    noClick(index) {
      this.stepList[this.stepNum - 1].stepList[index].selected = 2
    },
    doneClick() {
      if (this.stepNum == 0) {
        if (
          this.name.length == 0 ||
          this.gender == 0 ||
          this.birth.length == 0 ||
          this.tall.length == 0 ||
          this.weight.length == 0 ||
          this.diseaseCheck == 0 ||
          (this.diseaseCheck == 1 && this.disease.length == 0)
        ) {
          this.showToast()
          return
        }
      } else {
        let check = this.stepList[this.stepNum - 1].stepList.filter(
          (item) => item.selected == 0
        )
        console.log(check.length > 1 ? 'true' : 'false')
        if (check.length > 1) {
          this.showToast()
          return
        }
      }
      if (this.stepNum != 5) {
        this.stepNum += 1
        $('html').scrollTop(0)
      } else {
        if(localStorage!= undefined){//로그인 정보가 있는 경우
            //데이터 준비
            for(let p of this.stepList){//5개의 화면
                for(let q of p.stepList){
                    this.serializedData.push(q.selected)
                }
            }
            //DB insert Proc
            this.insertSurveyResult()
            
        }else{//로그인 정보가 없는 경우
            //세션 정보에 정보 저장 -> 로그인 이후 데이터 존재 시 삽입
            for(let p of this.stepList){//5개의 화면
                for(let q of p.stepList){
                    this.serializedData.push(q.selected)
                }
            }
            let user_info = {
                name:this.name,
                tall:Number(this.tall),
                birth:Number(this.birth),
                gender:this.gender,
                weight:Number(this.weight),
                disease:this.disease
            }
            localStorage.setItem('surveyResult', JSON.stringify(this.serializedData))
            localStorage.setItem('surveyUserInfo', JSON.stringify(user_info))
            this.$router.replace({ name: 'Login' })
        }
      }
    },
    async insertSurveyResult(){
        let formBody = {
            table: 'survey_result',
            result:JSON.stringify(this.serializedData),
            u_no:JSON.parse(localStorage.getItem('userInfo')).no,
            gender:this.gender,
            birth:Number(this.birth),
            weight:Number(this.weight),
            tall:Number(this.tall),
            disease:this.disease,
        }
      try {
        await this.$axios
          .post('/api/insert', formBody)
          .then((res) => {
            let resultNo = res.data[0].no
            //화면 이동
            this.$router.push({name: 'healthConsultingResult', query: {no: resultNo}})
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
    showToast() {
      var x = document.getElementById('snackbar')
      x.className = 'show'
      setTimeout(function () {
        x.className = x.className.replace('show', '')
      }, 3000)
    },
  },
}
</script>

<style lang="scss" scoped>
.header-display {
  display: none !important;
}
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
.rolling-group {
  width: 100%;
  height: 100vh;
  background-color: #f2fbf8;
  .logo-area {
    width: 100%;
    max-width: 1200px;
    margin: auto;
  }
  .logo-img {
    width: 94px;
    height: 38px;
    margin-top: 40px;
    margin-bottom: 100px;
    cursor: pointer;
  }
}
.main-warper {
  width: 100%;
  height: auto;
  background-color: #f2fbf8;
  .pager-group {
    display: flex;
    max-width: 1200px;
    height: 562px;
    margin: auto;
    flex-direction: column;
    .hooper {
      width: 100%;
      position: relative;
      height: 100%;
    }
    .arrow-group {
      width: 100%;
      max-width: 1200px;
      height: auto;
      position: absolute;
      top: 40%;
      display: flex;
    }
    .prev-img {
      width: 40px;
      height: 40px;
      flex: 0;
    }
    .arrow-empty {
      flex: 1;
    }
    .next-img {
      width: 40px;
      height: 40px;
      flex: 0;
    }
    .rolling-group {
      display: flex;
      flex-direction: row;
      padding: 40px 60px 0px 60px;
      .rolling-text-group {
        margin-top: 69px;
      }
      .rolling-text-header {
        font-size: 18px;
        color: #333333;
        font-family: 'score2';
      }
      .rolling-text-header2-group {
        display: flex;
        flex-direction: row;
      }
      .rolling-text-header2 {
        font-size: 18px;
        color: #333333;
        font-family: 'score6';
      }
      .rolling-text-middle {
        font-size: 40px;
        font-family: 'score9';
        color: #333333;
        margin-top: 23px;
      }
      .rolling-text-footer {
        font-size: 55px;
        font-weight: 900;
        font-family: 'score9';
        color: #32b783;
      }
      .rolling-empty {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
      .rolling-img-first {
        width: 382px;
        height: 342px;
      }
      .rolling-img-second {
        width: 374px;
        height: 353px;
      }
      .rolling-img-third {
        width: 335px;
        height: 362px;
      }
    }
    .rolling-pager-indicator-area {
      display: none;
    }
    .rolling-ai-btn-group {
      position: relative;
      margin-top: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
      cursor: pointer;
      .rolling-ai-btn {
        border-style: solid;
        border-width: 1px;
        border-color: #32b783;
        width: 300px;
        height: 70px;
        background: white;
        font-family: 'score5';
        font-size: 18px;
        color: #32b783;
        align-items: center;
        justify-content: center;
        display: flex;
      }
    }
  }
}
.main {
  width: 100%;
  background: #fbfbfd;
  height: 100%;

  padding: 0px 20px;

  .header {
    max-width: 1200px;
    margin: auto;
    background-color: #fbfbfd;
    height: 130px;
    display: flex;
    align-items: center;

    .logo-img {
      width: 94px;
      height: 38px;
      cursor: pointer;
    }
    .back-btn {
      width: 100px;
      height: 50px;
      border-width: 1px;
      border-style: solid;
      border-color: #dddddd;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #333333;
      font-size: 16px;
      font-family: 'score6';
      border-radius: 25px;
    }
  }
  .body {
    max-width: 1200px;
    margin: auto;
    background-color: #fff;
    border: 1px solid #dddddd;
    padding: 81px 79px;

    .step-group {
      // display: flex;
      // width: 100%;
      // align-items: center;
      padding: 0px 10px 0px 10px;
      position: relative;
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;

      .line-group {
        width: 100%;
        height: 6px;
        display: flex;
        background-color: #cacaca;
      }
      .circle-group {
        position: absolute;
        display: flex;
        // top: 0;
        // bottom: 0;
        // right: 0;
        // left: 0;
        width: 100%;
        padding: 0px 10px 0px 0px;
      }
    }
    .step-cicle-out-line {
      width: 41px;
      height: 41px;
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: #ddd;
    }
    .step-circle {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: 6px solid #cacaca;
      background-color: #fff;
    }
    .success-step-circle {
      width: 41px;
      height: 41px;
      border-radius: 30px;
      border: 6px solid #9ad144;
      background-image: url('@/assets/image/ic_consulting.png');
      background-position: center;
      background-size: 16px 15px;
      background-color: #fff;
    }
    .step-line {
      flex: 1;
      height: 6px;
      background-color: #cacaca;
    }
    .success-step-line {
      flex: 1;
      height: 6px;
      background-color: #9ad144;
    }
    .step-text-group {
      display: flex;
      width: 100%;
      align-items: center;
      margin-top: 20px;

      .text-space {
        color: #666666;
        font-size: 14px;
        font-family: 'score5';
      }
      .empty-space {
        flex: 1;
      }
    }
    .done-group {
      margin-top: 100px;
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .btn-done {
        width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #333333;
        color: #fff;
        font-family: 'score5';
        font-size: 18px;
        cursor: pointer;
      }
    }
    .step1-body {
      padding: 70px 21px 0px 21px;
      .title-area {
        display: flex;
        .bold-title {
          color: #333333;
          font-size: 36px;
          font-family: 'score6';
        }
        .regular-title {
          color: #333333;
          font-size: 36px;
          font-family: 'score2';
        }
      }
      .info-text {
        margin-top: 15px;
        padding: 12px 24px 11px 22px;
        background-color: rgba(154, 209, 68, 0.2);
        display: inline-block;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: #699816;
        font-size: 14px;
        font-family: 'score2';
      }
      .input-area {
        display: flex;
        margin-top: 50px;
        .input {
          flex: 1;
          height: 60px;
          border: 1px solid #dddddd;
          background-color: #fff;
          outline: none;
          padding: 0px 20px;
          color: #000000;
          font-size: 18px;
          font-family: 'score2';
        }
        .input::placeholder {
          color: #999999;
          font-size: 18px;
          font-family: 'score2';
        }
        .input-info {
          margin-left: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333333;
          font-size: 18px;
          font-family: 'score2';
        }
      }
      .radio-dicease-no {
        margin-top: 50px;
      }
      .radio-area {
        margin-top: 50px;
        display: flex;

        input[type='radio'] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        input[type='radio'] + label {
          display: inline-block;
          cursor: pointer;
          line-height: 24px;
          padding-left: 29px;
          font-family: 'score6';
          font-size: 16px;
          color: #333333;
          accent-color: #9ad144;
          background: url('@/assets/image/ic_radio_off.png') left/24px no-repeat;
        }

        input[type='radio']:checked + label {
          background: url('@/assets/image/ic_radio_on.png') no-repeat 0 0px /
            contain;
        }
      }
      .disease-area {
        display: flex;
        margin-top: 50px;
        .name-text {
          color: #88bb38;
          font-family: 'score6';
          font-size: 25px;
        }
        .remain-text {
          color: #333333;
          font-family: 'score2';
          font-size: 25px;
        }
      }
    }
    .step-body {
      padding: 70px 21px 0px 21px;

      .title-area {
        display: flex;
        align-items: center;
        .title-text {
          color: #333333;
          font-size: 36px;
          font-family: 'score6';
        }
        .percent-area {
          width: 180px;
          height: 15px;
          background-color: #f6f6f6;
          border-radius: 10px;
          display: none;
        }
      }
      .sub-text {
        margin-top: 10px;
        color: #88bb38;
        font-size: 14px;
        font-family: 'score2';
      }
      .item-list-group {
        margin-top: 51px;
        display: flex;
        flex-direction: column;
        .item-area {
          display: flex;
          height: 40px;
          align-items: center;
          border-radius: 20px;
          .text {
            color: #333333;
            font-size: 20px;
            font-family: 'score2';
            margin-left: 12px;
          }
          .radio-group {
            display: flex;
            .yes-area {
              width: 110px;
              height: 40px;
              border-radius: 20px;
              border: 1px solid #ddd;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333333;
              background-color: #fff;
              font-size: 16px;
              font-family: 'score2';
              cursor: pointer;
            }
            .no-area {
              margin-left: 10px;
              width: 110px;
              height: 40px;
              border-radius: 20px;
              border: 1px solid #ddd;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333333;
              font-size: 16px;
              font-family: 'score2';
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .header-display {
    display: block;
  }
  #snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    top: 80px;
    font-size: 17px;
  }

  #snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  .rolling-group {
    width: 100%;
    height: 90vh;
    background-color: #f2fbf8;
    .logo-area {
      width: 100%;
      margin: auto;
      display: none;
    }
    .logo-img {
      width: 94px;
      height: 38px;
      margin-top: 40px;
      margin-bottom: 100px;
    }
  }
  .main-warper {
    width: 100%;
    height: 100%;
    background-color: #f2fbf8;
    .pager-group {
      display: flex;
      .hooper {
        width: 100%;
        height: 100%;
      }
      .arrow-group {
        width: 100%;
        height: auto;
        position: absolute;
        top: 40%;
        display: none;
      }
      .prev-img {
        width: 40px;
        height: 40px;
        flex: 0;
      }
      .arrow-empty {
        flex: 1;
      }
      .next-img {
        width: 40px;
        height: 40px;
        flex: 0;
      }
      .rolling-group {
        display: block;
        flex-direction: row;
        padding: 0px 0px;
        .rolling-text-group {
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .rolling-text-header {
          font-size: 14px;
          color: #333333;
          font-family: 'score2';
        }
        .rolling-text-header2-group {
          display: flex;
          flex-direction: row;
        }
        .rolling-text-header2 {
          font-size: 14px;
          color: #333333;
          font-family: 'score6';
        }
        .rolling-text-middle {
          font-size: 24px;
          text-align: center;
          font-family: 'score9';
          color: #333333;
          margin-top: 23px;
        }
        .rolling-text-footer {
          font-size: 30px;

          font-family: 'score9';
          color: #32b783;
          margin-top: 10px;
        }
        .rolling-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rolling-img-first {
          margin-top: 40px;
          width: 67.5%;
          height: auto;
        }
        .rolling-img-second {
          margin-top: 40px;
          width: 67.5%;
          height: auto;
        }
        .rolling-img-third {
          margin-top: 40px;
          width: 59.03%;
          height: auto;
        }
      }
      .rolling-pager-indicator-area {
        flex: 1;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        gap: 10px;
        .select-indicator {
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #32b783;
        }
        .not-select-indicator {
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #fff;
          border: 1px solid #32b783;
        }
      }
      .rolling-ai-btn-group {
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        margin-top: 10px;
        .rolling-ai-btn {
          border-style: solid;
          border-width: 1px;
          border-color: #32b783;
          width: 300px;
          height: 70px;
          background: white;
          font-family: 'score5';
          font-size: 18px;
          color: #32b783;
          align-items: center;
          justify-content: center;
          display: flex;
        }
      }
    }
  }
  .main {
    width: 100%;
    background: #fbfbfd;
    height: 100%;
    padding: 0px 20px;

    .header {
      margin: auto;
      background-color: #fbfbfd;
      height: 80px;
      display: flex;
      align-items: center;

      .logo-img {
        width: 94px;
        height: 38px;
        cursor: pointer;
        display: none;
      }
      .back-btn {
        width: 100px;
        height: 40px;
        border-width: 1px;
        border-style: solid;
        border-color: #dddddd;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #333333;
        font-size: 14px;
        font-family: 'score6';
        border-radius: 25px;
      }
    }
    .body {
      margin: auto;
      background-color: #fff;
      border: 1px solid #dddddd;
      padding: 20px 10px;

      .step-group {
        // display: flex;
        // width: 100%;
        // align-items: center;
        padding: 0px 10px 0px 10px;
        position: relative;
        display: flex;
        align-items: center;
        height: 30px;
        width: 100%;

        .line-group {
          width: 100%;
          height: 4px;
          display: flex;
          background-color: #cacaca;
        }
        .circle-group {
          position: absolute;
          display: flex;
          // top: 0;
          // bottom: 0;
          // right: 0;
          // left: 0;
          width: 100%;
          padding: 0px 10px 0px 0px;
        }
      }
      .step-cicle-out-line {
        width: 31px;
        height: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        // background-color: #ddd;
      }
      .step-circle {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        border: 6px solid #cacaca;
        background-color: #fff;
      }
      .success-step-circle {
        width: 31px;
        height: 31px;
        border-radius: 30px;
        border: 6px solid #9ad144;
        background-image: url('@/assets/image/ic_consulting.png');
        background-position: center;
        background-size: 11px 10px;
        background-color: #fff;
      }
      .step-line {
        flex: 1;
        height: 4px;
        background-color: #cacaca;
      }
      .success-step-line {
        flex: 1;
        height: 4px;
        background-color: #9ad144;
      }
      .step-text-group {
        display: flex;
        width: 100%;
        align-items: center;
        margin-top: 10px;

        .text-space {
          color: #666666;
          font-size: 12px;
          font-family: 'score5';
        }
        .empty-space {
          flex: 1;
        }
      }
      .done-group {
        margin-top: 30px;
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        .btn-done {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #333333;
          color: #fff;
          font-family: 'score5';
          font-size: 18px;
          cursor: pointer;
        }
      }
      .step1-body {
        padding: 50px 21px 0px 21px;
        .title-area {
          display: flex;
          .bold-title {
            color: #333333;
            font-size: 24px;
            font-family: 'score6';
          }
          .regular-title {
            color: #333333;
            font-size: 24px;
            font-family: 'score2';
          }
        }
        .info-text {
          margin-top: 15px;
          padding: 12px 24px 11px 22px;
          background-color: rgba(154, 209, 68, 0.2);
          display: inline-block;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          color: #699816;
          font-size: 12px;
          font-family: 'score2';
        }
        .input-area {
          display: flex;
          margin-top: 30px;
          .input {
            flex: 1;
            width: 100%;
            height: 40px;
            border: 1px solid #dddddd;
            background-color: #fff;
            outline: none;
            padding: 0px 20px;
            color: #000000;
            font-size: 14px;
            font-family: 'score2';
          }
          .input::placeholder {
            color: #999999;
            font-size: 14px;
            font-family: 'score2';
          }
          .input-info {
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333333;
            font-size: 14px;
            font-family: 'score2';
          }
        }
        .radio-dicease-no {
          margin-top: 30px;
        }
        .radio-area {
          margin-top: 30px;
          display: flex;

          input[type='radio'] {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }
          input[type='radio'] + label {
            display: inline-block;
            cursor: pointer;
            line-height: 24px;
            padding-left: 29px;
            font-family: 'score6';
            font-size: 14px;
            color: #333333;
            accent-color: #9ad144;
            background: url('@/assets/image/ic_radio_off.png') left/24px
              no-repeat;
          }

          input[type='radio']:checked + label {
            background: url('@/assets/image/ic_radio_on.png') no-repeat 0 0px /
              contain;
          }
        }
        .disease-area {
          width: 100%;
          display: flex;
          margin-top: 30px;
          .name-text {
            width: 100%;
            display: inline-block;
            color: #88bb38;
            font-family: 'score6';
            font-size: 16px;
          }
          .remain-text {
            color: #333333;
            font-family: 'score2';
            font-size: 16px;
          }
        }
      }
      .step-body {
        padding: 50px 21px 0px 21px;

        .title-area {
          display: flex;
          align-items: center;
          .title-text {
            color: #333333;
            font-size: 24px;
            font-family: 'score6';
          }
          .percent-area {
            width: 180px;
            height: 15px;
            background-color: #f6f6f6;
            border-radius: 10px;
            display: none;
          }
        }
        .sub-text {
          margin-top: 10px;
          color: #88bb38;
          font-size: 14px;
          font-family: 'score4';
        }
        .item-list-group {
          margin-top: 31px;
          width: 100%;
          display: flex;
          flex-direction: column;
          .item-area {
            display: flex;
            width: 100%;
            align-items: center;
            border-radius: 20px;
            .text {
              width: 60%;
              color: #333333;
              font-size: 14px;
              font-family: 'score2';
              margin-left: 2px;
              word-break: normal;
            }
            .radio-group {
              flex: 1;
              display: flex;
              justify-content: flex-end;
              .yes-area {
                width: 50px;
                height: 30px;
                border-radius: 20px;
                border: 1px solid #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #333333;
                background-color: #fff;
                font-size: 12px;
                font-family: 'score2';
                cursor: pointer;
              }
              .no-area {
                margin-left: 10px;
                width: 50px;
                height: 30px;
                border-radius: 20px;
                border: 1px solid #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #333333;
                font-size: 12px;
                font-family: 'score2';
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
