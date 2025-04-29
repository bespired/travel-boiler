<template>
    <div class="input-group">
        <icon-label icon="/blog/article.png" label="article" />
        <area-input label="text" v-model="item.content" />
    </div>
</template>

<script>

export default {
    name: 'AttrArticle',

    props: {
        item: {type: Object}
    }
}
</script>
