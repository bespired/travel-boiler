import ZoneCoords from '@/helpers/ZoneCoords.js'
    // Japan Mapcode Zones as I think Denso has made them
    // Many thanks to
    // https://saibara.sakura.ne.jp/map/convgeo.cgi


const Zone = {

    getZoneCoords() {
        return ZoneCoords
    },

    mapCode(lat, lon) {

        return '0 000 000*00';

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

            let latblock= dlat / 30.0
            let lonblock= dlon / 30.0

            let blockLatPerc = Math.floor(30 * ((lat - flat) / dlat))
            let blockLonPerc = Math.floor(30 * ((lon - flon) / dlon))

            let blkslat = flat + blockLatPerc * latblock
            let blkslon = flon + blockLonPerc * lonblock

            let block = blockLonPerc + 30 * blockLatPerc

            // // Draw the block
            // boundbox = [[blkslat, blkslon], [blkslat + latblock, blkslon + lonblock]]
            // L.rectangle(boundbox, rectObj2, {renderer}).addTo(this.map);

            // // Find the unit
            let latunit= dlat / 900.0  // let latunit= latblock / 30.0
            let lonunit= dlon / 900.0  // let lonunit= lonblock / 30.0

            let unitLatPerc = Math.floor(30 * ((lat - blkslat) / latblock))
            let unitLonPerc = Math.floor(30 * ((lon - blkslon) / lonblock))

            let unitslat = blkslat + unitLatPerc * latunit
            let unitslon = blkslon + unitLonPerc * lonunit

            let unit = unitLonPerc + 30 * unitLatPerc

            let padblock = ('000' + block).substr(-3)
            let padunit  = ('000' + unit ).substr(-3)

            return {
                block: { id: padblock, lat: blockLatPerc, lon: blockLonPerc },
                unit:  { id: padunit,  lat: unitLatPerc,  lon: blockLonPerc },
                draw: {
                    block: {
                        from:{ lat: blkslat, lon: blkslon},
                        to:  { lat: blkslat + latblock, lon: blkslon + lonblock}},
                }
            }

    },


    infobox(lat, lon) {

        let zones = this.inZone(lat, lon)
        if (zones.length == 0) {
            return 'Out of bounds'
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
        html += `Block ${perc.block.id}    &nbsp;(${perc.block.lat}, ${perc.block.lon})<br>`
        html += `Unit &nbsp${perc.unit.id} &nbsp;(${perc.unit.lat}, ${perc.unit.lon})<br>`


        return html
    },

    // nextLat(findlat, dir) {
    //     const find = parseInt(findlat * 1e5) + ''
    //     const keys = Object.keys(this.latLines);
    //     const kidx = keys.indexOf(find)
    //     const next = keys.at(kidx + dir);


    //     const lvl0 = keys.at(kidx - dir * 2);
    //     const lvl1 = keys.at(kidx - dir);
    //     const lvl2 = keys.at(kidx);
    //     const lvl3 = keys.at(kidx + dir);
    //     const lvl4 = keys.at(kidx + dir * 2);
    //     const lvl5 = keys.at(kidx + dir * 3);

    //     const d0 = this.latLines[lvl1] - this.latLines[lvl0]
    //     const d1 = this.latLines[lvl2] - this.latLines[lvl1]
    //     const d2 = this.latLines[lvl3] - this.latLines[lvl2]
    //     const d3 = this.latLines[lvl4] - this.latLines[lvl3]
    //     const d4 = this.latLines[lvl5] - this.latLines[lvl4]

    //     let out = ''
    //     out += this.latLines[lvl0] + '('+d0+') , '
    //     out += this.latLines[lvl1] + '('+d1+') , '
    //     out += this.latLines[lvl2] + '('+d2+') , '
    //     out += this.latLines[lvl3] + '('+d3+') , '
    //     out += this.latLines[lvl4] + '('+d4+')'

    //     console.log(out)


    //     return this.latLines[next]

    // },

    // fetchLines() {
    //     const keys  = Object.keys(ZoneCoords)
    //     const latLines = []
    //     keys.forEach( idx => {
    //         let zone = ZoneCoords[idx]
    //         let lat0 = zone[0]
    //         let lat1 = zone[2]
    //         latLines[parseInt(lat0 * 1e5)] = lat0
    //         latLines[parseInt(lat1 * 1e5)] = lat1
    //     })

    //     let lat0 = 35.4200622 + 0.0833306
    //     latLines[parseInt(lat0 * 1e5)] = lat0

    //     const sorted = Object.keys(latLines)
    //         .sort()
    //         .reduce((acc, key) => {
    //             acc[key] = latLines[key];
    //             return acc;
    //         }, {});

    //     this.latLines = latLines
    // },

    // fix(dir, payload) {

    //     let height = payload.to.lat - payload.from.lat
    //     let state = (height < 0.20) ? 'too-small' : 'too-big'

    //     let lat = 0
    //     let nxt = 0
    //     let current = ZoneCoords[payload.zone]

    //     // console.log(dir, height, current, payload)
    //     // if too small and up   then add to top lat
    //     // if too small and down then add to bottom lat
    //     // if too big and up   then remove from bottom lat
    //     // if too big and down then remove from top lat0.1

    //     switch (`${state}-${dir}`) {
    //     case 'too-small-up':
    //         lat = payload.to.lat
    //         nxt = this.nextLat(lat, 1)
    //         ZoneCoords[payload.zone][2] = nxt
    //         break;
    //     case 'too-small-down':
    //         lat = payload.from.lat
    //         nxt = this.nextLat(lat, -1)
    //         ZoneCoords[payload.zone][0] = nxt
    //         break;
    //     case 'too-big-up':
    //         lat = payload.from.lat
    //         nxt = this.nextLat(lat, 1)
    //         ZoneCoords[payload.zone][0] = nxt
    //         break;
    //     case 'too-big-down':
    //         lat = payload.to.lat
    //         nxt = this.nextLat(lat, -1)
    //         ZoneCoords[payload.zone][2] = nxt
    //         break;
    //     }

    //     localStorage.setItem(`zone-${payload.zone}`, JSON.stringify(ZoneCoords[payload.zone]))

    //     console.log( dir, lat, nxt )

    // },

}

export default Zone




            // let zones = ''
            // let mapcode = ''

            // this.densoZones.forEach((zone) => {
            //  if ((lat >= zone.from.lat) && (lat <= zone.to.lat)) {
            //      if ((lon >= zone.from.lon) && (lon <= zone.to.lon)) {
            //          zones += zone.zone + ' '

            //          // Draw the zone
            //          boundbox = [[zone.from.lat,zone.from.lon],[zone.to.lat,zone.to.lon]]
            //          L.rectangle(boundbox, rectObj1, {renderer}).addTo(this.map);

            //          // Find the block
            //          let dlat = zone.to.lat - zone.from.lat
            //          let dlon = zone.to.lon - zone.from.lon

            //          let latblock= dlat / 30.0
            //          let lonblock= dlon / 30.0

            //          let blkperlat = Math.floor(30 * ((lat - zone.from.lat) / dlat))
            //          let blkperlon = Math.floor(30 * ((lon - zone.from.lon) / dlon))

            //          let blkslat = zone.from.lat + blkperlat * latblock
            //          let blkslon = zone.from.lon + blkperlon * lonblock

            //          let block = blkperlon + 30 * blkperlat

            //          // Draw the block
            //          boundbox = [[blkslat, blkslon], [blkslat + latblock, blkslon + lonblock]]
            //          L.rectangle(boundbox, rectObj2, {renderer}).addTo(this.map);

            //          // Find the unit
            //          let latunit= dlat / 900.0  // let latunit= latblock / 30.0
            //          let lonunit= dlon / 900.0  // let lonunit= lonblock / 30.0

            //          let uniperlat = Math.floor(30 * ((lat - blkslat) / latblock))
            //          let uniperlon = Math.floor(30 * ((lon - blkslon) / lonblock))

            //          let unislat = blkslat + uniperlat * latunit
            //          let unislon = blkslon + uniperlon * lonunit

            //          let unit = uniperlon + 30 * uniperlat

            //          // Draw the unit
            //          boundbox = [[unislat, unislon], [unislat + latunit, unislon + lonunit]]
            //          L.rectangle(boundbox, rectObj3, {renderer}).addTo(this.map);

            //          mapcode = zone.zone + ' ' + this.pad3(block) + ' ' + this.pad3(unit) + '*55  '

            //      }
            //  }
            // })
