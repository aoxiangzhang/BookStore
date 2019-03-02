<template>
    <div class="up-wrapper">
        <div class="header">
            <mu-icon-button primary icon="navigate_before" @click="ToPersonalCenter()"/>
            <div class="header-text">个人中心</div>
        </div>
        <div class="form-box">
            <div class="feature">
                <div class="feature-name">修改昵称</div>
            </div>
            <mu-text-field v-model="changeNick.nickname" label="请输入新昵称"  @input="handleInput"/>
            <div class="submit-btn">
                <mu-raised-button primary label="确认" :disabled="allowSubmit" @click="submitForm"/>
            </div>
        </div>
        <mu-dialog :open="dialog" title="确认">
            确定要修改昵称？
            <mu-flat-button slot="actions" primary label="取消" @click="close"/>
            <mu-flat-button slot="actions" primary label="确定" @click="submit"/>
        </mu-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      allowSubmit: true,
      errorText: '',
      hostUrl: 'http://120.78.183.161:8080/bookstore',
      changeNick: {
        account:'',
        nickname: ''
      },
      dialog: false
    }
  },
  methods: {
    handleInput (value) {
      var vm = this.$data
      var reg = /[^\w\u4E00-\u9fa5]/
      vm.errorText = ''
      if (!value) {
        vm.allowSubmit = true
        vm.errorText = '昵称不能为空'
      } else {
        vm.allowSubmit = false
      }
    },
    ToPersonalCenter () {
      this.$router.push('/user/personal-center')
    },
    submitForm () {
      this.dialog = true
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
      var acc = localStorage.getItem('bs_account')
      var postdata = {
            account:acc,// account:JSON.parse(acc),
            nickname:vm.changeNick.nickname
            }
      this.$axios({
        url: '/user/updateNickname',
        method: 'post',
        baseURL: vm.hostUrl,
        data: postdata
        })
        .then(response => {
            console.log(response.data)
            this.$message({
            type: 'success',
            message: '修改成功'
            })
            localStorage.setItem('bs_username', vm.changeNick.nickname)

          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
        .catch(error => {
          console.log('Error:', error)
          this.$message({
            type: 'warning',
            message: '网络无连接'
          })
          localStorage.setItem('bs_username', vm.changeNick.nickname)
        })
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
