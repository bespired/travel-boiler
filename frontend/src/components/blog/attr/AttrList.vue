<template>
    <div class="input-group">
        <icon-label icon="/blog/list.png" label="list" />
        <ul>
            <li v-for="(listitem, idx) in item.content">
                <text-input label="item"  v-model="item.content[idx]" />
            </li>
        </ul>
        {{ item }}
    </div>
</template>

<script>

export default {
    name: 'AttrList',

    props: {
        item: {type: Object}
    }
}
</script>
