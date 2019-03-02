<template>
    <div class="up-wrapper">
        <div class="header">
            <mu-icon-button primary icon="navigate_before" @click="goHome()"/>
            <div class="header-text">个人信息</div>
        </div>
        <div class="features">
            <mu-tabs value="username">
                <mu-tab class="user-name" value="username" :title="username"/>
            </mu-tabs>
            <mu-list>
                <mu-list-item title="修改昵称" @click="changeNickName">
                    <mu-icon slot="left" value="create"/>
                    <mu-icon slot="right" value="navigate_next"/>
                </mu-list-item>
                <mu-list-item title="修改密码" @click="changePassword">
                    <mu-icon slot="left" value="security"/>
                    <mu-icon slot="right" value="navigate_next"/>
                </mu-list-item>
                <mu-list-item title="我的订单" @click="myOrder">
                    <mu-icon slot="left" value="content_paste"/>
                    <mu-icon slot="right" value="navigate_next"/>
                </mu-list-item>
                <mu-list-item title="收货地址" @click="myAddress">
                    <mu-icon slot="left" value="content_paste"/>
                    <mu-icon slot="right" value="navigate_next"/>
                </mu-list-item>
            </mu-list>
        </div>
        <div class="logoff">
            <mu-raised-button label="退出登录" primary @click="logoff()"/>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      hostUrl: 'http://120.78.183.161:8080/bookstore',
      username: ''
    }
  },
  methods: {
    goHome () {
      this.$router.push('/user/personal-center')
    },
    changeNickName () {
      this.$router.push('/user/changeNick')
    },
    changePassword () {
      this.$router.push('/user/changePassword')
    },
    myOrder () {
      this.$router.push('/user/no')
    },
    myAddress () {
      this.$router.push('/user/changeAddress')
    },
    logoff () {
      this.$axios(
        {
          url: '/logoff',
          method: 'get',
          baseURL: this.hostUrl
        }.then(response => {
          localStorage.removeItem('bs_account')
          sessionStorage.clear()
          this.$router.push('/Login')
        })
      )
    }
  },
  created () {
    this.account = localStorage.getItem('bs_account')
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
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-right: 50px;
  font-size: 30px;
  color: white;
  text-align: center;
}
.user-name {
  background: #3287cc;
  width: 100%;
  font-size: 20px;
  color: white;
  text-align: center;
}
.features {
  background: #fff;
  width: 100%;
  height: 70%;
}
.mu-list {
  width: 100%;
  height: 100%;
}
.logoff {
  background: #fff;
  width: 100%;
  height: 10%;
  text-align: center;
}
.mu-raised-button {
  width: 70%;
  height: 85%;
}
</style>
