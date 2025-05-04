if (window.global === undefined) {
	window.global = window;
}

global._clone = function(data) {
	if (data === null) return null
	if (data === undefined) return undefined

	return JSON.parse(JSON.stringify(data))
}

global._notValid = function(data) {
	if (data === null) return true
	if (data === undefined) return true
	if (Number.isNaN(data)) return true
	if ((typeof data === 'string') && (data === 'null')) return true // what?
	return false
}

global._isValid = function(data) {
	return !_notValid(data)
}

global._ucFirst= function(data) {
    return data.charAt(0).toUpperCase() + data.slice(1);
}

global._d= function(data) {
	return ('00' + data).substr(-2)
}

global._doy= function(date) {
	let d = new Date(date)
    return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5)
}

String.prototype.hashCode = function() {
  	var hash = 0, i, chr;
  	if (this.length === 0) return hash;

  	for (i = 0; i < this.length; i++) {
   		chr = this.charCodeAt(i);
    	hash = ((hash << 5) - hash) + chr;
    	hash |= 0; // Convert to 32bit integer
  	}
  	return hash;
}

export default global