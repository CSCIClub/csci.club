require('./context');
var expect = require('chai')
  .expect;
var request = require('supertest');
var server = require('../server');
var email = require('../emails');

describe('Email api', function() {

  { // Subscribe success section
    var validEmail = 'student@stcloudstate1.edu';
    describe('GET /api/email/subscribe/' + validEmail, function() {
      it('should subscribe a new email if unique', function(done) {
        request(server)
          .get('/api/email/subscribe/' + email)
          .set('Accept', 'application/json')
          .end(function(err, res) {
            expect(res.status)
              .to.equal(200);
            expect(res.body)
              .to.have.property('status');
            expect(res.body.status)
              .to.equal(email.SUBSCRIBED);
            done();
          });
      });

      it(
        'should return at status of SUBSCRIBED on successful subscription or re subscription',
        function(done) {
          done();
        });

      it('should re subscribe an existing unsubscribe email', function(
        done) {
        done();
      });

      it('should not create duplicates subscriptions', function(done) {
        expect('not implemented')
          .to.equal('not implemented');
        done();
      });
    });
  } // end subscribe success section

  { // Invalid emails section
    var invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      '.email@example.com',
      'email.@example.com',
      'email..email@example.com',
      'あいうえお@example.com',
      'email@example.com (Joe Smith)',
      'email@example',
      'email@-example.com',
      'email@111.222.333.44444',
      'email@example..com',
      'Abc..123@example.com',
    ];

    var testInvalidEmail = function(invalidEmail) {
      return function(done) {
        it('should not be subscribed', checkInvalidEmail(invalidEmail));
        it('should return a status of INVALID_EMAIL', checkInvalidEmail(
          invalidEmail));
      };
    };

    var checkInvalidEmail = function(invalidEmail) {
      return function(done) {
        request(server)
          .get('/api/email/subscribe/' + invalidEmail)
          .end(validate(done));
      };
    };

    var validate = function(done) {
      return function(err, res) {
        expect(res.status)
          .to.equal(200);
        expect(res.body)
          .to.have.property('status');
        expect(res.body.status)
          .to.equal(email.INVALID_EMAIL);
        done(err);
      };
    };

    for (var i in invalidEmails) {
      var invalidEmail = invalidEmails[i];
      describe('GET /api/subscribe/' + invalidEmail,
        testInvalidEmail(invalidEmail));
    }
  } // End invalid emails section
});
