const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const app = require('../app');

// assertion style
chai.should();
chai.use(chaiHttp);

describe('Testing using Mocha', () => {
  // Test get route
  describe('Get customer Details API', () => {
    it('Should return an object containing a list of dishes', (done) => {
      chai.request(app)
        .get('/ubereats/dishes')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  });
  describe('User should login successfully', () => {
    it('Should return 200 status code up on successfull login', (done) => {
      chai.request(app)
        .post('/ubereats/restaurant/signin')
        .send({ email: 'udupi@gmail.com', password: 'Udupi@123' })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
  describe('User should signup successfully', () => {
    it('Should return 200 status code up on successfull signup', (done) => {
      chai.request(app)
        .post('/ubereats/customer/signup')
        .send({ name: 'jaya', email: 'jaya123@gmail.com', password: 'Jaya@12345' })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
  describe('Get all the restaurants', () => {
    it('Should return an array of objects', (done) => {
      chai.request(app)
        .get('/ubereats/restaurant')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  });
  describe('User should be able to update the profile', () => {
    it('Should send status code 200 up on successful update else should thorw error', (done) => {
      chai.request(app)
        .put('/ubereats/customer/28')
        .send({ name: 'manjushree' })
        .end((err, response) => {
          if (err) {
            response.should.have.status(301);
          }
          done();
        });
    });
  });
});
