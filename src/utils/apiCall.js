import config from "../../config"

export function authorizedFetch(endpoint, method, headers={}, payload=null, queryParams=null){
    const accessToken = localStorage.getItem('accessToken')
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...headers
    }
    const options = {
        method: method,
        headers: defaultHeaders,
        body: payload ? JSON.stringify(payload) : null
    }

    if (queryParams){
        const queryString = new URLSearchParams(queryParams).toString()
        endpoint += `?${queryString}`
    }

    const url = config.backend.protocol + '://' + config.backend.host + ':' 
    + config.backend.port + endpoint

    return fetch(url, options)
}

export function unAuthorizedFetch(endpoint, method, headers={}, payload=null, queryParams=null){
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...headers
    }
    const options = {
        method: method,
        headers: defaultHeaders,
        body: payload ? JSON.stringify(payload) : null
    }

    if (queryParams){
        const queryString = new URLSearchParams(queryParams).toString()
        endpoint += `?${queryString}`
    }

    const url = config.backend.protocol + '://' + config.backend.host + ':' 
    + config.backend.port + endpoint

    return fetch(url, options)
}

