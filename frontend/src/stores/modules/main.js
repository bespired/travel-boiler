import Leaf       from '@/helpers/Leaf'
import MainApi    from '@/helpers/MainApi'
import FetchForge from '@/helpers/FetchForge'
import DateUtils  from '@/helpers/DateUtils.js'

export default {

	namespaced: true,

	state: {
		server: import.meta.env.DEV ? import.meta.env.VITE_SERVICES_LOCAL : import.meta.env.VITE_SERVICES_WEB,
		map:  null,
        mapclick: null,
		rate: 0.0062784853,

        now: new Date(),
        // now: new Date("26 Jul 2024"),
        // now: new Date("26 Aug 2024"),

        paneldata: null,
        showpanel: null,

        exampledata: null,
        pickerdata:  null,
        showpicker:  null,

        eventmenu: localStorage.getItem('japan.eventtab'),

        agenda:   null,
        links:    null,
        places:   null,
        phones:   null,
        users:    null,
        gpsdata:  null,
        settings: null,
        message:  null,
        files:    null,
        insta:    null,

        blog:     null,
        page:     null,
        content:  null,

	},

	getters: {
		rate:      (state) => state.rate,
        settings:  (state) => state.settings,

        agenda:    (state) => state.agenda,
        links:     (state) => state.links,
        places:    (state) => state.places,
        phones:    (state) => state.phones,
        users:     (state) => state.users,
        insta:     (state) => state.insta,
        gpsdata:   (state) => state.gpsdata,
        files:     (state) => state.files,

        blog:      (state) => state.blog,
        page:      (state) => state.page,
        content:   (state) => state.content,

        now:         (state) => state.now,
        eventmenu:   (state) => state.eventmenu ?? 'fly',
        exampledata: (state) => state.exampledata,
        paneldata:   (state) => state.paneldata,
        showpanel:   (state) => state.showpanel,
        pickerdata:  (state) => state.pickerdata,
        showpicker:  (state) => state.showpicker,
        message:     (state) => state.message,

        mapclick:    (state) => state.mapclick,

        beforeDate: (state) => {
            const date = new Date(state.settings.startdate).getTime();
            return state.now.getTime() < date
        },

        afterDate:  (state) => {
            const date = new Date(state.settings.enddate).getTime();
            return state.now.getTime() > date
        },

        eventsOnDate:(state) => (date) => {
            if (!state.agenda) return null

            const cDate  = new Date(date)
            const md = cDate.getMonth() + 1
            const dd = cDate.getDate()

            const inMonth = state.agenda.filter(a => a.month === md)
            const onDay   = inMonth.find(m => m.date === dd)
            return onDay
        },

        dateOptions: (state) => {
            if (!state.agenda) return {}
            // maybe do foreach from start to end ?

            const year = new Date().getFullYear()
            const time = '12:00:00'
            const list = []

            state.agenda.forEach( a => {
                list.push(new Date(a.month + '/' + a.date + '/' + year + ' ' + time))
            })
            list.sort((a,b) => a - b)

            const options = { null: '-- kies datum --'}
            list.forEach(d => {
                let m = DateUtils.dayAbbrv[d.getDay()]
                let key = _d(d.getMonth() + 1) + '/' + _d(d.getDate())
                options[key] = m + ' ' + d.toLocaleDateString()
            })
            return options
        }

	},

	actions: {

        install(context) {

            // Leaf.install(context.state.map)
            Leaf.install(context)

        },

        save(context, payload) {

            return MainApi.save(context, payload)

        },

        backup(context) {

            return MainApi.backup(context)

        },

        remove(context, action) {

            return MainApi.remove(context, action)

        },

        load(context, action) {

            return MainApi.load(context, action)

        },

        loadAll(context) {

            return MainApi.load(context, 'load')

        },

        blog(context, id) {

            if (id === undefined)
                return MainApi.loadObj(context, { action: 'blog', index: true })

            return MainApi.loadObj(context, { action: 'blog', load: id })

        },

        geolocation(context) {

            return MainApi.loadObj(context, { action: 'geolocation', load: true })

        },

        eventmenu(context, handle) {
            localStorage.setItem('japan.eventtab', handle)
            context.state.eventmenu = handle
        },

        paneldata(context, data) {
            context.state.paneldata = data
        },

        showpanel(context, panel) {
            context.state.showpanel = panel
            const hasHash = window.location.hash.length > 0
        },

        message(context, msg) {
            context.state.message = msg
        },

        exampledata(context, data) {
            context.state.exampledata = data
        },

        pickerdata(context, data) {
            context.state.pickerdata = data
        },

        showpicker(context, panel) {
            context.state.showpicker = panel
        },

        resetpanels(context) {
            context.state.showpicker  = null
            context.state.showpanel   = null
            context.state.pickerdata  = null
            context.state.paneldata   = null
            context.state.exampledata = null
        },

        findLocation(context, location) {

            MainApi.findLocation(context, location)

        },

        showLocation(context, location) {

            Leaf.center(location[0], location[1])

        },

        drawGpsPoly(context, year) {

            let latlongs = []
            let data = []

            context.state.gpsdata.forEach( gps => {
                let gpsYear  = (gps.date) ? new Date( gps.date * 1000 ).getFullYear() : 2000
                let gpsMonth = (gps.date) ? new Date( gps.date * 1000 ).getMonth() : 0

                let inMonth = ( gpsMonth === 6 ) || ( gpsMonth === 7 )

                const traveler = localStorage.getItem('japan.traveler')
                if (traveler === 'shigatsu.natsu') inMonth = true

                if (( year === gpsYear ) && ( inMonth ))
                    latlongs.push( [gps.latitude, gps.longitude] )
                    data.push( [gps.latitude, gps.longitude, gps.uuid] )
            })

            if (latlongs.length) Leaf.drawGpsPoly(latlongs, data)

        },

        clearLayers(context) {

            Leaf.clearLayers()

        },

	},


}
