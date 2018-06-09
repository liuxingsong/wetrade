<template>
  <div class="header">
      <div class="left" @click="goback">
          <slot name="left" ><</slot>
      </div>
      <div class="title">
          <slot name="title">{{msg}}</slot>
      </div>
      <div class="right">
          <slot name="right">...</slot>
      </div>
  </div>
</template>
<script>
    export default {
        name: 'my-header',
        props: ['goBack','signinUp', 'headTitle'],
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
        }
    }
</script>
<style scoped lang='less'>
    @base-size:32px;
    .header{
        height: 80px;
        line-height: 80px;
        width: 100%;
        // background: rgb(175, 214, 240);
        text-align: center;
        .left,.right{
            width: 15%;
        }
        .title{
            width: 70%;
        }
        >div{
            float: left;
            font-size:@base-size;
            div {
               font-size:@base-size;
            }
        }
    }
</style>
