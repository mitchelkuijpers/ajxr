var Q = require('q');

var request = function(method, url, payload) {
  var dfd = Q.defer();

  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.onload = onload;
  request.onerror = onerror;
  request.send(JSON.stringify(payload));

  function onload() {
    if ((request.status / 100 | 0) === 2) {
      var response = JSON.parse(request.responseText);

      dfd.resolve(response);
    } else {
      dfd.reject(new Error('Status code was ' + request.status));
    }
  }

  function onerror() {
    dfd.reject(new Error('An error occured'));
  }

  return dfd.promise;
};

module.exports  = {
  get: function(url) {
    return request('GET', url);
  },

  post: function(url, payload) {
    return request('POST', url, payload);
  },

  put: function(url, payload) {
    return request('PUT', url, payload);
  },

  delete: function(url, payload) {
    return request('DELETE', url);
  }
};
