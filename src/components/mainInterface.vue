<template>
  <div class="wrapper">
    <div class="sidebar">
      <el-container>
        <el-header class="p">书籍分类</el-header>
        <el-menu default-active="全部书籍" background-color="#efefef" class="el-menu-vertical-demo">
          <div v-for="item in items">
            <el-menu-item @click="changeCategory(item.index)" index="item.index">
              {{ item.title }}
            </el-menu-item>
          </div>
        </el-menu>
      </el-container>
    </div>
    <div class="booklist">
        <ul class="book-list">
          <li class="book-item" v-for="item in bookList">
            <el-button plain class="buttonsize" @click="turnToBook(item)">
              <div class="book-img"><img :src="item.photo"> </div>
              <div class="intro">
                <div class="message">
                  <h3 style="color: black; margin-bottom: 10px">{{item.bookName}}</h3>
                  <p>{{item.description}}</p>
                  <h4 style="color: #000000; margin-bottom: 0px">作者：{{item.author}}</h4>
                  <h4 style="color: #dd3333; margin-bottom: 0px">售价：{{item.price}}￥</h4>
                  <h4 style="color: black; margin-bottom: 0px">库存：{{item.inventory}}</h4>
                </div>
                <!--el-button type="primary" class="buttomlocation" @click="addToCart(item)">加入购物车</el-button-->
              </div>
            </el-button>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import bus from './bus.js'
  export default {
    data() {
      return{
        category: '全部书籍',
        userMess:{},
        hostURL:  'http://120.78.183.161:8080/bookstore',
        bookList:[
          {
            "bookId":1,
            "bookName":'东周列国那锅粥',
            author: '天际孤鸿',
            price:'1000.00',
            decription:'这是一本书：这就是中华民族自强不息的精神，几千年来的文明史',
            inventory:'1',
            category:'',
            photo:require('../assets/2.jpg'),
          },
          {
            "bookId":2,
            "bookName":'东周列国那锅粥',
            author: '天际孤鸿',
            price:'1000.00',
            decription:'这是一本书：这就是中华民族自强不息的精神，几千年来的文明史',
            inventory:'1',
            category:'',
            photo:require('../assets/2.jpg'),
          },
          {
            "bookId":3,
            "bookName":'东周列国那锅粥',
            author: '天际孤鸿',
            price:'1000.00',
            decription:'这是一本书：这就是中华民族自强不息的精神，几千年来的文明史',
            inventory:'1',
            category:'',
            photo:require('../assets/2.jpg'),
          },
          {
            "bookId":4,
            "bookName":'东周列国那锅粥',
            author: '天际孤鸿',
            price:'1000.00',
            decription:'这是一本书：这就是中华民族自强不息的精神，几千年来的文明史',
            inventory:'1',
            category:'',
            photo:require('../assets/2.jpg'),
          },
        ],//ji cheng
        items: [
          {
            icon: 'el-icon-menu',
            index: '全部书籍',
            title: '全部书籍',
          },
          {
            icon: 'el-icon-setting',
            index: 'software',
            title: '软件',
          },
          {
            icon: 'el-icon-menu',
            index: 'programming',
            title: '编程',
          },
        ],
      }
    },

    methods:{
      changeCategory(val){
        this.category = val;
        this.getBookList();
      },
      getUserMess(){
        let self=this;
        let _url;
        this.account = localStorage.getItem('bs_account')
        _url = '/user/getUserInformation?account=' + this.account;//this.$route.params.account;
        self.$axios({
          url:_url,
          methods:'get',
          baseURL:this.hostURL
        }).then((response)=>{
          localStorage.setItem('ms_username', response.data.nickname)
          localStorage.setItem('userId', response.data.userId)
          self.userMess = response.data;
        }).catch((error)=>{
          this.$message({
            type:'info',
            message:'connection fail,press F12 to see the error in console'
          });
          console.log("ERROR:");
          console.log(error);
        });
      },
      turnToBook(val){
        this.$router.push({ name: 'book-message'})
        localStorage.setItem('bookId', val.bookId)
      },
      addToCart(val){
        var self=this;
        var _url = '/cart/addItem';
        self.$axios({
          url:_url,
          methods:'post',
          baseURL:this.hostURL
        }).then((response)=>{
          if(response.data == true)
          {
            this.$message('添加成功');
          }
          else
            this.$message('添加失败');
        }).catch((error)=>{
          this.$message({
            type:'info',
            message:'connection fail,press F12 to see the error in console'
          });
          console.log("ERROR:");
          console.log(error);
        });
      },
      getBookList(){
        let self=this;
        let _url;
        if(this.category == '全部书籍')
          _url = '/book/getBooks';
        else
          _url = '/book/searchBook?category=' + this.category;
        self.$axios({
          url:_url,
          methods:'get',
          baseURL:this.hostURL
        }).then((response)=>{
          self.bookList = response.data;
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
    mounted: function () {
      this.getBookList();
      this.getUserMess();
    },
    computed:{
      onRoutes(){
        // return this.$route.path.replace('/','');
      }
    }
  }
</script>

<style scoped>
  .p {
    font-size: 26px;
    height: 50px;
    line-height: 50px;
    position: inherit;
    background-color: #DD0606;
    color: #ffffff;
    text-align: center;
  }
  .sidebar{
    display: block;
    position: absolute;
    width: 15%;
    left: 10%;
    top: 0px;
    bottom:0;
    background: #efefef;
  }
  .buttomlocation{
    margin-right: 10%;
    float: right;
  }
  p{
    color: #333333; margin-bottom: 10px; width: 250px; font-size: 14px;
  }
  .message{
    height: 150px;
    width: 250px;
    text-align: left;
  }
  .buttonsize{
    width: 100%;
    height: 100%;
    white-space: pre-wrap;
  }
  .booklist {
    background: none repeat scroll 0 0 #fff;
    position: fixed;
    top: 100px;
    bottom:0;
    width: auto;
    padding:10px;
    left:28%;
    overflow-y: scroll;
  }

  /*=======================================*/
  ul {
    list-style: none;
    display: block;
  }
  li {
    list-style-type:none;
    width:100%;
    /*border:1px solid #ccc;*/
  }
  .book-list{
    width:100%;
  }
  .book-item{
    float:left;
    width:500px;
    height:240px;
    padding: 0px;
  }
  .book-img{
    float: left;
    top: 5%;
    width: 40%;
    height: 100%;
    background-size:contain
  }
  .book-img img{
    width: auto;
    max-width: 100%;
    height: 100%;
  }
  .book-item h3{
    margin-top:6px;
    margin-bottom:6px;
    font-size: 20px;
    font-weight: lighter;
  }
  .intro {
    height: 240px;
    width: 250px;
    padding: 0px;
    float: right;
  }
</style>
