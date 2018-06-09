<template>
    <div class="footer">
        <router-link to="/product">商品列表</router-link>
        <router-link to="/detail">交易记录</router-link>
        <router-link to="/personal">个人中心</router-link>
    </div>
</template>
<script>
    export default {
        name: 'my-footer',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>
<style scoped lang='less'>
    .footer {
        height: 88px;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 2;
        background: rgba(0, 0, 0, .7);
        display: flex;
        a {
            width: 33.33%;
            text-align: center;
            padding-top: 48px;
            &:nth-of-type(1) {
                background: url('../../image/home.png') center 10px no-repeat;
                background-size: 32px;
            }
            &:nth-of-type(2) {
                background: url('../../image/stock_line.png') center 10px no-repeat;
                background-size: 32px;
            }
            &:nth-of-type(3) {
                background: url('../../image/personal.png') center 10px no-repeat;
                background-size: 32px;
            }
        }
        .router-link-active {
            &:nth-of-type(1) {
                color:#57c2ff;
                background: url('../../image/home_active.png') center 10px no-repeat;
                background-size: 32px;
            }
            &:nth-of-type(2) {
                color:#57c2ff;
                background: url('../../image/stock_line_active.png') center 10px no-repeat;
                background-size: 32px;
            }
            &:nth-of-type(3) {
                color:#57c2ff;
                background: url('../../image/personal_active.png') center 10px no-repeat;
                background-size: 32px;
            }
        }
    }
</style>