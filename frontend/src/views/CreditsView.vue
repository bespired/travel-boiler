<template>
    <div class="yen-backdrop"></div>
    <div class="credit">
        <h1> Credits  </h1>
        <h2> Frontend </h2>
        <template v-for="f in frontend">
            <div>
                <a :href="f.link" :target="f.label">
                    <span>
                        <span class="icon-rocket" /> {{ f.label }}
                    </span>
                    <span>{{ f.name }}</span>
                </a>
            </div>
        </template>
        <h2> Backend  </h2>
        <template v-for="b in backend">
            <div>
                <a :href="b.link" :target="b.label">
                    <span>
                        <span class="icon-rocket" /> {{ b.label }}
                    </span>
                    <span>{{ b.name }}</span>
                </a>
            </div>
        </template>
        <h2> Api  </h2>
        <template v-for="a in api">
            <div>
                <a :href="a.link" :target="a.label">
                    <span>
                        <span class="icon-rocket" /> {{ a.label }}
                    </span>
                    <span>{{ a.name }}</span>
                </a>
            </div>
        </template>

        <h2> App </h2>
            <div>
                <a href="https://www.linkedin.com/in/joerikassenaar" target="extern">
                    <span>
                        <span class="icon-rocket" /> Japan App
                    </span>
                    <span>Joeri Kassenaar</span>
                </a>
            </div>

    </div>


</template>
<script>

export default {
    name: 'CreditsView',

    mounted() {
    },

    data() {
        return {

            frontend: [
                { label: 'Vue',      link: 'https://vuejs.org/about/team.html', name: 'Evan You' },
                { label: 'Unplug',   link: 'https://github.com/unplugin/unplugin-vue-components', name: 'Anthony Fu' },
                { label: 'Leaflet',  link: 'https://leafletjs.com/', name: 'Volodymyr Agafonkin' },
                { label: 'OSM',      link: 'https://www.openstreetmap.org/copyright', name: 'open street map' },
                { label: 'Fontello', link: 'https://fontello.com/',   name: 'Vitaly Puzrin' },

            ],

            backend: [
                { label: 'Php',      link: 'https://www.php.net/', name: 'Rasmus Lerdorf' },
                { label: 'Composer', link: 'https://getcomposer.org/', name: 'Nils Adermann, Jordi Boggiano' },
                { label: 'Slim',     link: 'https://www.slimframework.com/docs/v4/objects/routing.html', name: 'Josh Lockhart' },
                { label: 'Hjson',    link: 'https://hjson.github.io/', name: 'Christian Zangl' },
                { label: 'Sleekdb',  link: 'https://sleekdb.github.io/', name: 'Kazi Mehedi Hasan' },
            ],

            api: [
                { label: 'freecurrencyapi',   link: 'https://freecurrencyapi.com/',   name: '' },
                { label: 'nominatim',         link: 'http://osm.org/copyright',       name: 'ODbL 1.0. ' },
                { label: 'openstreetmap.de',  link: 'https://www.openstreetmap.org/', name: '' },
            ],


        }
    },

    methods: {


    },

    computed: {

    }
}
</script>
<style>
    .credit {
        position: relative;
        padding: 8%;
        min-height: 100vh;
/*        background-color: red;*/
        color: white;
    }

    .credit .icon-rocket {
        margin-right: 6px;
    }

    .credit h2 {
        padding: 15px 0 4px;
    }

    .credit div > a > span {
        min-width: 35%;
        color: white;
    }
    .credit a {
        padding: 4px 0;
        width: 100%;
        cursor: pointer;
    }

    .credit a:hover > span {
        color: black;
        cursor: pointer;
    }

</style>