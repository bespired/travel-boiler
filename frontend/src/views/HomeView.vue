<template>
    <section class="hero" />
    <section class="sun"  v-if="notNull"/>
    <section class="holder" >


        <a href="/insta" class="menu-pill">
            <i class="icon-image"></i>
            <span>Photos</span>
        </a>

        <a href="/map" class="menu-pill">
            <i class="icon-globe"></i>
            <span>Waar zijn ze dan?</span>
        </a>

        <a href="/credits" class="menu-pill">
            <i class="icon-credit"></i>
            <span>Credits</span>
        </a>
        <!--
        <a @click="login" class="menu-pill" v-if="!canTravel" >
            <i class="icon-key"></i>
            <span :key="loggedIn">{{ logmelding }}</span>
        </a>
        -->

    </section>
</template>
<script>

import AuthLogged from '@/helpers/AuthLogged.js'

export default {
    name: 'HomeView',

    data() {
        return {
        }
    },

    methods: {
        login() {
            this.$store.commit('user/loginPanel', true)
        }
    },

    computed: {
        canSee() {
            return this.$store.getters['user/canSee']
        },

        notNull() {
            let localYear = parseInt(localStorage.getItem('whatYear'))
            if (localYear === 2023) return true
            let backdrop = parseInt(localStorage.getItem('backdrop'))
            return backdrop != 0
        }

    }
}
</script>
<style type="text/css">

    body.home .hero {
        opacity: 0.2;
    }
    .sun {
/*        background-color: red;*/
        border-radius: 50%;
        position: absolute;
        display: flex;
        align-items: center;
        top: 30vh;
        left:50%;
        width: 60vw;
        height: 60vw;
        transform: translateX(-50%) translateY(-50%);

        background-image: url('logo.png');
        background-size: contain;
        background-repeat: no-repeat;

/*        mix-blend-mode: color-dodge;*/
    }
    .holder {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        row-gap: 4px;

        bottom: 20vh;
        left:50%;
        width: 60vw;
        transform: translateX(-50%) translateY(-50%);
    }

    .holder span {
        white-space: nowrap;
        font-size: 13px;
    }

    .again {
        margin: auto;
    }
     .again div{
        font-family: monospace;
        font-size: 20vw;
        font-style: normal;
        font-weight: 900;
        margin-left: auto;
        margin-right: auto;
        color: white;
        width: fit-content;
        text-shadow: 6px 6px 6px black;
     }
     @media (min-width: 700px) {
        .sun {
            width: 500px;
            height: 500px;
        }
        .again div{
            font-size: 130px;
        }
     }
</style>
