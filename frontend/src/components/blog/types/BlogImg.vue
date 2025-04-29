<template>
    <img :src="data.src" :title="data.content" />
</template>

<script>

export default {
    name: 'BlogImg',

    props: {
        data: { type: Object }
    }
}
</script>
