<template>
    <h2>{{ data.content }}</h2>
</template>

<script>

export default {
    name: 'BlogTitle',

    props: {
        data: { type: Object }
    }
}
</script>
