<template>
  <div class="recharge">
      <my-header :goBack='true'>
            <div slot="title">充值</div>
            <div slot="right"></div>
        </my-header>
      <my-content>
         <div class="pay_ways">
            <div v-for="(data,idnex) in options" @click='changeway' class="pay_ways_item"> 
                <span>{{data.label}}</span> <input type="radio" :value="data.value" v-model="type">
            </div>
         </div>
        <div class="recharge_num">
            <span>充值金额：</span> <input type="text" placeholder="请输入金额" v-model="money">
        </div>
        <div class="choose_num">
            <div v-for="msg in moneyArr" @click='changeMoney(msg)' class="choose_num_item" :class="{'active':money == msg}"> 
                <span>{{msg}}</span>
            </div>
        </div>

        <div class="recharge_btn" @click="recharge">确认充值</div>
      </my-content>
  </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name:'recharge',
        data () {
            return{
                msg:'recharge',
                type:'2',
                money:0,
                moneyStatus:false,
                options : [
                    {
                        label: '银联快捷支付',
                        value: '0',
                    },
                    {
                        label: 'QQ钱包支付',
                        value: '1'
                    },
                    {
                        label: '微信扫码支付',
                        value: '2'
                    },
                    {
                        label: '支付宝扫码支付',
                        value: '3'
                    }
                ],
                moneyArr:['100','200','500','1000','2000','5000'],
                
            }
        },
        methods:{
            changeway(){
                let that = this
                setTimeout(function(){
                    console.log(that.type);
                },50)
            },
            changeMoney(value){
                 let that = this
                setTimeout(function(){
                    that.money = value;
                   
                    console.log(that.money);
                },50)
            },
            recharge(){
                if (this.money > 0) {
                    console.log('999');
                }else{
                  let instance = Toast('8989898');
                    setTimeout(() => {
                        instance.close();
                    }, 1000);
                }
                
            }
        },
        beforeUpdate(){
        },
        mounted(){
            
        },
    }
</script>
<style scoped lang='less'>
    .pay_ways{
        margin: .15rem 0;
        .pay_ways_item{
            padding: .3rem;
            margin: .1rem 0;
            border-left: .1rem solid #fff;
            background:#444;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: .16rem
        }
    }
    .recharge_num{
        background: #444;
        margin: .3rem 0;
        padding: .3rem;
        input{
            width: 50%;
            height: .5rem;
            border-radius: .05rem;
            padding-left: .1rem;
        }
    }
    .choose_num{
        width: 100%;
        padding: .3rem 0;
        overflow: hidden
    }
    .choose_num_item{
        width: 20%;
        height: .5rem;
        margin: .3rem 6.5%;
        float: left;
        background: #fff;
        border-radius: .05rem;
        span{
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: .5rem;
            text-align: center;
        }
    }
    .active{
        background: #57c2ff;
         span{
           color: #fff;
        }
    }
    .recharge_btn{
        width: 60%;
        height: .6rem;
        text-align: center;
        background: orange;
        color: #000;
        line-height: .6rem;
        border-radius: .05rem;
        margin: .3rem auto
    }
</style>
