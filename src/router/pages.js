import Layout2 from '@/layout/Layout2'
import Layout4 from '@/layout/Layout4'
import Layout5 from '@/layout/Layout5'
import AdminLayout2 from '@/layout/AdminLayout2'
import Layout2Flex from '@/layout/Layout2Flex'
import LayoutBlank from '@/layout/LayoutBlank'
import LayoutWithoutSidenav from '@/layout/LayoutWithoutSidenav'
import LayoutWithoutSidenav2 from '@/layout/LayoutWithoutSidenav2'

export default [
  {
    path: '',
    component: LayoutWithoutSidenav,
    children: [{
      path: '',
      component: () => import('@/components/pages/index')
    }]
  }, {
    path: '',
    component: Layout5,
    children: [ ]
  }, {
    // Layout 2
    path: '/',
    component: Layout2,
    children: [
     
      {
      path: 'trades/:id',
      component: () => import('@/components/pages/Trades')
    }, {
      path: 'protrades/:id',
      component: () => import('@/components/pages/ProTrades')
    }, {
      path: 'fastorder',
      component: () => import('@/components/pages/fastorder')
    }, {
      path: '/userpanel',
      component: () => import('@/components/dashboards/Dashboard1')
    }, {
      path: '/dashboard',
      component: () => import('@/components/dashboards/Dashboard1')
    }, {
      path: 'deposit',
      component: () => import('@/components/pages/deposit')
    }, {
      path: 'addcard',
      component: () => import('@/components/pages/addcard')
    }, {
      path: '/wallets/1',
      component: () => import('@/components/pages/rial')
    }, {
      path: '/wallets/1/:place',
      component: () => import('@/components/pages/rial')
    }, {
      path: '/wallets/:id',
      component: () => import('@/components/pages/wallet')
    }, {
      path: '/wallets/:id/:place',
      component: () => import('@/components/pages/wallet')
    }, {
      path: '/transactions',
      component: () => import('@/components/pages/transactions')
    }, {
      path: '/tradeslist',
      component: () => import('@/components/pages/tradeslist')
    }, {
      path: '/open-orders',
      component: () => import('@/components/pages/openorders')
    }, {
      path: '/chart',
      component: () => import('@/components/charts/VueTrend')
    }, {
      path: 'user-level',
      component: () => import('@/components/pages/UserLevel')
    }]
  }, {
    // Layout 2
    path: '/adminpanel',
    component: AdminLayout2,
    children: [{
      path: '',
      component: () => import('@/components/dashboards/Dashboard2')
    }, {
      path: 'tutorial',
      component: () => import('@/components/adminpages/tutorial')
    }, {
      path: 'verifybank',
      component: () => import('@/components/adminpages/verifybank')
    }, {
      path: 'verifymelli',
      component: () => import('@/components/adminpages/verifymelli')
    }, {
      path: 'verifybankaccount',
      component: () => import('@/components/adminpages/verifybankaccount')
    }, {
      path: 'contacts',
      component: () => import('@/components/adminpages/Contacts')
    }, {
      path: 'users',
      component: () => import('@/components/adminpages/Users')
    }]
  }, {
    // Layout 2 (Flex)
    path: '',
    component: Layout2Flex,
    children: []
  }, {
    // Blank layout
    path: '/',
    component: LayoutBlank,
    children: [{
      path: '/forgetpassword',
      component: () => import('@/components/pages/ForgetPassword')
    }, {
      path: '/resetpass/:key',
      component: () => import('@/components/pages/ResetPass')
    }, {
      path: '/login',
      component: () => import('@/components/pages/LogIn')
    }, {
      path: '/logout',
      component: () => import('@/components/pages/logout')
    }, {
      path: '/signup',
      component: () => import('@/components/pages/SignUp')
    },
    {
      // Layout 4
      path: '/',
      component: Layout4,
      children: [{
        path: 'spot',
        component: () => import('@/components/pages/spot')
      },{
        path: 'leverage',
        component: () => import('@/components/pages/leverage')
      },{
        path: 'ranks',
        component: () => import('@/components/pages/ranks')
      },
      ],
      
    },{
      // Layout 5
      path: '/',
      component: Layout5,
      children: [{
        path: 'tutorial',
        component: () => import('@/components/pages/HelpCenter')
      },{
        path: 'article',
        component: () => import('@/components/pages/ArticlesList')
      },{
        path: 'forum',
        component: () => import('@/components/pages/ForumsList')
      },{
        path: 'tutorial',
        component: () => import('@/components/pages/HelpCenter')
      },{
        path: '/margin-trade/:sym',
        component: () => import('@/components/pages/oltrade')
      },
       {
        path: 'user',
        component: () => import('@/components/pages/User')
      },
      {
        path: '/payments/deposit',
        component: ()=> import("@/components/pages/PaymentDeposit")
      },
      {
        path: '/payments/withdraw',
        component: ()=> import("@/components/pages/PaymentWithdraw")
      },
      {
        path: '/payments/result/:payment_id',
        component: ()=> import("@/components/pages/PaymentResult")
      },
       {
        path: '/wallets',
        component: () => import('@/components/pages/wallets')
      }, {
        path: '/cpwallets/:id',
        component: () => import('@/components/pages/cpwallet')
      }, {
        path: '/cpwallets/:id/:place',
        component: () => import('@/components/pages/cpwallet')
      },{
        path: 'ticket',
        component: () => import('@/components/pages/MessagesV3Compose')
      }, {
        path: 'ticket/:id',
        component: () => import('@/components/pages/MessagesV3Compose2')
      },
    
    ],
    }]
  }]
