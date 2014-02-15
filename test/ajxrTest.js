// Fix Sinon bug when using 'FakeXMLHttpRequest' in Node
// https://github.com/cjohansen/Sinon.JS/issues/319
if (navigator.userAgent.indexOf('PhantomJS') !== -1){
  window.ProgressEvent = function (type, params) {
    params = params || {};

    this.lengthComputable = params.lengthComputable || false;
    this.loaded = params.loaded || 0;
    this.total = params.total || 0;
  };
}

describe('Get', function(){
  before(function(){
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];

    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  after(function(){
    this.xhr.restore();
  })

  it('should work do an AJAX request', function(done){
    ajxr.get('/users').then(function(response){
      response.should.have.lengthOf(1);
      response[0].should.have.property('username', 'tomtheun');

      done();
    });

    this.requests[0].respond(200, { "Content-Type": "application/json" }, '[{ "username": "tomtheun"}]');
  });
});
