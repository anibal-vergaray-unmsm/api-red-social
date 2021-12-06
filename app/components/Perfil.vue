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
                                <img class="author-thumb" :src="image || `img/unknown.png`">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="graybg authorpage">
            <div class="container">
                <div class="listrecent listrelated">
                    <div class="authorpostbox" v-for="(post,index) in posts" :key="post._id">
                        <div class="card">
                            <!-- <img class="img-fluid img-thumb" src="assets/img/demopic/8.jpg" alt=""> -->
                            <div class="card-block">
                                <h2 class="card-title">{{post.text}}</h2>
                                <span class="meta-footer-thumb">
                                    <img class="author-thumb" :src="image || `img/unknown.png`">
                                </span>
                                <span class="author-meta">
                                <span class="post-name">{{`${name} ${surname}`}}</span><br/>
                                <span class="post-date">{{new Date(post.created_at).toLocaleString()}}</span>
                                </span>
                                <span class="post-read-more">
                                    <button type="button" class="btn btn-primary" @click="likePost(post._id)">
                                        Likes <span class="badge">{{post.numberOfLikes}}</span>
                                    </button>
                                </span>
                            </div>
                            <ul class="list-group list-group-flush">
                                <span><h5>&nbsp;&nbsp;Comentarios</h5></span>
                                <li class="list-group-item"  v-for="comment in post.comments" :key="comment._id">
                                    <div class="row">
                                        <div class="card-block">
                                            <h4 class="card-text">{{comment.textComment}}</h4>
                                            <div class="metafooter">
                                                <div class="wrapfooter">
                                                    <span class="meta-footer-thumb">
                                                        <img class="author-thumb" :src="comment.user.image || `img/unknown.png`">
                                                    </span>
                                                    <span class="author-meta">
                                                    <span class="post-name">{{`${comment.user.name} ${comment.user.surname}`}}</span><br/>
                                                    <span class="post-date">{{new Date(comment.created_at).toLocaleString()}}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <form>
                                <div class="input-group">
                                    <input type="text" name="comment" class="form-control" placeholder="Comentario" v-model="comments[index]">
                                    <div class="input-group-append">
                                        <button class="btn btn-success" type="button" @click="postComment(post._id,index)">Comentar</button>
                                    </div>
                                </div>
                            </form>
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
    import {postComment} from '../services/commentApiService'

    export default{
        data(){
            return {
                name: "",
                surname: "",
                email : "",
                image : "",
                posts : [],
                comments: [],
                userId : localStorage.getItem("userId")
            }
        },
        created(){
            this.getUserById();
            this.getPosts();
        },
        methods: {
            async getUserById() {
                const user = await getUserById(this.userId);

                this.name = user.name;
                this.surname= user.surname;
                this.email = user.email;
                this.image= user.image
            },
            async getPosts() {
                const posts = await getPostsById(this.userId);
                console.log(this.userId);
                this.posts = posts;
            },
            handleEdit(){
                this.$router.push('/editarPerfil')
            },
            async likePost(postId) {
                const response = await likePost(postId,{userId: this.userId});
                alert(response.message);
                this.getPosts();
            },
            async postComment(postId, commentIndex) {
                const response = await postComment({userCommentId: this.userId, postId: postId, textComment: this.comments[commentIndex]});
                console.log(response);
                this.comments[commentIndex] = "";
                this.getPosts();
            }
        }
    }
</script>
