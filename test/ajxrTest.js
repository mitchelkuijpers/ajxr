describe('ajxr', function() {
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

  beforeEach(function(){
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];

    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function(){
    this.xhr.restore();
  });

  describe('Get', function(){
    it('should do an AJAX request', function(done){
      ajxr.get('/users').then(function(response){
        response.should.have.lengthOf(1);
        response[0].should.have.property('username', 'tomtheun');

        done();
      }).done();

      this.requests[0].respond(200, {}, '[{ "username": "tomtheun"}]');
    });

    it('should reject promise when AJAX request returns a 404', function(done){
      ajxr.get('/users/non-existing-user').fail(function(response){
        response.should.have.property('message', 'Status code was 404');
        done();
      }).done();

      this.requests[0].respond(404);
    });
  });

  describe('Post', function(){
    it('should do an AJAX request', function(done){
      ajxr.post('/users', {'username': 'tomtheun'}).then(function(response){
        response.should.have.property('username', 'tomtheun');
        done();
      }).done();

      this.requests[0].respond(201, {}, '{ "username": "tomtheun"}');
    });

    it('should reject promise when AJAX request returns a 400', function(done) {
      ajxr.post('/users', {'usrname': 'tomtheun'}).fail(function(response) {
        response.should.have.property('message', 'Status code was 400');
        done();
      });

      this.requests[0].respond(400);
    });
  });
});
