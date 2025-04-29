
const DateUtils = {
    

    dayAbbrv: [
    	'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 
    	'Vrijdag', 'Zaterdag', 'Zondag'
    ],

    monthAbbrv: [
    	'Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
    	'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'
    ],

	firstDateOfWeek(now) {

		const date2 = new Date(now); 

		let offs = date2.getDay() - 1
		if (offs < 0) offs += 7

		return new Date(date2.setDate(date2.getDate() - offs));

	},

	getDateOfWeek(w, y) {
    	let d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
    	return new Date(y, 0, d);
	},

	dateOnGrid(w, r, c) {
		// w = week of year
		// r = row
		// c = column

		const date = this.getDateOfWeek(w, new Date().getUTCFullYear())
		const added = ((r-1) * 7) + (c-1)
		date.setHours(12)

		return new Date(date.setDate(date.getDate() + added));

	},

	showDate(show) {
		if (!show) return ''

		const day   = this.dayAbbrv[show.getDay()]
		const date  = show.getDate()
		const month = this.monthName(show.getMonth())
		return `${day} ${date} ${month}`
	},

	dateOfNow(date) {
		return 'fix me'
	},

	monthName(number) {
		return this.monthAbbrv[number]
	},

	getWeek(param) {
    	let onejan = new Date(param.getFullYear(), 0, 1);
    	return Math.ceil((((param.getTime() - onejan.getTime()) / 86400000) + onejan.getDay()) / 7);
    },

    dateFromMD(MD) {
    	let month = parseInt(MD.split('/')[0]) - 1
    	let date  = parseInt(MD.split('/')[1])
    	return new Date((new Date()).getFullYear(), month, date, 12, 0, 0);
    },

    nights(MoDaFrom, MoDaTo) {
    	let startDate = this.dateFromMD(MoDaFrom)
    	let endDate   = this.dateFromMD(MoDaTo)
    	let diff      = endDate.getDate() - startDate.getDate()
    	return diff
    },

    otherDay(inDate, add) {
    	const date = new Date(inDate)
    	return new Date(date.setDate(date.getDate() + add));
    }

};

export default DateUtils;