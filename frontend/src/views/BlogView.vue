<template>
    <section class="hero" />

    <div class="scroll-area">

        <a class="blog-panel"
            @click="goto(item)"
            v-for="item in index">

            <div>
                <img :src="item.img" />
            </div>
            <div>
                <h2>{{ item.title }}</h2>
                <p> {{ item.teaser}}</p>
            </div>
            <div>
               <div class="menu-pill"> Read the blog</div>
            </div>
        </a>

    </div>

</template>
<style>

    .blog .hero {
        filter: blur(2px) brightness(0.5);
    }

    .scroll-area {
        height: calc( 100vh - 80px);
        overflow: auto;
        margin-top: 20px;
    }

    .blog-panel {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 90vw;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
        padding: 10px;
        background-color: rgba(255,255,255,0.9);
        border-radius: 12px;
        gap: 8px;
        cursor: pointer;
    }

    .blog-panel:hover {
        box-shadow: inset 0 0 0px 3px red;;
    }

    .blog-panel > div:nth-child(1) {
        width: 10vh;
        height: 10vh;
    }
    .blog-panel > div:nth-child(2) {
        width: calc(100% - 10vh - 100px);
    }
    .blog-panel > div:nth-child(3) {
        align-content: center;
        width: 100px;
        flex-direction: row;
    }
    .blog-panel .menu-pill{
        width: fit-content;
        margin-left: auto;
        font-size: 12px;
    }

</style>
<script>

export default {
    name: 'BlogView',

    methods: {
        goto(item) {
            this.$router.push({name: 'blog-entry', params: { id: item.slug }})
        }
    },

    computed: {

        index() {
            return this.$store.getters['main/blog']
        }
    }

}
</script>
