<template>
    <div>
      <span>Address</span>
      <div class="checkout-page">
        <div class="container">
          <div class="checkout-addr">
            <div class="page-title-normal">
              <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- process step -->
            <div class="check-step">
              <ul>
                <li class="cur"><span>确认</span>地址</li>
                <li><span>确认</span>商品</li>
                <li><span>付</span>款</li>
                <li><span>确认</span>订单</li>
              </ul>
            </div>

            <!-- address list -->
            <div class="page-title-normal checkout-title">
              <h2><span>邮寄地址</span></h2>
            </div>
            <div class="addr-list-wrap">
              <div class="addr-list">
                <ul>
                  <li>
                    <p>收货地址: {{this.userMess.address}}</p>
                  </li>
                  <!--li class="addr-new">
                    <div class="add-new-inner">
                      <i class="icon-add">
                        <svg class="icon icon-add"><use xlink:href="#icon-add"></use></svg>
                      </i>
                      <p>更改地址</p>
                    </div>
                  </li-->
                </ul>
              </div>

              <!--div class="shipping-addr-more">
                <a class="addr-more-btn up-down-btn" href="javascript:;" @click="expand" v-bind:class="{'open':limit>3}">
                  更多
                  <i class="i-up-down">
                    <i class="i-up-down-l"></i>
                    <i class="i-up-down-r"></i>
                  </i>
                </a>
              </div-->
            </div>

            <!-- shipping method-->
            <div class="page-title-normal checkout-title">
              <h2><span>送货方式</span></h2>
            </div>
            <div class="shipping-method-wrap">
              <div class="shipping-method">
                <ul>
                  <li class="check">
                    <div class="name">标准运输</div>
                    <div class="price">免费</div>
                    <div class="shipping-tips">
                      <p>一旦发货，订单应在1-7个工作日到达目的地。</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="next-btn-wrap">
              <el-button  @click="turnToOc">下一页</el-button>
            </div>
          </div>
        </div>
      </div>
      <!--modal :mdShow="isMdShow" @close="closeModal">
        <p slot="message">
          您是否确认要删除此地址?
        </p>
        <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="delAddress">确认</a>
            <a class="btn btn--m btn--red" href="javascript:;" @click="isMdShow=false">取消</a>
        </div>
      </modal-->

    </div>
</template>
<style>
</style>
<script>
  import Modal from './../components/Modal'
  import {currency} from './../util/currency'
  import axios from 'axios'
  export default{
      data(){
          return{
            userMess:{},
              limit:3,
              checkIndex:0,
              selectedAddrId:'',
              addressList:[],
              isMdShow:false,
              addressId:'',
            hostURL: 'http://120.78.183.161:8080/bookstore', // IP
          }
      },
      mounted(){
          this.getAddress();
      },
      computed:{
        addressListFilter(){
          return this.addressList.slice(0,this.limit);
        }
      },
      components:{
        Modal
      },
      methods:{
        turnToOc(){
          this.$router.push({path:'/user/oc'});
          this.$router.push({path:'/user/oc'})
        },
        getAddress(){
          let self=this;
          let _url;
          let account = localStorage.getItem('bs_account')
          _url = '/user/getUserInformation?account=' + account;//this.$route.params.account;
          self.$axios({
            url:_url,
            methods:'get',
            baseURL:this.hostURL
          }).then((response)=>{
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
          expand(){
              if(this.limit==3){
                this.limit = this.addressList.length;
              }else{
                this.limit = 3;
              }
          },
          setDefault(addressId){
              axios.post("/users/setDefault",{
                addressId:addressId
              }).then((response)=>{
                  let res = response.data;
                  if(res.status=='0'){
                     console.log("set default");
                     this.init();
                  }
              })
          },
          closeModal(){
              this.isMdShow = false;
          },
          delAddressConfirm(addressId){
            this.isMdShow = true;
            this.addressId = addressId;
          },
      }
  }
</script>
