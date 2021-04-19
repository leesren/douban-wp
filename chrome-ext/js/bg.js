function log(...args) {
  console.log(args);
}
const defaultLs = [];

var storeService = {
  defaultLs: defaultLs,
  ipUrl: 'http://127.0.0.1:7003',
  allUsers: [],
  token: '',
  request: function(url, options = {}) {
    return fetch(`${this.ipUrl}${url}`, {
      body: options.body ? JSON.stringify(options.body) : undefined,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth.token': this.token,
      },
    })
      .then(res => res.json())
      .then(res => {
        return res.status == 0 ? res.data : Promise.reject(res.msg);
      });
  },
  login: function() {
    return this.request(`/rent/auth/login`, {
      method: 'POST',
      body: {
        username: '1',
        password: '1',
      },
    });
  },

  uploadData: function(data) {
    return this.request('/rent/douban', {
      method: 'POST',
      body: data,
    });
  },
};
// bg get msg from content_scripts

// 从 bg --- msg ---> content_scripts

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  const { message, data } = e;
  const tabId = sender.tab.id;
  const handler = EventSet.get(message);
  handler && handler(data, tabId, callback);
  return true;
});

function send(message, data, tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendRequest(tabId, { message, data }, function(response) {});
  });
}
var EventSet = new Map().set('Upload', (data, tabId, callback) => {
  console.log(data);
  Promise.resolve(storeService.token)
    .then(token => {
      return token
        ? token
        : storeService
            .login()
            .then(res => res.token)
            .then(token => {
              storeService.token = token;
              return token;
            });
    })
    .then(() => {
      return storeService.uploadData(data);
    })
    .then(data => {
      callback({
        type: 'Upload',
        data: data,
      });
    })
    .catch(error => {
      callback({
        type: 'Upload',
        error: error,
      });
    });
});
console.log('11');
