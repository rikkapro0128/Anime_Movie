import helper from './helperToken.js'
import VueCookies from 'vue-cookies';

class fetchWorker {
    constructor(hostName) {
        this.hostName = hostName;
        this.errFetch = 'CANT\'T FETCH API!';
        this.Authorization = VueCookies.get('token');
    }
    async GET(url) {
        const state = await helper.checkTokenIsExpire();
        if(state === 'NEXT!') {
            const res = await fetch(`${this.hostName}/${url}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Authorization': this.Authorization,
                },
                mode: 'cors',
            })
            return data = await res.json();
        }else {
            return this.errFetch;
        }
    }
    async POST(url, value) {
        const state = await helper.checkTokenIsExpire();
        if(state === 'NEXT!') {
            const res = await fetch(`${this.hostName}/${url}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': this.Authorization,
                },
                mode: 'cors',
                body: JSON.stringify(value),
            })
            return data = await res.json();
        }else {
            return this.errFetch;
        }
    }
    async PATCH(url, value) {
        const state = await helper.checkTokenIsExpire();
        if(state === 'NEXT!') {
            const res = await fetch(`${this.hostName}/${url}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': this.Authorization,
                },
                mode: 'cors',
                body: JSON.stringify(value),
            })
            return data = await res.json();
        }else {
            return this.errFetch;
        }
    }
    async DELETE(url) {
        const state = await helper.checkTokenIsExpire();
        if(state === 'NEXT!') {
            const res = await fetch(`${this.hostName}/${url}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': this.Authorization,
                },
                mode: 'cors',
            })
            return data = await res.json();
        }else {
            return this.errFetch;
        }
    }
}

export default new fetchWorker;
