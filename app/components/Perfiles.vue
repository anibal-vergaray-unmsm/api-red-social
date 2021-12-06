<template>
    <div>
        <div class="mainheading">
            <h1 class="sitetitle">Red Social</h1>
            <p class="lead">
                Conoce gente de todos lados.
            </p>
        </div>
        <div class="graybg authorpage">
            <div class="container">
                <div class="card text-center mb-3">
                    <div class="card-header">
                        Conoce más gente
                    </div>
                    <div class="card-body px-3 mt-3">
                        <div class="input-group">
                            <input type="text" name="comment" class="form-control" placeholder="Busca por nombre o apellido" v-model="search">
                        </div> 
                        <button class="btn btn-success my-3" @click="getUsers">Buscar</button>
                    </div>
                </div>
            
                <div class="listrecent listrelated">
                    <div class="authorpostbox" v-for="user in users" :key="user._id">
                        <div class="card">
                            <div class="card-block">
                                <h2 class="card-title">{{`${user.name} ${user.surname}`}}</h2>
                                <span class="meta-footer-thumb">
                                    <img class="author-thumb" :src="user.image || `img/unknown.png`">
                                </span>
                                <span class="author-meta">
                                    <span class="post-name">{{user.email}}</span><br/>
                                </span>
                            </div>                             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUsers} from '../services/usersApiService'

    export default{
        data(){
            return {
                users:[],
                search:"",
                userId: localStorage.getItem("userId")
            }
        },
        created(){
            this.getUsers();
        },
        methods:{
            async getUsers() {
                const users = await getUsers({search: this.search});
                this.users = users;
            }
        }
    }
</script>
