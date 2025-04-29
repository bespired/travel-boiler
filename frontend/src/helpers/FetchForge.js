const FetchForge = {

    get() {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        let payload = {
            method: 'GET',
            mode: 'cors',                   // no-cors, *cors, same-origin
            cache: 'no-cache',              // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',     // include, *same-origin, omit
            headers: headers,
            redirect: 'follow',             // manual, *follow, error
            referrerPolicy: 'no-referrer',  // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }

        let token = localStorage.getItem('japan.token')
        if (_isValid(token)) payload.headers['X-Token'] = token

        return payload
    },

    post(data) {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        let payload = {
            method: 'POST',
            mode: 'cors',                   // no-cors, *cors, same-origin
            cache: 'no-cache',              // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',     // include, *same-origin, omit
            headers: headers,
            redirect: 'follow',             // manual, *follow, error
            referrerPolicy: 'no-referrer',  // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data)      // body data type must match "Content-Type" header
        }

        let token = localStorage.getItem('japan.token')
        if (_isValid(token)) payload.headers['X-Token'] = token

        return payload
    },

    delete(data) {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        let payload = {
            method: 'DELETE',               // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',                   // no-cors, *cors, same-origin
            cache: 'no-cache',              // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',     // include, *same-origin, omit
            headers: headers,
            redirect: 'follow',             // manual, *follow, error
            referrerPolicy: 'no-referrer',  // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data)      // body data type must match "Content-Type" header
        }

        let token = localStorage.getItem('japan.token')
        if (_isValid(token)) payload.headers['X-Token'] = token

        return payload
    },

}

export default FetchForge;