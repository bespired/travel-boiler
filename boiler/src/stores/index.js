import {createStore, createLogger} from 'vuex'

import main   from './modules/main.js'

export default createStore({
    modules: {
        main,
    },
})