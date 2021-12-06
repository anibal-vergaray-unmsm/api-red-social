import Vue from "vue";
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Perfil from './components/Perfil.vue'
import Login from './components/Login.vue'
import Registro from './components/Registro.vue'
import Editar from './components/Editar.vue'
import Perfiles from './components/Perfiles.vue'

Vue.use(VueRouter)

const routes = [
    {   path: '/perfil', 
        component: Perfil,    
        meta: { 
            requiresAuth: true 
        }
    },
    {   path: '/editarPerfil', 
        component: Editar,    
        meta: { 
            requiresAuth: true 
        }
    },
    {   path: '/', 
        component: Home,
        meta: { 
            requiresAuth: true 
        }
    },
    {   path: '/perfiles', 
        component: Perfiles,
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
