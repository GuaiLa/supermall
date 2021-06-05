import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载方式导入
const Home = () => import ("../views/home/Home")
const Category = () => import ("../views/category/Category")
const Shopcart = () => import ("../views/shopcart/Shopcart")
const Profile = () => import ("../views/profile/Profile")
const Detail = () => import ("../views/detail/Detail")

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            path: "",
            redirect: "/home"
        },
        {
            path: "/home",
            component: Home
        },
        {
            path: "/category",
            component: Category
        },
        {
            path: "/shopcart",
            component: Shopcart
        },
        {
            path: "/profile",
            component: Profile
        },
        {
          // 动态路由获取
            path: "/detail/:iid",
            component: Detail
        }
    ],
    mode: "history"
})