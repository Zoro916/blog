
import 'whatwg-fetch';

function transformData(data) {
    let form = document.createElement('form');
    let formData = new FormData(form)
    let signature = null;
    let parma_options = Object.keys(data).sort();

    for (let key in data) {
        formData.append(key,data[key])
    };
    parma_options.forEach((item, index) => {
        signature += item
    });

    signature = md5(signature);

    formData.append('signature', signature);

    return formData;
}

const _fetch = {
    baseUrl: 'http://112.74.40.94:3000',
    post: function(url, data, callback) {
        fetch(this.baseUrl + url, {
            method: 'POST',
            body: transformData(data)
        }).then((res) => {
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

export default _fetch;
