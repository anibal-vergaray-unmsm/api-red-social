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
                                        <span class="post-read-more"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></span>
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
    import {getPostsById} from '../services/postApiService'
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
                console.log(posts)
                this.posts = posts;
            },
            handleEdit(){
                this.$router.push('/editarPerfil')
            }
        }
    }
</script>
