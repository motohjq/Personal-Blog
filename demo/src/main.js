import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from 'axios'//全局引入axios 任意子组件都能使�?

const app = createApp(App)
installElementPlus(app)

const baseURL='http://localhost:4000'

axios.defaults.baseURL=baseURL//配置url前缀
axios.defaults.withCredentials=true//加这条权�? 不然不会携带cookie数据随着请求�?
app.config.globalProperties.$axios=axios //设置全局的axios

app.use(store).use(router).mixin({
    //这里基本能写组件实例里的东西
    data(){
        return{
            baseURL
        }
    }
}).mount('#app')