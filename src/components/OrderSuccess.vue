<template>
    <div>

      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>确认订单</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span>地址</li>
            <li class="cur"><span>确认</span>商品</li>
            <li class="cur"><span>付</span>款</li>
            <li class="cur"><span>确认</span>订单</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>恭喜<br>订单已经完成！</h3>
            <p>
              <!--span>订单ID：{{orderId}}</span-->
              <span>订单总额：{{all()|currency('￥')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/user/shopping-cart">购物车</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/user/main-interface">商品页</router-link>
              </div>
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
                orderId:'',
                orderTotal:0
            }
        },
        components:{
        },
      created(){
        this.a = JSON.parse(localStorage.getItem('order'));
      },
        filters:{
          currency:currency
        },
      methods: {
        all: function () {
          var all = 0;
          for (let count = 0; count < this.a.length; count++) {
            all += this.a[count].num * this.a[count].price;
          }
          return all;
        },
      }
    }
</script>
