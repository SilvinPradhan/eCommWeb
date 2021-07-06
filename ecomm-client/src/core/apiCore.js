import {API} from "../config";

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getFilterProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }
    return fetch(`${API}/products/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getBrainTreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
