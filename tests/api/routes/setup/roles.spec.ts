import { step } from 'mocha-steps';
import { postRequester } from '../../../helpers/requester';

const { TESTURL } = process.env;

describe('Test Setup Route - Roles CRUD Operations', () => {
  step('Add Default Roles to Database', (done) => {
    postRequester(TESTURL, '/setup/roles/add', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        response.body.should.have.a.property('status').to.be.eql(200);
        done();
      } else {
        done(err);
      }
    });
  });
  step('Check Status of Roles Added before', (done) => {
    postRequester(TESTURL, '/setup/roles/status', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        response.body.should.have.a.property('status').to.be.eql(200);
        done();
      } else {
        done(err);
      }
    });
  });
  step('Reset Default Roles added before', (done) => {
    postRequester(TESTURL, '/setup/roles/reset', {}, (err, response) => {
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
