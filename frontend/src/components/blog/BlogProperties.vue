<template>
    <label>Blog entry {{ blog.id }}</label>
    <input-row >
        <label>{{ blog.type }} has {{ blog.body.length }} entries</label>
        <div>
            <template v-for="(item, idx) in blog.body">
                <div class="blog-link"
                    :class="`slots-${item.content.length}`"
                    >
                    <img :src="`/blog/${item.bone}.png`" />
                    <template v-for="sdx in item.content.length">
                        <span :class="`slot-${sdx}`" @click="editItem(idx, sdx-1)">
                            <template v-for="iaa in asArray(item.content[sdx-1])">
                                <img :src="`/blog/${icon(iaa)}.png`" />
                            </template>
                        </span>
                    </template>
                    {{ item.skin }}
                </div>
            </template>
        </div>
        <text-input label="title"  v-model="blog.title"  />
        <text-input label="teaser" v-model="blog.teaser" />
        <text-input label="img"    v-model="blog.img"    />
        <text-input label="type"   v-model="blog.type"   />

        <action-row>
            <click-button label="Index"     @click="index()" />
            <click-button label="Bewaren"   @click="save()"  />
        </action-row>
    </input-row>

</template>

<style>
    .blog-link > img{
        width: 60px;
        padding-left: 2px;
        padding-right: 2px;
        border-right: 2px solid #bebebe;
    }
    .blog-link span {
        width: 20%;
        max-width: 60px;
        border-right: 1px solid #bebebe;
        display: flex;
        flex-direction: column;
        padding: 0 2px;
    }
     .blog-link span:last-of-type {
        border-right: 2px solid #bebebe;
     }

    .blog-link > img:hover,
    .blog-link span:hover {
        background-color: #4c4cff;
        color: white;
        cursor: pointer;
    }

</style>

<script>

export default {
    name: 'BlogProperties',

    props: {
        blog: {type: Object}
    },

    emits: ['select', 'save', 'index'],

    computed: {
        content() {
            return this.$store.getters['main/content']
        }
    },

    methods: {

        asArray(e) {
            return (typeof(e) === 'number') ? [e] : e
        },
        icon(idx) {
            if (this.content[idx] == null) return '?'
            let keys = Object.keys(this.content[idx])
            return keys[0]
        },

        index() {
            this.$emit('index')
        },
        save() {
            this.$emit('save')
        },
        editItem(rowId, columnId) {
            this.$emit('select', {rowId, columnId})
        }
    }
}
</script>
