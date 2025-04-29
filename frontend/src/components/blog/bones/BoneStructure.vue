<template>
    <div :class="bones">
        <div v-for="idx in amount[bones]" :class="`colm-${idx}`">
            <template v-for="(content, type) in content[data[idx-1]]">
                <component :is="`blog-${type}`" :data="content" :class="type" />
            </template>
        </div>
    </div>
</template>

<style>
    .single.base .bgimg{
        min-height: 25vh;
        max-height: 25vh;
        width: auto;
    }
    .single, .double, .triple {
        display: flex;
        gap: 20px;
    }

    .double.base {
        display: flex;
    }

    .single.base > div {
        width: 100%;
    }

    .double.base > div{
        width: 50%;
    }

    .triple.base > div{
        width: 33%;
    }
    .triple.base .bgimg{
        min-height: 25vh;
        max-height: 25vh;
        width: auto;
    }
</style>

<script>

import BlogTitle   from '../types/BlogTitle.vue'
import BlogImg     from '../types/BlogImg.vue'
import BlogBgimg   from '../types/BlogBgimg.vue'
import BlogList    from '../types/BlogList.vue'
import BlogArticle from '../types/BlogArticle.vue'


export default {
    name: 'BoneStructure',

    components: {
        BlogTitle, BlogImg, BlogBgimg, BlogList, BlogArticle
    },

    props: {
        data:  { type: Object },
        bones: { type: String },
    },

    data() {
        return {
            amount: {
                single : 1,
                double : 2,
                triple : 3,
            }
        }
    },

    methods: {

    },

    computed: {
        content() {
            return this.$store.getters['main/content']
        }
    },

}
</script>