<template>
    <div class="product-page">
        <!-- <my-header>
        <div slot="title">首页</div>
    </my-header> -->
        <my-content>
            <table class="table-cont">
                <thead>
                    <tr>
                        <th>商品名称</th>
                        <th>现价</th>
                        <th>最低</th>
                        <th>最高</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in productList" @click="getDetail(item)">
                        <td>{{item.name}}</td>
                        <td>
                            <span :class="[item.items.data.open>=item.items.data.price ? 'to-up' : 'to-down']">{{item.items.data.price}}</span>
                        </td>
                        <td :class="[item.items.data.open>=item.items.data.price ? 'td-to-up' : 'td-to-down']">{{item.items.data.price_min}}</td>
                        <td :class="[item.items.data.open>=item.items.data.price ? 'td-to-up' : 'td-to-down']">{{item.items.data.price_max}}</td>
                    </tr>
                </tbody>
            </table>
        </my-content>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default {
        name: 'product',
        data() {
            return {
                productList: [],
                productTimer: ''
            }
        },
        methods: {
            // testToast(){
            //     Toast({
            //         message: "提示",
            //         position: 'center',
            //         duration: 2000,
            //     });
            // }
            getDetail(item) {
                let argu = { id: item.id, name: item.name };
                console.log(argu);
                this.$router.push({
                    name: 'detail',
                    params: argu
                })
            }
        },
        created() {
            // this.productTimer = setInterval(() => {
            this.$axios.get('http://api.wetrade.wxhc.top/product?include=items').then((res) => {
                if (res.status == 200) {
                    this.productList = res.data.data;
                }
            })
            // }, 300);
        },
        mounted() {

        },
        destroyed() {
            clearInterval(this.productTimer);
        }
    }
</script>
<style scoped lang='less'>
    .table-cont {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
        tr {
            border-bottom: 1px solid #666;
            /*no*/
            width: 100%;
            height: 80px;
            color: #fff;
            th {
                background: #666;
                color: #333;
            }
            td {
                &:nth-of-type(2) {
                    span.to-down {
                        width: 180px;
                        display: inline-block;
                        padding: 10px 0;
                        text-align: center;
                        border-radius: 6px;
                        background: green;
                    }
                    span.to-up {
                        width: 180px;
                        display: inline-block;
                        padding: 10px 0;
                        text-align: center;
                        border-radius: 6px;
                        background: red;
                    }
                }
            }
            .td-to-up {
                color: red
            }
            .td-to-down {
                color: green
            }
        }
        /*th{
            width:100%;
            td{
                width:20%;
                &:nth-of-type(1){
                    width:40%;
                }
            }
        }*/
    }
</style>