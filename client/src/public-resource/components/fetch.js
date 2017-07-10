import 'whatwg-fetch';

const _fetch = {
    baseUrl: 'http://112.74.40.94:3000',
    post: function(url, data, callback) {
        fetch(this.baseUrl + url, {
            method: 'POST',
            body: formatData(data)
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
