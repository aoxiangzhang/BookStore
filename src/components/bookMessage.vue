<template>
  <div >
    <div class="bookMessage">
      <div class="crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><a href="/#/user/main-interface"><i class="el-icon-menu"></i>首页</a></el-breadcrumb-item>
          <el-breadcrumb-item>{{this.book.category}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.book.bookName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bookImg"><img :src="this.book.photo"></div>
      <el-row>
        <div class="intro">
          <div class="message">
            <h1 style="color: black; margin-bottom: 20px">{{book.bookName}}</h1>
            <p>{{book.description}}</p>
            <h4 style="color: #000000; margin-bottom: 10px">作者：{{book.author}}</h4>
            <h4 style="color: #dd3333; margin-bottom: 10px">{{book.price}}￥</h4>
            <h4 style="color: black; margin-bottom: 10px">库存：{{book.inventory}}</h4>
          </div>
          <el-button plain type="primary" class="buttomlocation" @click="addToCart()">加入购物车</el-button>
          <el-button type="primary" class="buttomlocation" @click="settleAccount()">立即购买</el-button>
        </div>
      </el-row>
    </div>
    <div class="messbox">
      <el-tabs type="card" v-model="activePane" @tab-click="tabClick">
        <el-tab-pane label="评论" name="comment">
          <div class="inputarea">
            <el-input type="textarea" maxlength="1000" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入评论" v-model="input" clearable>
            </el-input>
            <el-button class="buttomlocation" @click="addToComment()">发表评论</el-button>
          </div>
          <div class="comment">
            <div class="comment-list" v-for="item in comments">
              <el-row>
                <el-col :span="5"><p style="color: #DD0606">{{item.userNickname}}</p></el-col>
                <el-col :span="19"><p>{{item.content}}</p></el-col>
              </el-row>
              <div class="message-info ui grid">
                <div class="row">
                  <div class="">
                    {{item.time}}
                  </div>
                  <!--div class="eight wide column col-right">
                    <div class="ui label">
                      <a href="#" @click="addPraise(item._id)">
                        <i class="like outline icon"></i>
                        <div class="detail">{{item.praise}}</div>
                      </a>
                    </div>
                    <div class="ui label" @click="addCriticize(item._id)">
                      <a href="#">
                        <i class="dislike outline icon"></i>
                        <div class="detail">{{item.criticize}}</div>
                      </a>
                    </div>
                    <div class="ui label">
                      <a href="#" @click="isShowModal=true;delId=item._id">
                        删除
                        <i class="delete icon"></i>
                      </a>
                    </div>
                  </div-->
                </div>
              </div>
            </div>
            <div class="message-list no-data" v-show="comments.length===0">
              <p>
                暂无数据
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="简介" name="introduction">
          这是一个简介
        </el-tab-pane>
        <el-tab-pane label="目录" name="directory">
          这是一个目录
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import bus from './bus.js'
export default {
  data() {
    return{
      activePane: 'comment',
      comments:[],
      hostURL:  'http://120.78.183.161:8080/bookstore',
      input:'',
      order:[],
      book:{
        "bookId":0,
        "bookName":'',
        author: '',
        price:0.0,
        description:'',
        inventory:0,
        category:'',
        photo:'',
      },
    }
  },
  mounted: function(){
    this.getBookMessage();
  },
  methods:{
    settleAccount(){
      this.book.num = 1;
      this.order[0] = this.book;
      localStorage.setItem('order', JSON.stringify(this.order));
      this.$router.push({name: 'ad'})
    },
    getBookMessage(){
      var self=this;
      let bookId = localStorage.getItem('bookId');
      var _url = '/book/getBookById?bookId=' + bookId;//书籍ID
      self.$axios({
        url:_url,
        methods:'get',
        baseURL:this.hostURL
      }).then((response)=>{
        this.book = response.data;
        this.getComment();
      }).catch((error)=>{
        this.$message({
          type:'info',
          message:'connection fail,press F12 to see the error in console'
        });
        console.log("ERROR:");
        console.log(error);
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addToCart(){
      var self=this;
      var _url = '/cart/addItem';
      let userId = localStorage.getItem('userId');
      self.$axios({
        url:_url,
        method: 'post',
        data:{
          bookId:this.book.bookId,
          num: 1,
          userId: userId,
        },
        baseURL:this.hostURL,
      }).then((response)=>{
        console.log(response.data);
        if(response.data.success == true)
        {
          this.$message({
            type: 'success',
            message: '添加成功'
          });
        }
        else
          this.$message({
            type: 'info',
            message: '添加失败'
          });
      }).catch((error)=>{
        this.$message({
          type:'info',
          message:'connection fail,press F12 to see the error in console'
        });
        console.log("ERROR:");
        console.log(error);
      });
    },
    addToComment(){
      if(this.input.length == 0)
        this.$message({
          type: 'info',
          message: '评论不能为空！'
        });
      else if(this.input.length > 1000)
        this.$message({
          type: 'info',
          message: '评论不能超过1000字符'
        });
      else{
        var self=this;
        let userId = localStorage.getItem('userId');
        let userName = localStorage.getItem('ms_username');
        var _url = '/comment/addComment';
        self.$axios({
          url:_url,
          method: 'post',
          data:{
            content: this.input,
            userId: userId,
            userNickname: userName,
            bookId: this.book.bookId,
          },
          baseURL:this.hostURL,
        }).then((response)=>{
          if(response.data.success == true)
          {
            this.$message({
              type: 'success',
              message: '添加成功',
            });
            this.getComment();
          }
          else
            this.$message({
              type: 'info',
              message: '添加失败'
            });
        }).catch((error)=>{
          this.$message({
            type:'info',
            message:'connection fail,press F12 to see the error in console'
          });
          console.log("ERROR:");
          console.log(error);
        });
      }
    },
    getComment(){
      var self=this;
      var _url = '/comment/getComments?bookId=' + this.book.bookId;//书籍ID
      self.$axios({
        url:_url,
        methods:'get',
        baseURL:this.hostURL
      }).then((response)=>{
        this.comments = response.data;
        var i = 0;
        for(i = 0; i < this.comments.length; i++){
          var a = this.comments[i].time;
          this.comments[i].time = a.substr(0, 4) + '-' + a.substr(4,2) + '-' + a.substr(6,11);
        }
      }).catch((error)=>{
        this.$message({
          type:'info',
          message:'connection fail,press F12 to see the error in console'
        });
        console.log("ERROR:");
        console.log(error);
      });
    },
  },
  computed(){
  }
}
</script>

<style>
  .bookMessage{
    width: 56%;
    margin-left: 22%;
    margin-top: 30px;
    /*height: 500px;*/
  }
  .crumb{
    vertical-align: middle;
    margin: 1%;
  }
  .bookImg{
    padding: 3% 0% 3% 0%;
    width: 35%;
    height: auto;
    border: 1px #cababa solid;
    margin: 3%;
    float: left;
  }
  .bookImg img{
    position: static;
    margin-left: 10%;
    width: 80%;
    height: auto;
  }
  .intro{
    margin-top: 5%;
    float: right;
    width: 55%;
    height: 100%;
  }
  .buttomlocation{
    text-align: right;
    float: right;
  }
  p{
    color: #666666; margin-bottom: 20px; font-size: 16px;
  }
  .message{
    width: 100%;
    text-align: left;
  }
  .messbox{
    width: 52%;
    margin-left:24%;
    margin-top: 50px;
  }
  .comment{
    border: 1px solid #DEDEDE;
    padding: 1rem;
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15);
    border-radius: .28571429rem;
    margin-top: 50px;
  }
  .comment-list{
    border: 1px solid #DEDEDE;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: .28571429rem;
  }
  .ui{
    display: inline-block;
  }
  .no-data{
    text-align: center;
  }

</style>
