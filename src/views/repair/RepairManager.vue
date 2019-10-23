<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="报修人姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="rangeDate"
            prefix-icon="el-icon-date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            value-format="yyyy/MM/dd"
            unlink-panels
            @change="dateChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="checkServices">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="repairs" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" min-width="60" v-if="showHidden">
      </el-table-column>
      <el-table-column type="index" min-width="100">
      </el-table-column>
      <el-table-column prop="u_name" label="报修人姓名" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="u_jobno" label="报修人工号" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="s_type" label="报修类型" min-width="150" :formatter="formatType" sortable>
      </el-table-column>
      <el-table-column prop="s_date" label="报修时间" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="s_msg" label="问题描述" min-width="350"  :formatter="formatS_msg" sortable>
      </el-table-column>
      <el-table-column label="操作" min-width=200>
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" >详情</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-if="showHidden">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" v-if="showHidden">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>

    <!--详情界面-->
    <el-dialog :visible.sync="repairMsgVisible" :close-on-click-modal="false" class="detail">
      <div>
        <div class="userInfo">
          <div class='msgTitle'>报修人基本信息</div>
          <div class="msg">工&emsp;&emsp;号：{{ repairMsg.u_jobno }}</div>
          <div class="msg">姓&emsp;&emsp;名：{{ repairMsg.u_name }}</div>
          <div class="msg">性&emsp;&emsp;别：{{ repairMsg.u_gender ? '男' : '女' }}</div>
          <div class="msg">所属部门：{{ repairMsg.d_name }}</div>
        </div>
        <br>
        <div class="repairInfo">
          <div class='msgTitle'>报修内容</div>
          <div class="msg">报修类型：{{ repairMsg.s_type===1? '电脑故障' :  repairMsg.s_type===2? '打印机故障' : '其他问题' }}</div>
          <div class="msg">报修时间：{{ repairMsg.s_date }}</div>
          <div class="msg">问题描述：{{ repairMsg.s_msg }}</div>
        </div>
        <br>
        <div v-if="showAnnex" class="annexInfo">
          <div class='msgTitle'>附件信息</div>
          <vue-viewer :images="picArr">
            <div class="annex">
              <div class="box" :key="item" v-for="item in picArr">
                <img :src="item" class="content" />
              </div>
              <div :key="item" v-for="item in videoArr" class="box">
                <video class="content" :src="item" style="max-width: 100%; max-height: 100%;" controls="controls"/>
              </div>
            </div>
          </vue-viewer>
        </div>
      </div>
    </el-dialog>
    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工号" prop="jobNum">
          <el-input v-model="addForm.jobNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="d_no">
          <el-select v-model="addForm.d_no" placeholder="请选择" filterable clearable>
            <el-option :key="department.d_name" v-for="department in this.$store.state.departments" :label="department.d_name" :value="department.d_no" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>

import { getServiceListPage, removeRepairs, editUser, addUser, getAnnexes, showExcelData } from '../../api/api'
import { export2Excel } from '../../utils/util'
const VueViewer = () => import('vue-viewerjs')
export default {
  components: { VueViewer },
  props: {
    showHidden: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      filters: {
        name: ''
      },
      repairs: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列

      repairMsgVisible: false, // 编辑界面是否显示
      editLoading: false,

      showAnnex: false,
      // 编辑界面数据
      repairMsg: {
        u_name: '',
        u_gender: -1,
        u_jobno: '',
        u_id: '',
        d_no: '',
        d_name: '',
        d_id: '',
        s_id: '',
        s_msg: '',
        s_date: '',
        s_type: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        jobNum: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        d_no: [
          { required: true, message: '部门不能为空', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        sex: -1,
        jobNum: '',
        d_no: ''
      },
      picArr: [],
      videoArr: [],
      size: 0,
      rangeDate: null,
      excelFormateData: [
        {title: '报修人姓名', key: 'u_name'},
        {title: '报修人工号', key: 'u_jobno'},
        {title: '报修人所属部门', key: 'd_name'},
        {title: '报修类型', key: 't_name'},
        {title: '报修时间', key: 's_date'},
        {title: '问题描述', key: 's_msg'}
      ],
      username: ''
    }
  },
  methods: {
    // 简化问题描述
    formatS_msg (row, column) {
      return (row.s_msg.length > 20) ? `${row.s_msg.substr(0, 20)}...` : row.s_msg
    },
    // 性别显示转换
    formatSex (row, column) {
      return row.u_gender === 1 ? '男' : row.u_gender === 0 ? '女' : '未知'
    },
    // 报修类型显示转换
    formatType (row, column) {
      return row.s_type === 1 ? '电脑故障' : row.s_type === 2 ? '打印机故障' : '其他问题'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getServices()
    },
    // 获取报修记录列表
    getServices () {
      let para = {
        page: this.page,
        name: this.username,
        date: this.rangeDate
      }
      this.listLoading = true
      getServiceListPage(para)
        .then((res) => {
          // console.log(`para: ${para}`)
          // console.log(`res: ${res.data.repairs}`)
          this.total = res.data.total
          this.repairs = res.data.repairs
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
          this.listLoading = false
        })
    },
    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该条报修记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          let para = { id: row.s_id }
          removeRepairs(para)
            .then((res) => {
              if (res.data.code === 200) {
                this.listLoading = false
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getServices()
              } else {
                this.listLoading = false
                this.$message({
                  message: '删除失败',
                  type: 'error'
                })
              }
            })
            .catch(err => {
              console.log(err)
              this.listLoading = false
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            })
        })
    },
    // 显示详情界面
    handleEdit (index, row) {
      this.repairMsgVisible = true
      this.repairMsg = Object.assign({}, row)
      // console.log(this.repairMsg)
      this.obtainAnnexes(row.s_id)

    },
    // 显示新增界面
    handleAdd () {
      this.addFormVisible = true
      this.addForm = {
        name: '',
        sex: -1,
        jobNum: '',
        d_no: ''
      }
    },
    // 编辑
    editSubmit () {
      this.$refs.repairMsg.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let para = Object.assign({}, this.repairMsg)
            editUser(para)
              .then((res) => {
                if (res.data.code === 200) {
                  this.editLoading = false
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.$refs['repairMsg'].resetFields()
                  this.repairMsgVisible = false
                  this.getServices()
                } else {
                  this.editLoading = false
                  this.$message({
                    message: '提交失败',
                    type: 'error'
                  })
                }
              })
              .catch(err => {
                console.log(err)
                this.editLoading = false
                this.$message({
                  message: '提交失败',
                  type: 'error'
                })
              })
          })
        }
      })
    },
    // 新增
    addSubmit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              this.addLoading = true
              // NProgress.start();
              let para = Object.assign({}, this.addForm)
              addUser(para)
                .then((res) => {
                  if (res.data.code === 200) {
                    this.addLoading = false
                    // NProgress.done();
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    })
                    this.$refs['addForm'].resetFields()
                    this.addFormVisible = false
                    this.getServices()
                  } else {
                    this.addLoading = false
                    this.$message({
                      message: '提交失败',
                      type: 'error'
                    })
                  }
                })
                .catch(err => {
                  console.log(err)
                  this.addLoading = false
                  this.$message({
                    message: '提交失败',
                    type: 'error'
                  })
                })
            })
        }
      })
    },
    selsChange (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove () {
      let ids = this.sels.map(item => item.s_id)
      this.$confirm('确认删除选中的记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { id: ids }
        removeRepairs(para)
          .then((res) => {
            if (res.data.code === 200) {
              this.listLoading = false
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getServices()
            } else {
              this.listLoading = false
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.log(err)
            this.listLoading = false
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          })
      })
    },
    //获取附件
    obtainAnnexes(sid){
      getAnnexes(sid)
        .then(msg => {
          if ('fail' != msg.data.message){
            if(0 === msg.data.message.length){
              this.showAnnex = false
            }else{
              this.showAnnex = true
              this.handleAnnex(msg.data.message)
            }
          }else{
            this.showAnnex = false
          }
        })
        .catch(err => {
          console.log(`错误信息：${err}`)
          this.showAnnex = false
        })
    },
    handleAnnex(annexes){
      this.picArr.length = 0;
      this.videoArr.length = 0
      for (let item of annexes){
        if(item.a_isImg){
          this.picArr.push(item.a_url)
        }else{
          this.videoArr.push(item.a_url)
        }
      }
      // console.log(this.picArr)
      // console.log(this.videoArr)
    },
    exportExcel () {
      showExcelData({ name: this.username, date: this.rangeDate })
        .then(res => {
          if(200 == res.data.code){
            export2Excel(this.excelFormateData, res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    dateChange(){
      // console.log(this.rangeDate)
      this.getServices()
    },
    checkServices () {
      this.username = this.filters.name
      this.getServices()
    }
  },
  mounted () {
    this.getServices()
  }
}
</script>

<style>
  .detail .el-dialog__header{
    padding: 10px 10px;
  }
  .detail .el-dialog__body{
    padding: 20px 20px;
  }
  .detail .msg{
    font-size: 15px;
  }
  .detail .msgTitle{
    text-align: center;
    font-size: 20px;
    color: #1d8ce0;
    font-weight: bolder;
  }

  .detail .annex{
    box-sizing: border-box;
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-wrap:wrap;
  }

  .detail .box{
    flex: 0 0 33.3333%;
    position: relative;
    box-sizing: border-box;
    padding: 5px;
    height: 176px;
    line-height: 176px;
    text-align: center;
  }
  .detail .content{
    max-width:100%;
    margin-bottom: 5px;
    max-height: 100%;
  }
  .userInfo, .repairInfo, .annexInfo{
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 10px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

</style>
