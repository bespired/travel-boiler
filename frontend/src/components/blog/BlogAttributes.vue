<template>

    <template v-for="id in items">
        <component :is="blogType(id)" :item="blogAttribute(id)" />
    </template>

    <action-row>
        <click-button label="Undo"   @click="undo()" />
        <click-button label="Terug "  @click="back()" />
        <click-button label="Bewaren" @click="save()" />
    </action-row>

</template>
<style>
    .properties .input-group{
        border:1px solid #e8e8e8;
        border-radius: 2px;
        padding: 4px;
    }
    .input-group label img{
        width: 48px; height: 32px;
    }
    .input-group label{
        display: flex;
        align-items: center;
    }
</style>
<script>

import AttrArticle from './attr/AttrArticle.vue'
import AttrImg     from './attr/AttrImg.vue'
import AttrBgImg   from './attr/AttrBgImg.vue'
import AttrList    from './attr/AttrList.vue'
import AttrTitle   from './attr/AttrTitle.vue'
import AttrButton  from './attr/AttrButton.vue'

export default {
    name: 'BlogAttributes',

    components :{
        AttrArticle, AttrBgImg, AttrImg, AttrList, AttrTitle, AttrButton
    },

    props: {
        blog:   { type: Object, default: null },
        row:    { type: Number, default: null },
        column: { type: Number, default: null },
    },

    emits: ['deselect'],

    mounted() {
        this.backup = _clone(this.values)
    },

    updated() {
        this.backup = _clone(this.values)
    },

    data () {
        return {
            backup: null,
        }
    },

    computed: {
        values() {
            return this.$store.getters['main/content']
        },
        items() {
            let adx = this.blog.body[this.row].content[this.column]
            return (typeof adx === 'number') ? [adx] : adx
        }
    },

    methods: {
        undo() {
            this.items.forEach( i => { this.values[i] = this.backup[i] })
            this.$emit('deselect')
        },

        back() {
            this.$emit('deselect')
        },

        content(id) {
            return this.values[id]
        },

        blogType(cid){
            return 'attr-' + Object.keys(this.content(cid))[0]
        },

        blogAttribute(cid){
            return Object.values(this.content(cid))[0]
        },

    }
}
</script>
