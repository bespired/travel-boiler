<template>
    <div class="picker-panel sleep" :class="[show, type]">
    	<div class="overflower">
	        <div class="dotline" v-for="item in placesFiltered" 
	        	:key="item.handle">
	            <div class="hover band" 
                    :class="isSelected(item.handle)"
                    @click="setSelected(item.handle)" >
	                <span class="label"> {{ item.name }} </span>
	                <span class="note">  {{ item.message }} </span>
	            </div>        
            </div>
	    </div>
        <action-row>
            <plan-fix v-model="morningplan" :options="{pencil:'edit', ink:'calendar-month'}" />
            <label v-if="entry==0">checkin</label>
            <label v-if="entry==1">checkout</label>
            <click-button label="Laat maar" @click="close()" />
            <click-button label="Bewaren"   @click="save()"  />
        </action-row>

        <div class="close" @click="close()"><div class="icon-cancel"/></div>
    </div>
</template>
<script>

import DateUtils from '@/helpers/DateUtils.js'

export default {

    name: 'SleepPicker',

    data() {
        return {
            morningplan: 'pencil',
            selected: null,
            onDay:    null,
            otherDay: null,
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
            if (!this.places)     return []
            if (!this.typeToShow) return []
            if (!this.isDashed)   return []

            let parts = this.typeToShow.split('-')
            if (parts[0] === 'sleep') {
                return this.places.filter(p => p.type === 'sleep')   
            }
        },

        type() {
            if (!this.typeToShow) return ''
            if (!this.isDashed)   return ''
            return this.typeToShow.split('-')[0]
        },  

        entry() {
            if (!this.typeToShow) return ''
            if (!this.isDashed)   return ''
            return this.typeToShow.split('-')[1]
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
            return this.pickerToShow === 'sleep' ? 'show' : 'hide'
        },

        canCreate() {
			return this.$store.getters['user/canCreate']
		},

    },

    methods: {

        isSelected(handle) {
            const selected = this.morningplan + ' selected'
            return handle === this.selected ? selected : this.morningplan
        },

        setSelected(handle) {
            this.selected = handle
            if (!this.onDay) {
                const dir   = this.entry == 0 ? 1 : -1
                const date  = new Date(this.$store.getters['main/paneldata'])
                const other = new Date(DateUtils.otherDay(date, dir))

                this.onDay    = this.$store.getters['main/eventsOnDate'](date)
                this.otherDay = this.$store.getters['main/eventsOnDate'](other)
            }

            this.onDay.sleep[this.entry] = {
                name: handle,
                plan: this.morningplan
            }
            this.otherDay.sleep[1 - this.entry] = {
                name: handle,
                plan: this.morningplan
            }
        },

        close() {
            this.$store.dispatch('main/showpicker', null)
            this.$store.dispatch('main/pickerdata', null)
            this.$store.dispatch('main/loadAll')
            this.onDay    = null
            this.otherDay = null
            this.selected = null
        },

        save() {
            if (this.selected === null) return

            const payload = {
                'table': 'agenda',
                'records': [
                    this.onDay,
                    this.otherDay,
                ] 
            }

            this.$store.dispatch('main/save', payload)
                .then(()=>{ this.$store.dispatch('main/loadAll') })
                .then(()=>{ this.close() })        

        }
    }
}
</script>