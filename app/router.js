import Vue from "vue";
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Prueba from './components/Prueba.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/prueba', component: Prueba },
    { path: '/home', component: Home }
];

const router = new VueRouter({
    routes 
});

export default router;
