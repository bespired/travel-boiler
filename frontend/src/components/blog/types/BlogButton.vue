<template>
    <a :href="data.href">{{ data.content }}</a>
</template>

<script>

export default {
    name: 'BlogButton',

    props: {
        data: { type: Object }
    }
}
</script>
