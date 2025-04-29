<template>

    <div v-if="canCreate">
        <div class="passports">
            <div class="square" v-for="person in passports">
                <div @click="showPass(person)">
                    <img :src="person.img" />
                </div>
                <div>
                    <div class="name">{{ person.name  }}</div>
                    <div>{{ person.phone }}</div>
                </div>
            </div>
        </div>

        <div class="files" v-if="files">
            <template class="list" v-for="file in files">
                <div @click="showFile(file)">{{ file.label }}</div>
            </template>
        </div>

        <div class="files" v-if="links">
            <template class="list" v-for="link in links">
                <div @click="showLink(link)">{{ link.label }}</div>
            </template>
        </div>

    </div>

</template>
<style>

.links,
.files,
.passports {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 12px;
    padding: 2px;
}
.passports .square {
    display: flex;
    width: calc(50% - 4px);
    padding: 4px;
    gap: 8px;
}

.files {
    margin-top: 5px;
    padding: 8px 4px;
}

.files div {
    width: 100%;
    padding: 2px 8px;
    border-radius: 12px;
}

.files div:hover {
    background-color: red;
    color: white;
    cursor: pointer;
}

.passports .square > div{
    display: flex;
    flex-direction: column;
}

.passports .square img {
    border-radius: 1vw;
    width: 16vw;
    max-width: 8vw;
}
.passports .square img:hover {
    box-shadow: -2px -2px red, 2px -2px red, 2px  2px red,-2px 2px red;
    cursor: pointer;
}

.passports .name{
    font-size: 18px;
    font-weight: 900;
}


</style>


<script>

import FetchForge from '@/helpers/FetchForge.js'

export default {
    name: 'DocsContent',

    emits: ['setHeight'],

    data() {
        return {
            passports: [
                { id: 'josette',
                    name: 'Josette',
                    phone: '+31 6 11 37 26 92',
                    img: '/img/josette.png'
                },
                { id: 'joeri',
                    name: 'Joeri'  ,
                    phone: '+31 6 11 84 54 81',
                    img: '/img/joeri.png'
                },
                { id: 'nona',
                    name: 'Nona'   ,
                    phone: '+31 6 46 83 17 85',
                    img: '/img/nona.png'
                },
                { id: 'vern',
                    name: 'Vern'   ,
                    phone: '+31 6 15 25 70 57',
                    img: '/img/vern.png'
                }
            ]
        }
    },

    methods: {
        showPass(person) {
            this.$emit('setHeight')
            this.$store.dispatch('main/paneldata', person)
            this.$store.dispatch('main/showpanel', 'document')
        },

        showFile(file) {

            // get Display Token
            // open window with filename and token

            fetch(this.server, FetchForge.post({action:'createToken'}))
            .then(response => response.json())
            .then(data => {
                const key = data.token
                const url = `${this.server}/file?key=${key}&name=${file.filename}`
                window.open(url, '_blank')
            })

        },


        showLink(link) {

            window.open(link.url, '_blank')

        },

    },

    computed: {
        canCreate() {
            return this.$store.getters['user/canCreate']
        },

        files() {
            return this.$store.getters['main/files']
        },

        links() {
            return [
                { label: 'Visit Japan Web', url: 'https://services.digital.go.jp/en/visit-japan-web/' }
            ]
        },

        server() {
            return this.$store.getters['user/server']
        },


    }
}
</script>