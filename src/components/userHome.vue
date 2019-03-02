<template>
  <div class="wrapper">
    <v-head></v-head>
    <!--v-side-bar></v-side-bar-->
    <div class="content">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
  </div>
</template>

<script>
  import vHead from './userHeader.vue';
  import vSideBar from './mainSideBar.vue';
  export default {
    data () {
      return {
        hostUrl: 'http://120.78.183.161:8080/bookstore',
      }
    },
    components:{
      vHead,
      vSideBar
    },
    mounted() {
      console.log("home active");
      // console.log(sessionStorage.getItem('ms_type'));
      // var sessionType = sessionStorage.getItem('ms_type')
      // if(sessionType != 0){
      //     this.$router.push('/nologin');
      // }
    },

  }
</script>

<style>

</style>
