import { step } from 'mocha-steps';
import { postRequester } from '../../../helpers/requester';

const { TESTURL } = process.env;

describe('Test Setup Route - Policies CRUD Operations', () => {
  step('Add Default Policies to Database', (done) => {
    postRequester(TESTURL, '/setup/policies/add', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        response.body.should.have.a.property('status').to.be.eql(200);
        done();
      } else {
        done(err);
      }
    });
  });
  step('Check Status of Policies Added Before', (done) => {
    postRequester(TESTURL, '/setup/policies/status', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        response.body.should.have.a.property('status').to.be.eql(200);
        done();
      } else {
        done(err);
      }
    });
  });
  step('Reset Default Policies added before', (done) => {
    postRequester(TESTURL, '/setup/policies/reset', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        response.body.should.have.a.property('status').to.be.eql(200);
        done();
      } else {
        done(err);
      }
    });
  });
});
