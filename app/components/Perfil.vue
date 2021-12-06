<template>
   <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8 col-md-offset-2">
            <div class="mainheading">
                <div class="row post-top-meta authorpage">
                    <div class="col-md-8 col-xs-12">
                        <h1>{{`${name} ${surname}`}}</h1>
                        <span><strong>Email:</strong> {{email}}</span><br>
                        <button type="button" class="btn btn-success btn-sm mt-2" @click="handleEdit">Editar</button>
                    </div>
                    <div class="col-md-2 col-xs-12">
                        <img class="author-thumb" :src="image">
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
    import {getUserById} from '../services/usersApiService'
    export default{
        data(){
            return {
                name: "",
                surname: "",
                email : "",
                image : ""
            }
        },
        created(){
            this.getUserById();
        },
        methods: {
            async getUserById() {
                const userId = localStorage.getItem("userId");
                const user = await getUserById(userId);

                this.name = user.name;
                this.surname= user.surname;
                this.email = user.email;
                this.image= user.image
            },
            handleEdit(){
                this.$router.push('/editarPerfil')
            }
        }
    }
</script>
