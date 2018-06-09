<template>
  <div class="score">
     <my-header>
         <div slot="title">00000000000000000000</div>
     </my-header>
      <my-content>
          <!-- <router-view></router-view> -->
           <router-link to="/" >995955955959</router-link>
      </my-content>
      <my-footer></my-footer>
  </div>
</template>
<script>

    export default {
        name:'score',
        data () {
            return{
                msg:'余额'
            }
        }
    }
</script>
<style scoped lang='less'>

</style>
