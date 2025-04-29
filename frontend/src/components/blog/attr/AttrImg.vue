<template>
    <div class="input-group">
        <icon-label icon="/blog/image.png" label="image" />
        <text-input label="url"         v-model="item.url"   />
        <text-input label="title"       v-model="item.title" />
        <text-input label="alternative" v-model="item.alt"   />
        {{ item }}
    </div>
</template>

<script>

export default {
    name: 'AttrImg',

    props: {
        item: {type: Object}
    }
}
</script>
