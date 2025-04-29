<template>

    <label>Blog entry {{ blogType() }}</label>
    <input-row >
        <component :is="blogAttributes()" :item="localvalue"/>
    </input-row>
    <action-row>
        <click-button label="Undo"   @click="undo()" />
        <click-button label="Bewaar" @click="$emit('select', null)" />
    </action-row>

</template>

<script>

import AttrArticle from './AttrArticle.vue'
import AttrImg     from './AttrImg.vue'
import AttrBgImg   from './AttrBgImg.vue'
import AttrList    from './AttrList.vue'
import AttrTitle   from './AttrTitle.vue'

export default {
    name: 'BlogItem',

    components :{
        AttrArticle, AttrBgImg, AttrImg, AttrList, AttrTitle
    },

    props: {
        modelValue: { type: Object, default: null },
    },

    emits: ['select', 'update:modelValue'],

    mounted() {
        this.backup = _clone(this.modelValue)
    },

    data () {
        return {
            backup: null,
        }
    },

    computed: {
        localvalue: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                this.$emit('update:modelValue', newValue)
            }
        },
    },

    methods: {
        undo() {
            this.$emit('update:modelValue', this.backup)
            this.$emit('select', null)
        },
        listItems(itemId) {
            this.$emit('select', null)
        },
        blogAttributes(item){
            return 'attr-' + Object.keys(this.localvalue)[0]
        },
        blogType(item){
            return Object.keys(this.localvalue)[0]
        },

    }
}
</script>
