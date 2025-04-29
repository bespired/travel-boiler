import FetchForge from '@/helpers/FetchForge.js'
import AuthLogged from '@/helpers/AuthLogged.js'
import MainApi    from '@/helpers/MainApi'

export default {

    namespaced: true,


    state: {
        server: import.meta.env.DEV ?
            import.meta.env.VITE_SERVICES_LOCAL : import.meta.env.VITE_SERVICES_WEB,
        email:     null,
        password:  null,
        loginrequest: false,
        loginPanel: 'hidden',
        loggedIn:  AuthLogged.validToken(),
        imgurId:   null,
        // imgkey:    null,
        menupanel: true,
        fullname:  null,
        canRead:   AuthLogged.payload('R'),
        canWrite:  AuthLogged.payload('W'),
        canAdmin:  AuthLogged.payload('A'),
        canCreate: AuthLogged.payload('C'),
        canTravel: AuthLogged.payload('T'),

    },

    getters: {
        server:(state)     => state.server,
        // imgkey:(state)     => state.imgkey,

        loginPanel:(state) => state.loginPanel,
        loggedIn:(state)   => state.loggedIn,
        fullname:(state)   => state.fullname,
        canCreate:(state)  => state.canCreate && state.loggedIn,
        canTravel:(state)  => state.canTravel,
        canSee:(state, getters, rootState) => {
            const traveler = localStorage.getItem('japan.traveler')
            if (!traveler) return false
            if (!rootState.main.users) return false

            const user = rootState.main.users.find( u => u.japanese === traveler)
            state.fullname = user.fullname
            return user.rights.indexOf('T') > -1
        }

    },


    mutations: {
        validToken(state, dummy) {
            state.loggedIn = AuthLogged.validToken()
        },
        loginPanel(state, show) {
            state.loginPanel = show ? 'show' : 'hidden'
        }
    },

    actions: {

        forgot(context, payload) {
            const data = {
                action: 'forgot',
                email:  payload.email,
            }
            return fetch(context.state.server, FetchForge.post(data))
		},

		check(context, payload) {
            const data = {
                action: 'check',
                email:  payload.email,
                code:   payload.code,
            }
            return fetch(context.state.server, FetchForge.post(data))
		},

		change(context, payload) {
			payload.action = 'change'
            return fetch(context.state.server, FetchForge.post(payload))
		},

        logout(context) {
            localStorage.removeItem('japan.username')
            localStorage.removeItem('japan.imgurid' )
            localStorage.removeItem('japan.imgkey'  )
            localStorage.removeItem('japan.avatar'  )
            localStorage.removeItem('japan.token'   )
            context.state.canRead   = false
            context.state.canWrite  = false
            context.state.canAdmin  = false
            context.state.canCreate = false
            context.state.loggedIn  = false
        },

		login(context, payload) {

            const data = {
                action: 'login',
                email:    payload.email,
                password: payload.password,
            }

            const promise = new Promise((resolve, reject) => {
                fetch(context.state.server, FetchForge.post(data))
                    .then(response => response.json())
                    .then(data => {
                    	// console.log('-->', data)
                        if (data.status === 'okay') {
                            context.state.loggedIn  = true
                            context.state.canRead   = data.rights.indexOf('R') > -1
                            context.state.canWrite  = data.rights.indexOf('W') > -1
                            context.state.canAdmin  = data.rights.indexOf('A') > -1
                            context.state.canCreate = data.rights.indexOf('C') > -1
                            context.state.canTravel = data.rights.indexOf('T') > -1
                            context.state.imgkey    = data.imgkey
                            context.state.fullname  = data.username

                            localStorage.setItem('japan.email',    payload.email)
                            localStorage.setItem('japan.username', data.username)
                            localStorage.setItem('japan.imgurid',  data.imgurId)
                            localStorage.setItem('japan.imgkey',   data.imgkey)
                            localStorage.setItem('japan.avatar',   data.avatar)
                            localStorage.setItem('japan.token',    data.token)
                            if (context.state.canTravel) {
                                localStorage.setItem('japan.traveler', data.avatar)
                            }
                            resolve()

                        } else {

                            reject()

                        }
                    })
                    .catch((err) => {
                        console.log("Unable to fetch -", err)
                        this.loggedIn = false
                        reject()
                    })
            })

            return promise

        }

    },


}
