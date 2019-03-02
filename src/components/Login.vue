<template>
    <div class="login-wrapper">
        <div class="title-wrapper">
            <div class="bs-title">网上书店</div>
            <span class="bs-intro">购买图书一站搞定！</span>
        </div>
        <div class="bs-login">
            <el-tabs v-model="activePane">
                <el-tab-pane label="登录" name="login">
                    <el-form :model="login" :rules="loginRules" ref="login" label-width="0px" >
                        <el-form-item prop="username">
                            <el-input v-model="login.account" placeholder="邮箱"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="密码" v-model="login.password"></el-input>
                        </el-form-item>

                        <el-button class="bulocation" type="primary" @click="loginForm('login')">登录</el-button>

                        <div>
                            <br>
                            <p id="toRegister">Tips : 没有账号？<span @click="goToRegister" id="register">请注册 </span></p>
                        </div>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="注册" name="register">
                    <el-form :model="register"  ref="register" label-width="0px">
                        <el-form-item prop="username">
                            <el-input v-model="register.account" placeholder="账号"></el-input>
                        </el-form-item>
                        <el-form-item prop="nickname">
                            <el-input placeholder="昵称" v-model="register.nickname"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="请输入6-16位密码" v-model="register.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="repassword">
                            <el-input type="password" placeholder="确认密码" v-model="register.repassword"></el-input>
                        </el-form-item>
                        <!-- <el-form :model="register" :rules="registerRules" ref="register" label-width="0px"> -->
                    </el-form>

                        <el-button class="bulocation" type="primary" @click="registerForm('register')">注册</el-button>

                        <div>
                            <br>
                            <p id="toLogin">Tips : 已有账号？<span @click="goToLogin" id="login">去登录 </span></p>
                        </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="footer">
            <p> @2018 网上书店</p>
            <p id="help">如有问题，请联系管理员: 88888888@qq.com</p>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    var checkPwd = (rule, value, callback) =>{
      if (value === '') {
        callback(new Error('请再次输入密码!'))
      } else if (value !== this.register.password) {
        callback(new Error('两次密码不相同!'))
      } else {
        callback()
      }
    }

    var checkWord = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9]+$/
      if (value.match(reg)) {
        callback()
      } else {
        callback(new Error('密码仅可由数字与字母组成'))
      }
    }

    var checkName = (rule, value, callback) => {
      var reg = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\\\\]"
      )
      if (value.indexOf(' ') >= 0) {
        callback(new Error('请不要包含空格'))
      } else if (value.match(reg)) {
        callback(new Error('请不要输入特殊字符'))
      } else if (value.gblen() < 4 || value.gblen() > 16) {
        callback(new Error('请输入4-16位字符'))
      } else {
        callback()
      }
    }
    return {
      activePane: 'login',
      hostUrl: 'http://120.78.183.161:8080/bookstore', // IP
      login: {
        username: '',
        password: ''
      },
      loginRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      register: {
        account: '',
        nickname: '',
        password: '',
        repassword: '',
      },
      registerRules: {
        account: [
          { required: true, message: '请输入Email', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的Email格式',
            trigger: 'change'
          },
          { type: 'email', message: '请输入正确的Email格式', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { validator: checkName, trigger: 'change' },
          { validator: checkName, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkWord, trigger: 'change' },
          { validator: checkWord, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6-16之间', trigger: 'change' },
          { min: 6, max: 16, message: '长度在6-16之间', trigger: 'blur' }
        ],
        repassword: [
          // { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'change' },
          { validator: checkPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginForm (formName) {
      const self = this
      var url = this.hostUrl;
      url =url +'/user/login?account='+self.login.account;
      var account = self.login.account;
      localStorage.setItem('bs_account', account);
      var password = self.login.password;
      // console.log(account);
      self.$axios({
        url: url,
        method: 'get',
        baseURL: self.hostUrl,
        })
            .then(response => {
                 console.log(response.data)
                 localStorage.setItem('bs_password', response.data.password)
                 if(password == response.data.password){
                   localStorage.setItem('bs_isLogin', 'true')
                   self.$router.push({name: 'main-interface'})
                 }else{
                    self.$router.push('/Login');
                   self.$message({
                     title: '登录失败',
                     message: '密码或用户名错误，请重新登录！',
                     type: 'error'
                   })
                 }
            })
            .catch(error => {
              console.log('【Error】:', error)
              self.$message({
                title: '网络请求错误',
                message: '请检查网络并重试',
                type: 'error'
              })
            })
    },
    registerForm (formName) {
      if(this.register.password != this.register.repassword)
      {
        this.$message({
          type: 'info',
          message: '两次输入密码不一致'
        });
      }
      else
      {
        var self=this;
        var _url = '/user/register';
        self.$axios({
          url:_url,
          method: 'post',
          data:{
            password: self.register.password,
            account: self.register.account,
            nickname: self.register.nickname
          },
          baseURL:this.hostUrl,
        })
          .then(response => {
            if(response.data.success == true)
            {
              this.$message({
                type: 'success',
                message: '注册成功'
              });
              this.goToLogin();
            }
            else
              this.$message({
                type: 'info',
                message: '删除失败'
              });
          })
          .catch(error => {
            self.$notify({
              title: '失败',
              message: '注册失败: ' + '请重试!',
              type: 'error'
            })
            console.log('【Error】:', error)
          })
      }


    //   self.$refs[formName].validate(valid => {
    //     if (valid) {
          // 弹出注册详情
        //   const h = self.$createElement

        //   self.$notify({
        //     title: '注册信息',
        //     message: h(
        //       'pre',
        //       { style: 'color: teal' },
        //       '\n账号: ' +
        //         self.register.account +
        //         '\n昵称: ' +
        //         self.register.nickname +
        //         '\n密码: ' +
        //         self.register.repassword
        //     )
        //   })

          // 网络请求
    //       self
    //         .$axios({
    //           url: '/user/register',
    //           method: 'post',
    //           baseURL: self.hostUrl,

    //           data: {
    //             password: self.register.password,
    //             account: self.register.account,
    //             nickname: self.register.nickname
    //           }
    //         })
    //         .then(response => {
    //           if (response.data.code === 200) {
    //               console.log(response.data)
    //             self.$notify({
    //               title: '成功',
    //               message: '注册成功!',
    //               type: 'success'
    //             })
    //             self.goToLogin()
    //             self.login.account = self.register.account
    //             self.login.password = self.register.password
    //           } else {
    //             console.log(response.data.code)
    //             self.codeParsing(response.data.code)
    //           }
    //         })
    //         .catch(error => {
    //           self.$notify({
    //             title: '失败',
    //             message: '注册失败: ' + '请重试!',
    //             type: 'error'
    //           })
    //           console.log('【Error】:', error)
    //         })
    //     } else {
    //       console.log('error register!!')
    //       self.$message({
    //         title: '格式错误',
    //         message: '请检查输入域是否正确',
    //         type: 'error'
    //       })
    //       return false
    //     }
    //   })
    },

    goToRegister () {
      this.activePane = 'register'
    },

    goToLogin () {
      this.activePane = 'login'
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  margin-top: 10%;
  width: 40%;
  height: 80%;
  margin-left: 30%;
}
.title-wrapper {
  width: 100%;
  height: 10%;
  padding-top: 10px;
  text-align: center;
}
.bs-title {
  width: 100%;
  text-align: center;
  font-size: 25px;
}
.bs-intro {
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.bs-login {
  display: inline-block;
  width: 60%;
  margin-left: 20%;
  height: 80%;
  padding: 40px;
  border-radius: 5px;
}
.bulocation{
  text-align:center;
  margin-left:30%;
  width: 40%;
}
#toRegister {
  color: #999;
}
#register {
  font-weight: bold;
  text-decoration: underline;
}
#toLogin {
  color: #999;
}
#login {
  font-weight: bold;
  text-decoration: underline;
}
.footer {
  width: 100%;
  text-align: center;
  font-size: 10px;
  color: rgb(153, 153, 153);
}
#help {
  text-decoration: underline;
  cursor: help;
}
</style>
