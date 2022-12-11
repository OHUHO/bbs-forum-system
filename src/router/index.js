import VueRouter from 'vue-router';
import BBSCommunity from "@/pages/BBSCommunity";
import BBSLogin from "@/pages/BBSLogin";
import BBSArticleWrite from "@/pages/BBSArticleWrite";
import BBSUserinfo from "@/components/BBSUserinfo";
import BBSForum from "@/pages/BBSForum";
import BBSIndex from "@/pages/BBSIndex";
import BBSArticleDetails from "@/pages/BBSArticleDetails";
import BBSTabs from "@/pages/BBSTabs";
import BBSCollection from "@/pages/BBSCollection";
import BBSCommunityDetails from "@/pages/BBSCommunityDetails";
import BBSInventory from "@/pages/BBSInventory";
import BBSInventoryDetails from "@/pages/BBSInventoryDetails";
import BBSSearchPage from "@/pages/BBSSearchPage";
import BBSStat from "@/pages/BBSStat";
import BBSInformation from "@/pages/BBSInformation";


//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//创建一个路由器
const router = new VueRouter({
    //mode: 'history',
    routes:[
        {
            name:'index',
            path:'/',
            component:BBSIndex
        },

        {
            name: 'login',
            path: '/login',
            component: BBSLogin,
        },
        {
            name:'collection',
            path:"/collection",
            component:BBSCollection,
        },
        {
            name:'forum',
            path: '/forum',
            component: BBSForum,

        },
        {
            name:'community',
            path: '/community',
            component:BBSCommunity,
            //meta:{isAuth: true}
        },
        {
            name:'inventory',
            path: '/inventory',
            component:BBSInventory,
        },
        {
            name:'write',
            path:'/write',
            component:BBSArticleWrite
        },
        {
            name:'userinfo',
            path:'/userinfo',
            component:BBSUserinfo
        },
        {
            name:'articleDetails',
            path:'/articleDetails/articleId/:articleId',
            component: BBSArticleDetails
        },
        {
            name:'tabs',
            path:'/tabs/:index',
            component:BBSTabs,
        },
        {
            name:'communityDetails',
            path:'/communityDetails/communityId/:communityId',
            component:BBSCommunityDetails,
        },
        {
            name:'inventoryDetails',
            path:'/inventoryDetails/inventoryId/:inventoryId',
            component:BBSInventoryDetails,
        },
        {
            name:'searchDetails',
            path:'/search/keywords/:keywords',
            component:BBSSearchPage,
        },
        {
            name:'stat',
            path:'/stat',
            component:BBSStat,
        },
        {
            name:'information',
            path:'/information',
            component:BBSInformation,
        }

    ]
})
export default router

