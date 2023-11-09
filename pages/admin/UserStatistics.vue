<template>
    <v-card class="ma-0 pa-0 d-flex flex-column">
        <v-toolbar flat class="ma-0 pa-0">
            <v-toolbar-title>회원 통계</v-toolbar-title>
        </v-toolbar>
        <v-container class="ma-0 px-4 pt-0 pb-4 " style="min-width:100%">
            <div >검색 기준일</div>
            <v-row class="ma-0 pa-0 align-center my-2" >
                <v-col class="ma-0 pa-0" cols="12" sm="2" md="2">
                    <v-row class="ma-0 pa-0">
                        <v-select 
                            class="mx-1"
                            outlined
                            label="년"
                            :items="years"
                            hide-details
                            dense
                            v-model="startDateObj.year"
                            append-icon=""
                            style="flex:1"
                        ></v-select>
                        <v-select 
                            class="mx-1"
                            outlined
                            label="월"
                            :items="calculationDate(startDateObj.year, startDateObj.month, 'startDate')"
                            hide-details
                            dense
                            v-model="startDateObj.month"
                            append-icon=""
                            style="flex:1"
                        ></v-select>
                        <v-select 
                            class="mx-1"
                            outlined
                            label="일"
                            :items="getDaysInMonth(startDateObj.year, startDateObj.month)"
                            hide-details
                            dense
                            v-model="startDateObj.day"
                            append-icon=""
                            style="flex:1"
                        ></v-select>
                    </v-row>
                </v-col>
                <span class="mx-2">~</span>
                <v-col class="ma-0 pa-0" cols="12" sm="2" md="2">
                    <v-row class="ma-0 pa-0">
                        <v-select 
                            class="mx-1"
                            outlined
                            label="년"
                            :items="years"
                            hide-details
                            dense
                            v-model="endDateObj.year"
                            append-icon=""
                            style="flex:1"
                        ></v-select>
                        <v-select 
                            class="mx-1"
                            outlined
                            label="월"
                            :items="calculationDate(endDateObj.year, endDateObj.month, 'endDate')"
                            hide-details
                            dense
                            v-model="endDateObj.month"
                            append-icon=""
                            style="flex:1"
                        ></v-select>
                        <v-select 
                            class="mx-1"
                            outlined
                            label="일"
                            :items="getDaysInMonth(endDateObj.year, endDateObj.month)"
                            hide-details
                            dense
                            v-model="endDateObj.day"
                            append-icon=""
                            style="flex:1"
                        ></v-select>
                    </v-row>
                </v-col>
                <v-btn 
                    dense
                    color="#2D7DC8"
                    dark
                    @click="searchStatistics"
                    class="ma-0 pa-0 ml-4"
                >
                    검색
                </v-btn>
            </v-row>
            <!-- <v-card class="ma-0 pa-0">
                <v-card-title >일별 회원가입(기간)</v-card-title>
                <client-only >
                    <SignupChart :data="typeData" :options="options" :height="150"/>
                </client-only>
                
            </v-card> -->
            <v-card class="ma-0 pa-0">
                <v-card-title >일별 회원가입(기간)</v-card-title>
                <div class="pa-4">
                    <canvas id="typeChart" style="margin-bottom:20px; height:300px; min-height:300px; max-height:300px;"></canvas>
                </div>
            </v-card>
            <v-card class="ma-0 pa-0 my-2">
                <v-card-title >누적회원가입</v-card-title>
                <div class="pa-4">
                    <canvas id="accumulationChart" style="margin-bottom:20px; height:300px; min-height:300px; max-height:300px;"></canvas>
                </div>
            </v-card>
            <v-card class="ma-0 pa-0 my-2">
                <v-card-title >연령별 가입자</v-card-title>
                <div class="pa-4">
                    <canvas id="ageChart" style="margin-bottom:20px; height:300px; min-height:300px; max-height:300px;"></canvas>
                </div>
            </v-card>
            <v-card class="ma-0 pa-0 my-2">
                <v-card-title >가입자 성별</v-card-title>
                <div class="pa-4">
                    <canvas id="genderChart" style="margin-bottom:20px; height:300px; min-height:300px; max-height:300px;"></canvas>
                </div>
            </v-card>
        </v-container>
    </v-card>
</template>
<script >
import Chart from 'chart.js/auto'
import moment from 'moment'

export default {
    components: {},
    layout: 'Admin',
    name: 'UserStatistics',
    data() {
        return {
            content: '',
            policyObj: {
                no: null,
                term: null,
                policy: null
            },
            startDateObj: {
                // year: new Date().getFullYear() + '년',
                // month: (new Date().getMonth()+1) + '월',
                // day: new Date().getDate()
                year: new Date().getFullYear() + '년',
                month: '10월',
                day: 1
            },
            endDateObj: {
                // year: new Date().getFullYear() + '년',
                // month: (new Date().getMonth()+1) + '월',
                // day: new Date().getDate()
                year: new Date().getFullYear() + '년',
                month: '10월',
                day: 31
            },
            userList:[],
            years:[...Array(20)].map((a,b)=> new Date().getFullYear() - b + 2 + '년'),
            months:[...Array(12)].map((a,b)=> 12 - b + '월'),
            dateLabelList: [],  // 차트의 날짜
            chart1: null,       // 차트 1
            typeKakaoData: [],          // 차트 1에 쓸 데이터 (카카오)
            stackData1: [],     // 차트 1용 stack 데이터 
            typeNaverData: [],          // 차트 1에 쓸 데이터 (네이버)
            stackData2: [],     // 차트 1용 stack 데이터 
            typeEmailData: [],          // 차트 1에 쓸 데이터 (이메일)
            stackData3: [],     // 차트 1용 stack 데이터 
            typeSummaryData: [],          // 차트 1에 쓸 데이터 (회원 합산)
            stackData4: [],     // 차트 1용 stack 데이터 
            chart2: null,
            chart3: null,
            ageLabels: ["10세이하","10대","20대","30대","40대","50대","60대","70대","80대","90대","100세이상"],
            genderArr:[0,0,0],
            ageData:[0,0,0,0,0,0,0,0,0,0,0,0],
            chart4: null,
            options: {
                tooltips: {
                    displayColors: true,
                    callbacks: {
                        label(tooltipItem, data) {
                            let corporation = data.datasets[tooltipItem.datasetIndex].label;
                            let valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                            // Loop through all datasets to get the actual total of the index
                            let total = 0;
                            for (let i = 0; i < data.datasets.length; i++)
                                total += data.datasets[i].data[tooltipItem.index];

                            // If it is not the last dataset, you display it as you usually do
                            if (tooltipItem.datasetIndex != data.datasets.length - 1) {
                                return corporation + " : " + valor.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                            } else { // .. else, you display the dataset and the total, using an array
                                return [corporation + " : " + valor.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), "Total : " + total];
                            }
                        }
                    },
                },
                title: {
                    display: false,
                    text: '일별 회원가입(기간)'
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend:{
                        display: true,
                        position:'top'
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                },
            },
            typeData: {
                labels:[],
                datasets: []
            },
            accumulationData: {
                labels:[],
                datasets: []
            },
            ageData: {
                labels: [],
                datasets: []
            },
            genderData: {
                labels: [],
                datasets: []
            },
            timeFlag: false,

        }
    },
    mounted() {
        this.searchStatistics()
    },
    methods: {
        async searchStatistics() {
            this.resetDatas()
            let startDate = this.objToDate(this.startDateObj)
            let endDate = this.objToDate(this.endDateObj)
            
            this.dateLabelList = this.getDates(startDate, endDate)
            
            this.typeKakaoData = []

            for (let l of this.dateLabelList) {
                this.typeKakaoData.push(0)
                this.typeNaverData.push(0)
                this.typeEmailData.push(0)
                this.typeSummaryData.push(0)
            }
            
            let conditions = []
            conditions.push({"q":"=","f":"status","v":1})
            conditions.push({"op":"AND", "q": "=", "f": "is_manager", "v":0})
            conditions.push({"op":"AND", "q": ">=", "f": "cd", "v":startDate})
            conditions.push({"op":"AND", "q": "<=", "f": "cd", "v":endDate})

            let param = {
                table: 'user',
                conditions: conditions
            }
            
            await this.$axios.post('/admin/select', param).then((res)=> {
                if (res.data?.length > 0) {
                    this.userList = res.data
                    this.userList.forEach((user)=> {
                        if (Number(user.birth) != null && Number(user.birth) != undefined && !isNaN(Number(user.birth)) && Number(user.birth) != 0) {
                            user.age = this.getAge(user.birth)
                            if(user.age<10){ this.ageData[0]++ }
                            else if( user.age<20 ){this.ageData[1]++}
                            else if( user.age<30 ){this.ageData[2]++}
                            else if( user.age<40 ){this.ageData[3]++}
                            else if( user.age<50 ){this.ageData[4]++}
                            else if( user.age<60 ){this.ageData[5]++}
                            else if( user.age<70 ){this.ageData[6]++}
                            else if( user.age<80 ){this.ageData[7]++}
                            else if( user.age<90 ){this.ageData[8]++}
                            else if( user.age<100 ){this.ageData[9]++}
                            else {this.ageData[10]++}
                        }

                        user.cd = moment(user.cd).format('YYYY-MM-DD hh:mm')

                        this.dateLabelList.forEach((label, index) => {
                            if (label == user.cd) {
                                if (user.type == '카카오') this.typeKakaoData[index]++
                                else if (user.type == '네이버') this.typeNaverData[index]++
                                else this.typeEmailData[index]++

                                this.typeSummaryData[index]++
                            }
                        })

                        if (user.gender == 1) 
                            this.genderArr[1]++
                        else if (user.gender == 0) 
                            this.genderArr[0]++
                        else 
                            this.genderArr[2]++
                    })
                    let stackSum1 = 0
                    let stackSum2 = 0
                    let stackSum3 = 0
                    let stackSum4 = 0
                    
                    this.typeKakaoData.forEach((one)=>{
                        stackSum1+=one
                        this.stackData1.push(stackSum1)
                    })
                    this.typeNaverData.forEach((one)=>{
                        stackSum2+=one
                        this.stackData2.push(stackSum2)
                    })
                    this.typeEmailData.forEach((one)=>{
                        stackSum3+=one
                        this.stackData3.push(stackSum3)
                    })
                    this.typeSummaryData.forEach((one)=>{
                        stackSum4+=one
                        this.stackData4.push(stackSum4)
                    })
                    console.log("this.timeFlag : ", this.timeFlag)
                    // if(!this.timeFlag)
                        // this.drawChart()
                    // else this.reloadChart()
                    this.setupTypeData()
                    this.setupAccumulationData()
                    this.setupAgeData()
                    this.setupGenderData()
                }
            }).catch(()=>{
                
            })
        },
        setupTypeData() {
            this.typeData.labels = this.dateLabelList
            this.typeData.datasets = []
            this.typeData.datasets.push({
                type: 'line',
                label: '금일 가입자수',
                backgroundColor: 'black',
                fill: false,
                data: this.typeSummaryData
            })
            this.typeData.datasets.push({
                type: 'bar',
                label: '카카오',
                backgroundColor: '#F9DF32',
                data: this.typeKakaoData
            })
            this.typeData.datasets.push({
                type: 'bar',
                label: '네이버',
                backgroundColor: '#1DB867',
                data: this.typeNaverData
            })
            this.typeData.datasets.push({
                type: 'bar',
                label: '이메일',
                backgroundColor: '#1CA4FC',
                data: this.typeEmailData
            })
            if (this.chart1 != null) this.chart1.update()
            else {
                let ctx = document.getElementById("typeChart")
                this.chart1 = new Chart(ctx, {
                    type: 'bar',
                    data: this.typeData,
                    options: this.options
                })
                this.chart1.update()
            }
        },
        setupAccumulationData() {
            this.accumulationData.labels = this.dateLabelList
            this.accumulationData.datasets = []
            this.accumulationData.datasets.push(
                {
                    type: 'line',
                    label: '금일 가입자수',
                    backgroundColor: 'black',
                    fill: false,
                    data: this.stackData4
                },
            )
            this.accumulationData.datasets.push(
                {
                    type: 'bar',
                    label: '카카오',
                    backgroundColor: '#F9DF32',
                    data: this.stackData1
                }
            )
            this.accumulationData.datasets.push(
                {
                    type: 'bar',
                    label: '네이버',
                    backgroundColor: '#1DB867',
                    data: this.stackData2
                }
            )
            this.accumulationData.datasets.push(
                {
                    type: 'bar',
                    label: '이메일',
                    backgroundColor: '#1CA4FC',
                    data: this.stackData3
                }
            )
            if (this.chart2 != null) this.chart2.update()
            else {
                let ctx = document.getElementById("accumulationChart")
                this.chart2 = new Chart(ctx, {
                    type: 'bar',
                    data: this.accumulationData,
                    options: this.options
                })
                this.chart2.update()
            }
        },
        setupAgeData() {
            this.ageData.labels = this.ageLabels
            this.ageData.datasets = []
            this.ageData.datasets.push(
                {
                    type: 'bar',
                    label: '연령별 가입자수',
                    backgroundColor: 'rgba(20, 255, 0, 0.7)',
                    fill: false,
                    data: this.ageData
                },
            )
            if (this.chart3 != null) this.chart3.update()
            else {
                let ctx = document.getElementById("ageChart")
                this.chart3 = new Chart(ctx, {
                    type: 'bar',
                    data: this.ageData,
                    options: this.options
                })
                this.chart3.update()
            }
        },
        setupGenderData() {
            this.genderData.labels = ['MALE','FEMALE','UNKNOWN']
            this.genderData.datasets = []
            this.genderData.datasets.push(
                {
                    type: 'doughnut',
                    label: '',
                    backgroundColor: ['rgba(0, 0, 255, 0.7)','rgba(255, 0, 0, 0.7)','rgba(120, 120, 120, 0.7)'],
                    data: this.genderArr,
                    hoverOffset: 4
                },
            )
            if (this.chart4 != null) this.chart4.update()
            else {
                let ctx = document.getElementById("genderChart")
                this.chart4 = new Chart(ctx, {
                    type: 'doughnut',
                    data: this.genderData
                })
                this.chart4.update()
            }
        },
        getDaysInMonth(year, month) {
            if (year == null || month == null) {
                return []
            }
            var currentYear = new Date().getFullYear()
            var currentMonth = new Date().getMonth()+1

            var days
            var cnt = new Date(year.substr(0,year.length - 1), month.substr(0,month.length - 1), 0).getDate()
            if (currentYear == year.substr(0,year.length - 1) && currentMonth == month.substr(0,month.length - 1)) {
                cnt = new Date().getDate()
            }
            days = [...Array(cnt)].map((a,b)=> cnt - b )//.reverse()
            return days
        },
        calculationDate(year, month, type){
            if (year == null) {
                return []
            }
            var months
            if(year.substr(0,year.length - 1) == new Date().getFullYear()){
                months = [...Array(new Date().getMonth()+1)].map((a,b)=> (new Date().getMonth()+1) - b + '월')
                
                if(month != null && (months.length < month.substr(0,month.length - 1))) {
                    if (type == 'startDate') {
                        this.startDateObj.month = null
                        this.startDateObj.day = null
                    } else if (type == 'endDate') {
                        this.endDateObj.month = null
                        this.endDateObj.day = null
                    }
                }
            }else{
                months = [...Array(12)].map((a,b)=> 12 - b + '월')
            }
            return months
        },
        objToDate(obj) {
            let stDate = ''
            let year = obj.year.substr(0, obj.year.length - 1)
            let month = obj.month.substr(0, obj.month.length - 1)
            if (obj.year != null) {
                stDate = `${year}`
            } else {
                return null
            }
            if (obj.month != null) {
                if (month > 9) {
                    stDate += `-${month}`
                }else {
                    stDate += `-0${month}`
                }
            }
            if (obj.day != null) {
                if (obj.day > 9) {
                    stDate += `-${obj.day}`
                }else {
                    stDate += `-0${obj.day}`
                }
            }
            return stDate
        },
        getDates(startDate, stopDate) {
            var dateArray = [];
            var currentDate = moment(startDate);
            var stopDate = moment(stopDate);
            while (currentDate <= stopDate) {
                dateArray.push( moment(currentDate).format('YYYY-MM-DD hh:mm') )
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        },
        getAge(birth) {
            let today = new Date()
            let age = today.getFullYear() - Number(birth)
            return age
        },
        resetDatas() {
            this.userList = []
            this.dateLabelList = []
            this.typeEmailData = []
            this.typeKakaoData = []
            this.typeNaverData = []
            this.typeSummaryData = []
            this.stackData1 = []
            this.stackData2 = []
            this.stackData3 = []
            this.stackData4 = []
            this.genderArr = [0,0,0]
            this.ageData = [0,0,0,0,0,0,0,0,0,0,0,0]
        },
        reloadChart(){
            console.log("???????")
            this.chart1.update()
            this.chart2.update()
            this.chart3.update()
            this.chart4.update()
        }
    },
}
</script>
<style scoped>
</style>