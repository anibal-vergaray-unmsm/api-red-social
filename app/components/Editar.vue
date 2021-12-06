<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6 mx-auto">
                <div class="card">
                    <div class="card-header">
                       	<h2 class="sitetitle">Editar Datos</h2>     
                    </div>
                    <div class="card-block">
                        <form class="form" enctype="multipart/form-data">
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
                                <label for="file" class="control-label">Foto de Perfil</label>

                                <div>
                                    <input id="file" type="file" class="form-control" name="file" @change="handleFileUpload"> 
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-success btn-block" @click="handleSubmit">
                                    <i class="fa fa-btn fa-sign-in"></i> Guardar
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
    import {getUserById, updateUser} from '../services/usersApiService'
    export default{
        data () {
            return {
                name: "",
                surname: "",
                email : "",
                file: "",
                userId: localStorage.getItem("userId")
            }
        },
        created(){
            this.getUserById();
        },
        methods: {
            async getUserById() {
                const user = await getUserById(this.userId);

                this.name = user.name;
                this.surname= user.surname;
                this.email = user.email;
            },
            async handleSubmit(e) {
                e.preventDefault()
                const formData = new FormData();

                formData.append("image", this.file);
                formData.append("name", this.name);
                formData.append("surname", this.surname);
                formData.append("email", this.email);

                const response = await updateUser(this.userId,formData);

                if (response) {
                    alert("Usuario Modificado")
                    this.$router.push('/perfil')
                }
            },
            handleFileUpload(e){
                this.file = e.target.files[0];
                console.log(this.file.path)
            }
        }
    }
</script>
