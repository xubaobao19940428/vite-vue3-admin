import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router'
import App from './App.vue'
import store from './store/index'
import globalMethods from '@/js/globalMethods'
import vueCountTo from '@/components/vueCountTo/vueCountTo.vue'
import { elDragDialog } from './js/directive.js'
import './style/index.scss'
import * as echarts from 'echarts'

const app = createApp(App)

app.component('vue-count-to', vueCountTo)

app.directive('el-drag-dialog', elDragDialog)

app.config.globalProperties.$echarts = echarts

Object.keys(globalMethods).forEach((key) => {
	app.config.globalProperties[key] = globalMethods[key]
})
app.use(store).use(router)
router.isReady().then(() => app.mount('#app'))
app.use(ElementPlus, { locale })
