<template>
    <div>
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
        <div class="graybg authorpage">
            <div class="container">
                <div class="listrecent listrelated">
                    <div class="authorpostbox" v-for="post in posts" :key="post._id">
                        <div class="card">
                            <a href="author.html">
                            <!-- <img class="img-fluid img-thumb" src="assets/img/demopic/8.jpg" alt=""> -->
                            </a>
                            <div class="card-block">
                                <h4 class="card-text">{{post.text}}</h4>
                                <div class="metafooter">
                                    <div class="wrapfooter">
                                        <span class="meta-footer-thumb">
                                            <img class="author-thumb" :src="image">
                                        </span>
                                        <span class="author-meta">
                                        <span class="post-name">{{`${name} ${surname}`}}</span><br/>
                                        <span class="post-date">{{new Date(post.created_at).toLocaleString()}}</span>
                                        </span>
                                        <span class="post-read-more">
                                            <button type="button" class="btn btn-primary" @click="likePost(post._id)">
                                                Likes <span class="badge">{{post.likes.length}}</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUserById} from '../services/usersApiService'
    import {getPostsById, likePost} from '../services/postApiService'
    export default{
        data(){
            return {
                name: "",
                surname: "",
                email : "",
                image : "",
                posts : [] 
            }
        },
        created(){
            this.getUserById();
            this.getPosts();
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
            async getPosts() {
                const userId = localStorage.getItem("userId");
                const posts = await getPostsById(userId);
                this.posts = posts;
            },
            handleEdit(){
                this.$router.push('/editarPerfil')
            },
            async likePost(postId) {
                const userId = localStorage.getItem("userId");
                const response = await likePost(postId,{userId: userId});
                alert(response.message);
                this.getPosts();
            }
        }
    }
</script>
