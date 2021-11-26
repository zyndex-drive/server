import { step } from 'mocha-steps';
import { postRequester } from '../../../helpers/requester';

const { TESTURL } = process.env;
const SAMPLE_CREDENTIALS = {
  alias: 'test_id',
  client_id: 'testing@sssuper.com',
  client_secret: 'sadasdas8d0ad0asasd',
  email: 'testing@supercool.com',
};

describe('Test Setup Route - Credentials CRUD Operations', () => {
  step('Add Sample Credentials to Database', (done) => {
    postRequester(
      TESTURL,
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
    postRequester(TESTURL, '/setup/credentials/reset', {}, (err, response) => {
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
