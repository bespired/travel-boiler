import ZoneCoords from '@/helpers/ZoneCoords.js'
    // Japan Mapcode Zones as I think Denso has made them
    // Many thanks to
    // https://saibara.sakura.ne.jp/map/convgeo.cgi


const Zone = {

    getZoneCoords() {
        return ZoneCoords
    },

    pad(val, len) {
        return ('000'+val).substr(-len)
    },

    align(val, len) {
        return ('····' + val).substr(-len)
    },


    mapCode(lat, lon) {

        // return '0 000 000*00';

        const zones = Zone.inZone(lat, lon)

        if (!zones.length) return 'Out of bounds'

        const inzone = zones[0]
        const zone = inzone.zone
        const flat= ZoneCoords[zone][0], flon= ZoneCoords[zone][1]
        const tlat= ZoneCoords[zone][2], tlon= ZoneCoords[zone][3]

        const perc= this.percentages(flat,flon, tlat,tlon, lat, lon)

        let ret = ''
        if (zone == 0) {
            ret += perc.block.id + ' '
            ret += this.pad(perc.unit.id, 3) + '*'
            ret += this.pad(perc.core.id, 2)
            return ret
        }

        ret += zone + ' '
        ret += this.pad(perc.block.id, 3) + ' '
        ret += this.pad(perc.unit.id, 3) + '*'
        ret += this.pad(perc.core.id, 2)
        return ret

    },

    inZone(lat, lon) {
        const zones = []
        const keys  = Object.keys(ZoneCoords)
        keys.forEach( idx => {
            if ((lat >= ZoneCoords[idx][0]) && (lat < ZoneCoords[idx][2])) {
                if ((lon >= ZoneCoords[idx][1]) && (lon < ZoneCoords[idx][3])) {
                    zones.push({
                        zone: idx,
                        from: { lat: ZoneCoords[idx][0], lon: ZoneCoords[idx][1]},
                        to:   { lat: ZoneCoords[idx][2], lon: ZoneCoords[idx][3]}
                    })
                }
            }
        })
        return zones
    },

    percentages(flat,flon, tlat,tlon, lat,lon) {
            let dlat= tlat-flat, dlon= tlon-flon

            // Get Block

            let blockLonPerc = (lon-flon) / dlon
            let blockLatPerc = (lat-flat) / dlat

            let xblock= Math.floor(blockLonPerc * 30)
            let yblock= Math.floor(blockLatPerc * 30)

            let block = yblock * 30 + xblock

            let blockheight = dlat / 30.0
            let blockwidth  = dlon / 30.0
            let blockstartlat = flat + yblock * blockheight
            let blockstartlon = flon + xblock * blockwidth

            // Get Unit

            let unitLatPerc = (lat-blockstartlat) / blockheight
            let unitLonPerc = (lon-blockstartlon) / blockwidth

            let xunit= Math.floor(unitLonPerc * 30)
            let yunit= Math.floor(unitLatPerc * 30)

            let unit = (yunit % 30) * 30 + (xunit % 30)

            let unitheight = dlat / 900.0
            let unitwidth  = dlon / 900.0
            let unitstartlat = blockstartlat + yunit * unitheight
            let unitstartlon = blockstartlon + xunit * unitwidth

            // Get S-core

            let coreLatPerc = (lat-unitstartlat) / unitheight
            let coreLonPerc = (lon-unitstartlon) / unitwidth

            let xcore= Math.floor(coreLonPerc * 10)
            let ycore= Math.floor(coreLatPerc * 10)

            let core = (ycore % 10) * 10 + (xcore % 10)

            let coreheight = dlat / 8100.0
            let corewidth  = dlon / 8100.0
            let corestartlat = unitstartlat + ycore * coreheight
            let corestartlon = unitstartlon + xcore * corewidth


            return {
                block: { id: block, lat: blockLatPerc, lon: blockLonPerc },
                unit:  { id: unit,  lat: unitLatPerc,  lon: unitLonPerc },
                core:  { id: core,  lat: coreLatPerc,  lon: coreLonPerc },
                draw: {
                    block: {
                        from:{ lat: blockstartlat, lon: blockstartlon},
                        to:  { lat: blockstartlat + blockheight, lon: blockstartlon + blockwidth }
                    },
                    unit: {
                        from:{ lat: unitstartlat, lon: unitstartlon},
                        to:  { lat: unitstartlat + unitheight, lon: unitstartlon + unitwidth }
                    },
                    core: {
                        from:{ lat: corestartlat, lon: corestartlon},
                        to:  { lat: corestartlat + coreheight, lon: corestartlon + corewidth }
                    },
                }
            }

    },


    infobox(lat, lon) {

        let zones = this.inZone(lat, lon)
        if (zones.length == 0) {
            return { html: 'Out of bounds', perc: null }
        }

        let inzone = zones[0]
        let zone = inzone.zone
        let flat= ZoneCoords[zone][0], flon= ZoneCoords[zone][1]
        let tlat= ZoneCoords[zone][2], tlon= ZoneCoords[zone][3]
        let dlat= tlat-flat, dlon= tlon-flon

        let perc= this.percentages(flat,flon, tlat,tlon, lat, lon)

        let html = ''
        html += `Coor ${lat}, ${lon}<br>`
        html += `From ${flat.toFixed(7)}, ${flon.toFixed(7)}<br>`
        html += `To &nbsp;&nbsp;${tlat.toFixed(7)}, ${tlon.toFixed(7)}<br>`
        html += `Dist ${dlat.toFixed(7)}, ${dlon.toFixed(7)}<br>`

        html += `In zone ${inzone.zone}<br>`
        html += `Block     ${this.align(perc.block.id, 3)} (lat(y):${perc.block.lat.toFixed(8)}, lon(x):${perc.block.lon.toFixed(8)})<br>`
        html += `Unit &nbsp${this.align(perc.unit.id , 3)} (lat(y):${ perc.unit.lat.toFixed(8)}, lon(x):${ perc.unit.lon.toFixed(8)})<br>`
        html += `Core &nbsp${this.align(perc.core.id , 3)} (lat(y):${ perc.core.lat.toFixed(8)}, lon(x):${ perc.core.lon.toFixed(8)})<br>`


        return { html, perc }
    },

}

export default Zone
