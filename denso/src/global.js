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


export default global