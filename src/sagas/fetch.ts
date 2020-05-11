import fetch from 'isomorphic-fetch';
import {history} from '../configureStore';
import store from 'store'
import {API_URL} from '../config'

export function fetchGet(apiName) {
	return fetch(`${API_URL}${apiName}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": store.get('token') && `Token ${store.get('token')}`
		},
	})
		.then(response => {
			if (response.status === 204) {
				return {status: response.status,json: 'json'}
			} else {
				return response.json().then(json => ({
						status: response.status,
						json: json,
					})
				)
			}
		})
		.then(({status, json}) => {
			return responseHandler(status, json)
		})
		.catch(()=>{
				history.push('/sorry')
			}
		)
}


export function fetchPost(apiName, payload) {
	return fetch(`${API_URL}${apiName}/`, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
			"Authorization": store.get('token') && `Token ${store.get('token')}`
		},
	})
		.then(response => {
			if (response.status === 204) {
				return {status: response.status,json: 'json'}
			} else {
				return response.json().then(json => ({
						status: response.status,
						json: json,
					})
				)
			}
		})
		.then(({status, json}) => {
			return responseHandler(status, json)
		})
		.catch(()=>{
				history.push('/sorry')
			}
		)
}


export function fetchPost2(apiName, payload) {
	return fetch(`${API_URL}${apiName}/`, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
			"Authorization": store.get('token') && `Token ${store.get('token')}`
		},
	})
		.then(response => {
			if (response.status === 204) {
				return {status: response.status,json: 'json'}
			} else {
				return response.json().then(json => ({
						status: response.status,
						json: json,
					})
				)
			}
		})
		.then(({status, json}) => {
			return responseHandler(status, json)
		})
		.catch(()=>{
				history.push('/sorry')
			}
		)
}

export function fetchPostForm(apiName, payload) {

    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('name', payload.name);

    return fetch(`${API_URL}${apiName}/`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": store.get('token') && `Token ${store.get('token')}`
        },
    })
        .then(response => {
            if (response.status === 204) {
                return {status: response.status,json: 'json'}
            } else {
                return response.json().then(json => ({
                        status: response.status,
                        json: json,
                    })
                )
            }
        })
        .then(({status, json}) => {
            return responseHandler(status, json)
        })
        .catch(()=>{
                history.push('/sorry')
            }
        )
}



export function fetchPatchForm(apiName, payload) {

	const formData = new FormData();
	formData.append('img', payload.img);

	return fetch(`${API_URL}${apiName}/`, {
		method: "PATCH",
		body: formData,
		headers: {
			"Authorization": store.get('token') && `Token ${store.get('token')}`
		},
	})
		.then(response => {
			if (response.status === 204) {
				return {status: response.status,json: 'json'}
			} else {
				return response.json().then(json => ({
						status: response.status,
						json: json,
					})
				)
			}
		})
		.then(({status, json}) => {
			return responseHandler(status, json)
		})
		.catch(()=>{
				history.push('/sorry')
			}
		)
}


export function fetchPatch(apiName, payload) {
	return fetch(`${API_URL}${apiName}/`, {
		method: "PATCH",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
			"Authorization": store.get('token') && `Token ${store.get('token')}`
		},
	})
		.then(response => {
			if (response.status === 204) {
				return {status: response.status,json: 'json'}
			} else {
				return response.json().then(json => ({
						status: response.status,
						json: json,
					})
				)
			}
		})
		.then(({status, json}) => {
			return responseHandler(status, json)
		})
		.catch(()=>{
				history.push('/sorry')
			}
		)
}


export function fetchPut(apiName, payload) {
	return fetch(`${API_URL}${apiName}/`, {
		method: "PUT",
		body: JSON.stringify(payload || ""),
		headers: {
			"Content-Type": "application/json",
			"Authorization": store.get('token') && `Token ${store.get('token')}`
		},
	})
		.then(response => {
			if (response.status === 204) {
				return {status: response.status,json: 'json'}
			} else {
				return response.json().then(json => ({
						status: response.status,
						json: json,
					})
				)
			}
		})
		.then(({status, json}) => {
			return responseHandler(status, json)
		})
		.catch(()=>{
				history.push('/sorry')
			}
		)
}


export function fetchDelete(apiName) {
	return fetch(`${API_URL}${apiName}`, {
		method: "DELETE",
		// body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
			"Authorization": store.get('token') && `Token ${store.get('token')}`
		},
	})
		.then(response => {
			if (response.status === 204) {
				return {status: response.status,json: 'json'}
			} else {
				return response.json().then(json => ({
						status: response.status,
						json: json,
					})
				)
			}
		})
		.then(({status, json}) => {
			return responseHandler(status, json)
		})
		.catch(()=>{
				history.push('/sorry')
			}
		)
}


export function getJson(apiName) {
	return fetch(`${apiName}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		})
		.then(response => {
			return response.json().then(json => json)
		})
		.catch(()=>{
				history.push('/sorry')
			}
		)
}



// TODO statusで処理分けるのか確認
const responseHandler = (status, json) => {
	if (status < 300) {
		return [json, undefined]
	} else {
		if (status === 400) {
			return [undefined, json]
		} else if ( status === 401 || status === 403 ) {
            history.push('/sign_in')
		} else {
			//
            throw new Error('エラーが発生しました。');
		}
	}
}
