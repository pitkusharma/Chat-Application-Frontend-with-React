import config from "../../config"

function verifyToken(){
    let accessToken = localStorage.getItem('accessToken')
    if (accessToken === null)
        throw new Error("No token present.")
    return fetch(`${config.backend.protocol}://${config.backend.host}:${config.backend.port}/auth/verify/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (response.ok)
            return true
        else 
            return false
    })
}

function refreshToken(){
    let refreshToken = localStorage.getItem('refreshToken')
    return fetch(`${config.backend.protocol}://${config.backend.host}:${config.backend.port}/auth/refresh/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            refresh_token: refreshToken
        })
    }).then(response => {
        if (response.ok){
            return response.json()
        } else {
            throw new Error('Could not refresh token')
        }
    }).then(responseBody => {
        localStorage.setItem('accessToken', responseBody.access_token)
        return true
    })
}

export default function authorized(){
    try {
        if (verifyToken())
            return true
        else if (refreshToken()) {
            return true
        } else {
            return false
        }
    } catch (error){
        return false
    }
}