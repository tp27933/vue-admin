
<template>
  <div class="home_wrap">

    <div class="up">
      <div id="MembershipCard_wrap">
        <span>會員總數: {{memberAmountData.total}}</span>
        <span>今日增加會員: {{memberAmountData.newToday}}</span>
        <span>今日收入: {{ memberAmountData.income }}</span>
      </div>

    </div>
    <div id="type_wrap"></div>
    <div class="data">
      <el-tabs
        v-model="activeTabName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="上周數據"
          name="weekData"
        ></el-tab-pane>
        <el-tab-pane
          label="每月數據"
          name="monthData"
        ></el-tab-pane>

      </el-tabs>

      <div id="revenue_wrap">
      </div>
    </div>

  </div>

</template>

<script >

import { MemberAmount } from '@/api/homeData.js'
import { reactive, onMounted, ref } from '@vue/composition-api';
export default {
  name: 'home',
  setup (props, { root }) {


    /*-----------------初始化數值----------------------*/
    const revenue = ref('0')
    const activeTabName = ref('weekData')
    const barXAxisData = reactive({ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] })
    const memberAmountData = reactive({
      total: 0,
      newToday: 0,
      income: 0,
    })

    /*---------函數聲明-------------*/

    //( echart- 餅狀圖數據)
    const drawTypeChart = () => {
      let myChart = root.$echarts.init(document.getElementById("type_wrap"))
      window.onresize = function () {
        myChart.resize()
      }
      let option = reactive({

        title: {
          text: '本月營銷類型分布',
          left: 'center',
          top: 0,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 120,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },

        series: [
          {
            name: '各類銷售',
            type: 'pie',
            radius: '80%',
            center: ['55%', '60%'],
            data: [
              { value: 335, name: '剪髮' },
              { value: 310, name: '染髮' },
              { value: 274, name: '燙髮' },
              { value: 235, name: '護理' },
              { value: 400, name: '其他' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#ff2b44',
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      })
      myChart.setOption(option);
    }
    //( echart- 柱狀圖數據)
    const drawRevenue = () => {
      let myChart = root.$echarts.init(document.getElementById("revenue_wrap"))
      window.onresize = function () {
        myChart.resize()
      }
      const option = reactive({
        grid: {
          y: 40,
        },
        xAxis: {
          type: 'category',
          data: barXAxisData.data
        },
        yAxis: [
          {
            type: 'value',
            name: '金額',
            // min: 0,
            // max: 200,
            // interval: 0,
            axisLabel: {
              formatter: '{value} '
            }
          }
        ],
        series: [{
          data: [3040, 4200, 11150, 6120, 4120, 10120, 22120, 4120, 11200, 3150, 9120, 3120],
          type: 'bar',
          color: '  #374bbc',
        }]

      })
      myChart.setOption(option, true)
    }
    //( echart- tab切換)
    const handleClick = (tab, event) => {
      if (activeTabName.value === 'weekData') {
        barXAxisData.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      } else {
        barXAxisData.data = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',]
      }
      drawRevenue()
    }




    const getMemberAmountData = () => {
      let time = new Date().getTime()
      MemberAmount(time).then(res => {
        for (let key in memberAmountData) {
          if (memberAmountData[key] || memberAmountData[key] == 0) {
            memberAmountData[key] = res.data[key]
          }
        }
        /* memberAmountData.total = res.data.total
           memberAmountData.newToday = res.data.newToday
           memberAmountData.income = res.data.income*/
      }).catch(err => {
        console.log(err);
      })
    }

    onMounted(() => {
      drawTypeChart()
      drawRevenue()
      getMemberAmountData()
    })

    return {
      memberAmountData,
      getMemberAmountData,
      barXAxisData,
      activeTabName,
      handleClick,
      drawRevenue,
      drawTypeChart,
      revenue
    }
  }
}



/* let time = new Date()
     let timer = time.getMilliseconds()
     let nowSeconds = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()
    console.log(nowSeconds)
     let targetSeconds = 8 * 3600
      targetSeconds + 24 * 3600 - nowSeconds
     console.log(targetSeconds + 24 * 3600 - nowSeconds);*/
</script>
<style lang="scss" scoped>
.content {
  background-color: #f7f7f7 !important;
}
.up {
  border-bottom: 15px solid #f7f7f7;
  height: 150px;
}
#MembershipCard_wrap:before {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.data {
  width: 55vw;
  float: left;
  padding-left: 45px;
  border-left: 15px solid #f7f7f7;
}
#type_wrap {
  height: 250px;
}
#type_wrap,
#MembershipCard_wrap {
  top: 25px;

  float: left;
  text-align: center;

  span {
    display: inline-block;
    margin-left: 20px;
    padding: 3rem 7rem;
    vertical-align: middle;
    color: #ffff;
    font-weight: 700;
    font-size: 20px;
    border-radius: 10px;
    box-shadow: 6px 12px 7px rgba(0, 0, 0, 0.1);
  }
  span:nth-child(1) {
    background: #374bbc;
  }
  span:nth-child(2) {
    background: #19c959;
  }
  span:nth-child(3) {
    background: #ff2b44;
  }
}
#type_wrap {
  width: 20vw;
}
#MembershipCard_wrap {
  width: 80vw;
}

#revenue_wrap {
  width: 100%;
  height: 325px;
}
#revenue_wrap /deep/ div {
  top: 0px;
}
</style>



    