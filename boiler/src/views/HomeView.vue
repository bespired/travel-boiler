<template>
    <section class="home" >
        <div class="buttonrow">
            <link-button label="Agendas" routename="agendas" />
            <link-button label="Buttons" routename="buttons" />
            <link-button label="Icons"   routename="icons"   />
        </div>
    </section>
</template>
<script>
export default {
    name: 'HomeView',
}
</script>

<style>
    .home {
        display: flex;
        padding: 3%;
        height: 100vh;
    }

    .buttonrow ~ .buttonrow { margin-top: 4px }

</style>