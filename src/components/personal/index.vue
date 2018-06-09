<template>
    <div class="personal">
        <!-- <my-header :goBack='true'>
            <div slot="title">个人中心</div>
        </my-header> -->
        <my-content>
            <div class="user_msg">
                <div><img src="../../image/personal_icon.png" alt=""></div>
                <div class="user_money">账号余额：<span>{{myMoney}}</span></div>
            </div>
            <div class="personal_money">
                <div><router-link to="/recharge" ><p><img src="../../image/recharge_icon.png" alt=""></p>充值</router-link></div>
                <div><router-link to="/withdraw" ><p><img src="../../image/withdraw_icon.png" alt=""></p>提现</router-link></div>
                <div><router-link to="/flowing" ><p><img src="../../image/flowing_icon.png" alt=""></p>账单流水</router-link></div>
            </div>
            <div class="personal_record">
                <div><router-link to="/rechargeRecord" ><p><img src="../../image/withdraw_icon.png" alt=""></p><span>提现记录</span><b>></b> </router-link></div>
                <div><router-link to="/rechargeRecord" ><p><img src="../../image/recharge_icon.png" alt=""></p><span>充值记录</span><b>></b> </router-link></div>
                <!-- <div><router-link to="/historyOrder" ><p><img src="../../image/flowing_icon.png" alt=""></p><span>历史订单</span><b>></b> </router-link></div> -->
                <div><router-link to="/qrcode" ><p><img src="../../image/tuiguang_icon.png" alt=""></p><span>推广二维码</span><b>></b> </router-link></div>
                <div><router-link to="/changeMsg" ><p><img src="../../image/change_msg_icon.png" alt=""></p><span>信息修改</span><b>></b> </router-link></div>
                <div><p><img src="../../image/tuichu_icon.png" alt=""></p><span>退出</span><b>></b></div>
            </div>



            <!-- <router-link to="/personal/play" >6666666666666666</router-link>
            <router-link to="/personal/account" >3333333333333dfdf</router-link>
            <router-view></router-view> -->
        </my-content>
        <div>
           
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    export default {
        name: 'personal',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                geohash:'555',
                shopId:'8989',
                myMoney:888888
            }
        },
        mounted(){
            
            
        },
        methods: {
            showMyScore(){
                // this.$router
            }
        }
    }
</script>
<style scoped lang='less'>
    .user_msg{
        width: 100%;
        padding: .6rem 0;
        text-align: center;
        img{
            width: 1.5rem;
            margin-bottom: .3rem
        }
        .user_money{
            font-size: .36rem;
            span{
                color: orange;
                font-size: .36rem;
            }
        }
    }
    .personal_money{
        width: 100%;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        padding: .3rem 0;
        overflow: hidden;
        div{
            width: 33.333%;
            text-align: center;
            float: left;
            a{
                font-size: .32rem;
            }
            img{
                width: 30%;
                margin-bottom: .15rem
            }
        }
    }
    .personal_record{
        width: 100%;
        div{
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #999;
            p{
                height: 100%;
                padding: .31rem .3rem;
                float: left;
                img{
                    width: .88rem;
                }
            } 
            span{
                float: left;
                font-size: .36rem;
            }
            b{
                float: right;
                padding: 0 .3rem;
                font-size: .44rem;
                color: #fff;
            }
        }
    }
</style>

