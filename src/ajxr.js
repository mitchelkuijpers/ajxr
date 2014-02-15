(function(){
  var request = function(method, url, payload) {
    var dfd = Q.defer();

    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.onload = onload;
    request.send(JSON.stringify(payload));
  
    function onload() {
      if (request.status === 200) {
        var response = JSON.parse(request.responseText);

        dfd.resolve(response);
      } else {
        dfd.reject(new Error("Status code was " + request.status));
      }
    }

    return dfd.promise;
  }

  var ajxr = {
    get: function(url) {
      return request('GET', url);
    },
  
    post: function(url, payload) {
      return request('POST', url, payload);
    },

    put: function(url, payload) {
      return request('PUT', url, payload);
    },

    delete: function(url) {
      return request('DELETE', url);
    }
  }

  window.ajxr = ajxr;
})();