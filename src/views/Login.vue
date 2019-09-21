<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin } from '../api/api'
const crypto = require('crypto')
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 (ev) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true
          let loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass, remeber: this.checked }
          requestLogin(loginParams)
            .then(data => {
              this.logining = false
              console.log(data)
              let { msg, code, user } = data
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                })
              } else {
                this.$router.push({ path: '/RepairList' })
              }
            })
            .catch(err => {
              console.log(err)
              this.logining = false
              this.$message({
                message: '网络出错',
                type: 'error'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    decrypt(data) {
      // 解密数据  解密方式要和加密时使用的一致
      const decipher = crypto.createDecipher('aes-256-cfb', 'opd')
      let decrypted = decipher.update(data, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    }
  },
  mounted () {
    if(this.$cookies.isKey('user')) {
      this.checked = true
      const {account, password} = JSON.parse(this.decrypt(this.$cookies.get('user')))
      this.ruleForm2.account = account
      this.ruleForm2.checkPass = password
    }else{
      this.checked = false
    }
  }
}

</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
