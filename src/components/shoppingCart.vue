<template>
  <div class="shoppingCart">
    <el-header>
      <h1 class="head">购物车</h1>
      <div class="headLine"></div>
    </el-header>
    <div class="cartTable">
      <el-row>
        <el-col :span="4"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
        <el-col :span="9">商品信息</el-col>
        <el-col :span="3">单价（元）</el-col>
        <el-col :span="3">数量</el-col>
        <el-col :span="3">金额（元）</el-col>
        <el-col :span="2">操作</el-col>
      </el-row>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedbooks" @change="handleCheckedBooksChange">
        <div class="table" v-for="item in cart">
          <el-row>
            <el-col :span="1"><el-checkbox :label="item.cartId"></el-checkbox></el-col>
            <el-col :span="4"><img :src="item.photo" /></el-col>
            <el-col :span="8"><p>{{item.bookName}}</p></el-col>
            <el-col :span="3"><p>￥{{item.price}}</p></el-col>
            <el-col :span="3"><el-input-number v-model="item.num" style="width: 90px" @change="handleChange" :min="1" :max="item.inventory" size="mini"></el-input-number></el-col>
            <el-col :span="3"><p style="color: #dd3333;">￥{{(item.price * item.num).toFixed(2)}}</p></el-col>
            <el-col :span="2"><el-button @click="deleteItem(item.cartId)" type="text">删除</el-button></el-col>
          </el-row>
        </div>
      </el-checkbox-group>
      <div class="settleAccounts">
        <el-row>
          <el-col :span="6"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
          <el-col :span="8"><el-button type="text" @click="open">清除购物车</el-button></el-col>
          <el-col :span="4"><p>已选商品{{this.checkedbooks.length}}件</p></el-col>
          <el-col :span="4"><p>合计：{{all}}</p></el-col>
          <el-col :span="2"><el-button type="primary" class="sAButton" @click="settleAccount()">结算</el-button></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data(){
      return{
        cart:[
          /*{
            bookId: 1,
            cartId: 1,
            bookName: "东周列国那锅粥",
            price: 1000.0,
            num: 3,
            inventory:15,
            photo:require('../assets/2.jpg'),
          },
          {
            bookId: 2,
            cartId: 2,
            bookName: "东周列国那锅粥",
            price: 1000.0,
            num: 3,
            inventory:15,
            photo:require('../assets/2.jpg'),
          },
          {
            bookId: 3,
            cartId: 3,
            bookName: "东周列国那锅粥",
            price: 1000.0,
            num: 3,
            inventory:15,
            photo:require('../assets/2.jpg'),
          },
          {
            bookId: 4,
            cartId: 4,
            bookName: "东周列国那锅粥",
            price: 1000.0,
            num: 3,
            inventory:15,
            photo:require('../assets/2.jpg'),
          },
          {
            bookId: 5,
            cartId: 5,
            bookName: "东周列国那锅粥",
            price: 1000.0,
            num: 3,
            inventory:15,
            photo:require('../assets/2.jpg'),
          },*/
        ],
        books:[],
        hostURL:  'http://120.78.183.161:8080/bookstore',
        checkAll: false,
        isIndeterminate: false,
        checkedbooks: [],
      }
    },
    computed:{
      all: function() {
        var all = 0;
        for(var i = 0; i < this.checkedbooks.length; i++)
        {
          for(var j = 0; j < this.cart.length; j++)
          {
            if(this.checkedbooks[i] == this.cart[j].cartId)
            {
              all += this.cart[j].price * this.cart[j].num;
              j = 0;
              i++
            }
          }
        }
        return all
      }
    },
    methods: {
      settleAccount() {
        var a = [];
        var all = 0;
        if (this.checkedbooks.length == 0) {
          this.$message({
            type: 'info',
            message: '请选择商品！！！'
          });
        }
        else {
          for (var i = 0; i < this.checkedbooks.length; i++) {
            for (var j = 0; j < this.cart.length; j++) {
              if (this.checkedbooks[i] == this.cart[j].cartId) {
                a[i] = this.cart[j];
                all += this.cart[j].price * this.cart[j].num;
                i++
                j = 0;
              }
            }
          }
          for (var i = 0; i < a.length; i++) {
            this.deleteItem(a[i])
          }
          localStorage.setItem('order', JSON.stringify(a));
          this.$router.push({name: 'ad'})
        }
      },

      handleChange(value) {
        console.log(value);
      },
      handleCheckAllChange(val) {
        if(this.checkAll == true)
          this.checkedbooks = this.books;
        this.checkedbooks = val ? this.books : [];
        this.isIndeterminate = false;
      },
      handleCheckedBooksChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.books.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.books.length;
      },
      getCartList(){
        var self=this;
        var _url = '/cart/getItems?userId='+ localStorage.getItem('userId');//用户ID（long）////////////////////////////////////+this.category;
        self.$axios({
          url:_url,
          methods:'get',
          baseURL:this.hostURL
        }).then((response)=>{
          self.cart = response.data;
        }).catch((error)=>{
          this.$message({
            type:'info',
            message:'connection fail,press F12 to see the error in console'
          });
          console.log("ERROR:");
          console.log(error);
        });
      },
      fresh(){
        this.getCartList();
        this.books = [];
        for(var i = 0; i < this.cart.length; i++)
          this.books[i] = this.cart[i].cartId;
      },
      deleteItem(val){
        var self=this;
        var _url = '/cart/deleteItem?cartId=' + val;
        self.$axios({
          url:_url,
          methods:'get',
          baseURL:this.hostURL
        }).then((response)=>{
          if(response.data.success == true)
          {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.fresh();
          }
          else
            this.$message({
              type: 'info',
              message: '删除失败'
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
      cleanCart(){
        var self=this;
        var _url = '/cart/clearItems?userId='+ localStorage.getItem('userId');//用户ID（long）/////////////////////////////////////+this.category;
        self.$axios({
          url:_url,
          methods:'get',
          baseURL:this.hostURL
        }).then((response)=>{
          if(response.data.success == true)
          {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.fresh();
          }
          else
            this.$message({
              type: 'info',
              message: '删除失败'
            });
        }).catch((error)=>{
          this.$message({
            type:'info',
            message:'删除失败'
          });
          console.log("ERROR:");
          console.log(error);
        });
      },
      open(){
        this.$confirm('此操作将永久删除购物车, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cleanCart();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted: function () {
      this.fresh()
    },
  }
</script>

<style scoped>
  .settleAccounts{
    position: fixed;
    Bottom: 0px;
    width: 56%;
    height: 5%;
    background-color: #ccd0d2;
    vertical-align: middle;
    padding: 0.4%;
    padding-right: 0%;
  }
  .sAButton{
    height: 100%;
    Right: 0px;
    width: 90px;
  }
  .shoppingCart{
    width: 56%;
    margin-left: 22%;
  }
  .head{
    margin-bottom: 10px;
  }
  .headLine{
    height: 5px;
    width: 100%;
    background-color: #DD0606;
  }
  .cartTable{
    margin: 4% 0% 4% 0%;
  }
  .table{
    width: 100%;
    height: 120px;
    margin-bottom: 0px;
    background-color: #fafafa;
    padding: 10px;
    border: 1px solid #ccd0d2;
    border-bottom-color: #ececec;
    border-top-color: #ececec;
  }
  img{
    height: 100px;
    width: auto;
  }
</style>
