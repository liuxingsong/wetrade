import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/product/index'
import Detail from '@/components/product/detail'

import Personal from '@/components/personal/index'
import Score from '@/components/personal/score'
import Recharge from '@/components/personal/recharge'
import Flowing from '@/components/personal/flowing'
import Withdraw from '@/components/personal/withdraw'
import RechargeRecord from '@/components/personal/rechargeRecord'
import HistoryOrder from '@/components/personal/historyOrder'
import WithdrawRecord from '@/components/personal/withdrawRecord'
import QrCode from '@/components/personal/qrCode'
import ChangeMsg from '@/components/personal/changeMsg'
import Login from '@/components/login/login'
// import Account from '@/components/personal/childrens/account'
// import Play from '@/components/personal/childrens/play'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/product',
            name: 'index',
            component: Index
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/personal',
            name: 'personal',
            component: Personal,
            // children: [{
            //       path: 'account',
            //       name: 'account',
            //       component: Account
            //   },
            //   {
            //       path: 'play',
            //       name: 'play',
            //       component: Play
            //   }
            // ]
        },
        {
            path: '/recharge',
            name: 'recharge',
            component: Recharge,
        },
        {
            path: '/flowing',
            name: 'flowing',
            component: Flowing,
        },
        {
            path: '/withdraw',
            name: 'withdraw',
            component: Withdraw,
        },
        {
            path: '/rechargeRecord',
            name: 'rechargeRecord',
            component: RechargeRecord,
        },
        {
            path: '/withdrawRecord',
            name: 'withdrawRecord',
            component: WithdrawRecord,
        },
        {
            path: '/historyOrder',
            name: 'historyOrder',
            component: HistoryOrder,
        },
        {
            path: '/qrCode',
            name: 'qrCode',
            component: QrCode,
        },
        {
            path: '/changeMsg',
            name: 'changeMsg',
            component: ChangeMsg,
        },
        {
            path: '/score',
            name: 'score',
            component: Score,
        },
        {
            path: '/detail/:name/:id',
            name: 'detail',
            component: Detail
        }
    ]
})