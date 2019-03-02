<template>
    <div class="up-wrapper">
        <div class="header">
            <mu-icon-button primary icon="navigate_before" @click="ToPersonalCenter()"/>
            <div class="header-text">个人中心</div>
        </div>
        <div class="form-box">
            <div class="feature">
                <div class="feature-name">修改密码</div>
            </div>
            <mu-text-field type="password" v-model="changePassword.password" label="请输入新密码" @input="handleNewPassword"/>
            <div class="submit-btn">
                <mu-raised-button primary label="确认" :disabled="check" @click="submitForm"/>
            </div>
        </div>
        <mu-dialog :open="dialog" title="确认">
            确定要修改密码？
            <mu-flat-button slot="actions" primary label="取消" @click="close"/>
            <mu-flat-button slot="actions" primary label="确定" @click="submit"/>
        </mu-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      hostUrl: 'http://120.78.183.161:8080/bookstore',
      check: true,
      newPasswordError: '',
      changePassword: {
        account: '',
        password: ''
      },
      dialog: false
    }
  },
  methods: {
    handleNewPassword (value) {
      var vm = this.$data
      var reg = /^[a-zA-Z0-9]+$/
      vm.newPasswordError = ''
      if (!value) {
        vm.check = true
        vm.newPasswordError = '密码不能为空'
      } else {
        vm.check = false
      }
    },
    ToPersonalCenter () {
      this.$router.push('/user/personal-center')
    },
    close () {
      this.dialog = false
      this.$message({
        type: 'info',
        message: '已取消'
      })
    },
    submit () {
      var vm = this
      // var acc = localStorage.getItem('bs_account')
      var postData = {
        account: '123456789',// account:JSON.parse(acc),
        password: ''
      }
      // postData.account = vm.changePassword.account
      postData.password = vm.changePassword.password
      this.$axios({
        url: '/user/updatePassword',
        method: 'post',
        baseURL: vm.hostUrl,
        data: postData
      })
        .then(response => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
             localStorage.setItem('bs_password', vm.changePassword.password)
        })
        .catch(error => {
          console.log('Error:', error)
          this.$message({
            type: 'warning',
            message: 'AJAX FAIL'
          })
        })
    },
    submitForm () {
      var vm = this
      console.log(vm.changePassword)
        this.dialog = true
      },
    created () {
        this.account = localStorage.getItem('bs_account')
      }
    }
}
</script>

<style scoped>
.header {
  background: #3287cc;
  width: 100%;
  height: 20%;
}
.mu-icon-button {
  float: left;
}
.header-text {
  padding-top: 10px;
  padding-right: 50px;
  width: 100%;
  height: 100%;
  font-size: 30px;
  text-align: center;
  color: white;
}
.form-box {
  width: 100%;
  height: 80%;
  text-align: center;
  margin-top: 5%;
  padding: 0 10% 0 5%;
}
.feature {
  width: 100%;
  height: 15%;
}
.feature-name {
  width: 100%;
  height: 100%;
  font-size: 20px;
  text-align: center;
}
.mu-text-field {
  width: 80%;
}
.submit-btn {
  width: 100%;
}
.mu-raised-button {
  width: 80%;
}
</style>
