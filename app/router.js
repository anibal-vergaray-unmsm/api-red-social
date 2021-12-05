import Vue from "vue";
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Prueba from './components/Prueba.vue'
import Login from './components/Login.vue'
import Registro from './components/Registro.vue'

Vue.use(VueRouter)

const routes = [
    {   path: '/prueba', 
        component: Prueba,    
        meta: { 
            requiresAuth: true 
        }
    },
    {   path: '/home', 
        component: Home,
        meta: { 
            requiresAuth: true 
        }
    },
    {   path: '/login', 
        component: Login
    },
    {   path: '/registro', 
        component: Registro
    },
];

const router = new VueRouter({
    routes 
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth){
        if ( localStorage.getItem('userId') ) {
            next()
        } else {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        }
    }
    else{
        next()
    }
})

export default router;
