<template>
	<div class="order_detail_main" >
         <!-- <div class="load_btn_box">
            <el-button class="load1_btn" type="button" @click="getOrder">订单详情</el-button>
            <el-button class="load2_btn" type="button" @click="getBook">书籍详情</el-button>
            <el-button class="load3_btn" type="button" @click="getAddress">地址详情</el-button>
        </div> -->
        <div class="order_detail_content">
    		<div class="order_info_item_box">
                <div class="num_price_box">
                    <p>¥ {{orderEntity.totalPrice}}</p>
                    <p>共 {{orderEntity.num}} 款</p>
                </div>
                <div class="order_info">
                    <p>单号：{{orderEntity.orderId}}</p>
                    <p>交易时间：{{orderEntity.time}}</p>
                </div>
            </div>
             <div class="order_info_item_box">
                <el-button class="load_btn" type="button" @click="getBook">书籍详情</el-button>
                <div class="books_item_box">
                    <div class="books_img_box">
                        <img :src="bookDetail.photo" :alt="bookDetail.bookName" class="books_img">
                    </div>
                    <div class="books_info_item">
                        <span class="item_name">书籍名称：</span><span class="item_value">{{bookDetail.bookName}}</span>
                    </div>
                    <div class="books_info_item">
                        <span class="item_name">书籍作者：</span><span class="item_value">{{bookDetail.author}}</span>
                    </div>
                    <div class="books_info_item">
                        <span class="item_name">书籍描述：</span><span class="item_value">{{bookDetail.description}}</span>
                    </div>
                    <div class="books_info_item">
                        <span class="item_name">书籍分类：</span><span class="item_value">{{bookDetail.category}}</span>
                    </div>
                   <div class="books_info_item">
                        <span class="item_name">书籍价格：</span><span class="item_value">¥{{bookDetail.price}}</span>
                    </div>
                </div>
            </div>

            <div class="order_info_item_box">
                <el-button class="load_btn" type="button" @click="getOrder">订单详情</el-button>
                <div class="item_box">
                    <div class="info_item">
                        <span class="item_name">商品件数：</span><span class="item_value">{{orderEntity.num}}件</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">商品总价：</span><span class="item_value">¥{{orderEntity.totalPrice}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">订单金额：</span><span class="item_value">¥{{orderEntity.totalPrice}}</span>
                    </div>
                </div>
            </div>

            <div class="order_info_item_box">
                <el-button class="load_btn" type="button" @click="getAddress">地址详情</el-button>
                <div class="item_box">
                    <div class="info_item">
                        <span class="item_name">收货地址：</span><span class="item_value">{{user.address}}</span>
                    </div>
                </div>
            </div>
            <div class="order_info_item_box">
                <h2 class="info_item_title">支付</h2>
                <div class="item_box">
                    <div class="info_item">
                        <span class="item_name">支付状态：</span><span class="item_value">{{orderEntity.status}}</span>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  data(){
    return {
      hostUrl:"http://120.78.183.161:8080/bookstore",
      bookDetail: {
        author:'',
        price:'',
        photo:'',
        description:'',
        category:'',
        bookName:'',
        bookId:''
      },
      orderEntity: {
        orderId: '',
		bookId: '',
		userId: '',
		num: '',
		time: '',
		totalPrice:'',
		status:''
      },
      user: {
          account:'',
          userId:'',
          address:''
      }
    }
  },

  methods: {
      getOrder(){
        var self = this;
        var url = this.hostUrl;
        let orderEntity= {
            orderId: '2',
		    bookId: '',
		    userId: '',
		    num: '',
		    time: '',
		    totalPrice:'',
		    status:''
        };
        url = url +'/order/getOrderById?orderId='+orderEntity.orderId;
        self.$http({
        method:'GET',
        url: url
        }).then(function(response){
            console.log(response.data);
            self.orderEntity.orderId = response.data.orderId;
            self.orderEntity.bookId = response.data.bookId;
            self.orderEntity.userId = response.data.userId;
            self.orderEntity.num = response.data.num;
            self.orderEntity.time = response.data.time;
            self.orderEntity.totalPrice = response.data.totalPrice;
            if(response.data.status=='0'){
               self.orderEntity.status ="未支付";
            }else if(response.data.status=='1'){
                self.orderEntity.status ="已支付未收货";
            }else{
                self.orderEntity.status ="已收货";
            }
            // getBook(response.data.bookId);
             },function(error){
                 console.log('【Error】:', error);
                 })
        },
        getBook(){
        var bk = this;
        var burl = this.hostUrl;
        let bookDetail = {
            author:'',
            price:'',
            photo:'',
            description:'',
            category:'',
            bookName:'',
            bookId:'1'
        };
         burl = burl+'/book/getBookById?bookId='+bookDetail.bookId;
        bk.$http({
            method:'GET',
            url: burl
            }).then(function(response){
                console.log(response.data);
                bk.bookDetail.author = response.data.author;
                bk.bookDetail.bookId = response.data.bookId;
                bk.bookDetail.price = response.data.price;
                bk.bookDetail.photo = response.data.photo;
                bk.bookDetail.description = response.data.description;
                bk.bookDetail.category = response.data.category;
                bk.bookDetail.bookName = response.data.bookName;
                },function(error){
                    console.log('【Error】:', error);
                })
        },
        getAddress(){
            var addr = this;
            var aurl = this.hostUrl;
            let user= {
                account:'123456789',
                userId:'',
                address:''
            };
            aurl = aurl+'/user/getUserInformation?account='+user.account;
            addr.$http({
                method:'GET',
                url: aurl
                }).then(function(response){
                    console.log(response.data);
                    addr.user.userId = response.data.userId;
                    addr.user.address = response.data.address;
                    },function(error){
                        console.log('【Error】:', error);
                    })
        },
        created () {
            this.account = localStorage.getItem('bs_account')
        }
  }
}
</script>

<style scoped>
.order_detail_main {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;
  bottom: 0;
  background: rgb(192, 206, 233);
  box-sizing: border-box;
  overflow: hidden;
}

.order_detail_content {
  max-height: 100%;
  padding: 0 2%;
  overflow: auto;
}

.order_info_item_box {
  position: relative;
  border: 1px solid #efefef;
  border-radius: 4px;
  line-height: 1.6;
  margin: 2% auto;
}

.order_info_item_box.blank_bottom {
  margin-bottom: 1.4rem;
}
.order_title {
 position:absolute;
  top:10px;
  left:0px;
  background: rgb(192, 206, 233);
}
.load_btn{
  background: rgb(192, 206, 233);
  color: #7f7f7f;
  font-size: 30px;
  padding: 0.28rem 0.24rem 0 0.024rem;
}
.num_price_box {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  vertical-align: middle;
  width: 30%;
  text-align: center;
}

.empty_order_info_item {
  min-height: 2.8rem;
}

.order_info {
  display: inline-block;
  vertical-align: middle;
  width: 60%;
  border-left: 1px solid #efefef;
  margin-left: 30%;
  box-sizing: border-box;
  padding: 10px 5px;
}

.info_item_title {
  color: #7f7f7f;
  font-size: 30px;
  padding: 0.28rem 0.24rem 0 0.024rem;
}

.books_item_box {
  font-size: 0;
  padding: 0.28rem;
}

.books_item_box + .books_item_box {
  border-top: 1px solid #efefef;
}

.books_img_box,
.books_info_box {
  display: inline-block;
  vertical-align: middle;
}

.books_img_box {
  position: relative;
  width: 32%;
  padding-top: 25%;
  overflow: hidden;
}

.books_img {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}

.books_info_box {
  font-size: 12px;
  width: 68%;
  box-sizing: border-box;
  padding-left: 0.28rem;
}

.item_name {
  font-size: 20px;
  font-weight: bolder;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
}

.item_box {
  padding: 0 0.28rem 0.28rem 0.28rem;
  line-height: 2;
  font-size: 0;
}


.info_item {
  position: relative;
}

.item_name,
.item_value {
  display: inline-block;
  font-size: 12px;
  vertical-align: top;
}

.item_name {
  width: 5.5em;
}

.item_value {
  width: calc(100% - 5.5em);
}
</style>
