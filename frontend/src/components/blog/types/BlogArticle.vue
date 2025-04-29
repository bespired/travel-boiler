<template>
    <p>{{ data.content }}</p>
</template>

<script>

export default {
    name: 'BlogArticle',

    props: {
        data: { type: Object }
    }
}
</script>
