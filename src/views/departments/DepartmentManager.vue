<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="部门名称" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDepartments">查询</el-button>
        </el-form-item>
        <el-form-item v-if="showHidden">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="departments" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" min-width="60" v-if="showHidden">
      </el-table-column>
      <el-table-column type="index" min-width="100" :index="(page-1)*20+1">
      </el-table-column>
      <el-table-column prop="d_no" label="部门编号" min-width="200" sortable>
      </el-table-column>
      <el-table-column prop="d_name" label="部门名称" min-width="600" sortable>
      </el-table-column>
      <el-table-column label="操作" min-width="350" v-if="showHidden">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="部门编号" prop="d_no">
          <el-input v-model="editForm.d_no" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="d_name">
          <el-input v-model="editForm.d_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editDepartment" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
        <el-form-item label="部门编号" prop="d_no">
          <el-input v-model="addForm.d_no" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="d_name" >
          <el-input v-model="addForm.d_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { getDepartmentListPage, addDepartment, removeDepartments, updateDepartment } from '../../api/api'
export default {
  props: {
    showHidden: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      listLoading: false,
      editFormVisible: false,
      editLoading: false,
      addFormVisible: false,
      addLoading: false,

      total: 0,
      page: 1,

      sels: [],
      departments: [],

      filters: {
        name: ''
      },
      editForm: {
        d_no: 0,
        d_name: ''
      },
      // 新增界面数据
      addForm: {
        d_no: '',
        d_name: ''
      },
      // 输入验证
      addFormRules: {
        d_no: [
          { required: true, message: '部门编号不能为空', trigger: 'blur' }
        ],
        d_name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ]
      },
      // 编辑验证
      editFormRules: {
        d_no: [
          { required: true, message: '部门编号不能为空', trigger: 'blur' }
        ],
        d_name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    selsChange (sels) {
      this.sels = sels
    },
    getDepartments () {
      let para = {
        page: this.page,
        name: this.filters.name
      }
      this.listLoading = true
      getDepartmentListPage(para)
        .then((res) => {
          console.log(`para: ${para}`)
          console.log(`res: ${res}`)
          this.total = res.data.total
          this.departments = res.data.departments
          this.listLoading = false
          const departments = Object.assign(this.$store.state.departments, res.data.departments)
          this.$store.commit('storeDepartments', departments)
        })
        .catch(err => {
          console.log(err)
          this.listLoading = false
        })
    },
    handleEdit (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 显示新增界面
    handleAdd () {
      this.addFormVisible = true
      this.addForm = {
        d_no: '',
        d_name: ''
      }
    },
    // 新增部门提交
    addSubmit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              this.addLoading = true
              // NProgress.start();
              let para = Object.assign({}, this.addForm)
              addDepartment(para)
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
                    this.getDepartments()
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
    // 批量删除
    batchRemove () {
      let ids = this.sels.map(item => item.d_no)
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { id: ids }
        console.log(para)
        removeDepartments(para)
          .then((res) => {
            if (res.data.code === 200) {
              this.listLoading = false
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getDepartments()
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
    handleCurrentChange (val) {
      this.page = val
      this.getUsers()
    },
    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该部门吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { id: row.d_no }
        removeDepartments(para)
          .then((res) => {
            if (res.data.code === 200) {
              this.listLoading = false
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getDepartments()
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
    // 编辑
    editDepartment () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              this.editLoading = true
              let para = Object.assign({}, this.editForm)
              updateDepartment(para)
                .then((res) => {
                  if (res.data.code === 200) {
                    this.editLoading = false
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    })
                    this.$refs['editForm'].resetFields()
                    this.editFormVisible = false
                    this.getDepartments()
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
            .catch(err => {
              console.log(err)
              this.editLoading = false
              this.$message({
                message: '提交失败',
                type: 'error'
              })
            })
        }
      })
    }
  },
  mounted () {
    this.getDepartments()
  }
}
</script>
