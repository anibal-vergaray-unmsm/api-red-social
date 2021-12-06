<template>
    <div>
        <div class="mainheading">
            <h1 class="sitetitle">Red Social</h1>
            <p class="lead">
                ¿Piensas en algo? Compártelo.
            </p>
        </div>
        <div class="graybg authorpage">
            <div class="container">
                <div class="listrecent listrelated">
                    <div class="authorpostbox" v-for="(post, index) in posts" :key="post._id">
                        <div class="card">
                            <div class="card-block">
                                <h2 class="card-title">{{post.text}}</h2>
                                <span class="meta-footer-thumb">
                                    <img class="author-thumb" :src="post.user.image || `img/unknown.png`">
                                </span>
                                <span class="author-meta">
                                <span class="post-name">{{`${post.user.name} ${post.user.surname}`}}</span><br/>
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
    import {getPosts, likePost} from '../services/postApiService'
    import {postComment} from '../services/commentApiService'

    export default{
        data(){
            return {
                posts:[],
                comments: []
            }
        },
        created(){
            this.getPosts();
        },
        methods:{
            async getPosts() {
                const posts = await getPosts();
                this.posts = posts;
            },
            async likePost(postId) {
                const userId = localStorage.getItem("userId");
                const response = await likePost(postId,{userId: userId});
                alert(response.message);
                this.getPosts();
            },
            async postComment(postId, commentIndex) {
                const userId = localStorage.getItem("userId");
                await postComment({userCommentId: userId, postId: postId, textComment: this.comments[commentIndex]});
                this.comments[commentIndex] = "";
                this.getPosts();
            }
        }
    }
</script>
