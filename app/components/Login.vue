<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6 mx-auto">
                <div class="card">
                    <div class="card-header">
                       	<h2 class="sitetitle">Bienvenido</h2>     
                    </div>
                    <div class="card-block">
                        <form class="form">

                            <div class="form-group">
                                <label for="email" class="control-label">E-Mail</label>

                                <div>
                                    <input id="email" type="email" class="form-control" name="email" v-model="email">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="control-label">Contraseña</label>

                                <div>
                                    <input id="password" type="password" class="form-control" name="password" v-model="password"> 
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block" @click="handleSubmit">
                                    <i class="fa fa-btn fa-sign-in"></i> Iniciar sesión
                                </button>
                            </div>
                        </form>
                        <div class="card-footer text-muted">
                            <span>¿No estás registrado? <router-link to="/registro">Registrate</router-link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default{
        data () {
            return {
                email : "",
                password : ""
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        const userId = response.data?.user._id;
                        if(userId){
                            localStorage.setItem("userId",userId)
                            if (this.$route.params.nextUrl != null) 
                                this.$router.push(this.$route.params.nextUrl)
                            else 
                                this.$router.push('/')
                        }
                        else{
                            alert("No se pudó iniciar sesión")
                        }
                    })
                    .catch(function (error) {
                        alert(error.response.data?.message);
                        console.error(error.response.data);
                    });
                }
            }
        }
    }
</script>
