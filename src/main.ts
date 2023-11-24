import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// import router from './router'

import 'virtual:windi.css';
// import 'virtual:windi-components.css';
// import 'virtual:windi-utilities.css';
// import './style.css'

// createApp(App).mount('#app')

function useTable (app: App) {
  app.use(VXETable)
}

const app = createApp(App)

// app.use(router,useTable).mount('#app')
app.use(router)
app.use(useTable)

app.mount('#app')
