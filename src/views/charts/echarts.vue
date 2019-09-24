<template>
  <section class="chart-container">
      <el-row>
          <el-col :span="12">
              <div id="chartColumn" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="12">
              <div id="chartBar" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="12">
              <div id="chartLine" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="12">
              <div id="chartPie" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="24">
              <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
          </el-col>
      </el-row>
  </section>
</template>

<script>
import echarts from 'echarts'
import { showStatistics } from '../../api/api'

export default {
  data () {
    return {
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null,
      drawPieChartData2: [],
      chartColumnData: [], // 各故障类型报修人次
      columnChartXAxis: [],

      barChartYAxis: [], // 部门列表
      barChartColumnData: [], // 各部门报修人次,
      drawPieChartData: []

    }
  },
  // computed: {
  //     drawPieChartData () {
  //       const activeSubjectsArr = []
  //       for (let i = 0; i < this.barChartYAxis.length; i++) {
  //         console.log(i);
  //         let activeSubjectsObject = {};
  //         for (let j = 0; j < this.barChartColumnData.length; j++) {
  //           if (i == j) {
  //             activeSubjectsObject.name = this.barChartYAxis[i]
  //             activeSubjectsObject.value = this.barChartColumnData[j]
  //             activeSubjectsArr.push(activeSubjectsObject);
  //           }
  //         }
  //       }
  //       return activeSubjectsArr
  //   }
  // },
  methods: {
    drawColumnChart () {
      this.chartColumn = echarts.init(document.getElementById('chartColumn'))
      this.chartColumn.setOption({
        title: { text: '报修类型' },
        tooltip: {},
        xAxis: {
          data: this.columnChartXAxis
        },
        yAxis: {},
        series: [{
          name: '报修人次',
          type: 'bar',
          data: this.chartColumnData
        }]
      })
    },
    drawBarChart () {
      this.chartBar = echarts.init(document.getElementById('chartBar'))
      this.chartBar.setOption({
        title: {
          text: '部门',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.barChartYAxis
        },
        series: [
          {
            name: '报修人次',
            type: 'bar',
            data: this.barChartColumnData
          }
        ]
      })
    },
    drawLineChart () {
      this.chartPie = echarts.init(document.getElementById('chartLine'))
      this.chartPie.setOption({
        title: {
          text: '各报修类型报修人次占比',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.ColumnChartXAxis
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.drawPieChartData2,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    drawPieChart () {
      this.chartPie = echarts.init(document.getElementById('chartPie'))
      this.chartPie.setOption({
        title: {
          text: '各部门报修人次占比',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.barChartYAxis
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.drawPieChartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    drawCharts () {
      this.drawColumnChart()
      this.drawBarChart()
      this.drawLineChart()
      this.drawPieChart()
    }
  },

  mounted: function () {
    showStatistics()
      .then(data => {
        if(200 == data.data.code){
          console.log(data.data.msg)
          this.drawPieChartData = data.data.msg
          this.barChartYAxis.length = 0
          this.barChartColumnData.length = 0

          this.drawPieChartData2.length = 0
          this.columnChartXAxis.length = 0
          this.chartColumnData.length = 0

          this.drawPieChartData.forEach(value => {
            this.barChartYAxis.push(value.name)
            this.barChartColumnData.push(value.value)
          })
          console.log(data.data.msg2)

          data.data.msg2.forEach((value, index) => {
            this.chartColumnData.push(value.num)
            this.columnChartXAxis.push(value.type === 1 ? '电脑故障' : value.type === 2 ? '打印机故障' : '其他问题')
            this.drawPieChartData2.push({ name: this.columnChartXAxis[index], value: value.num })
          })
          this.drawCharts()
        }

      })
      .catch(err => err.console.log(err))


  },
  updated: function () {
    this.drawCharts()
  }
}
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
