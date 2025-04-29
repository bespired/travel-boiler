const FetchForge = {

    get(token) {
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

        if (token) payload.headers['x-token'] = token

        return payload
    },

    post(data, token) {
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

        if (token) payload.headers['x-token'] = token

        return payload
    },

    delete(data, token) {
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

        if (_isValid(token)) payload.headers['x-token'] = token

        return payload
    },

}

export default FetchForge;