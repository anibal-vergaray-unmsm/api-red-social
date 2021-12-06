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
                                            <img class="author-thumb" :src="post.user[0].image">
                                        </span>
                                        <span class="author-meta">
                                        <span class="post-name">{{`${post.user[0].name} ${post.user[0].surname}`}}</span><br/>
                                        <span class="post-date">{{new Date(post.created_at).toLocaleString()}}</span>
                                        </span>
                                        <span class="post-read-more">
                                            <button type="button" class="btn btn-primary" @click="likePost(post._id)">
                                                Likes <span class="badge">{{post.numberOfLikes}}</span>
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
    import {getPosts, likePost} from '../services/postApiService'
    export default{
        data(){
            return {
                posts:[]
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
            }
        }
    }
</script>
