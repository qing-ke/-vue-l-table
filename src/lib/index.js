import LTable from './table.vue'

// 注册组件
LTable.install = Vue => Vue.component(LTable.name, LTable);
console.log(LTable)

// 标签的方式引入
const install = function(Vue, opts = {}) {
　　Vue.component(component.name, component);
}

// 支持使用标签的方式引入 Vue是全局变量时，自动install
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue);
}

export default LTable

