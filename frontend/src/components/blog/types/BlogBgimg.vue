<template>
    <div class="bgimg" :style="bgimg" :title="data.content" />
</template>

<style>
    .bgimg {
        min-height: 200px;
        background-position: 50% 50%;
        background-size: cover;
    }
</style>
<script>

export default {
    name: 'Blogimg',

    props: {
        data: { type: Object }
    },

    data() {
        return {

            bgimg: `background-image: url(${ this.data.src });`
        }
    }



}
</script>
