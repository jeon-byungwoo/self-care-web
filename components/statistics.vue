<template>
  <div class="main-warper">
    <div class="main-warper-group">
      <div class="statics-group">
        <div class="statics-header-group">
          <div class="statics-header-title-text">기준 건강 설문 통계</div>
          <div>
            <select v-model="gender" @change="onChangeGender()" class="round">
                <option>전체</option>
                <option>남성</option>
                <option>여성</option>
            </select>
          </div>
          <div style="margin-left:10px;">
            <select v-model="age" @change="onChangeAge()" class="round">
                <option>전체</option>
                <option>~ 10대</option>
                <option>20대</option>
                <option>30대</option>
                <option>40대</option>
                <option>50대</option>
                <option>60대</option>
                <option>70대</option>
                <option>80대 이상</option>
            </select>
          </div>
        </div>
        <div>
          <Bar
            id="my-chart-id"
            :chartOption="chartOptions"
            :chartData="chartData"
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
      <div class="big-data-group">
        <div class="big-data-group2">
          <div class="big-data-text-header">빅데이터 설문</div>
          <div class="big-data-text-middle">
            우리는 다양한 서비스를 제공하지만<br />결과물은 단, 하나 당신의
            행복과<br />건강입니다.
          </div>
          <div class="big-data-text-footer">
            설문으로 알게 된 빅데이터를 기반으로 식품을 추천합니다.
          </div>
          <div class="big-data-ai-btn">
            <img
              class="big-data-ai-btn-check"
              src="@/assets/image/ic_ai_check.png"
              draggable="false"
            />
            <div class="big-data-ai-btn-text" @click=" $router.push({ name: 'healthConsulting' })">AI 건강설문 하기</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import LineChart from './LineChart'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.defaults.font.size = 12
ChartJS.defaults.font.family = 'score2'
ChartJS.defaults.color = '#000000'

export default {
  name: 'pagerView',
  components: {
    Bar,
  },
  data() {
    return {
        gender:'전체',
        age:'전체',
      chartData: {
        labels: [
          '면역',
          '순환',
          '소화',
          '장관',
          '뇌신경',
          '호르몬',
          '호흡',
          '비뇨',
          '골격',
          '피부/모발',
        ],

        datasets: [
          {
            labels: [
              '면역',
              '순환',
              '소화',
              '장관',
              '뇌신경',
              '호르몬',
              '호흡',
              '비뇨',
              '골격',
              '피부/모발',
            ],
            data: [40, 20, 12, 40, 20, 12, 40, 20, 12, 30],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderRadius: 40,
            maxBarThickness: 10,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 80,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        hover: {
          mode: false,
        },

        scales: {
          yAxes: [
            {
              // display: false, // y축 기준 표시 여부
              ticks: {
                // y축 기준 데이터 변경
                // beginAtZero:true,
                min: 0, // y축 최소값
                // max: 13, // y축 최대값
                stepSize: 10, // y축 간격
                fontSize: 12, // 글자크기
              },
              gridLines: {
                display: false, // 차트 안에 가로선 표시 여부
                drawBorder: false,
              },
            },
          ],

          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
                brawBorder: false,
              },
            },
          ],
        }, // scales 끝
      },
    }
  },
  methods: {
    preClick() {},
    onChangeAge(){
        this.selectStastics()
    },
    onChangeGender(){
        this.selectStastics()
    },
    async selectStastics(){

      let conditions = [
        { q: '=', f: '1', v: 1 },
      ]

        if(this.age!='전체'){
            if(this.age=='~ 10대'){
                conditions.push({ op:"AND", q: '<', f: 'age', v: 20 })
            }else if(this.age=='20대'){
                conditions.push({ op:"AND", q: '>', f: 'age', v: 20 })
                conditions.push({ op:"AND", q: '<', f: 'age', v: 30 })
            }else if(this.age=='30대'){
                conditions.push({ op:"AND", q: '>', f: 'age', v: 30 })
                conditions.push({ op:"AND", q: '<', f: 'age', v: 40 })
            }else if(this.age=='40대'){
                conditions.push({ op:"AND", q: '>', f: 'age', v: 40 })
                conditions.push({ op:"AND", q: '<', f: 'age', v: 50 })
            }else if(this.age=='50대'){
                conditions.push({ op:"AND", q: '>', f: 'age', v: 50 })
                conditions.push({ op:"AND", q: '<', f: 'age', v: 60 })
            }else if(this.age=='60대'){
                conditions.push({ op:"AND", q: '>', f: 'age', v: 60 })
                conditions.push({ op:"AND", q: '<', f: 'age', v: 70 })
            }else if(this.age=='70대'){
                conditions.push({ op:"AND", q: '>', f: 'age', v: 70 })
                conditions.push({ op:"AND", q: '<', f: 'age', v: 80 })
            }else if(this.age=='80대'){
                conditions.push({ op:"AND", q: '>', f: 'age', v: 80 })
                conditions.push({ op:"AND", q: '<', f: 'age', v: 90 })
            }
        }
        if(this.gender!='전체'){
            if(this.gender=='남성'){
                conditions.push({ op:"AND", q: '=', f: 'gender', v: 1 })
            }else if(this.gender=='여성'){
                conditions.push({ op:"AND", q: '=', f: 'gender', v: 2 })
            }
        }

      let formBody = {
        table: 'survey_result',
        conditions: conditions,
      }
      try {
        await this.$axios
          .post('/api/select', formBody)
          .then((res) => {
            if (res.data.length > 0) {
                console.log(res.data)
                
            } 
          })
          .catch(function (error) {
            console.log('에러!!', error)
          })
      } catch (err) {
        console.log('err!! : ' + err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main-warper {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 100px 20px;
  background: white;
  .main-warper-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .statics-group {
    width: 500px;
    .statics-header-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 12px;
    }
    .statics-header-title-text {
      font-size: 18px;
      font-family: 'score6';
      color: #333333;
      margin-right: 19px;
    }
    .statics-header-select-box-group {
      margin-left: 10px;
      width: 110px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .statics-header-select-box-text {
      font-size: 15px;
      font-family: 'score5';
      color: #333333;
    }
    .statics-header-select-box-img {
      width: 13.52px;
      height: 8.28px;
      margin-left: 17px;
    }
    select {
    /* styling */
    border: thin solid #fff;
    border-radius: 100px 100px 100px 100px;
    border-color: #dddddd;
    display: inline-block;
    line-height: 1.5em;
    padding: 0.1em 2.5em 0.1em 1em;
    /* reset */
    margin: 0;      
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    }
    /* arrows */
    select.round {
    background-image:
        linear-gradient(45deg, transparent 50%, rgb(0, 85, 155) 50%),
        linear-gradient(135deg, rgb(0, 85, 155) 50%, transparent 50%),
        radial-gradient(#fff 70%, transparent 72%);
    background-position:
        calc(100% - 20px) calc(1em - 5px),
        calc(100% - 15px) calc(1em - 5px),
        calc(100% - .5em) .5em;
    background-size:
        5px 5px,
        5px 5px,
        1em 1em;
    background-repeat: no-repeat;
    }
  }
  .big-data-group {
    width: 500px;
    display: flex;
    margin-left: 40px;
    justify-content: flex-end;
    flex-direction: row;
    .big-data-group2 {
      width: max-content;
    }
    .big-data-text-header {
      font-size: 18px;
      font-family: 'score2';
      color: #666666;
    }
    .big-data-text-middle {
      font-size: 32px;
      font-family: 'score6';
      color: #333333;
      margin-top: 10px;
      line-height: 45px;
    }
    .big-data-text-footer {
      font-size: 16px;
      font-family: 'score2';
      color: #666666;
      margin-top: 10px;
    }
    .big-data-ai-btn {
      width: 207px;
      height: 55px;
      border-radius: 50px;
      margin-top: 30px;
      background: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .big-data-ai-btn-check {
      width: 22px;
      height: 20px;
    }
    .big-data-ai-btn-text {
      margin-left: 7px;
      color: white;
      font-family: 'score5';
      font-size: 16px;
    }
  }
  .buttons {
    cursor: pointer;
    border-radius: 8px;
    padding: 12px 40px;
    background: #707070;
    text-align: center;
  }
  .content {
    font-size: 30px;
    margin-left: 20px;
  }
}
@media (max-width: 720px) {
  .main-warper {
    width: 100%;
    margin: auto;
    padding: 40px 20px;
    background: white;
    .main-warper-group {
      display: block;
      margin: auto;
    }
    .statics-group {
      display: block;
      width: 100%;
      .statics-header-group {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .statics-header-title-text {
        font-size: 14px;
        font-family: 'score6';
        color: #333333;
        margin-right: 5px;
      }
      .statics-header-select-box-group {
        margin-left: 5px;
        width: 80px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .statics-header-select-box-text {
        font-size: 12px;
        font-family: 'score5';
        color: #333333;
      }
      .statics-header-select-box-img {
        width: 8.52px;
        height: 6.28px;
        margin-left: 5px;
      }
    }
    .big-data-group {
      display: flex;
      justify-content: flex-end;
      flex-direction: row;
      margin-top: 20px;
      width: 100%;
      margin-left: 0px;
      .big-data-group2 {
        width: 100%;
      }
      .big-data-text-header {
        font-size: 12px;
        font-family: 'score2';
        color: #666666;
      }
      .big-data-text-middle {
        font-size: 18px;
        font-family: 'score6';
        color: #333333;
        margin-top: 10px;
        line-height: 1.4;
      }
      .big-data-text-footer {
        font-size: 12px;
        font-family: 'score2';
        color: #666666;
        margin-top: 10px;
      }
      .big-data-ai-btn {
        width: 207px;
        height: 55px;
        border-radius: 50px;

        background: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        margin-top: 30px;
        cursor: pointer;
      }
      .big-data-ai-btn-check {
        width: 22px;
        height: 20px;
      }
      .big-data-ai-btn-text {
        margin-left: 7px;
        color: white;
        font-family: 'score5';
        font-size: 16px;
      }
    }
    .buttons {
      cursor: pointer;
      border-radius: 8px;
      padding: 12px 40px;
      background: #707070;
      text-align: center;
    }
    .content {
      font-size: 30px;
      margin-left: 20px;
    }
  }
}
</style>
