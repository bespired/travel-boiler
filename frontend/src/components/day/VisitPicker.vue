<template>
    <div class="picker-panel visit" :class="[show]">

        <div class="overflower">
	        <div class="dotline" :key="item.handle"  v-for="item in placesFiltered" >	
	            <div class="hover band" 
                    :class="isSelected(item.handle)"
                    @click="setSelected(item)" >
                    <span class="onAgenda" >
                        <i class="icon-calendar-month" v-if="onAgenda(item)"/>
                    </span>
	                <span class="label"> {{ item.name }} </span>
	                <span class="note">  {{ item.message }} </span>
	            </div>        
            </div>
	    </div>
        <action-row>
            <plan-fix v-model="morningplan" 
                :options="{pencil:'edit', ink:'calendar-month'}" />
            <click-button label="Laat maar" @click="close()" />
            <click-button label="Bewaren"   @click="save()"  />
        </action-row>

        <div class="close" @click="close()"><div class="icon-cancel"/></div>
    </div>
</template>
<script>

import DateUtils from '@/helpers/DateUtils.js'

export default {

    name: 'VisitPicker',

    data() {
        return {
            morningplan: 'pencil',
            selected: null,
            onDay:    null,
        }
    },

    watch: {
        morningplan(newValue) {
            if ((newValue) && (this.selected)) {
                let item = this.places.find(p => p.handle === this.selected)
                this.$store.dispatch('main/exampledata', {
                    name: item.name, plan: this.morningplan
                })
            }
        }
    },  


    computed: {

        agenda() {
            return this.$store.getters['main/agenda']
        },

        places() {
            return this.$store.getters['main/places']
        },

        isDashed() {
            if (!this.typeToShow) return false
            if (typeof this.typeToShow=== "object") return false
            return this.typeToShow.indexOf('-') !== -1
        },

        placesFiltered() {
            if (!this.places)       return []
            if (!this.pickerToShow) return []
            if (this.pickerToShow === 'visit') {
                return this.places.filter(p => p.type === 'visit')   
            }
            return []
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

        show() {
            return this.pickerToShow === 'visit' ? 'show' : 'hide'
        },

        canCreate() {
			return this.$store.getters['user/canCreate']
		},

    },

    methods: {

        onAgenda(visit) {
            if (!this.agenda) return false

            let finder = '"' + visit.handle + '"'            
            let onAgenda = false
            this.agenda.forEach( a => {
                let visits = JSON.stringify(a.visits)
                if (visits.indexOf(finder) > -1) onAgenda = true
            })
            return onAgenda
        },

        isSelected(handle) {
            const selected = this.morningplan + ' selected'
            return handle === this.selected ? selected : this.morningplan
        },

        setSelected(item) {
            this.selected  = item.handle

            this.$store.dispatch('main/exampledata', {
                name: item.name, plan: this.morningplan
            })

            if (!this.onDay) {
                const date = new Date(this.$store.getters['main/paneldata'])
                this.onDay = this.$store.getters['main/eventsOnDate'](date)
            }
        },

        close() {
            this.$store.dispatch('main/showpicker',  null)
            this.$store.dispatch('main/pickerdata',  null)
            this.$store.dispatch('main/exampledata', null)
            this.$store.dispatch('main/loadAll')
            this.onDay    = null
            this.selected = null
        },

        save() {
            if (this.selected === null) return
            if (this.onDay    === null) return

            this.onDay.visits.push ({
                name: this.selected,
                plan: this.morningplan
            })
            
            const payload = {
                'table': 'agenda',
                'record': this.onDay
            }

            this.$store.dispatch('main/save', payload)
                .then(()=>{ this.$store.dispatch('main/loadAll') })
                .then(()=>{ this.close() })        

        }
    }
}
</script>