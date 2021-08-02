import { step } from 'mocha-steps';
import { postRequester } from '../../test-helpers/requester';

const { URL } = process.env;

describe('Testing First Setup Route', () => {
  step('Get all Routes Under Setup Route', (done) => {
    postRequester(URL, '/setup/endpoints', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.data.should.be.a('object');
        done();
      } else {
        done(err);
      }
    });
  });
  step('Add Sample Credentials to Database', (done) => {
    const sampleCreds = {
      alias: 'test_id',
      client_id: 'testing@sssuper.com',
      client_secret: 'sadasdas8d0ad0asasd',
      email: 'testing@supercool.com',
    };
    postRequester(
      URL,
      '/setup/credentials/add',
      sampleCreds,
      (err, response) => {
        if (!err && response.status === 200) {
          console.log(response);
          response.body.data.should.be.a('object');
          response.status.should.be.eql(200);
          response.body.data.should.have.a.property('status').to.be.eql(200);
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
        response.body.data.should.be.a('object');
        response.status.should.be.eql(200);
        response.body.data.should.have.a.property('status').to.be.eql(200);
        done();
      } else {
        done(err);
      }
    });
  });
});
