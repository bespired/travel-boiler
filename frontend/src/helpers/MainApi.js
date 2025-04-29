
import Leaf       from './Leaf'
import FetchForge from './FetchForge'

const MainApi = {

 	findLocation(context, location) {

        const url = context.state.server

        const data = {
            action: 'stack',
            name: _ucFirst(location)
        }

        fetch(url, FetchForge.post(data))
            .then(response => response.json())
            .then(data => {
                Leaf.center(data.location.latitude, data.location.longitude, 9)
            })

    },

    remove(context, payload) {

        const data = {
            action:  'remove',
            table:   payload.table,
            handles: null
        }

        if (payload.handle)  data.handles = [payload.handle]
        if (payload.handles) data.handles = payload.handles

        const url = context.state.server

        fetch(url, FetchForge.post(data))

    },


    save(context, payload) {

        const data = {
            action:  'save',
            table:   payload.table,
            records: null,
        }

        if (payload.record)  data.records = [payload.record]
        if (payload.records) data.records = payload.records

        const url = context.state.server

        fetch(url, FetchForge.post(data))
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })

    },

    backup(context) {
        const data = { action: 'backup' }
        const url  = context.state.server
        fetch(url, FetchForge.post(data))
            .then(response => response.json())
            .then(data => {

                let keys = Object.keys(data.backups)
                let body = document.body
                let a = {}

                keys.forEach((key, idx) => {
                    let obj= data.backups[key]

                    let filename = key + '.json'
                    let blob = new Blob([JSON.stringify(obj, null, 2)])

                    a[key]  = document.createElement("a")
                    a[key].href = URL.createObjectURL(blob, {type: "text/plain"})
                    a[key].setAttribute("download", filename)
                    body.appendChild(a[key])

                    setTimeout(() => {a[key].click()}, idx * 100 )

                    body.removeChild(a[key])

                })
            })
    },


    loadObj(context, data) {

        fetch(context.state.server, FetchForge.post(data))
            .then(response => response.json())
            .then(data => {
                if (data.status === 'okay') {

                    if (data.hasOwnProperty('gpsdata' )) context.state.gpsdata = data.gpsdata
                    if (data.hasOwnProperty('blog'))     context.state.blog = data.blog
                    if (data.hasOwnProperty('page'))     context.state.page = data.page
                    if (data.hasOwnProperty('content'))  context.state.content = data.content

                }
            })

    },

    load(context, action) {

		const data = {
            action: action,
        }

        // if (action == 'blog') {
        //     data.index= true
        // }

        const url = context.state.server

        const promise = new Promise((resolve, reject) => {
            fetch(url, FetchForge.post(data))
            .then(response => response.json())
            .then(data => {
                if (data.status === 'okay'){

                    if (data.hasOwnProperty('settings')) context.state.settings = data.settings
                	if (data.hasOwnProperty('agenda'  )) context.state.agenda   = data.agenda
					if (data.hasOwnProperty('links'   )) context.state.links    = data.links
                    if (data.hasOwnProperty('insta'   )) context.state.insta    = data.insta
					if (data.hasOwnProperty('places'  )) context.state.places   = data.places
					if (data.hasOwnProperty('phones'  )) context.state.phones   = data.phones
					if (data.hasOwnProperty('gpsdata' )) context.state.gpsdata  = data.gpsdata
                    if (data.hasOwnProperty('currency')) context.state.rate     = data.currency

                    if (data.hasOwnProperty('users')) context.state.users = data.users
                    if (data.hasOwnProperty('files')) context.state.files = data.files

                    if (data.hasOwnProperty('blog'))  context.state.blog = data.blog


                    this.fillAgenda(context)
                    resolve(true)
                } else {
                    reject()
                }
            })
            .catch((err) => {
                console.log("Unable to fetch -", err)
                reject()
            })
        })

        return promise
    },

    freeHandle(prefix, table) {

        let count = table.length
        let handle = `${prefix}-${count}`

        let exists = table.find(a => a.handle === handle)

        while(exists) {
            count++
            handle = `${prefix}-${count}`
            exists = table.find(a => a.handle === handle)
        }

        return handle

    },


    fillAgenda(context) {
        // create entries in agenda for days that are in the holiday
        // but have no database records yet.

        const start = context.state.settings.startdate
        const end   = context.state.settings.enddate
        if (!start) return

        const startdate = new Date(start)
        const enddate   = new Date(end)

        const agenda = context.state.agenda

        let DiffInTime = enddate.getTime() - startdate.getTime()
        let DiffInDays = Math.round(DiffInTime / (1000 * 3600 * 24))

        for( let ptr=0; ptr < DiffInDays; ptr++) {
            let date = new Date(start)
            date.setDate(date.getDate() + ptr);

            const md = date.getMonth() + 1
            const dd = date.getDate()

            const inMonth = agenda.filter(a => a.month === md)
            let   onDay   = inMonth.find(m => m.date === dd)

            if (!onDay) {
                onDay = {
                    date: dd,
                    month: md,
                    handle:this.freeHandle('agn', agenda),
                    icon: null,
                    sleep: [null, null],
                    town: [],
                    visits: [],
                }
                agenda.push(onDay)
            }

        }


    },

};

export default MainApi;