import type {LinkNodeType} from '@/types/tree'
import {flatToTree} from '@/utils'

const data: LinkNodeType[] = [
    // ES6相关
    {"name": "ES6相关", "link": "https://es6.ruanyifeng.com/", "icon": "es6", "parentName": null},
    {"name": "ES6", "link": "https://es6.ruanyifeng.com/", "icon": "es6", "parentName": "ES6相关"},
    // Vue全套
    {"name": "Vue全套", "link": "https://cn.vuejs.org/", "icon": "vue", "parentName": null},
    {"name": "Vue", "link": "https://cn.vuejs.org/", "icon": "vue", "parentName": "Vue全套"},
    {
        "name": "Vue Router",
        "link": "https://router.vuejs.org/installation.html",
        "icon": "vue",
        "parentName": "Vue全套"
    },
    {"name": "Vuex", "link": "https://vuex.vuejs.org/zh/index.html", "icon": "vue", "parentName": "Vue全套"},
    {"name": "Pinia", "link": "https://pinia.vuejs.org/zh/", "icon": "pinia", "parentName": "Vue全套"},
    {"name": "Vue CLI", "link": "https://cli.vuejs.org/zh/guide/", "icon": "vue", "parentName": "Vue全套"},
    {"name": "VuePress", "link": "https://v2.vuepress.vuejs.org/zh/", "icon": "vue", "parentName": "Vue全套"},
    {"name": "VitePress", "link": "https://vitepress.dev/", "icon": "vue", "parentName": "Vue全套"},
    {"name": "Vue3 One Piece", "link": "https://vue3js.cn/", "icon": "vue", "parentName": "Vue全套"},
    // React全套
    {"name": "React全套", "link": "https://zh-hans.react.dev/", "icon": "react", "parentName": null},
    {"name": "React", "link": "https://zh-hans.react.dev/", "icon": "react", "parentName": "React全套"},
    {"name": "Redux", "link": "https://cn.redux.js.org/", "icon": "redux", "parentName": "React全套"},
    {
        "name": "React Router",
        "link": "https://reactrouter.com/en/main",
        "icon": "reactrouter",
        "parentName": "React全套"
    },
    {"name": "Create React App", "link": "https://cra.nodejs.cn/", "icon": "createreactapp", "parentName": "React全套"},
    {"name": "React Native中文网", "link": "https://reactnative.cn/", "icon": "react", "parentName": "React全套"},
    {"name": "UmiJS", "link": "https://umijs.org/", "icon": "umijs", "parentName": "React全套"},
    // TypeScript相关
    {"name": "TypeScript全套", "link": "https://ts.nodejs.cn/", "icon": "typescript", "parentName": null},
    {"name": "TypeScript", "link": "https://ts.nodejs.cn/", "icon": "typescript", "parentName": "TypeScript全套"},
    {
        "name": "TypeScript 入门教程",
        "link": "https://ts.xcatliu.com/",
        "icon": "typescript",
        "parentName": "TypeScript全套"
    },
    {
        "name": "深入理解 TypeScript",
        "link": "https://jkchao.github.io/typescript-book-chinese/",
        "icon": "typescript",
        "parentName": "TypeScript全套"
    },
    // uniapp相关
    {"name": "uniapp相关", "link": "https://uniapp.dcloud.net.cn/", "icon": "uniapp", "parentName": null},
    {"name": "uniapp", "link": "https://uniapp.dcloud.net.cn/", "icon": "uniapp", "parentName": "uniapp相关"},
    // 小程序相关
    {"name": "小程序", "link": "https://developers.weixin.qq.com/miniprogram/dev/framework/", "icon": "miniprogram", "parentName": null},
    {
        "name": "微信小程序",
        "link": "https://developers.weixin.qq.com/miniprogram/dev/framework/",
        "icon": "miniprogram",
        "parentName": "小程序"
    },
    {"name": "支付宝小程序", "link": "https://opendocs.alipay.com/mini", "icon": "miniprogram", "parentName": "小程序"},
    // Node相关
    {"name": "Node", "link": "https://nodejs.org/en", "icon": "nodejs", "parentName": null},
    {"name": "Node 中文文档", "link": "https://nodejs.cn/", "icon": "nodejs", "parentName": "Node"},
    {"name": "Node 英文文档", "link": "https://nodejs.org/en", "icon": "nodejs", "parentName": "Node"},
    {"name": "Express", "link": "https://express.nodejs.cn/", "icon": "express", "parentName": "Node"},
    {"name": "Koa", "link": "https://koa.nodejs.cn/", "icon": "koa", "parentName": "Node"},
    // Nest相关
    {"name": "Nest", "link": "https://nestjs.com/", "icon": "nestjs", "parentName": null},
    {"name": "Nest英文文档", "link": "https://nestjs.com/", "icon": "nestjs", "parentName": "Nest"},
    {"name": "Nest中文文档", "link": "https://www.nestjs.com.cn/", "icon": "nestjs", "parentName": "Nest"},
    // nuxt相关
    {"name": "NUXT", "link": "https://v2.nuxt.com/", "icon": "nuxt", "parentName": null},
    {"name": "NUXT英文文档", "link": "https://v2.nuxt.com/", "icon": "nuxt", "parentName": "NUXT"},
    {"name": "NUXT3中文文档", "link": "https://nuxt.com.cn/", "icon": "nuxt", "parentName": "NUXT"},
    // next相关
    {"name": "NEXT", "link": "https://nextjs.org/", "icon": "nextjs", "parentName": null},
    {"name": "NEXT英文文档", "link": "https://nextjs.org/", "icon": "nextjs", "parentName": "NEXT"},
    {"name": "NEXT中文文档", "link": "https://www.nextjs.cn/", "icon": "nextjs", "parentName": "NEXT"},
    // github相关
    {"name": "GitHub相关", "link": "https://github.com/", "icon": "github", "parentName": null},
    {"name": "GitHub", "link": "https://github.com/", "icon": "github", "parentName": "GitHub相关"},
    {"name": "Gitee", "link": "https://gitee.com/", "icon": "gitee", "parentName": "GitHub相关"},
    {"name": "GitLab", "link": "https://about.gitlab.com/", "icon": "gitlab", "parentName": "GitHub相关"},
    // WXT相关
    {"name": "WXT相关", "link": "https://wxt.dev/", "icon": "pluginmanagement", "parentName": null},
    {"name": "WXT", "link": "https://wxt.dev/", "icon": "pluginmanagement", "parentName": "WXT相关"},
    // MDN相关
    {
        "name": "MDN相关",
        "link": "https://developer.mozilla.org/zh-CN/docs/Learn",
        "icon": "mdnwebdocs",
        "parentName": null
    },
    {
        "name": "MDN",
        "link": "https://developer.mozilla.org/zh-CN/docs/Learn",
        "icon": "mdnwebdocs",
        "parentName": 'MDN相关'
    }
]


export default flatToTree(data)