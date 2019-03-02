<template>
  <el-row>
    <div class="header">
      <div class="user-info">
        <el-dropdown trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link">
                    <!-- <img class="user-logo" src="../../../static/img/img.jpg"> -->
                  {{name}}
                </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout" @click="logoff()">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="nav-menu">
        <el-menu theme="dark" active-text-color="#040404" text-color="#040404" high="100%" class="el-menu-demo" mode="horizontal" id="navigator" unique-opened router>
          <template v-for="item in items">
              <el-menu-item :index="item.index">
                <template class="nav-tab"><i :class="item.icon"></i><span class="nav-tab">{{ item.title }}</span></template>
              </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        name: 'l dont know',
        hostUrl:'http://120.78.183.161:8080/bookstore',
        items: [
          {
            icon: 'el-icon-menu',
            index: '/user/main-interface',
            title: '首页',
          },
          {
            icon: 'el-icon-goods',
            index: '/user/shopping-cart',
            title: '购物车',
          },
          {
            icon: 'el-icon-tickets',
            index: '/user/no',
            title: '我的订单',
          },
          {
            icon: 'el-icon-setting',
            index: '/user/personal-center',
            title: '个人信息',
          }
        ]
      }
    },
    created() {
      this.getUserMess();
    },
    computed:{
      username(){
        let username = localStorage.getItem('ms_username');
        this.name = username;
      },

    },
    methods:{
      getUserMess(){
        let self=this;
        let _url;
        _url = '/user/getUserInformation?account=' + localStorage.getItem('bs_account');//this.$route.params.account;
        self.$axios({
          url:_url,
          methods:'get',
          baseURL:this.hostUrl
        }).then((response)=>{
          localStorage.setItem('ms_username', response.data.nickname)
          localStorage.setItem('userId', response.data.userId)
          this.name = response.data.nickname
        }).catch((error)=>{
          this.$message({
            type:'info',
            message:'connection fail,press F12 to see the error in console'
          });
          console.log("ERROR:");
          console.log(error);
        });
      },
      handleCommand(command) {
        if(command == 'loginout'){
          this.$axios({
            url: '/user/logoff',
            method: 'get',
            baseURL: this.hostUrl
          })
            .then((response) => {
              localStorage.removeItem('ms_username');
              sessionStorage.clear();
              this.$router.push('/login');
            })
            .catch((error) => {
              localStorage.removeItem('ms_username');
              sessionStorage.clear();
              this.$router.push('/login');
            });
        }
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
    }
  }
</script>

<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    line-height: 50px;
    color: #fff;
  }
  .nav-menu{
    float:right;
    line-height:50px;
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #040404;
  }
  .el-menu-demo {
    background-color: #eeeeee;
    /*text-color: #ffffff;
    active-text-color: #ffDDDD;
    high: 50px;*/
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #040404;
    cursor: pointer;
    vertical-align: middle;
  }
  .nav-tab{
    font-size: 16px;
    height: 50px;
  }
</style>
