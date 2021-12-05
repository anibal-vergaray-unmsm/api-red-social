<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6 mx-auto">
                <div class="card">
                    <div class="card-header">
                       	<h2 class="sitetitle">Registro</h2>     
                    </div>
                    <div class="card-block">
                        <form class="form">

                            <div class="form-group">
                                <label for="name" class="control-label">Nombre</label>

                                <div>
                                    <input id="name" type="text" class="form-control" name="email" v-model="name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="surname" class="control-label">Apellido</label>

                                <div>
                                    <input id="surname" type="text" class="form-control" name="email" v-model="surname">
                                </div>
                            </div>

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
                                    <i class="fa fa-btn fa-sign-in"></i> Enviar
                                </button>
                            </div>
                        </form>
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
                name: "",
                surname: "",
                email : "",
                password : ""
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('/users', {
                        name: this.name,
                        surname: this.surname,
                        email: this.email,
                        password: this.password,
                    })
                    .then(response => {
                        alert("Usuario Registrado")
                        this.$router.push('/login')
                    })
                    .catch(function (error) {
                        console.error(error.response.data);
                    });
                }
            }
        }
    }
</script>
