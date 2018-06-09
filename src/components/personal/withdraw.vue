<template>
  <div class="widthdraw">
      <my-content>
        <div class="widthdraw_content">
            <div class="change_card" @click="myCard">
                <span>到账银行卡: </span><span class="card_types">{{cardNum}}</span>
                <mt-actionsheet
                    :actions="actions"
                    v-model="sheetVisible"
                >
                </mt-actionsheet>
            </div>
            <div class="change_money">
                <div>最大可转出金额：<span class="show_money">{{myMoney}} 元</span></div>
                <div><b>¥</b> <input type="number" v-model="widthdrawMoney"><span class="widthdraw_all" @click="widthdrawAll">全部转出</span></div>
            </div>
            <div class="widthdraw_btn" @click="widthdraw">立即转出</div>
        </div>
      </my-content>
  </div>
</template>
<script>

    export default {
        name:'widthdraw',
        data () {
            return{
                msg:'widthdraw',
                cardNum:'',
                sheetVisible:false,
                myMoney:'5555.66',
                widthdrawMoney:'',
                actions:[{'name':'中国银行(4444)','method':this.changeCard},{'name':'中国邮政(8888)','method':this.changeCard},{'name':'添加银行卡','method':this.addCare}]
            }
        },
         watch: {
            widthdrawMoney: function (val, oldVal) {
                if (this.widthdrawMoney  >= this.myMoney) {
                    this.widthdrawMoney = this.myMoney
                }
            },
        },
        methods:{
            changeCard(a){
                this.cardNum = a.name;
            },
            addCare(){
                this.actions.unshift({'name':'招商银行(9999)','method':this.changeCard});
            },
            myCard(){
                this.sheetVisible = true
            },
            widthdraw(){

            },
            widthdrawAll(){
                this.widthdrawMoney = this.myMoney
            }
        },
        mounted(){
            this.cardNum = this.actions[0].name
        }
    }
</script>
<style scoped lang='less'>
    .widthdraw_content{
        padding: .5rem .3rem;
        background: #fff;
    }
    .change_card{
        border-bottom: 1px solid #999;
        padding: .3rem 0
    }
    .card_types{
        color: #57c2ff
    }
    .show_money{
        display: inline-block;
        min-width: .5rem;
        color: #333
    }
    .widthdraw_all{
        font-size: .12rem;
        color: #57c2ff
    }
    .change_money{
        div:nth-of-type(1){
            padding: .3rem 0;
        }
        padding: .3rem 0;
        b{
            color: #333;
            font-size: .56rem
        }
        input{
            border-bottom: 1px solid #999;
            margin-right: .2rem;
        }
    }
    .widthdraw_btn{
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