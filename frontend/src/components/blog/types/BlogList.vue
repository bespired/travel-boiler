<template>
    <ul>
        <li v-for="li in data.content">
            {{ li }}
        </li>
    </ul>
</template>

<script>

export default {
    name: 'BlogList',

    props: {
        data: { type: Object }
    }
}
</script>
