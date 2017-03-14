require('./context');
var expect = require('chai').expect;
var request = require('supertest');
var server = require('../server');

var VALID_URL_REGEX = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

describe('Root api', function() {
  var rootUrl = '/api';

  before(function(done) {
    request(server)
      .get(rootUrl)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.get('Content-Type')).to.match(/json/);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should give a list of entry points', function(done) {
    request(server)
      .get(rootUrl)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('emails_url');
        expect(res.body.emails_url).to.not.have.lengthOf(0);
        expect(res.body.emails_url, 'emails url').to.match(VALID_URL_REGEX);
        done();
      });
  });
});
