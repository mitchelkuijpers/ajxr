(function(){
  var request = function(method, url, payload) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.onload = onload;
    request.send(JSON.stringify(payload));
  
    function onload() {
      if (request.status === 200) {
        console.log('DONE');
      } else {
        console.log('FAIL: ' + request.status);
      }
    } 
  }

  var ajxr = {
    get: function(url) {
      request('GET', url);
    },
  
    post: function(url, payload) {
      request('POST', url, payload);
    },

    put: function(url, payload) {
      request('PUT', url, payload);
    },

    delete: function(url, payload) {
      request('DELETE', url);
    }
  }

  window.ajxr = ajxr;
})();