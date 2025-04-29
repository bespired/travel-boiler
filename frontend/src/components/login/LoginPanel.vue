<template>

    <div class="status" :class="show" />
    <div class="blackground" />

    <div v-if="phase === 20" :class="show" class="login-panel" >
        <div v-if="canSee">{{ fullname }}</div>
        <label>Logout</label>
        <button @click="logout" > Log out </button>
        <div class="error">{{ errorMsg }}</div>
        <a class="menu-pill" @click="backup"><i class="icon-download"/> Backup</a>
        <a class="menu-pill" @click="home" v-if="loginPage" >Homepage</a>
        <a class="menu-pill" @click="okay" v-else>Nee toch niet</a>
    </div>

    <div v-if="phase === 0" :class="show" class="login-panel" >
        <div v-if="canSee">{{ fullname }}</div>
        <label>Email</label>
        <input id="email" type="text" v-model="email" @focus="errorMsg=''" autocomplete="email"/>
        <label>Wachtwoord</label>
        <input id="password" type="password" v-model="password" @focus="errorMsg=''" />
        <button @click="submit" > Log in </button>
        <div class="error">{{ errorMsg }}</div>
        <a class="menu-pill" @click="phase=10; errorMsg=''" > Wachtwoord vergeten </a>
        <a class="menu-pill" @click="okay">Okay</a>
    </div>

    <div v-if="phase === 1" :class="show" class="login-panel center" >
        <div>inloggen</div>
        <div>...</div>
    </div>

    <div v-if="phase === 10" :class="show" class="login-panel" >
        <label>Email</label>
        <input type="text" v-model="email" name="email" @focus="errorMsg=''"/>
        <button @click="forgot" > Mail me </button>
        <div class="error">{{ errorMsg }}</div>
        <a class="menu-pill" @click="phase=0" > login </a>
    </div>
    <div v-if="phase === 11" :class="show" class="login-panel center" >
        <div>mail versturen</div>
        <div>...</div>
    </div>
    <div v-if="phase === 12" :class="show" class="login-panel" >
        <label>Code</label>
        <input type="text" v-model="code"  autocomplete="off" @focus="errorMsg=''"/>
        <button @click="check" > Check het </button>
        <div class="error">{{ errorMsg }}</div>
        <a class="menu-pill" @click="phase=10" > email </a>
    </div>
    <div v-if="phase === 13" :class="show" class="login-panel center" >
        <div>checking</div>
        <div>...</div>
    </div>
    <div v-if="phase === 14" :class="show" class="login-panel" >
        <label>Nieuw Wachtwoord</label>
        <input :type="type" v-model="password" autocomplete="off" />
        <label>En nog eens</label>
        <input :type="type" v-model="again" />
        <button @click="passit" >Maak maar </button>
        <a class="menu-pill" @click="typeSwap()" > zien dan </a>
        <a class="menu-pill" @click="phase=0" > login </a>
    </div>
    <div v-if="phase === 15" :class="show" class="login-panel center" >
        <div>wachtwoord maken</div>
        <div>...</div>
    </div>

</template>
<script>

import AuthLogged from '@/helpers/AuthLogged'

export default {
    name: 'LoginView',

    mounted() {
    },

    data() {

        // am i logged in?
        let loggedin = AuthLogged.validToken()

        return {
            phase: loggedin ? 20 : 0,
            errorMsg: '',

            email: '',
            code:  '',
            change: '',
            password: '',
            again: '',

            type: 'password',
        }
    },

    watch: {
        $route(newValue) {
            this.$store.commit('user/loginPanel', false)
        },

        loggedIn(newValue) {
            if (this.phase === 20) {
                if (newValue === false) this.phase = 0
            }
        },
    },

    methods: {

        typeSwap() {
            this.type = this.type === 'password' ? 'text' : 'password'
        },

        backup() {
            this.$store.dispatch('main/backup')
        },

        home() {
            this.$router.push({ name: 'home'})
        },

        okay() {
            this.$store.commit('user/loginPanel', false)
        },

        logout() {
            this.$store.dispatch('user/logout')
            this.phase = 0
            this.okay()
        },

        submit() {
            this.phase++
            let payload = {
                email:    this.email,
                password: this.password
            }
            this.$store.dispatch('user/login', payload)
                .then((result) => {
                    // console.log('result', result)
                    this.phase=20
                    this.okay()
                })
                .catch((err) => {
                    this.errorMsg= "Er is iets niet goed."
                    this.phase--
                })

        },

        forgot() {
            this.phase++
            let payload = {
                email:    this.email,
            }
            this.$store.dispatch('user/forgot', payload)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'okay') {
                        this.phase++
                    }else{
                        this.phase--
                        this.errorMsg= "Ken ik jou?"
                    }
                })
                .catch((err) => {
                    console.log('err--', err)
                    this.errorMsg= "Er gaat iets mis."
                    this.phase--
                })
        },

        check() {
            this.phase++
            let payload = {
                email:  this.email,
                code:   this.code
            }
            this.$store.dispatch('user/check', payload)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'okay') {
                        this.change = data.changecode
                        this.phase++
                    }else{
                        this.phase--
                        this.errorMsg= "Nee is niet goed."
                    }
                })
                .catch((err) => {
                    console.log('err--', err)
                    this.errorMsg= "Er gaat iets mis."
                    this.phase--
                })

        },

        passit() {
            if (this.password !== this.again) {
                this.errorMsg= "Nee is niet hetzelfde."
                return
            }
            this.phase++
            let payload = {
                email:    this.email,
                password: this.password,
                change:   this.change,
                code:     this.code
            }
            this.$store.dispatch('user/change', payload)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'okay') {
                        this.phase = 0
                    }else{
                        this.phase--
                        this.errorMsg= "Nee is niet goed."
                    }
                })
                .catch((err) => {
                    console.log('err--', err)
                    this.errorMsg= "Er gaat iets mis."
                    this.phase--
                })

        },

    },

    computed: {
        loggedIn() {
            return this.$store.getters['user/loggedIn']
        },

        show() {
            return this.loginPage ? '' : this.$store.getters['user/loginPanel']
        },

        loginPage () {
            return this.$route.name === 'login'
        },

        canSee() {
            return this.$store.getters['user/canSee']
        },

        fullname() {
            return this.$store.getters['user/fullname']
        },

    }
}
</script>

