<template>
  <div>
    <span>Order Confirm</span>
    <div class="container">
      <div class="checkout-order">
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span>地址</li>
            <li class="cur"><span>确认</span>商品</li>
            <li><span>付</span>款</li>
            <li><span>确认</span>订单</li>
          </ul>
        </div>

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>订单详情</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>购买书籍</li>
                <li>单价</li>
                <li>数量</li>
                <li>价格</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in this.a" >
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="item.photo">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.bookName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.price}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">×{{item.num}}</span>
                      </div>
                    </div>
                    <div class="item-stock item-stock-no"></div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <p>￥{{item.price * item.num}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <!--li>
                <span>书籍总数:</span>
                <span>{{subTotal|currency('￥')}}</span>
              </li>
              <li>
                <span>邮寄费:</span>
                <span>{{shipping|currency('￥')}}</span>
              </li>
              <li>
                <span>折扣:</span>
                <span>{{discount|currency('￥')}}</span>
              </li>
              <li>
                <span>税费:</span>
                <span>{{tax|currency('￥')}}</span>
              </li-->
              <li class="order-total-price">
                <span>总价格:</span>
                <span>{{all()|currency('￥')}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <router-link class="btn btn--m" to="/address">上一页</router-link>
          </div>
          <div class="next-btn-wrap">
            <button class="btn btn--m btn--red" @click="payMent">付款</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {currency} from './../util/currency'
  import axios from 'axios'
  export default{
      data(){
          return{
              shipping:0,
              discount:0,
              tax:0,
              subTotal:0,
              hostUrl:"http://120.78.183.161:8080/bookstore",
          }
      },

    created(){
      this.a = JSON.parse(localStorage.getItem('order'));
    },

      filters:{
        currency:currency
      },
      methods:{
        all: function () {
          var all = 0;
          for(let count = 0; count < this.a.length; count++)
          {
            all += this.a[count].num * this.a[count].price;
          }
          return all;
        },
        payMent(){
          let self=this;
          let userId = localStorage.getItem('userId');
          let _url = '/order/submitOrder';
          for(let i = 0; i < this.a.length; i++)
          {
            self.$axios({
              url:_url,
              methods:'post',
              baseURL:this.hostURL,
              data:{
                bookId: this.a[i].bookId,
                num: this.a[i].num,
                userId: userId,
                totalPirce: this.a[i].num * this.a[i].price,
              },
            }).then((response)=>{

            }).catch((error)=>{
              this.$message({
                type:'info',
                message:'connection fail,press F12 to see the error in console'
              });
              console.log("ERROR:");
              console.log(error);
            });
          }
          this.$router.push({name:'os'})
        }
      },

  }
</script>
