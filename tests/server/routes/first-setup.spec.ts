import { step } from 'mocha-steps';
import { postRequester } from '../../test-helpers/requester';

const { URL } = process.env;
const SAMPLE_CREDENTIALS = {
  alias: 'test_id',
  client_id: 'testing@sssuper.com',
  client_secret: 'sadasdas8d0ad0asasd',
  email: 'testing@supercool.com',
};

describe('Testing First Setup Route', () => {
  step('Get all Routes Under Setup Route', (done) => {
    postRequester(URL, '/setup/endpoints', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        done();
      } else {
        done(err);
      }
    });
  });
  step('Add Default Policies to Database', (done) => {
    postRequester(URL, '/setup/policies/add', {}, (err, response) => {
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
    postRequester(URL, '/setup/policies/status', {}, (err, response) => {
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
    postRequester(URL, '/setup/policies/reset', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        response.body.should.have.a.property('status').to.be.eql(200);
        done();
      } else {
        done(err);
      }
    });
  });
  step('Add Default Roles to Database', (done) => {
    postRequester(URL, '/setup/roles/add', {}, (err, response) => {
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
    postRequester(URL, '/setup/roles/status', {}, (err, response) => {
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
    postRequester(URL, '/setup/roles/reset', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        response.body.should.have.a.property('status').to.be.eql(200);
        done();
      } else {
        done(err);
      }
    });
  });
  step('Add Sample Credentials to Database', (done) => {
    postRequester(
      URL,
      '/setup/credentials/add',
      SAMPLE_CREDENTIALS,
      (err, response) => {
        if (!err && response.status === 200) {
          response.body.should.be.a('object');
          response.body.should.have.a.property('status').to.be.eql(200);
          done();
        } else {
          done(err);
        }
      },
    );
  });
  step('Reset Test Credentials added before', (done) => {
    postRequester(URL, '/setup/credentials/reset', {}, (err, response) => {
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
