
import 'whatwg-fetch';

function transformData(data) {
    let form = document.createElement('form');
    let formData = new FormData(form)

    for (let key in data) {
        formData.append(key,data[key])
    }

    return formData;
}

const _fetch = {
    baseUrl: 'http://localhost:5001',
    // baseUrl: 'http://112.74.40.94:3000',
    post: function(url, data, callback) {
        fetch(this.baseUrl + url, {
            method: 'POST',
            body: transformData(data)
        }).then((res) => {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            callback(res);
        });
    },

    get: function(url, callback) {
        fetch(this.baseUrl + url).then((res) => {
            return res.json();
        }).then((res) => {
            callback(res);
        });
    }
}

function formatData(data) {
    let formData = new FormData();
    for (let key in data) {
        formData.append(key, JSON.stringify(data[key]));
    }
    return formData;
}

export default _fetch;
