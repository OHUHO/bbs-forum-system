import Vue from 'vue'
import App from './App.vue'
//引入 router
import VueRouter from 'vue-router';
import router from "@/router";
//import store from "@/store";
//按需引入element-ui
import {
    Carousel,
    CarouselItem,
    Button,
    Container,
    Col,
    Input,
    Main,
    Dialog,
    FormItem,
    Select,
    Option,
    CheckboxGroup,
    Checkbox,
    Form,
    Switch,
    Radio,
    TimePicker,
    Tooltip,
    Upload,
    Cascader,
    Row,
    RadioGroup,
    Tag,
    Avatar, Tabs, TabPane, Table, TableColumn
} from 'element-ui';

//引入 封装好的请求
import {postRequest} from "@/api/api";
import {putRequest} from "@/api/api";
import {getRequest} from "@/api/api";
import {deleteRequest} from "@/api/api";

// 引入阿里矢量图标
import './assets/iconfont/iconfont.css'



//关闭生产提示
Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.component(Carousel.name,Carousel)
Vue.component(CarouselItem.name,CarouselItem)
Vue.component(Button.name,Button)
Vue.component(Container.name,Container)
Vue.component(Col.name, Col)
Vue.component(Input.name,Input)
Vue.component(Main.name,Main)
Vue.component(Dialog.name,Dialog)
Vue.component(FormItem.name,FormItem)
Vue.component(Select.name,Select)
Vue.component(Option.name,Option)
Vue.component(CheckboxGroup.name,CheckboxGroup)
Vue.component(Checkbox.name,Checkbox)
Vue.component(Form.name,Form)
Vue.component(Switch.name,Switch)
Vue.component(Radio.name,Radio)
Vue.component(TimePicker.name,TimePicker)
Vue.component(Tooltip.name,Tooltip)
Vue.component(Upload.name,Upload)
Vue.component(Cascader.name,Cascader)
Vue.component(Row.name,Row)
Vue.component(RadioGroup.name,RadioGroup)
Vue.component(Tag.name,Tag)
Vue.component(Avatar.name,Avatar)
Vue.component(Tabs.name,Tabs)
Vue.component(TabPane.name,TabPane)
Vue.component(Table.name,Table)
Vue.component(TableColumn.name,TableColumn)

//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach(((to, from, next) => {
    if(window.sessionStorage.getItem('tokenStr')){
        if(!window.sessionStorage.getItem('user')){
            //判断用户信息是否存在
            return getRequest('/user/info').then(resp =>{
                if(resp){
                    window.sessionStorage.setItem('user',JSON.stringify(resp));
                    next()
                }
            })
        }
        next()
    }else{
        next()
    }
}))

new Vue({
    el:'#app',
    render: h => h(App),
    router:router,

    beforeCreate() {
        //安装全局事件总线
        Vue.prototype.$bus = this
    },

})
