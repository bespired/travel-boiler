<template>
    <div class="input-group">
        <icon-label icon="/blog/button.png" label="button" />
        <text-input label="label"  v-model="item.content"  />
        <text-input label="href"   v-model="item.src"  />
        <text-input label="target" v-model="item.target"  />
    </div>
</template>

<script>

export default {
    name: 'AttrButton',

    props: {
        item: {type: Object}
    }
}
</script>
