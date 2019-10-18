import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const weatherMainTab =()=>import('../components/weather/weatherMainTab.vue');
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/weather'
    },
    {
      path:'/weather',
      component:weatherMainTab,
    },
    {
      path:'/search'
    },
    {
      path:'*'
    }
  ]
})
