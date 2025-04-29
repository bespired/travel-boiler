<template>
    <!-- <section class="hero" /> -->
    <template v-if="page">
        <div class="scroll-area edit-mode">
            <div class="blog-read-panel">
                <template v-for="item in page.body">
                    <bone-structure :class="item.skin" :data="item.content" :bones="item.bone" />
                </template>
            </div>
        </div>
        <div class="properties">
            <blog-properties :blog="page" @select="setItem" @index="setIndex" @save="save" v-if="rowId === null" />
            <blog-attributes :blog="page" :row="rowId" :column="columnId" @deselect="resetItem" v-if="rowId !== null" />
        </div>
    </template>
</template>
<script>
export default {
    name: 'BlogPage',


    data() {
        return {
            rowId: null,
            columnId: null,
        }
    },

    methods: {
        componentName(item) {
            return 'blog-' + Object.keys(item)[0]
        },

        componentData(item) {
            return Object.values(item)[0]
        },

        setIndex(itemId) {
            this.$router.push({ name: 'blog' })
        },

        setItem(payload, columnId) {
            this.rowId = payload.rowId
            this.columnId = payload.columnId
        },

        resetItem() {
            this.rowId = null
            this.columnId = null
        },

        save() {

            let content = []
            let idx = Object.keys(this.content)
            idx.forEach(key => {
                let obj = this.content[key]
                obj.handle = `cnt-${key}`
                content.push(obj)
            })

            let payload = { 'table': 'pages', 'record': this.page }
            this.$store.dispatch('main/save', payload)
                .then(() => {
                    payload = { 'table': 'contents', 'records': content }
                    this.$store.dispatch('main/save', payload)
                })
        },

    },

    computed: {

        page() {
            return this.$store.getters['main/page']
        },

        content() {
            return this.$store.getters['main/content']
        }
    }

}
</script>
<style>
.properties {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 35vw;
    background-color: white;
    padding: 12px;
}

.properties .input-group~.input-group {
    margin-top: 4px;
}

.blog-entry .hero {
    filter: blur(8px) brightness(0.5);
}

.scroll-area {
    height: calc(100vh);
    overflow: auto;
    /*        margin-top: 20px;*/
}

.edit-mode {
    transform: scale(.65) translateY(-27%) translateX(-27%);
    height: 155vh;
}

.edit-mode .blog-read-panel {
    width: 100vw;
}

.blog-link {
    border-radius: 2px;
    border: 1px solid #bebebe;
    margin-bottom: 1px;
    display: flex;
    font-size: 11px;
}


.blog-read-panel {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 80px;
    padding: 3vw;
    background-color: rgba(255, 255, 255, 0.9);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;

    gap: 8px;
    cursor: pointer;
}

.properties input {
    font-size: 14px;
}
</style>