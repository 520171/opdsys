<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item v-if="showHidden">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" min-width="60" v-if="showHidden" >
      </el-table-column>
      <el-table-column type="index" min-width="100" :index="(page-1)*20+1">
      </el-table-column>
      <el-table-column prop="u_name" label="姓名" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="u_userid" label="userid" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="u_gender" label="性别" min-width="150" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="u_jobno" label="工号" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="d_name" label="部门" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="u_flag" label="员工类别" min-width="150" :formatter="formatU_falg" sortable>
      </el-table-column>
      <el-table-column label="QRCode" min-width="150">
        <template scope="scope">
          <el-button size="small" @click="showQRCode(scope.$index, scope.row)" icon="el-icon-opdico"></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" v-if="showHidden">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="u_name">
          <el-input v-model="editForm.u_name" auto-complete="off" @focus="editForm.u_userid = getUserid(editForm.u_name)"
                    @blur="editForm.u_userid = getUserid(editForm.u_name)"></el-input>
        </el-form-item>
        <el-form-item label="userid" prop="u_userid">
          <el-input v-model="editForm.u_userid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="u_gender">
          <el-radio-group v-model="editForm.u_gender">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工号" prop="u_jobno">
          <el-input v-model="editForm.u_jobno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="d_no">
          <el-select v-model="editForm.d_no" placeholder="请选择" filterable clearable>
            <el-option :key="department.d_name" v-for="department in this.$store.state.departments" :label="department.d_name" :value="department.d_no" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别" prop="u_flag">
          <el-radio-group v-model="editForm.u_flag">
            <el-radio class="radio" :label="0">普通员工</el-radio>
            <el-radio class="radio" :label="1">维修人员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="addForm.name" auto-complete="off" @focus="addForm.u_userid = getUserid(addForm.name)"
                    @blur="addForm.u_userid = getUserid(addForm.name)" ></el-input>
        </el-form-item>
        <el-form-item label="userid" prop="u_userid">
          <el-input v-model="addForm.u_userid" auto-complete="off"></el-input>
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
        <el-form-item label="类别" prop="u_flag">
          <el-radio-group v-model="addForm.u_flag">
            <el-radio class="radio" :label="0">普通员工</el-radio>
            <el-radio class="radio" :label="1">维修人员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="QRCodeTitle" :visible.sync="QRCodeVisible" :close-on-click-modal="false" style="text-align: center" >
      <el-image
        :src="imgSrc"
        :preview-src-list="[imgSrc]">
      </el-image>
    </el-dialog>
  </section>
</template>

<script>

import { getUserListPage, removeUsers, editUser, addUser, showQRCode } from '../../api/api'
import convert from 'chinese2pinyin'

export default {
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
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列

      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        u_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        u_jobno: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        d_no: [
          { required: true, message: '部门不能为空', trigger: 'blur' }
        ],
        u_userid: [
          { required: true, message: 'userid不能为空', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        u_name: '',
        u_userid: '',
        u_gender: 1,
        u_jobno: '',
        d_no: '',
        u_flag: 0
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
        ],
        u_userid: [
          { required: true, message: 'userid不能为空', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        u_userid: '',
        sex: -1,
        jobNum: '',
        d_no: '',
        u_flag: 0
      },
      imgSrc: '',
      QRCodeVisible: false,
      QRCodeTitle: ''
    }
  },
  methods: {
    // 性别显示转换
    formatSex (row, column) {
      return row.u_gender === 1 ? '男' : row.u_gender === 0 ? '女' : '未知'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getUsers()
    },
    // 获取用户列表
    getUsers () {
      let para = {
        page: this.page,
        name: this.filters.name
      }
      this.listLoading = true
      getUserListPage(para)
        .then((res) => {
          // console.log(`para: ${para}`)
          // console.log(`res: ${res}`)
          this.total = res.data.total
          this.users = res.data.users
          this.listLoading = false
          let dep = this.$store.state.departments || {}
          const departments = Object.assign(dep, res.data.departments)
        })
        .catch(err => {
          console.log(err)
          this.listLoading = false
        })
    },

    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该员工吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          let para = { id: row.u_jobno }
          removeUsers(para)
            .then((res) => {
              if (res.data.code === 200) {
                this.listLoading = false
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getUsers()
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
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      // console.log(this.editForm)
    },
    // 显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
      this.addForm = {
        name: '',
        sex: 1,
        jobNum: '',
        d_no: '',
        u_flag: 0,
        u_userid: ''
      }
    },
    // 编辑
    editSubmit () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let para = Object.assign({}, this.editForm)
            editUser(para)
              .then((res) => {
                if (res.data.code === 200) {
                  this.editLoading = false
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.$refs['editForm'].resetFields()
                  this.editFormVisible = false
                  this.getUsers()
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
    addSubmit: function () {
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
                    this.getUsers()
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
    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      let ids = this.sels.map(item => item.u_jobno)
      this.$confirm('确认删除选中的员工吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { id: ids }
        removeUsers(para)
          .then((res) => {
            if (res.data.code === 200) {
              this.listLoading = false
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getUsers()
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
    formatU_falg (row, column) {
      return row.u_flag ? '维修人员' : '普通员工'
    },
    showQRCode (index, row) {
      showQRCode({ name: row.u_name, jobNo: row.u_jobno})
        .then(result => {
          this.imgSrc = result.data.imgDir
          this.QRCodeVisible = true
          this.QRCodeTitle = `${ row.u_name }的个人报修码`
        })
        .catch(err => {
          this.imgSrc = ''
          this.QRCodeVisible = false
          this.QRCodeTitle = `${ row.u_name }的个人报修码`
        })

    },
    getUserid (username) {
      return convert({
        cn: username,
        result: 'P'
      })
    }
  },
  mounted () {
    this.getUsers()
  }
}

</script>

<style scoped>

</style>
