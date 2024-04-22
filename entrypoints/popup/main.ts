import {createApp} from 'vue';
import '../../styles/index.css';
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import App from './App.vue';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

import ContextMenu from '@imengyu/vue3-context-menu'


const app = createApp(App)
app.use(ContextMenu)
app.mount('#app');
