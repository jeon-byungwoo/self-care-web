<template>
    <v-card class="ma-0 pa-0 d-flex flex-column">
        <v-toolbar flat class="ma-0 pa-0">
            <v-toolbar-title>매출 통계</v-toolbar-title>
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
            <v-card class="ma-0 pa-0">
                <v-card-title >일별 판매 추이</v-card-title>
                <div class="pa-4">
                    <canvas id="typeChart" style="margin-bottom:20px; height:300px; min-height:300px; max-height:300px;"></canvas>
                </div>
            </v-card>
            <v-card class="ma-0 pa-0 my-2">
                <v-data-table 
                    :items="orderList"
                    :headers="headers"
                    disable-sort
                    :item-per-page="10"
                >
                    <template v-slot:[`item.status`]="{item}">
                        <div class="text-center" v-if="item.status == 1">주문대기</div>
                        <div class="text-center" v-if="item.status == 2">주문취소</div>
                        <div class="text-center" v-if="item.status == 3">상품준비중</div>
                        <div class="text-center" v-if="item.status == 4">배송중</div>
                        <div class="text-center" v-if="item.status == 5">배송완료</div>
                        <div class="text-center" v-if="item.status == 6">결제도중취소</div>
                        <div class="text-center" v-if="item.status == 7">결제완료</div>
                    </template>
                </v-data-table>
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
                year: new Date().getFullYear() + '년',
                month: (new Date().getMonth()+1) + '월',
                day: 1
            },
            endDateObj: {
                year: new Date().getFullYear() + '년',
                month: (new Date().getMonth()+1) + '월',
                day: (new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).getDate()
            },
            orderList:[],
            years:[...Array(20)].map((a,b)=> new Date().getFullYear() - b + 2 + '년'),
            months:[...Array(12)].map((a,b)=> 12 - b + '월'),
            dateLabelList: [],  // 차트의 날짜
            chart1: null,       // 차트 1
            readyToOrderData: [],          // 차트 1에 쓸 데이터 (카카오)
            stackData1: [],     // 차트 1용 stack 데이터 
            orderCancelData: [],          // 차트 1에 쓸 데이터 (네이버)
            stackData2: [],     // 차트 1용 stack 데이터 
            readyToProductData: [],          // 차트 1에 쓸 데이터 (이메일)
            stackData3: [],     // 차트 1용 stack 데이터 
            deliveryData: [],          // 차트 1에 쓸 데이터 (이메일)
            stackData4: [],     // 차트 1용 stack 데이터 
            deliveryCompleteData: [],          // 차트 1에 쓸 데이터 (이메일)
            stackData5: [],     // 차트 1용 stack 데이터 
            cancelToSettlementData: [],          // 차트 1에 쓸 데이터 (이메일)
            stackData6: [],     // 차트 1용 stack 데이터 
            settlementCompleteData: [],          // 차트 1에 쓸 데이터 (이메일)
            stackData7: [],
            typeSummaryData: [],          // 차트 1에 쓸 데이터 (회원 합산)
            stackData8: [],     // 차트 1용 stack 데이터 
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
                    text: ''
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
            headers: [
                {text:"No", value:"no", align:"center"},
                {text:"구매자", value:"b_name", align:"center"},
                {text:"주문자 연락처", value:"b_phone", align:"center"},
                {text:"이메일", value:"b_email", align:"center"},
                {text:"받는사람", value:"r_name", align:"center"},
                {text:"받는사람 연락처", value:"r_phone", align:"center"},
                {text:"주문상태", value:"status", align:"center"},
                {text:"금액", value:"total_price", align:"center"},
                {text:"수단", value:"payment_info", align:"center"},
                {text:"주문일시", value:"cd", align:"center"},
            ]
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
            
            this.readyToOrderData = []

            for (let l of this.dateLabelList) {
                this.readyToOrderData.push(0)
                this.orderCancelData.push(0)
                this.readyToProductData.push(0)
                this.deliveryData.push(0)
                this.deliveryCompleteData.push(0)
                this.cancelToSettlementData.push(0)
                this.settlementCompleteData.push(0)
                this.typeSummaryData.push(0)
            }
            
            let conditions = []
            conditions.push({"q": ">=", "f": "cd", "v":startDate})
            conditions.push({"op":"AND", "q": "<=", "f": "cd", "v":endDate})

            let param = {
                table: 'orders',
                conditions: conditions
            }
            console.log(param)
            await this.$axios.post('/admin/select', param).then((res)=> {
                console.log("order list : ", res.data)
                if (res.data?.length > 0) {
                    this.orderList = res.data
                    this.orderList.forEach((order)=> {
                        order.cd = moment(order.cd).format('YYYY-MM-DD')

                        this.dateLabelList.forEach((label, index) => {
                            if (label == order.cd) {
                                if (order.status == 1) this.readyToOrderData[index]++
                                else if (order.status == 2) this.orderCancelData[index]++
                                else if (order.status == 3) this.readyToProductData[index]++
                                else if (order.status == 4) this.deliveryData[index]++
                                else if (order.status == 5) this.deliveryCompleteData[index]++
                                else if (order.status == 6) this.cancelToSettlementData[index]++
                                else if (order.status == 7) this.settlementCompleteData[index]++
                                
                                this.typeSummaryData[index]++
                            }
                        })
                    })
                    let stackSum1 = 0
                    let stackSum2 = 0
                    let stackSum3 = 0
                    let stackSum4 = 0
                    let stackSum5 = 0
                    let stackSum6 = 0
                    let stackSum7 = 0
                    
                    this.readyToOrderData.forEach((one)=>{
                        stackSum1+=one
                        this.stackData1.push(stackSum1)
                    })
                    this.orderCancelData.forEach((one)=>{
                        stackSum2+=one
                        this.stackData2.push(stackSum2)
                    })
                    this.readyToProductData.forEach((one)=>{
                        stackSum3+=one
                        this.stackData3.push(stackSum3)
                    })
                    this.deliveryData.forEach((one)=>{
                        stackSum4+=one
                        this.stackData4.push(stackSum4)
                    })
                    this.deliveryCompleteData.forEach((one)=>{
                        stackSum5+=one
                        this.stackData5.push(stackSum5)
                    })
                    this.cancelToSettlementData.forEach((one)=>{
                        stackSum6+=one
                        this.stackData6.push(stackSum6)
                    })
                    this.settlementCompleteData.forEach((one)=>{
                        stackSum7+=one
                        this.stackData7.push(stackSum7)
                    })

                    this.setupTypeData()
                }
            }).catch(()=>{
                
            })
        },
        setupTypeData() {
            this.typeData.labels = this.dateLabelList
            this.typeData.datasets = []
            this.typeData.datasets.push({
                type: 'line',
                label: '총 거래 내역',
                backgroundColor: 'black',
                fill: false,
                data: this.typeSummaryData
            })
            this.typeData.datasets.push({
                type: 'bar',
                label: '주문대기',
                backgroundColor: '#F9DF32',
                data: this.readyToOrderData
            })
            this.typeData.datasets.push({
                type: 'bar',
                label: '주문취소',
                backgroundColor: '#1DB867',
                data: this.orderCancelData
            })
            this.typeData.datasets.push({
                type: 'bar',
                label: '상품준비중',
                backgroundColor: '#1CA4FC',
                data: this.readyToProductData
            })
            this.typeData.datasets.push({
                type:'bar',
                label: '배송중',
                backgroundColor: '#AB47BC',
                data: this.deliveryData
            })
            this.typeData.datasets.push({
                type:'bar',
                label: '배송완료',
                backgroundColor: '#1E88E5',
                data: this.deliveryCompleteData
            })
            this.typeData.datasets.push({
                type:'bar',
                label: '결제도중취소',
                backgroundColor: '#EF5350',
                data: this.cancelToSettlementData
            })
            this.typeData.datasets.push({
                type:'bar',
                label: '결제완료',
                backgroundColor: '#26A69A',
                data: this.settlementCompleteData
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
        
        getDaysInMonth(year, month) {
            if (year == null || month == null) {
                return []
            }
            var currentYear = new Date().getFullYear()
            var currentMonth = new Date().getMonth()+1

            var days
            var cnt = new Date(year.substr(0,year.length - 1), month.substr(0,month.length - 1), 0).getDate()
            // if (currentYear == year.substr(0,year.length - 1) && currentMonth == month.substr(0,month.length - 1)) {
            //     cnt = new Date().getDate()
            // }
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
                dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
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
            this.orderList = []
            this.dateLabelList = []
            this.readyToProductData = []
            this.deliveryData = []
            this.deliveryCompleteData = []
            this.cancelToSettlementData = []
            this.settlementCompleteData = []
            this.readyToOrderData = []
            this.orderCancelData = []
            this.typeSummaryData = []
            this.stackData1 = []
            this.stackData2 = []
            this.stackData3 = []
            this.stackData4 = []
            this.stackData5 = []
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