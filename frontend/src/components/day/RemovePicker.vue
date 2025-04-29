<template>
    <div class="picker-panel remove" :class="[show, type]">
        <action-row>
            <plan-fix v-model="morningplan" :options="{pencil:'edit', ink:'calendar-month'}" />
            <click-button label="Bewaar" class="save" @click="save()" />
            <label :id="placeId">{{ eventName }}</label>
            <click-button label="Laat maar"   @click="close()" />
            <click-button label="Verwijderen" @click="remove()"  />
        </action-row>

        <div class="close" @click="close()"><div class="icon-cancel"/></div>
    </div>
</template>

<style>
    .picker-panel.remove .action-row .planfix { margin-right: 8px; }
    .picker-panel.remove .action-row .save    { margin-right: auto; }
</style>

<script>

import DateUtils from '@/helpers/DateUtils.js'

export default {

    name: 'EventPicker',

    data() {
        return {
            morningplan: null,
            placeId: null,
        }
    },

    computed: {

        agenda() {
            return this.$store.getters['main/agenda']
        },

        places() {
            return this.$store.getters['main/places']
        },

        type() {
            if (!this.typeToShow) return ''
            if (typeof this.typeToShow === "object") {
                if ( this.typeToShow.hasOwnProperty('name')) {
                    return this.typeToShow.name.split('-')[0]
                }
            }
            if (!this.isDashed) return ''
            return this.typeToShow.split('-')[0]
        },  

        entry() {
            if ((!this.typeToShow) || (!this.isDashed)) return ''
            return this.typeToShow.split('-')[1]
        },  

        isDashed() {
            if (!this.typeToShow) return false
            if (typeof this.typeToShow=== "object") return false
            return this.typeToShow.indexOf('-') !== -1
        },

        typeToShow() {
            return this.$store.getters['main/pickerdata']
        },

        dateToShow() {
            return this.$store.getters['main/paneldata']
        },

        pickerToShow() {
            return this.$store.getters['main/showpicker']
        },

        eventName() {
            if (!this.typeToShow) return ''

            let placeId = ''
            const date  = new Date(this.$store.getters['main/paneldata'])
            const onDay = this.$store.getters['main/eventsOnDate'](date)

            if (this.isDashed) {
                if (onDay.sleep && onDay.sleep[this.entry]) {
                    placeId = onDay.sleep[this.entry].name
                }
            }else{

                placeId = this.typeToShow.name

            }

            this.placeId = placeId

            if (!placeId) return ''

            let place = this.places.find(p => p.handle === placeId)
            return place ? place.name : ''
        },

        show() {

            if (this.pickerToShow === 'remove') {
                const date  = new Date(this.$store.getters['main/paneldata'])
                const onDay = this.$store.getters['main/eventsOnDate'](date)
                if (onDay.sleep && onDay.sleep[this.entry]) {
                    this.morningplan = onDay.sleep[this.entry].plan
                }
            }

            return this.pickerToShow === 'remove' ? 'show' : 'hide'
        },

        canCreate() {
			return this.$store.getters['user/canCreate']
		},

    },

    methods: {

        close() {
            this.$store.dispatch('main/showpicker', null)
            this.$store.dispatch('main/pickerdata', null)
        },

        save() {

            if (this.type === 'sleep') this.saveSleep()
            if (this.type === 'plc')   this.adjustVisit('plan')

        },

        saveSleep() {

            // All agenda pages with this place should be set to new plan ...
            const date  = new Date(this.$store.getters['main/paneldata'])
            const onDay = this.$store.getters['main/eventsOnDate'](date)
            const place = onDay.sleep[this.entry].name

            const days = []
            this.agenda.forEach( a => {
                // is it a sleep thing?
                if (a.sleep) {
                    let day = null
                    let checkin = false;
                    let checkout= false;

                    if (a.sleep[0] && a.sleep[0].name === place) { day = a; checkout= true; }
                    if (a.sleep[1] && a.sleep[1].name === place) { day = a; checkin=  true; }
                    
                    if (day) {
                        if (checkout) day.sleep[0].plan = this.morningplan
                        if (checkin ) day.sleep[1].plan = this.morningplan
                        days.push(day)
                    }
                }


            })

            const payload = {
                'table': 'agenda',
                'records': days
            }

            this.$store.dispatch('main/save', payload)
                .then(()=>{ this.$store.dispatch('main/loadAll') })
                .then(()=>{ this.close() })     

        },


        remove() {
            if (this.type === 'sleep') this.removeSleep()
            if (this.type === 'plc')   this.adjustVisit('remove')
        },

        removeSleep() {
            
            const dir   = this.entry == 0 ? 1 : -1
            const date  = new Date(this.$store.getters['main/paneldata'])
            const other = new Date(DateUtils.otherDay(date, dir))

            let onDay    = this.$store.getters['main/eventsOnDate'](date)
            let otherDay = this.$store.getters['main/eventsOnDate'](other)
            
            onDay.sleep[this.entry] = null
            otherDay.sleep[1 - this.entry] = null

            const payload = {
                'table': 'agenda',
                'records': [
                    onDay, otherDay,
                ] 
            }

            this.$store.dispatch('main/save', payload)
                .then(()=>{ this.$store.dispatch('main/loadAll') })
                .then(()=>{ this.close() })        

        },

         adjustVisit(changeType) {

            const visit  = this.$store.getters['main/pickerdata']
            const date   = new Date(this.$store.getters['main/paneldata'])
            const onDay  = this.$store.getters['main/eventsOnDate'](date)
            
            const visits = []
            onDay.visits.forEach(v => {
                switch(changeType) {
                case 'remove':
                    if (v.name !== visit.name) visits.push(v)
                    break;
                case 'plan':
                    v.plan = this.morningplan
                    visits.push(v)
                    break;
                }
                
            })
            onDay.visits = visits

            const payload = {
                'table': 'agenda',
                'record': onDay
            }

            this.$store.dispatch('main/save', payload)
                .then(()=>{ this.$store.dispatch('main/loadAll') })
                .then(()=>{ this.close() })    

        },

    }
}
</script>