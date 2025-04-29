import {createStore, createLogger} from 'vuex'

import main   from './modules/main.js'
import user   from './modules/user.js'

export default createStore({
    modules: {
        user,
        main,
    },
})