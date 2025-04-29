import FetchForge from '@/helpers/FetchForge.js'

const AuthLogged = {

    validToken() {
        let token = localStorage.getItem('japan.token')
        if (token === undefined) return false
        if (token === null) return false

        let decoded = this.decodeJWT(token)

        // let avatar = localStorage.getItem('japan.avatar')
        // if (decoded.payload.id !== avatar) return false

        // no create rights? stay loggend in...
        if ( decoded.payload.rw.indexOf('C') === -1 ) return true

        let age = (new Date().getTime() / 1000) - decoded.payload.dt
        let minutes = age / 60

        // 20 hours old?
        if (minutes > 60 * 20) return false

        return true
    },

    decodeJWT(token) {

        if (!token) return {}

        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }
        const header  = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));

        return { header, payload };
    },

    payload(letter) {
        if (!this.validToken()) return false

        let token = localStorage.getItem('japan.token')
        let decode = this.decodeJWT(token)
        return decode.payload.rw.indexOf(letter) > -1
     },

    sendGps() {

        console.log( 'Yes... requesting coords now...' )

        document.getElementById('app').classList.add('gps')

        navigator.geolocation.getCurrentPosition((location) => {
            const traveler     = localStorage.getItem('japan.traveler')

            const data = {
                action:   'geolocation',
                user:      traveler,
                latitude:  location.coords.latitude,
                longitude: location.coords.longitude,
                accuracy:  location.coords.accuracy,
            }

            const server= import.meta.env.DEV ?
                import.meta.env.VITE_SERVICES_LOCAL :
                import.meta.env.VITE_SERVICES_WEB

            const current = data.latitude.toFixed(5) + ', ' + data.longitude.toFixed(5)
            const lastposition = localStorage.getItem('japan.location')
            
            if (lastposition != current) {

                localStorage.setItem('japan.location', current)

                fetch(server, FetchForge.post(data))    
                
                document.getElementById('app').classList.add('sent')
                console.log( 'coords sent home.' )

            } else {
                
                // 51.41440, 5.48967

                console.log( 'same spot.' )
                document.getElementById('app').classList.add('same')

            }
            
        });

        setTimeout(()=>{
            document.getElementById('app').classList.remove('sent', 'same', 'gps')
        }, 4000)
    },

    timeForGps() {

        const traveler = localStorage.getItem('japan.traveler')        
        if (!traveler) {
            console.log('Not a traveler')
            return false
        }

        // I'm a traveler ... time to send GPS?
        const now = Math.ceil(new Date().getTime() / 1000)
        const lasttime = localStorage.getItem('japan.lasttime')

        if ((lasttime === undefined) || (lasttime === null)) {
            localStorage.setItem('japan.lasttime', now)
            this.sendGps()
            return true
        }

        let age = now - parseInt(lasttime)
        let minutes = age / 60

        if (minutes > 10) {
            localStorage.setItem('japan.lasttime', now)
            this.sendGps()
            return true
        }

        console.log( 'Not yet.' )
        return false
    },


}

export default AuthLogged;