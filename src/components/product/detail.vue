<template>
    <div class="product-page">
        <my-header>
            <div slot="title">{{detailName}}</div>
        </my-header>
        <my-content>
            <div class="cur-price">
                <ul>
                    <li>
                        <span :class="[curItems.open>=curItems.price ? 'to-up' : 'to-down']">{{curItems.price}}</span>
                    </li>
                    <li>
                        <span>开盘</span>
                        <span>{{curItems.open}}</span>
                    </li>
                    <li>
                        <span>最低</span>
                        <span>{{curItems.price_min}}</span>
                    </li>
                    <li>
                        <span>最高</span>
                        <span>{{curItems.price_max}}</span>
                    </li>
                </ul>
            </div>
            <div class="k-choice">
                <ul>
                    <li :class="[activeIndex == 0?'btn-active':'']" @click="getKclassData(0)">分时</li>
                    <li :class="[activeIndex == 60?'btn-active':'']" @click="getKclassData(60)">1分</li>
                    <li :class="[activeIndex == 300?'btn-active':'']" @click="getKclassData(300)">5分</li>
                    <li :class="[activeIndex == 900?'btn-active':'']" @click="getKclassData(900)">15分</li>
                    <li :class="[activeIndex == 1800?'btn-active':'']" @click="getKclassData(1800)">30分</li>
                    <li :class="[activeIndex == 3600?'btn-active':'']" @click="getKclassData(3600)">60分</li>
                    <li :class="[activeIndex == 86400?'btn-active':'']" @click="getKclassData(86400)">日K</li>
                </ul>
            </div>
            <div id="detailKChart">

            </div>
        </my-content>
    </div>
</template>
<script>
    import dayjs from 'dayjs';
    export default {
        data() {
            return {
                detailId: '',
                detailName: '',
                detailPage: [],
                activeIndex: 60,
                curItems: {},
                curLines: [],
                dataObj: {},
                timer: 0,
                timerK: 0
            }
        },
        created() {
            this.detailId = this.$route.params.id;
            this.detailName = this.$route.params.name;
        },
        mounted() {
            this.getKclassData(this.activeIndex);
            this.timerK = setInterval(() => {
                this.getKclassData(this.activeIndex);
            }, this.activeIndex*1000);
        },
        destroyed(){
            clearInterval(this.timerK);
        },
        methods: {
            getKclassData(type) {
                clearInterval(this.timer);
                this.activeIndex = type;
                this.$axios.get(`http://api.wetrade.wxhc.top/product/${this.detailId}?include=lines,items&type=list&period=${this.activeIndex}`).then((res) => {
                    if (res.status == 200) {
                        this.detailPage = res.data.data.lines.data;
                        // console.log('处理前detail', JSON.stringify(this.detailPage));
                        this.showK(this.detailPage);
                        this.timer = setInterval(() => {
                            this.getCurrentData(this.activeIndex);
                        }, 1000);
                    }
                })
            },
            getCurrentData() {
                this.$axios.get(`http://api.wetrade.wxhc.top/product/${this.detailId}?include=lines,items&type=info&period=${this.activeIndex}`).then((res) => {
                    if (res.status == 200) {
                        // var data = this.detailPage;
                        this.curItems = res.data.data.items.data;
                        this.curLines = res.data.data.lines.data;
                        var c = this.curLines.concat();
                        var val = this.curLines.concat();
                        var vol = this.curLines.concat();
                        this.showK([], c.splice(0,1),val.splice(1,5),vol.splice(5,1));
                    }
                })
            },
            showK(datas, c, val, vol) {
                var upColor = '#00da3c';
                var downColor = '#ec0000';
                var detailKChart = this.$echarts.init(document.getElementById('detailKChart'));
                var that = this;
                function splitData(rawData) {
                    var categoryData = [];
                    var values = [];
                    var volumes = [];
                    for (var i = 0; i < rawData.length; i++) {
                        var t;
                        if (that.activeIndex == 86400) {
                            t = dayjs(rawData[i].splice(0, 1)[0]).format('YYYY-MM-DD');
                        }else{
                            t = dayjs(rawData[i].splice(0, 1)[0]).format('hh:mm');
                        }
                        
                        categoryData.push(t);
                        values.push(rawData[i]);
                        volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
                    }
                    return {
                        categoryData: categoryData,
                        values: values,
                        volumes: volumes
                    };
                }

                function calculateMA(dayCount, data) {
                    var result = [];
                    for (var i = 0, len = data.values.length; i < len; i++) {
                        if (i < dayCount) {
                            result.push('-');
                            continue;
                        }
                        var sum = 0;
                        for (var j = 0; j < dayCount; j++) {
                            sum += data.values[i - j][1];
                        }

                        var total = (parseFloat(sum) / parseFloat(dayCount)).toFixed(3);
                        result.push(+total);
                    }
                    return result;
                }
                if(datas.length > 0){
                    this.dataObj = splitData(datas);
                    console.log('data',this.dataObj);
                } else {
                    this.dataObj.categoryData.splice(this.dataObj.categoryData.length - 1, 1, that.activeIndex == 86400 ? dayjs(c[0]).format('YYYY-MM-DD'):dayjs(c[0]).format('hh:mm'));
                    this.dataObj.values.splice(this.dataObj.values.length - 1, 1, val);
                    this.dataObj.volumes.splice(this.dataObj.volumes.length - 1, 1, [this.dataObj.volumes.length - 1, vol[0], val[0] > val[1] ? 1 : -1]);
                }
                console.log('dataObj',this.dataObj);
                var option = {
                    color: ['#ffffff', '#ffab34', '#d13ca0', '#469cf3'],
                    backgroundColor: '#666',
                    animation: false,
                    legend: {
                        // bottom: 10,
                        left: '0',
                        data: ['MA5', 'MA10', 'MA20', 'MA30']
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        textStyle: {
                            color: '#000'
                        },
                        position: function (pos, params, el, elRect, size) {
                            var obj = { top: 10 };
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                            return obj;
                        }
                        // extraCssText: 'width: 170px'
                    },
                    axisPointer: {
                        link: { xAxisIndex: 'all' },
                        label: {
                            backgroundColor: '#777'
                        }
                    },
                    toolbox: {
                        show: false
                        // feature: {
                        //     dataZoom: {
                        //         yAxisIndex: false
                        //     },
                        //     brush: {
                        //         type: ['lineX', 'clear']
                        //     }
                        // }
                    },
                    brush: {
                        xAxisIndex: 'all',
                        brushLink: 'all',
                        outOfBrush: {
                            colorAlpha: 0.1
                        }
                    },
                    visualMap: {
                        show: false,
                        seriesIndex: 5,
                        dimension: 2,
                        pieces: [{
                            value: 1,
                            color: downColor
                        }, {
                            value: -1,
                            color: upColor
                        }]
                    },
                    grid: [
                        {
                            left: '16%',
                            right: '4%',
                            height: '50%'
                        },
                        {
                            left: '16%',
                            right: '4%',
                            top: '66%',
                            height: '16%'
                        }
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            data: this.dataObj.categoryData,
                            scale: true,
                            boundaryGap: false,
                            axisLine: { onZero: false },
                            splitLine: { show: false },
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax',
                            axisPointer: {
                                z: 100
                            }
                        },
                        {
                            type: 'category',
                            gridIndex: 1,
                            data: this.dataObj.categoryData,
                            scale: true,
                            boundaryGap: false,
                            axisLine: { onZero: false },
                            axisTick: { show: false },
                            splitLine: { show: false },
                            axisLabel: { show: false },
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                            // axisPointer: {
                            //     label: {
                            //         formatter: function (params) {
                            //             var seriesValue = (params.seriesData[0] || {}).value;
                            //             return params.value
                            //             + (seriesValue != null
                            //                 ? '\n' + echarts.format.addCommas(seriesValue)
                            //                 : ''
                            //             );
                            //         }
                            //     }
                            // }
                        }
                    ],
                    yAxis: [
                        {
                            scale: true,
                            splitArea: {
                                show: true
                            },
                            // min:function(value) {
                            //     return value.min - 6000;
                            // },
                            // max:function(value) {
                            //     return value.max + 6000;
                            // }
                        },
                        {
                            scale: true,
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLabel: { show: false },
                            axisLine: { show: false },
                            axisTick: { show: false },
                            splitLine: { show: false }
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0, 1],
                            start: 0,
                            end: 100
                        },
                        {
                            show: true,
                            xAxisIndex: [0, 1],
                            type: 'slider',
                            top: '85%',
                            start: 0,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: 'Dow-Jones index',
                            type: 'candlestick',
                            data: this.dataObj.values,
                            itemStyle: {
                                normal: {
                                    color: upColor,
                                    color0: downColor,
                                    borderColor: null,
                                    borderColor0: null
                                }
                            },
                            tooltip: {
                                formatter: function (param) {
                                    param = param[0];
                                    return [
                                        'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                        'Open: ' + param.data[0] + '<br/>',
                                        'Close: ' + param.data[1] + '<br/>',
                                        'Lowest: ' + param.data[2] + '<br/>',
                                        'Highest: ' + param.data[3] + '<br/>'
                                    ].join('');
                                }
                            }
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5, this.dataObj),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: { opacity: 0.5 },
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: calculateMA(10, this.dataObj),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: { opacity: 0.5 },
                            }
                        },
                        {
                            name: 'MA20',
                            type: 'line',
                            showSymbol: false,
                            data: calculateMA(20, this.dataObj),
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        },
                        {
                            name: 'MA30',
                            type: 'line',
                            data: calculateMA(30, this.dataObj),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        },
                        {
                            name: 'Volume',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: this.dataObj.volumes
                        }
                    ]
                }
                detailKChart.setOption(option, true);

                // detailKChart.on('brushSelected', renderBrushed);

                // function renderBrushed(params) {
                //     var sum = 0;
                //     var min = Infinity;
                //     var max = -Infinity;
                //     var countBySeries = [];
                //     var brushComponent = params.brushComponents[0];

                //     var rawIndices = brushComponent.series[0].rawIndices;
                //     for (var i = 0; i < rawIndices.length; i++) {
                //         var val = data.values[rawIndices[i]][1];
                //         sum += val;
                //         min = Math.min(val, min);
                //         max = Math.max(val, max);
                //     }

                //     panel.innerHTML = [
                //         '<h3>STATISTICS:</h3>',
                //         'SUM of open: ' + (sum / rawIndices.length).toFixed(4) + '<br>',
                //         'MIN of open: ' + min.toFixed(4) + '<br>',
                //         'MAX of open: ' + max.toFixed(4) + '<br>'
                //     ].join(' ');
                // }

                // detailKChart.dispatchAction({
                //     type: 'brush',
                //     areas: [
                //         {
                //             brushType: 'lineX',
                //             coordRange: ['2016-06-02', '2016-06-20'],
                //             xAxisIndex: 0
                //         }
                //     ]
                // });
            }
        }
    }
</script>
<style scoped lang='less'>
    #detailKChart {
        width: 100%;
        height: 1200px;
    }

    .k-choice {
        ul {
            height: 96px;
            line-height: 96px;
            display: flex;
            li {
                width: 14.286%;
                text-align: center;
                background: #666;
                &.btn-active {
                    border-bottom: 2px solid #ff8400;
                    /*no*/
                    color: #ff8400;
                }
            }
        }
    }

    .cur-price {
        ul {
            height: 120px;
            background: #333;
            display: flex;
            li {
                width: 25%;
                text-align: center;
                span {
                    display: block;
                    height: 60px;
                    line-height: 60px;
                    &:nth-of-type(2) {
                        color: red;
                    }
                }
                &:nth-of-type(1) {
                    span {
                        height: 120px;
                        line-height: 120px;
                        &.to-down {
                            color: green;
                        }
                        &.to-up {
                            color: red
                        }
                    }
                }
            }
        }
    }
</style>