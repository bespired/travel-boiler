<template>
    <div class="input-group">
        <icon-label icon="/blog/title.png" label="title" />
        <text-input label="title"    v-model="item.content"  />
        <text-input label="subtitle" v-model="item.alternative"  />
    </div>
</template>

<script>

export default {
    name: 'AttrTitle',

    props: {
        item: {type: Object}
    }
}
</script>
